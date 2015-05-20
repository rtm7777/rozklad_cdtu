package models

import (
	"errors"
)

type DBModel interface {
	Decode(b []byte) error
	Value() interface{}
}

type DBModelCollection interface{}

var DatabaseTypes = map[string]func() DBModel{
	"audiences":   func() DBModel { return new(Audiences) },
	"departments": func() DBModel { return new(Departments) },
	"faculties":   func() DBModel { return new(Faculties) },
	"groups":      func() DBModel { return new(Groups) },
	"housings":    func() DBModel { return new(Housings) },
	"subjects":    func() DBModel { return new(Subjects) },
	"teachers":    func() DBModel { return new(Teachers) },
}

var DatabaseTypesCollection = map[string]func() DBModelCollection{
	"audiences":   func() DBModelCollection { return &[]Audiences{} },
	"departments": func() DBModelCollection { return &[]Departments{} },
	"faculties":   func() DBModelCollection { return &[]Faculties{} },
	"groups":      func() DBModelCollection { return &[]Groups{} },
	"housings":    func() DBModelCollection { return &[]Housings{} },
	"subjects":    func() DBModelCollection { return &[]Subjects{} },
	"teachers":    func() DBModelCollection { return &[]Teachers{} },
}

var itemIdErr error = errors.New("item id can't be less than 1")

type Days struct {
	Id  int64  `json:"id"`
	Day string `sql:"size:10" json:"day"`
}

type Pairs struct {
	Id     int64  `json:"id"`
	Number string `sql:"size:10" json:"number"`
}
