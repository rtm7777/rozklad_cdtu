package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Api struct {
	Admin
}

func (c Api) GetFaculties() revel.Result {
	faculties := database.FacultiesList(c.DB)
	return c.RenderJson(faculties)
}

func (c Api) GetFacultyGroups(faculty_id int64, year int) revel.Result {
	groups := database.FacultyGroupsList(c.DB, faculty_id, year)
	return c.RenderJson(groups)
}

func (c Api) GetFacultySchedule(faculty_id int64, year int) revel.Result {
	schedule := database.FacultySchedule(c.DB, faculty_id, year)
	return c.RenderJson(schedule)
}

func (c Api) GetFacultyTasks(faculty_id int64, year int) revel.Result {
	tasks := database.FacultyTasks(c.DB, faculty_id, year)
	return c.RenderJson(tasks)
}

func (c Api) GetCategoryItems(category string) revel.Result {
	items := database.CategoryItems(c.DB, category)
	return c.RenderJson(items)
}
