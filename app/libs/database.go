package db_lib

import (
	"fmt"
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

func EmptySchedule(days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var days_out []json_models.Day
	for _, day := range days {
		var pairs_out []json_models.Pair
		for _, pair := range pairs {
			pairs_out = append(pairs_out, json_models.Pair{pair.Id, pair.Number, "", "", 2})
		}
		days_out = append(days_out, json_models.Day{day.Id, day.Day, pairs_out})
	}
	return days_out
}

func GroupPairString(db *qbs.Qbs, subject *models.Schedule) string {
	housing := new(models.Housings)
	housing.Id = subject.Audience.HousingId
	err := db.Find(housing)
	if err != nil {
		panic(err)
	}
	return subject.Subject.Subject + " - " +
		subject.SubjectType + " " +
		subject.Audience.Number + "-" +
		housing.Number + " " +
		subject.Teacher.Rank + " - " +
		subject.Teacher.LastName + " " +
		subject.Teacher.FirstName + " " +
		subject.Teacher.MiddleName
}

func TeacherPairString(db *qbs.Qbs, subject *models.Schedule) string {
	housing := new(models.Housings)
	housing.Id = subject.Audience.HousingId
	err := db.Find(housing)
	if err != nil {
		panic(err)
	}
	fmt.Println(subject.Audience)
	return subject.Subject.Subject + " - " +
		subject.SubjectType + " " +
		subject.Audience.Number + "-" +
		housing.Number + " " +
		subject.Group.ShortName + " - " +
		fmt.Sprintf("%v", subject.Group.Year) + "курс"
}

func GroupSchedule(db *qbs.Qbs, group_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	days_out := EmptySchedule(days, pairs)

	err := db.WhereEqual("schedule.group_id", group_id).FindAll(&schedule)
	if err == nil {
		for _, i := range schedule {
			if i.PairType == "0" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject1 = GroupPairString(db, i)
				days_out[i.DayId-1].Pair[i.PairId-1].Type = 1
			} else if i.PairType == "1" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject1 += GroupPairString(db, i)
			} else if i.PairType == "2" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject2 += GroupPairString(db, i)
			}
		}
	}

	return days_out
}

func TeacherSchedule(db *qbs.Qbs, teacher_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	days_out := EmptySchedule(days, pairs)

	err := db.WhereEqual("schedule.teacher_id", teacher_id).FindAll(&schedule)
	if err == nil {
		for _, i := range schedule {
			if i.PairType == "0" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject1 = TeacherPairString(db, i)
				days_out[i.DayId-1].Pair[i.PairId-1].Type = 1
			} else if i.PairType == "1" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject1 = TeacherPairString(db, i)
			} else if i.PairType == "2" {
				days_out[i.DayId-1].Pair[i.PairId-1].Subject2 = TeacherPairString(db, i)
			}
		}
	}

	return days_out
}

func FacultySchedule(db *qbs.Qbs, faculty_id int64, year int) []json_models.Schedule {
	groups := FacultyGroupsList(db, faculty_id, year)
	groupsInterface := make([]interface{}, len(groups))
	for i, v := range groups {
		groupsInterface[i] = v.Id
	}
	var schedule []*models.Schedule
	condition := qbs.NewInCondition("group_id", groupsInterface)
	err := db.Condition(condition).FindAll(&schedule)
	if err != nil {
		panic(err)
	}
	var schedule_json []json_models.Schedule
	for _, i := range schedule {
		schedule_json = append(schedule_json, json_models.Schedule{
			fmt.Sprintf("%v", i.GroupId) + "_" + fmt.Sprintf("%v", i.DayId) + "_" + fmt.Sprintf("%v", i.PairId),
			i.PairType,
			GroupPairString(db, i)})
	}

	return schedule_json
}

func FacultyTasks(db *qbs.Qbs, faculty_id int64, year int) []json_models.Task {
	groups := FacultyGroupsList(db, faculty_id, year)
	groupsInterface := make([]interface{}, len(groups))
	for i, v := range groups {
		groupsInterface[i] = v.Id
	}
	var tasks []*models.Tasks
	condition := qbs.NewInCondition("group_id", groupsInterface)
	err := db.Condition(condition).FindAll(&tasks)
	if err != nil {
		panic(err)
	}
	var tasks_json []json_models.Task
	for _, i := range tasks {
		tasks_json = append(tasks_json, json_models.Task{
			fmt.Sprintf("%v", i.Id),
			i.Subject.Subject,
			"info",
			"89"})
	}

	return tasks_json
}

func CategoryItems(db *qbs.Qbs, category string) json_models.DBItems {
	var items json_models.DBItems
	loadItems := func(i interface{}) interface{} {
		err := db.FindAll(i)
		if err != nil {
			panic(err)
		}
		return i
	}
	switch category {
	case "faculties":
		var item []*models.Faculties
		items.Items = loadItems(&item)
	case "audiences":
		var item []*models.Audiences
		items.Items = loadItems(&item)
	case "teachers":
		var item []*models.Teachers
		items.Items = loadItems(&item)
	case "subjects":
		var item []*models.Subjects
		items.Items = loadItems(&item)
	case "groups":
		var item []*models.Groups
		items.Items = loadItems(&item)
	case "housings":
		var item []*models.Housings
		items.Items = loadItems(&item)
	case "departments":
		var item []*models.Departments
		items.Items = loadItems(&item)
	}
	items.Type = category
	return items
}
