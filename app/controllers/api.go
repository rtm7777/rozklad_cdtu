package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/custom_responses"
	"rozklad_cdtu/app/models/custom_structs"
	"strings"
)

type Api struct {
	Admin
}

var DBFilters = map[string][]string{
	"audiences":   []string{"housings"},
	"departments": []string{"faculties"},
	"faculties":   []string{},
	"groups":      []string{"faculties", "year"},
	"housings":    []string{},
	"subjects":    []string{},
	"teachers":    []string{"faculties", "departments"},
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
	locale := c.Request.Locale
	items := database.CategoryItems(c.DB, category)
	items.Columns = strings.Split(c.Message(category+"_columns"), ",")

	filters, ok := DBFilters[category]
	if !ok {
		c.Response.Status = 404
		return c.RenderJson("category filter not found")
	}

	if len(filters) > 0 {
		items.Filters = database.CategoryFilters(c.DB, filters, locale)
	}

	return c.RenderJson(items)
}

func (c Api) UpdateItem() revel.Result {
	fmt.Println("updating item")

	var data custom_structs.ItemsData
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return custom_responses.JsonErrorResult{
			StatusCode:   400,
			ErrorMessage: err.Error(),
		}
	} else {
		status, err := database.UpdateItem(c.DB, data)
		if err != nil {
			return custom_responses.JsonErrorResult{
				StatusCode:   400,
				ErrorMessage: err.Error(),
			}
		} else {
			fmt.Println(status)
			return custom_responses.EmptyResult{
				StatusCode: 200,
			}
		}
	}
}
