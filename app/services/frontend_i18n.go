package frontend_i18n

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"io"
	"os"
	"rozklad_cdtu/app/models"
)

func openFronendI18nFile() (*os.File, error) {
	i18nFile, err := os.Open(revel.BasePath + "/conf/frontend_i18n.json")

	if err != nil {
		revel.WARN.Println("Can't open frontend i18n file")
		return i18nFile, err
	} else {
		return i18nFile, nil
	}
}

func GetI18nMD5() string {
	file, err := openFronendI18nFile()

	defer file.Close()

	if err == nil {
		hash := md5.New()
		io.Copy(hash, file)
		file.Close()
		return fmt.Sprintf("%x", hash.Sum(nil))
	} else {
		return ""
	}
}

func ReadI18nFile() []models.ParsedTranslations {
	file, err := openFronendI18nFile()
	parsedResult := make([]models.ParsedTranslations, 0)

	defer file.Close()

	if err == nil {
		var translations []models.Translations

		json.NewDecoder(file).Decode(&translations)

		for _, tr := range translations {
			for _, ad := range tr.Adaptations {
				parsedResult = append(parsedResult, models.ParsedTranslations{
					tr.Key, ad.Language, ad.Translation,
				})
			}
		}
	}

	return parsedResult
}
