package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Tasks struct {
	Admin
}

func (c Tasks) GetFacultyDepartmentsList() revel.Result {
	err, item := database.AddItem(c.DB, "faculty")
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJson(item)
	}
}
