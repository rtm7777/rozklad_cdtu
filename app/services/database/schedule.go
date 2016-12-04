package database

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/models/json_models"
)

func FacultyGroupsList(db *gorm.DB, faculty_id int64, year int) ([]*models.Groups, error) {
	var groups []*models.Groups
	err := db.Where(&models.Groups{FacultyId: faculty_id, Year: year}).Find(&groups).Error
	if err != nil {
		return nil, err
	}
	return groups, nil
}

func FacultiesList(db *gorm.DB) (*json_models.FacultiesYears, error) {
	var result json_models.FacultiesYears

	err := db.Model(&models.Faculties{}).Select("id as faculty_id, short_name as faculty_name").Scan(&result.Faculties).Error

	if err != nil {
		return nil, err
	}

	result.YearsCount = models.YearsCount

	return &result, nil
}

func FacultySchedule(db *gorm.DB, faculty_id int64, year int) ([]json_models.GroupSchedule, error) {
	var schedule []*models.Schedule
	schedule_json := make([]json_models.GroupSchedule, 0)

	groups, err := FacultyGroupsList(db, faculty_id, year)
	if err != nil {
		return nil, err
	}

	for _, group := range groups {
		err := db.Where("group_id = ?", group.Id).Find(&schedule).Error
		if err != nil {
			return nil, err
		}
		schedule_json = append(schedule_json, json_models.GroupSchedule{
			group.Id,
			schedule,
		})
	}

	return schedule_json, nil
}

func FacultyTasks(db *gorm.DB, faculty_id int64, year int) []json_models.Task {
	var tasks []*models.Tasks
	tasks_json := make([]json_models.Task, 0)
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
