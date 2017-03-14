package database

import (
	_ "fmt"
	"github.com/jinzhu/gorm"
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/models/json_models"
	"strconv"
)

var filterFuncs = map[string]func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue{
	"faculties": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Faculties{}).Select("id, short_name as value").Scan(rows)
		return rows
	},
	"departments": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Departments{}).Select("id, short_name as value").Scan(rows)
		return rows
	},
	"housings": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		db.Model(&models.Housings{}).Select("id, number as value").Scan(rows)
		return rows
	},
	"year": func(db *gorm.DB, rows *[]json_models.FilterValue) *[]json_models.FilterValue {
		for i := 1; i < models.YearsCount+1; i++ {
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
		filterFuncs[filter](db, &rows)
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
