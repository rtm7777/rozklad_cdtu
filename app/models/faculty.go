package models

import (
	"encoding/json"
)

type Faculties struct {
	Id        int64  `json:"id"`
	FullName  string `sql:"size:100;unique" json:"fullName"`
	ShortName string `sql:"size:50;unique" json:"shortName"`
}

func (faculty *Faculties) Decode(b []byte) error {
	err := json.Unmarshal(b, faculty)
	if err != nil {
		return err
	}
	if faculty.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (faculty *Faculties) Value() interface{} {
	return *faculty
}
