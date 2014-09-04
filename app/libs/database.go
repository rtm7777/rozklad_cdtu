package db_lib

import (
	_ "fmt"
	"github.com/coocood/qbs"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

func CreateTables() error {
	migration, err := qbs.GetMigration()
	if err != nil {
		return err
	}
	defer migration.Close()
	err = migration.CreateTableIfNotExists(new(models.Faculties))
	err = migration.CreateTableIfNotExists(new(models.Departments))
	err = migration.CreateTableIfNotExists(new(models.Groups))
	err = migration.CreateTableIfNotExists(new(models.Teachers))
	err = migration.CreateTableIfNotExists(new(models.Housings))
	err = migration.CreateTableIfNotExists(new(models.Audiences))
	err = migration.CreateTableIfNotExists(new(models.Subjects))
	err = migration.CreateTableIfNotExists(new(models.Days))
	err = migration.CreateTableIfNotExists(new(models.Pairs))
	err = migration.CreateTableIfNotExists(new(models.Schedule))
	err = migration.CreateTableIfNotExists(new(models.Tasks))
	err = migration.CreateTableIfNotExists(new(models.Users))
	return err
}

func DaysPairsData(db *qbs.Qbs) ([]*models.Days, []*models.Pairs) {
	var days []*models.Days
	err := db.FindAll(&days)
	if err != nil {
		panic(err)
	}
	var pairs []*models.Pairs
	err = db.FindAll(&pairs)
	if err != nil {
		panic(err)
	}
	return days, pairs
}

func GroupsData(db *qbs.Qbs) ([]*models.Faculties, []*models.Groups, []int) {

	years := make([]int, 6)
	for i := 0; i < 6; i++ {
		years[i] = i + 1
	}

	var faculties []*models.Faculties
	err := db.FindAll(&faculties)
	if err != nil {
		panic(err)
	}
	var groups []*models.Groups
	err = db.FindAll(&groups)
	if err != nil {
		panic(err)
	}
	return faculties, groups, years
}

func TeachersData(db *qbs.Qbs) ([]*models.Faculties, []*models.Departments, []*models.Teachers) {
	var faculties []*models.Faculties
	err := db.FindAll(&faculties)
	if err != nil {
		panic(err)
	}
	var departments []*models.Departments
	err = db.FindAll(&departments)
	if err != nil {
		panic(err)
	}
	var teachers []*models.Teachers
	err = db.OrderBy("last_name").FindAll(&teachers)
	if err != nil {
		panic(err)
	}
	return faculties, departments, teachers
}

func FacultyGroupsList(db *qbs.Qbs, faculty_id int64, year int) []*models.Groups {
	var groups []*models.Groups
	condition := qbs.NewEqualCondition("groups.faculty_id", faculty_id).AndEqual("groups.year", year)
	err := db.Condition(condition).FindAll(&groups)
	if err != nil {
		panic(err)
	}
	return groups
}

func FacultiesList(db *qbs.Qbs) []*models.Faculties {
	var faculties []*models.Faculties
	err := db.FindAll(&faculties)
	if err != nil {
		panic(err)
	}
	return faculties
}

func GroupSchedule(db *qbs.Qbs, group_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	var days_out []json_models.Day

	for j := range days {
		var pairs_out []json_models.Pair
		for i := range pairs {
			pairs_out = append(pairs_out, json_models.Pair{pairs[i].Id, pairs[i].Number, "", "", 0})
		}
		days_out = append(days_out, json_models.Day{days[j].Id, days[j].Day, pairs_out})
	}

	err := db.WhereEqual("schedule.group_id", group_id).FindAll(&schedule)
	if err == nil {
		for i := range schedule {
			if schedule[i].PairType == "0" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].Subject.Subject
			} else if schedule[i].PairType == "1" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].PairType
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
			} else if schedule[i].PairType == "2" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject2 = schedule[i].PairType
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
			}
		}
	}

	return days_out
}

func TeacherSchedule(db *qbs.Qbs, teacher_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	var days_out []json_models.Day

	for j := range days {
		var pairs_out []json_models.Pair
		for i := range pairs {
			pairs_out = append(pairs_out, json_models.Pair{pairs[i].Id, pairs[i].Number, "", "", 0})
		}
		days_out = append(days_out, json_models.Day{days[j].Id, days[j].Day, pairs_out})
	}

	err := db.WhereEqual("schedule.teacher_id", teacher_id).FindAll(&schedule)
	if err == nil {
		for i := range schedule {
			if schedule[i].PairType == "0" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].Subject.Subject
			} else if schedule[i].PairType == "1" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].PairType
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
			} else if schedule[i].PairType == "2" {
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject2 = schedule[i].PairType
				days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
			}
		}
	}

	return days_out
}
