package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs"
	"rozklad_cdtu/app/models"
	"strings"
)

type Application struct {
	GormController
}

func (c Application) Index() revel.Result {
	type Days struct {
		Id  int64  `qbs:"pk"`
		Day string `qbs:"size:65536"`
	}
	day := new(Days)
	day.Id = 1
	e := c.DB.First(&day).Error
	if e != nil {
		panic(e)
	}
	var days []*Days
	err := c.DB.Find(&days).Error
	if err != nil {
		panic(err)
	}

	return c.Render(day, days)
}

func (c Application) Main() revel.Result {
	var department models.Departments
	var faculty models.Faculties

	c.DB.First(&department)
	c.DB.Model(&department).Related(&faculty, "FacultyId")
	department.SetFaculty(faculty)

	fmt.Println(department.Faculty)
	fmt.Println(faculty)

	return c.RenderJson(department)
}

func (c Application) Gmaps() revel.Result {
	return c.Render()
}

func (c Application) About() revel.Result {
	return c.Render()
}

func (c Application) Group() revel.Result {
	faculties, groups, years := db_lib.GroupsData(c.DB)
	days, pairs := db_lib.DaysPairsData(c.DB)
	return c.Render(faculties, groups, years, days, pairs)
}

func (c Application) GroupCurrent(groupName string) revel.Result {
	group := new(models.Groups)
	err := c.DB.Where("short_name = ?", groupName).First(&group)

	if err != nil {
		return c.Redirect(Application.Group)
	} else {
		faculties, groups, years := db_lib.GroupsData(c.DB)
		days, pairs := db_lib.DaysPairsData(c.DB)
		days_out := db_lib.GroupSchedule(c.DB, group.Id, days, pairs)

		return c.Render(faculties, groups, years, days, pairs, group, days_out)
	}
}

func (c Application) Teacher() revel.Result {
	faculties, departments, teachers := db_lib.TeachersData(c.DB)
	days, pairs := db_lib.DaysPairsData(c.DB)
	return c.Render(faculties, departments, teachers, days, pairs)
}

func (c Application) TeacherCurrent(teacherName string) revel.Result {
	teacher := new(models.Teachers)
	parsedTeacherName := strings.Split(teacherName, "_")
	err := c.DB.Where(&models.Teachers{FirstName: parsedTeacherName[0], LastName: parsedTeacherName[1], MiddleName: parsedTeacherName[2]}).First(&teacher).Error
	if err != nil {
		return c.Redirect(Application.Teacher)
	} else {
		faculties, departments, teachers := db_lib.TeachersData(c.DB)
		days, pairs := db_lib.DaysPairsData(c.DB)
		days_out := db_lib.TeacherSchedule(c.DB, teacher.Id, days, pairs)

		return c.Render(faculties, departments, teachers, days, pairs, teacher, days_out)
	}
}
