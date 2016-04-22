package controllers

import (
	"encoding/json"
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/libs/database"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/models/custom_responses"
	"github.com/rtm7777/rozklad_cdtu/app/models/json_models"
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

func (c Tasks) UpdateTask() revel.Result {
	var data models.Tasks
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return jsonError(400, err)
	} else {
		err := database.UpdateTask(c.DB, data)
		if err != nil {
			return jsonError(400, err)
		} else {
			return custom_responses.EmptyResult{
				StatusCode: 200,
			}
		}
	}
}

func (c Tasks) AddTask(department int64) revel.Result {
	err, item := database.AddTask(c.DB, department)
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJson(item)
	}
}

func (c Tasks) DeleteTasks() revel.Result {
	var data struct {
		Ids []int64 `json:"ids"`
	}

	err := json.NewDecoder(c.Request.Body).Decode(&data)
	revel.INFO.Println(data)
	if err != nil {
		return jsonError(400, err)
	} else {
		database.DeleteTasks(c.DB, data.Ids)
		return c.RenderJson(data)
	}
}
