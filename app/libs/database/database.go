package database

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

func DaysPairsData(db *gorm.DB) ([]*models.Days, []*models.Pairs) {
	var days []*models.Days
	err := db.Find(&days).Error
	if err != nil {
		panic(err)
	}
	var pairs []*models.Pairs
	err = db.Find(&pairs).Error
	if err != nil {
		panic(err)
	}
	return days, pairs
}

func GroupsData(db *gorm.DB) ([]*models.Faculties, []*models.Groups, []int) {
	years := make([]int, 6)
	for i := 0; i < 6; i++ {
		years[i] = i + 1
	}

	var faculties []*models.Faculties
	err := db.Find(&faculties).Error
	if err != nil {
		panic(err)
	}
	var groups []*models.Groups
	err = db.Find(&groups).Error
	if err != nil {
		panic(err)
	}
	return faculties, groups, years
}

func TeachersData(db *gorm.DB) ([]*models.Faculties, []*models.Departments, []*models.Teachers) {
	var faculties []*models.Faculties
	err := db.Find(&faculties).Error
	if err != nil {
		panic(err)
	}
	var departments []*models.Departments
	err = db.Find(&departments).Error
	if err != nil {
		panic(err)
	}
	var teachers []*models.Teachers
	err = db.Order("last_name").Find(&teachers).Error
	if err != nil {
		panic(err)
	}
	return faculties, departments, teachers
}

func FacultyGroupsList(db *gorm.DB, faculty_id int64, year int) []*models.Groups {
	var groups []*models.Groups
	err := db.Where(&models.Groups{FacultyId: faculty_id, Year: year}).Find(&groups).Error
	if err != nil {
		panic(err)
	}
	return groups
}

func FacultyGroupsIds(db *gorm.DB, faculty_id int64, year int) []int64 {
	var groups []int64
	err := db.Model(&models.Groups{}).Where(&models.Groups{FacultyId: faculty_id, Year: year}).Pluck("id", &groups).Error
	if err != nil {
		panic(err)
	}
	return groups
}

func FacultiesList(db *gorm.DB) []*models.Faculties {
	var faculties []*models.Faculties
	err := db.Find(&faculties).Error
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

func GroupPairString(db *gorm.DB, subject *models.Schedule) string {
	subject = subject.LoadRelated(db)
	return subject.Subject.Subject + " - " +
		subject.SubjectType + " " +
		subject.Audience.Number + "-" +
		subject.Audience.Housing.Number + " " +
		subject.Teacher.Rank + " - " +
		subject.Teacher.LastName + " " +
		subject.Teacher.FirstName + " " +
		subject.Teacher.MiddleName
}

func TeacherPairString(db *gorm.DB, subject *models.Schedule) string {
	subject = subject.LoadRelatedTeacher(db)
	return subject.Subject.Subject + " - " +
		subject.SubjectType + " " +
		subject.Audience.Number + "-" +
		subject.Audience.Housing.Number + " " +
		subject.Group.ShortName + " - " +
		fmt.Sprintf("%v", subject.Group.Year) + " курс"
}

func GroupSchedule(db *gorm.DB, group_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	days_out := EmptySchedule(days, pairs)

	err := db.Find(&schedule, "group_id = ?", group_id).Error
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

func TeacherSchedule(db *gorm.DB, teacher_id int64, days []*models.Days, pairs []*models.Pairs) []json_models.Day {
	var schedule []*models.Schedule
	days_out := EmptySchedule(days, pairs)

	err := db.Find(&schedule, "teacher_id = ?", teacher_id).Error
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

func FacultySchedule(db *gorm.DB, faculty_id int64, year int) []json_models.Schedule {
	var schedule []*models.Schedule
	var schedule_json []json_models.Schedule
	groups := FacultyGroupsIds(db, faculty_id, year)

	err := db.Where("group_id in (?)", groups).Find(&schedule).Error
	if err != nil {
		panic(err)
	}

	for _, i := range schedule {
		schedule_json = append(schedule_json, json_models.Schedule{
			fmt.Sprintf("%v", i.GroupId) + "_" + fmt.Sprintf("%v", i.DayId) + "_" + fmt.Sprintf("%v", i.PairId),
			i.PairType,
			GroupPairString(db, i)})
	}

	return schedule_json
}

func FacultyTasks(db *gorm.DB, faculty_id int64, year int) []json_models.Task {
	var tasks []*models.Tasks
	var tasks_json []json_models.Task
	groups := FacultyGroupsIds(db, faculty_id, year)

	err := db.Where("group_id in (?)", groups).Find(&tasks).Error
	if err != nil {
		panic(err)
	}

	for _, i := range tasks {
		i.LoadRelated(db)
		tasks_json = append(tasks_json, json_models.Task{
			fmt.Sprintf("%v", i.Id),
			i.Subject.Subject,
			"info",
			"89"})
	}

	return tasks_json
}

func CategoryItems(db *gorm.DB, category string) json_models.DBItems {
	var items json_models.DBItems
	loadItems := func(i interface{}) {
		err := db.Find(i).Error
		if err != nil {
			panic(err)
		}
		items.Items = i
	}
	switch category {
	case "faculties":
		var item []*models.Faculties
		loadItems(&item)
	case "audiences":
		var item []*models.Audiences
		loadItems(&item)
	case "teachers":
		var item []*models.Teachers
		loadItems(&item)
	case "subjects":
		var item []*models.Subjects
		loadItems(&item)
	case "groups":
		var item []*models.Groups
		loadItems(&item)
	case "housings":
		var item []*models.Housings
		loadItems(&item)
	case "departments":
		var item []*models.Departments
		loadItems(&item)
	}

	return items
}
