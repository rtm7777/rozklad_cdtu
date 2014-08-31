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

func (c Api) GetFacultyGroups(faculty_id int, year int) revel.Result {
	db := qbsDB.DB
	groups := db_lib.FacultyGroupsList(db, faculty_id, year)

	return c.RenderJson(groups)
}
