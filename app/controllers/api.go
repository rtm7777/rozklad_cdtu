package controllers

import (
	_ "github.com/coocood/qbs"
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs"
	"rozklad_cdtu/app/qbsDB"
)

type Api struct {
	Admin
}

func (c Api) GetFaculties() revel.Result {
	db := qbsDB.DB
	faculties := db_lib.FacultiesList(db)

	return c.RenderJson(faculties)
}

func (c Api) GetFacultyGroups(faculty_id int64, year int) revel.Result {
	db := qbsDB.DB
	groups := db_lib.FacultyGroupsList(db, faculty_id, year)

	return c.RenderJson(groups)
}

func (c Api) GetFacultySchedule(faculty_id int64, year int) revel.Result {
	db := qbsDB.DB
	schedule := db_lib.FacultySchedule(db, faculty_id, year)

	return c.RenderJson(schedule)
}

func (c Api) GetFacultyTasks(faculty_id int64, year int) revel.Result {
	db := qbsDB.DB
	tasks := db_lib.FacultyTasks(db, faculty_id, year)

	return c.RenderJson(tasks)
}

func (c Api) GetCategoryItems(category string) revel.Result {
	// db := qbsDB.DB
	items := []string{"Sgsdg", "sdgsdg"}

	return c.RenderJson(items)
}
