package models

import (
	"encoding/json"
)

type Groups struct {
	Id            int64     `json:"id"`
	FacultyId     int64     `json:"facultyId"`
	Faculty       Faculties `json:"faculty"`
	Name          string    `sql:"size:100" json:"name"`
	NumOfStudents int       `json:"studentsCount"`
	Year          int       `json:"year"`
}

func (group *Groups) Decode(b []byte) error {
	err := json.Unmarshal(b, group)
	if err != nil {
		return err
	}
	if group.Id <= 0 {
		return itemIdErr
	}
	return nil
}
