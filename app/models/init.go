package models

import (
	"errors"
)

type DBModel interface {
	Decode(b []byte) error
	Data() interface{}
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
