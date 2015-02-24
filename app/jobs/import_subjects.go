package jobs

import (
	"fmt"
	"github.com/fatih/color"
	"regexp"
	"rozklad_cdtu/app/controllers"
	"rozklad_cdtu/app/models"
	"strings"
	"time"
)

type SubjectsImport struct{}

func (j SubjectsImport) Run() {
	start := time.Now()
	fmt.Println("------------------------------")
	fmt.Printf("| Starting import at %s\n", start.Format("2006-01-02 15:04:05.000"))
	db := controllers.Gdb
	db.LogMode(false)
	file := OpenExcelFile("/home/kolan/Documents/ONR_FITIS.xlsx")
	fmt.Println("------------------------------")

	rowCount := 0
	successCount := 0
	alreadyExist := 0

	for _, row := range file.Sheets[1].Rows[10:] {
		var subject models.Subjects

		re := regexp.MustCompile("[^\\S]+")
		re2 := regexp.MustCompile("([^\x00-\x7F])i")
		re3 := regexp.MustCompile("i([^\x00-\x7F])")

		subjectName := strings.TrimSpace(row.Cells[1].Value)
		subjectName = re.ReplaceAllString(subjectName, " ")
		subjectName = re2.ReplaceAllString(subjectName, "${1}і")
		subjectName = re3.ReplaceAllString(subjectName, "i${1}")

		subject.Subject = subjectName

		result := db.Where(&subject).First(&subject)

		if result.Error != nil {
			if result.RecordNotFound() {
				db.NewRecord(subject)
				err := db.Save(&subject).Error
				if err != nil {
					if regexp.MustCompile(`^Error 1062:`).MatchString(err.Error()) == true {
						alreadyExist += 1
						color.Cyan("| \"%s\" - is already exist", subjectName)
					} else {
						color.Red("| Saving error for - \"%s\"", subjectName)
					}
				} else {
					successCount += 1
					color.Green("| \"%s\" - added", subjectName)
				}
			}
		} else {
			alreadyExist += 1
			color.Cyan("| \"%s\" - is already exist", subjectName)
		}

		rowCount += 1
	}
	elapsed := time.Since(start)
	fmt.Println("------------------------------")
	fmt.Printf("| Import finished at %s\n", time.Now().Format("2006-01-02 15:04:05.000"))
	fmt.Printf("| Importing time %s\n", elapsed)
	color.Blue("------------------------------")
	color.Blue("| Subjects in file          : %d", rowCount)
	color.Blue("| Imported subjects         : %d", successCount)
	color.Blue("| Already exist subjects    : %d", alreadyExist)
	color.Blue("------------------------------")
}
