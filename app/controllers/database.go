package controllers

import (
	"encoding/json"
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models/custom_responses"
	"github.com/rtm7777/rozklad_cdtu/app/models/custom_structs"
	"github.com/rtm7777/rozklad_cdtu/app/services/database"
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
	"audiences":   []string{"number", "housing", "audienceType", "sets", "internet", "projector", "boardType", "note"},
	"departments": []string{"faculty", "departmentName", "departmentShortName"},
	"faculties":   []string{"facultyName", "facultyShortName"},
	"groups":      []string{"faculty", "groupName", "studentsCount", "groupYear"},
	"housings":    []string{"housingNumber", "address"},
	"subjects":    []string{"subject"},
	"teachers":    []string{"faculty", "department", "name", "rank", "degree"},
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

	return c.RenderJSON(categoriesList)
}

func (c DataBase) GetCategoryItems(category string) revel.Result {
	locale := c.Request.Locale
	items := database.CategoryItems(c.Txn, category)

	filters, ok := DBFilters[category]
	if !ok {
		c.Response.Status = 404
		return c.RenderJSON("category filter not found")
	}
	items.Columns = DBColumns[category]

	if len(filters) > 0 {
		items.Filters = database.CategoryFilters(c.Txn, filters, locale)
	}

	return c.RenderJSON(items)
}

func (c DataBase) UpdateItem() revel.Result {
	var data custom_structs.ItemsData

	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return jsonError(400, err)
	} else {
		err := database.UpdateItem(c.Txn, data)
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
	err, item := database.AddItem(c.Txn, category)
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJSON(item)
	}
}

func (c DataBase) DeleteItems() revel.Result {
	var data custom_structs.ItemsForDeleting

	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		return jsonError(400, err)
	} else {
		database.DeleteItems(c.Txn, data)
		return c.RenderJSON(data)
	}
}
