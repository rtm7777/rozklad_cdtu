package controllers

import (
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models/custom_responses"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/revel/modules/gorm/app"
)

func jsonError(code int, err error) custom_responses.JsonErrorResult {
	return custom_responses.JsonErrorResult{
		StatusCode:   code,
		ErrorMessage: err.Error(),
	}
}

func init() {
	revel.OnAppStart(func() {
		gorm.InitDB()

		gorm.DB.AutoMigrate(&models.Faculties{})
		gorm.DB.AutoMigrate(&models.Departments{})
		gorm.DB.AutoMigrate(&models.Groups{})
		gorm.DB.AutoMigrate(&models.Teachers{})
		gorm.DB.AutoMigrate(&models.Housings{})
		gorm.DB.AutoMigrate(&models.Audiences{})
		gorm.DB.AutoMigrate(&models.Subjects{})
		gorm.DB.AutoMigrate(&models.Schedule{})
		gorm.DB.AutoMigrate(&models.Tasks{})
		gorm.DB.AutoMigrate(&models.Users{})
	})
	revel.InterceptMethod((*gorm.GormController).Begin, revel.BEFORE)
	revel.InterceptMethod(Admin.checkUser, revel.BEFORE)
	revel.InterceptMethod((*gorm.GormController).Commit, revel.AFTER)
	revel.InterceptMethod((*gorm.GormController).Rollback, revel.FINALLY)
}
