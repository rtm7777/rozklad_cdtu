package models

import (
	"errors"
)

var itemIdErr error = errors.New("item id can't be less than 1")

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
	Day string `sql:"size:10" json:"day"`
}

type Pairs struct {
	Id     int64  `json:"id"`
	Number string `sql:"size:10" json:"number"`
}
