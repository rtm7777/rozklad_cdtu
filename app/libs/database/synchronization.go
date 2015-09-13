package database

import (
	"github.com/jinzhu/gorm"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

func GroupsSync(db *gorm.DB) []*json_models.GroupsSync {
	var groups []*json_models.GroupsSync

	db.Model(&models.Groups{}).Select("id, faculty_id, name").Scan(&groups)

	return groups
}
