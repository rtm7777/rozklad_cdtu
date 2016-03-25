package models

import (
	"errors"
)

var itemIdErr error = errors.New("item id can't be less than 1")

const YearsCount = 6

var DaysList = []Days{
	{1, "monday"},
	{2, "tuesday"},
	{3, "wednesday"},
	{4, "thursday"},
	{5, "friday"},
	{6, "saturday"},
}

var PairsList = []Pairs{
	{1, "I"},
	{2, "II"},
	{3, "III"},
	{4, "IV"},
	{5, "V"},
	{6, "VI"},
	{7, "VII"},
	// {8, "VIII"},
}

type DBModel interface {
	Decode(b []byte) error
	Value() interface{}
}

type DBModelCollection interface{}

func DBTypesMap() map[string]DBModel {
	return map[string]DBModel{
		"audiences":   new(Audiences),
		"departments": new(Departments),
		"faculties":   new(Faculties),
		"groups":      new(Groups),
		"housings":    new(Housings),
		"subjects":    new(Subjects),
		"teachers":    new(Teachers),
	}
}

func DBTypesCollectionMap() map[string]DBModelCollection {
	return map[string]DBModelCollection{
		"audiences":   &[]Audiences{},
		"departments": &[]Departments{},
		"faculties":   &[]Faculties{},
		"groups":      &[]Groups{},
		"housings":    &[]Housings{},
		"subjects":    &[]Subjects{},
		"teachers":    &[]Teachers{},
	}
}

type Days struct {
	Id  int64  `json:"id"`
	Day string `json:"day"`
}

type Pairs struct {
	Id     int64  `json:"id"`
	Number string `json:"number"`
}
