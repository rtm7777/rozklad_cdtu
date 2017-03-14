package models

import (
	"encoding/json"
)

type Departments struct {
	Id        int64     `json:"id"`
	FacultyId int64     `json:"facultyId"`
	Faculty   Faculties `json:"-"`
	FullName  string    `sql:"size:100" json:"fullName"`
	ShortName string    `sql:"size:50" json:"shortName"`
}

func (department *Departments) Decode(b []byte) error {
	err := json.Unmarshal(b, department)
	if err != nil {
		return err
	}
	if department.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (department *Departments) Value() interface{} {
	return *department
}
