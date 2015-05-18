package models

import (
	"encoding/json"
)

type Teachers struct {
	Id           int64       `json:"id"`
	FacultyId    int64       `json:"facultyId"`
	Faculty      Faculties   `json:"-"`
	DepartmentId int64       `json:"departmentId"`
	Department   Departments `json:"-"`
	FirstName    string      `sql:"size:25" json:"firstName"`
	LastName     string      `sql:"size:25" json:"lastName"`
	MiddleName   string      `sql:"size:30" json:"meddleName"`
	Rank         string      `sql:"size:100" json:"rank"`
}

func (teacher *Teachers) Decode(b []byte) error {
	err := json.Unmarshal(b, teacher)
	if err != nil {
		return err
	}
	if teacher.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (teacher *Teachers) Data() interface{} {
	return *teacher
}
