package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs"
)

type Api struct {
	Admin
}

func (c Api) GetFaculties() revel.Result {
	faculties := db_lib.FacultiesList(c.DB)
	return c.RenderJson(faculties)
}

func (c Api) GetFacultyGroups(faculty_id int64, year int) revel.Result {
	groups := db_lib.FacultyGroupsList(c.DB, faculty_id, year)
	return c.RenderJson(groups)
}

func (c Api) GetFacultySchedule(faculty_id int64, year int) revel.Result {
	schedule := db_lib.FacultySchedule(c.DB, faculty_id, year)
	return c.RenderJson(schedule)
}

func (c Api) GetFacultyTasks(faculty_id int64, year int) revel.Result {
	tasks := db_lib.FacultyTasks(c.DB, faculty_id, year)
	return c.RenderJson(tasks)
}

func (c Api) GetCategoryItems(category string) revel.Result {
	items := db_lib.CategoryItems(c.DB, category)
	return c.RenderJson(items)
}
