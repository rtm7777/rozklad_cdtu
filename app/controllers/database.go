package controllers

import (
	"encoding/json"
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
	"rozklad_cdtu/app/models/custom_responses"
	"rozklad_cdtu/app/models/custom_structs"
)

type DataBase struct {
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

var DBColumns = map[string][]string{
	"audiences":   []string{"number", "housing", "audienceType", "sets", "note"},
	"departments": []string{"faculty", "departmentName"},
	"faculties":   []string{"facultyName", "facultyShortName"},
	"groups":      []string{"faculty", "groupName", "studentsCount", "groupYear"},
	"housings":    []string{"housingNumber"},
	"subjects":    []string{"subject"},
	"teachers":    []string{"faculty", "department", "name", "rank"},
}

func (c DataBase) GetCategoryList() revel.Result {
	categories := [7]string{"faculties", "departments", "groups", "housings", "audiences", "teachers", "subjects"}
	type Categories struct {
		OptionValue string `json:"optionValue"`
		Name        string `json:"name"`
	}
	var categoriesList []Categories

	for _, category := range categories {
		categoriesList = append(categoriesList, Categories{OptionValue: category, Name: c.Message(category)})
	}

	return c.RenderJson(categoriesList)
}

func (c DataBase) GetCategoryItems(category string) revel.Result {
	locale := c.Request.Locale
	items := database.CategoryItems(c.DB, category)

	filters, ok := DBFilters[category]
	if !ok {
		c.Response.Status = 404
		return c.RenderJson("category filter not found")
	}
	items.Columns = DBColumns[category]

	if len(filters) > 0 {
		items.Filters = database.CategoryFilters(c.DB, filters, locale)
	}

	return c.RenderJson(items)
}

func (c DataBase) UpdateItem() revel.Result {
	var data custom_structs.ItemsData

	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return jsonError(400, err)
	} else {
		err := database.UpdateItem(c.DB, data)
		if err != nil {
			return jsonError(400, err)
		} else {
			return custom_responses.EmptyResult{
				StatusCode: 200,
			}
		}
	}
}

func (c DataBase) AddItem(category string) revel.Result {
	err, item := database.AddItem(c.DB, category)
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJson(item)
	}
}

func (c DataBase) DeleteItems() revel.Result {
	var data custom_structs.ItemsForDeleting

	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return jsonError(400, err)
	} else {
		database.DeleteItems(c.DB, data)
		return c.RenderJson(data)
	}
}
