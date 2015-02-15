package jobs

import (
	"fmt"
	_ "github.com/revel/revel"
	_ "github.com/revel/revel/modules/jobs/app/jobs"
	"github.com/tealeg/xlsx"
	"rozklad_cdtu/app/controllers"
	"rozklad_cdtu/app/models"
	"strconv"
	"time"
)

type AudiencesImport struct{}

func OpenExcelFile(filename string) *xlsx.File {
	fmt.Println("| Opening file")
	xlFile, err := xlsx.OpenFile(filename)
	if err != nil {
		fmt.Printf("| Can't open file - \"%s\"\n", filename)
		return nil
	} else {
		fmt.Printf("| File \"%s\" successfully opened\n", filename)
		return xlFile
	}
}

func (j AudiencesImport) Run() {
	start := time.Now()
	fmt.Println("------------------------------")
	fmt.Printf("| Starting import at %s\n", start.Format("2006-01-02 15:04:05.000"))
	db := controllers.Gdb
	file := OpenExcelFile("/home/kolan/Documents/a.xlsx")
	fmt.Println("------------------------------")

	rowCount := 0
	successCount := 0
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
		rowCount += 1

		if audienceType != "НВНП" && audienceType != "" && audienceType != "Спорт. зал" && audienceType != "ФПФ" {
			var audience models.Audiences
			successCount += 1

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

			db.NewRecord(audience)
			db.Save(&audience)
		}
	}
	elapsed := time.Since(start)
	fmt.Println("------------------------------")
	fmt.Printf("| Import finished at %s\n", time.Now().Format("2006-01-02 15:04:05.000"))
	fmt.Printf("| Importing time %s\n", elapsed)
	fmt.Println("------------------------------")
	fmt.Printf("| Audiences in file         : %d\n", rowCount)
	fmt.Printf("| Imported audiences        : %d\n", successCount)
	fmt.Printf("| Audiences without sets    : %d\n", withoutSets)
	fmt.Printf("| Audiences with wrong type : %d\n", wrongType)
	fmt.Println("------------------------------")
}

// func init() {
// 	revel.OnAppStart(func() { jobs.Now(AudiencesImport{}) })
// }
