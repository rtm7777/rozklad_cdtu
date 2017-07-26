package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/services/database"
	"github.com/revel/modules/gorm/app"
	"strings"
)

type Application struct {
	*revel.Controller
	gorm.GormController
}

func (c Application) Main() revel.Result {
	return c.Render()
}

func (c Application) Gmaps() revel.Result {
	return c.Render()
}

func (c Application) About() revel.Result {
	return c.Render()
}

func (c Application) Group() revel.Result {
	faculties, groups, years := database.GroupsData(c.Txn)
	days, pairs := models.DaysList, models.PairsList
	return c.Render(faculties, groups, years, days, pairs)
}

func (c Application) GroupCurrent(groupName string) revel.Result {
	group := models.Groups{}
	err := c.Txn.Where("name = ?", groupName).First(&group).Error

	if err != nil {
		return c.Redirect(Application.Group)
	} else {
		faculties, groups, years := database.GroupsData(c.Txn)
		days, pairs := models.DaysList, models.PairsList
		days_out := database.GroupSchedule(c.Txn, group.Id, days, pairs)

		return c.Render(faculties, groups, years, days, pairs, group, days_out)
	}
}

func (c Application) Teacher() revel.Result {
	faculties, departments, teachers := database.TeachersData(c.Txn)
	days, pairs := models.DaysList, models.PairsList
	return c.Render(faculties, departments, teachers, days, pairs)
}

func (c Application) TeacherCurrent(teacherName string) revel.Result {
	teacher := models.Teachers{}
	parsedTeacherName := strings.Split(teacherName, "_")
	err := c.Txn.Where(&models.Teachers{FirstName: parsedTeacherName[1], LastName: parsedTeacherName[0], MiddleName: parsedTeacherName[2]}).First(&teacher).Error
	if err != nil {
		fmt.Println(err)
		return c.Redirect(Application.Teacher)
	} else {
		faculties, departments, teachers := database.TeachersData(c.Txn)
		days, pairs := models.DaysList, models.PairsList
		days_out := database.TeacherSchedule(c.Txn, teacher.Id, days, pairs)

		return c.Render(faculties, departments, teachers, days, pairs, teacher, days_out)
	}
}
