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
	"faculties": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Faculties{}).Select("id, short_name as value").Scan(rows)
		return rows
	},
	"departments": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Departments{}).Select("id, name as value").Scan(rows)
		return rows
	},
	"housings": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Housings{}).Select("id, number as value").Scan(rows)
		return rows
	},
	"year": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		for i := 1; i < 7; i++ {
			*rows = append(*rows, json_models.FilterValue{Id: int64(i), Value: strconv.Itoa(i)})
		}
		return rows
	},
}

func CategoryFilters(db *gorm.DB, filters []string, locale string) []json_models.Filter {
	var result []json_models.Filter

	filterValues := func(filter string) []json_models.FilterValue {
		var rows []json_models.FilterValue
		rows = append(rows, json_models.FilterValue{Id: 0, Value: "---"})
		filterFunction := filterFuncs[filter].(func(*gorm.DB, *[]json_models.FilterValue) *[]json_models.FilterValue)
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
