package database

import (
	"github.com/jinzhu/gorm"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

func FacultyGroupsList(db *gorm.DB, faculty_id int64, year int) ([]*models.Groups, error) {
	var groups []*models.Groups
	err := db.Where(&models.Groups{FacultyId: 1, Year: 5}).Find(&groups).Error
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
