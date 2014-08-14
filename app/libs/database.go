package db_lib

import (
	"fmt"
	"github.com/coocood/qbs"
	"rozklad_cdtu/app/models"
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

func FacultyGroupsList(db *qbs.Qbs, faculty_id int, year int) []*models.Groups {
	var groups []*models.Groups
	fmt.Println(faculty_id, year)
	err := db.WhereEqual("groups.faculty_id", faculty_id).WhereEqual("groups.year", year).FindAll(&groups)
	if err != nil {
		panic(err)
	}
	return groups
}
