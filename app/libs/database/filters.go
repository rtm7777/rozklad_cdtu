package database

import (
	_ "fmt"
	"github.com/jinzhu/gorm"
	"github.com/revel/revel"
	"rozklad_cdtu/app/models"
	"rozklad_cdtu/app/models/json_models"
	"strconv"
)

var filterFuncs = map[string]interface{}{
	"faculties": func(db *gorm.DB, rows *[]string) *[]string {
		db.Model(&models.Faculties{}).Pluck("short_name", rows)
		return rows
	},
	"departments": func(db *gorm.DB, rows *[]string) *[]string {
		db.Model(&models.Departments{}).Pluck("name", rows)
		return rows
	},
	"housings": func(db *gorm.DB, rows *[]string) *[]string {
		db.Model(&models.Housings{}).Pluck("number", rows)
		return rows
	},
	"year": func(db *gorm.DB, rows *[]string) *[]string {
		for i := 1; i < 6; i++ {
			*rows = append(*rows, strconv.Itoa(i))
		}
		return rows
	},
}

func CategoryFilters(db *gorm.DB, filters []string, locale string) []json_models.Filter {
	var result []json_models.Filter

	filterValues := func(filter string) []string {
		var rows []string
		filterFunction := filterFuncs[filter].(func(*gorm.DB, *[]string) *[]string)
		filterFunction(db, &rows)
		return rows
	}

	for _, filter := range filters {
		result = append(result, json_models.Filter{
			revel.Message(locale, filter+"_filter"),
			filterValues(filter),
		})
	}
	return result
}
