package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
	"strings"
	"time"
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

func (c Api) GetCategoryList() revel.Result {
	categories := [7]string{"faculties", "departments", "groups", "housings", "audiences", "teachers", "subjects"}
	type Categories struct {
		Category string `json:"category"`
		Name     string `json:"name"`
	}
	var categoriesList []Categories

	for _, category := range categories {
		categoriesList = append(categoriesList, Categories{Category: category, Name: c.Message(category)})
	}

	return c.RenderJson(categoriesList)
}

func (c Api) GetCategoryItems(category string) revel.Result {
	items := database.CategoryItems(c.DB, category)
	items.Columns = strings.Split(c.Message(category+"_columns"), ",")
	time.Sleep(2000 * time.Millisecond)
	return c.RenderJson(items)
}
