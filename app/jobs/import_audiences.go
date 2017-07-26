package jobs

import (
	"fmt"
	"github.com/fatih/color"
	"github.com/revel/modules/gorm/app"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"regexp"
	"strconv"
	"time"
)

type AudiencesImport struct{}

func (j AudiencesImport) Run() {
	start := time.Now()
	fmt.Println("------------------------------")
	fmt.Printf("| Starting import at %s\n", start.Format("2006-01-02 15:04:05.000"))
	db := gorm.DB
	file := OpenExcelFile("/home/kolan/Documents/a.xlsx")
	fmt.Println("------------------------------")

	rowCount := 0
	successCount := 0
	alreadyExist := 0
	withoutSets := 0
	wrongType := 0

	var audienceTypes = map[string]func() string{
		"Л": func() string {
			return "лекційна"
		},
		"ПР": func() string {
			return "практична"
		},
		"ЛАБ": func() string {
			return "лабораторія"
		},
		"МК": func() string {
			return "методичний кабінет"
		},
		"КК": func() string {
			return "комп'ютерний клас"
		},
	}

	for _, row := range file.Sheets[0].Rows {
		audienceType := row.Cells[2].Value

		if audienceType != "НВНП" && audienceType != "" && audienceType != "Спорт. зал" && audienceType != "ФПФ" {
			var audience models.Audiences

			housingId, err := strconv.Atoi(row.Cells[1].Value)
			if err != nil {
				housingId = 0
			}

			sets, err := strconv.Atoi(row.Cells[3].Value)
			if err != nil {
				sets = 0
			}
			if sets == 0 {
				withoutSets += 1
			}

			audienceTypeFunction, found := audienceTypes[audienceType]
			if found {
				audienceType = audienceTypeFunction()
			} else {
				audienceType = "Невідомо"
				wrongType += 1
			}

			audience.Number = row.Cells[0].Value
			audience.HousingId = int64(housingId)
			audience.Sets = sets
			audience.Note = row.Cells[7].Value
			audience.Type = audienceType

			result := db.Where(&audience).First(&audience)

			if result.Error != nil {
				if result.RecordNotFound() {
					db.NewRecord(audience)
					err = db.Save(&audience).Error
					if err != nil {
						if regexp.MustCompile(`^Error 1062:`).MatchString(err.Error()) == true {
							alreadyExist += 1
							color.Cyan("| \"%s\" - is already exist", row.Cells[0].Value)
						} else {
							color.Red("| Saving error for - \"%s\"", row.Cells[0].Value)
						}
					} else {
						successCount += 1
						color.Green("| \"%s\" - added", row.Cells[0].Value)
					}
				}
			} else {
				alreadyExist += 1
				color.Cyan("| \"%s\" - is already exist", row.Cells[0].Value)
			}
		}
		rowCount += 1
	}
	elapsed := time.Since(start)
	fmt.Println("------------------------------")
	fmt.Printf("| Import finished at %s\n", time.Now().Format("2006-01-02 15:04:05.000"))
	fmt.Printf("| Importing time %s\n", elapsed)
	color.Blue("------------------------------")
	color.Blue("| Audiences in file         : %d", rowCount)
	color.Blue("| Imported audiences        : %d", successCount)
	color.Blue("| Already exist audiences   : %d", alreadyExist)
	color.Blue("| Audiences without sets    : %d", withoutSets)
	color.Blue("| Audiences with wrong type : %d", wrongType)
	color.Blue("------------------------------")
}
