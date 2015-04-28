package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Schedule struct {
	Admin
}

func (c Schedule) GetFaculties() revel.Result {
	faculties := database.FacultiesList(c.DB)
	return c.RenderJson(faculties)
}

func (c Schedule) GetFacultyGroups(faculty_id int64, year int) revel.Result {
	groups := database.FacultyGroupsList(c.DB, faculty_id, year)
	return c.RenderJson(groups)
}

func (c Schedule) GetFacultySchedule(faculty_id int64, year int) revel.Result {
	schedule := database.FacultySchedule(c.DB, faculty_id, year)
	return c.RenderJson(schedule)
}

func (c Schedule) GetFacultyTasks(faculty_id int64, year int) revel.Result {
	tasks := database.FacultyTasks(c.DB, faculty_id, year)
	return c.RenderJson(tasks)
}
