package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/qbsDB"
	"strings"
)

type Application struct {
	*revel.Controller
}

func (c Application) Index() revel.Result {
	db := qbsDB.DB
	type Days struct {
		Id  int64  `qbs:"pk"`
		Day string `qbs:"size:65536"`
	}
	day := new(Days)
	day.Id = 1
	e := db.Find(day)
	if e != nil {
		panic(e)
	}
	var days []*Days
	err := db.FindAll(&days)
	if err != nil {
		panic(err)
	}

	return c.Render(day, days)
}

func (c Application) Main() revel.Result {
	// CreateTables()
	return c.Render()
}

func (c Application) Gmaps() revel.Result {
	return c.Render()
}

func (c Application) About() revel.Result {
	return c.Render()
}

func (c Application) Group() revel.Result {
	db := qbsDB.DB
	faculties, groups, years := db_lib.GroupsData(db)
	days, pairs := db_lib.DaysPairsData(db)
	return c.Render(faculties, groups, years, days, pairs)
}

func (c Application) GroupCurrent(groupName string) revel.Result {
	db := qbsDB.DB
	group := new(models.Groups)
	err := db.WhereEqual("groups.short_name", groupName).Find(group)

	if err != nil {
		return c.Redirect(Application.Group)
	} else {
		faculties, groups, years := db_lib.GroupsData(db)
		days, pairs := db_lib.DaysPairsData(db)
		days_out := db_lib.GroupSchedule(db, group.Id, days, pairs)

		return c.Render(faculties, groups, years, days, pairs, group, days_out)
	}

}

func (c Application) Teacher() revel.Result {
	db := qbsDB.DB
	faculties, departments, teachers := db_lib.TeachersData(db)
	days, pairs := db_lib.DaysPairsData(db)
	return c.Render(faculties, departments, teachers, days, pairs)
}

func (c Application) TeacherCurrent(teacherName string) revel.Result {
	db := qbsDB.DB
	teacher := new(models.Teachers)
	parsedTeacherName := strings.Split(teacherName, "_")
	err := db.WhereEqual("first_name", parsedTeacherName[0]).WhereEqual("last_name", parsedTeacherName[1]).WhereEqual("middle_name", parsedTeacherName[2]).Find(teacher)
	if err != nil {
		return c.Redirect(Application.Teacher)
	} else {
		faculties, departments, teachers := db_lib.TeachersData(db)
		days, pairs := db_lib.DaysPairsData(db)
		days_out := db_lib.TeacherSchedule(db, teacher.Id, days, pairs)

		return c.Render(faculties, departments, teachers, days, pairs, teacher, days_out)
	}
}
