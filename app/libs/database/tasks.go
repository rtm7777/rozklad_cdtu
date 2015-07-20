package database

import (
	"github.com/jinzhu/gorm"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
)

func FacultiesDepartments(db *gorm.DB) ([]json_models.FacultiesDepartments, error) {
	var result []json_models.FacultiesDepartments

	err := db.Model(&models.Faculties{}).Select("id as faculty_id, short_name as faculty_name").Scan(&result).Error

	if err != nil {
		return nil, err
	}

	for i, faculty := range result {
		var records []models.Departments
		err := db.Preload("Faculty").Where("faculty_id = ?", faculty.FacultyId).Find(&records).Error
		if err != nil {
			return nil, err
		}

		if len(records) != 0 {
			for _, record := range records {
				val := json_models.Department{Id: record.Id, Name: record.Name}
				result[i].Departments = append(result[i].Departments, val)
			}
		} else {
			result[i].Departments = []json_models.Department{}
		}
	}

	return result, nil
}

func DepartmentTasks(db *gorm.DB, departmentId int64) ([]models.Tasks, error) {
	result := make([]models.Tasks, 0)

	err := db.Where("department_id = ?", departmentId).Find(&result).Error

	if err != nil {
		return nil, err
	}

	return result, nil
}
