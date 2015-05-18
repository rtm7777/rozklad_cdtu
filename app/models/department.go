package models

import (
	"encoding/json"
)

type Departments struct {
	Id        int64     `json:"id"`
	FacultyId int64     `json:"facultyId"`
	Faculty   Faculties `json:"-"`
	Name      string    `sql:"size:100" json:"name"`
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

func (department *Departments) Data() interface{} {
	return *department
}
