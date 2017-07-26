package controllers

import (
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/services/database"
)

type Schedule struct {
	Admin
}

func (c Schedule) GetFaculties() revel.Result {
	faculties, err := database.FacultiesList(c.Txn)
	if err != nil {
		return jsonError(400, err)
	}
	return c.RenderJSON(faculties)
}

func (c Schedule) GetDaysPairsList() revel.Result {
	var list struct {
		Days  *[]models.Days  `json:"days"`
		Pairs *[]models.Pairs `json:"pairs"`
	}
	list.Days = &models.DaysList
	list.Pairs = &models.PairsList

	return c.RenderJSON(list)
}

func (c Schedule) GetFacultyGroups(facultyId int64, year int) revel.Result {
	groups, err := database.FacultyGroupsList(c.Txn, facultyId, year)
	if err != nil {
		return jsonError(400, err)
	}
	return c.RenderJSON(groups)
}

func (c Schedule) GetFacultySchedule(facultyId int64, year int) revel.Result {
	schedule, err := database.FacultySchedule(c.Txn, facultyId, year)
	if err != nil {
		return jsonError(400, err)
	}
	return c.RenderJSON(schedule)
}

func (c Schedule) GetFacultyTasks(facultyId int64, year int) revel.Result {
	tasks := database.FacultyTasks(c.Txn, facultyId, year)
	return c.RenderJSON(tasks)
}
