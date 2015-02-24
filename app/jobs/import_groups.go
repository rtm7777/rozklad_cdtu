package jobs

import (
	"fmt"
	"github.com/fatih/color"
	"regexp"
	"rozklad_cdtu/app/controllers"
	"rozklad_cdtu/app/models"
	"strconv"
	"strings"
	"time"
)

type GroupsImport struct{}

func (j GroupsImport) Run() {
	start := time.Now()
	fmt.Println("------------------------------")
	fmt.Printf("| Starting import at %s\n", start.Format("2006-01-02 15:04:05.000"))
	db := controllers.Gdb
	file := OpenExcelFile("/home/kolan/Documents/ONR_FITIS.xlsx")
	fmt.Println("------------------------------")

	rowCount := 0
	successCount := 0
	alreadyExist := 0
	wrongYear := 0
	wrongNumberOfStudents := 0

	for _, row := range file.Sheets[1].Rows[10:] {
		group := models.Groups{}

		re := regexp.MustCompile("[^\\S]+")
		re2 := regexp.MustCompile("([^\x00-\x7F])i")
		re3 := regexp.MustCompile("i([^\x00-\x7F])")

		groupYear, err := strconv.Atoi(strings.TrimSpace(row.Cells[7].Value))
		if err != nil {
			group.Year = 0
			wrongYear += 1
		} else {
			group.Year = groupYear
		}

		groupName := strings.TrimSpace(row.Cells[27].Value)
		groupName = re.ReplaceAllString(groupName, " ")
		groupName = re2.ReplaceAllString(groupName, "${1}і")
		groupName = re3.ReplaceAllString(groupName, "i${1}")
		group.Name = groupName

		groupStudents, err := strconv.Atoi(strings.TrimSpace(row.Cells[11].Value))
		if err != nil {
			group.NumOfStudents = 0
			wrongNumberOfStudents += 1
		} else {
			group.NumOfStudents = groupStudents
		}

		group.FacultyId = 1

		result := db.Where(&group).First(&group)

		if result.Error != nil {
			if result.RecordNotFound() {
				db.NewRecord(group)
				err = db.Save(&group).Error
				if err != nil {
					if regexp.MustCompile(`^Error 1062:`).MatchString(err.Error()) == true {
						alreadyExist += 1
						color.Cyan("| \"%s\" - is already exist", groupName)
					} else {
						color.Red("| Saving error for - \"%s\"", groupName)
					}
				} else {
					successCount += 1
					color.Green("| \"%s\" - added", groupName)
				}
			}
		} else {
			alreadyExist += 1
			color.Cyan("| \"%s\" - is already exist", groupName)
		}

		rowCount += 1
	}
	elapsed := time.Since(start)
	fmt.Println("------------------------------")
	fmt.Printf("| Import finished at %s\n", time.Now().Format("2006-01-02 15:04:05.000"))
	fmt.Printf("| Importing time %s\n", elapsed)
	color.Blue("------------------------------------------")
	color.Blue("| Groups in file                  : %d", rowCount)
	color.Blue("| Imported groups                 : %d", successCount)
	color.Blue("| Already exist groups            : %d", alreadyExist)
	color.Blue("| Groups without year             : %d", wrongYear)
	color.Blue("| Groups without students count   : %d", wrongNumberOfStudents)
	color.Blue("------------------------------------------")
}
