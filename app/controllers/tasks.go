package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
	"rozklad_cdtu/app/models/json_models"
)

type Tasks struct {
	Admin
}

var TasksColumns = []string{"group", "subject", "teacher", "audience", "time"}

func (c Tasks) GetFacultyDepartmentsList() revel.Result {
	result, err := database.FacultiesDepartments(c.DB)
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJson(result)
	}
}

func (c Tasks) GetTasks(departmentId int64) revel.Result {
	var items json_models.TasksItems

	result, err := database.DepartmentTasks(c.DB, departmentId)
	if err != nil {
		return jsonError(400, err)
	} else {
		items.Items = result
		items.Columns = TasksColumns
		return c.RenderJson(items)
	}
}
