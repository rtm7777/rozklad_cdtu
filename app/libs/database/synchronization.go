package database

import (
	"github.com/jinzhu/gorm"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

var SynchronizationTypes = map[string]func(db *gorm.DB) interface{}{
	"groups": func(db *gorm.DB) interface{} {
		var groups []*json_models.GroupsSync
		db.Model(&models.Groups{}).Select("id, faculty_id, name").Scan(&groups)
		return groups
	},
	"subjects": func(db *gorm.DB) interface{} {
		var subjects []*models.Subjects
		db.Find(&subjects)
		return subjects
	},
	"teachers": func(db *gorm.DB) interface{} {
		var teachers []*json_models.TeachersSync
		db.Model(&models.Teachers{}).Select("id, faculty_id, first_name, last_name, middle_name").Scan(&teachers)
		return teachers
	},
	"audiences": func(db *gorm.DB) interface{} {
		var audiences []*json_models.AudiencesSync
		db.Model(&models.Audiences{}).Select("id, housing_id, number, type").Scan(&audiences)
		return audiences
	},
	"housings": func(db *gorm.DB) interface{} {
		var housings []*models.Housings
		db.Find(&housings)
		return housings
	},
}
