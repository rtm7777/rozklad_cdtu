package json_models

import (
	"rozklad_cdtu/app/models"
)

type Pair struct {
	Id       int64  `json:"id"`
	Num      string `json:"num"`
	Subject1 string `json:"subject1"`
	Subject2 string `json:"subject2"`
	Type     int    `json:"type"`
}

type Day struct {
	Id   int64  `json:"id"`
	Day  string `json:"day"`
	Pair []Pair `json:"pair"`
}

type Schedule struct {
	Id      string `json:"id"`
	Type    string `json:"type"`
	Subject string `json:"subject"`
}

type Task struct {
	Id       string `json:"id"`
	Subject  string `json:"subject"`
	Type     string `json:"type"`
	Progress string `json:"progress"`
}

type FilterValue struct {
	Id    int64  `json:"id"`
	Value string `json:"value"`
}

type Filter struct {
	Name   string        `json:"name"`
	Values []FilterValue `json:"values"`
}

type DBItems struct {
	Items   interface{} `json:"items"`
	Filters []Filter    `json:"filters"`
	Columns []string    `json:"columns"`
}

type TasksItems struct {
	Items   []models.Tasks `json:"items"`
	Columns []string       `json:"columns"`
}

type Department struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type Faculty struct {
	FacultyId   int64  `json:"id"`
	FacultyName string `json:"name"`
}

type FacultiesDepartments struct {
	Faculty
	Departments []Department `json:"departments,interface"`
}

type FacultiesYears struct {
	Faculties  []Faculty `json:"faculties"`
	YearsCount int       `json:"yearsCount"`
}

type GroupsSync struct {
	Id        int64  `json:"id"`
	FacultyId int64  `json:"facultyId"`
	Name      string `json:"name"`
}

type TeachersSync struct {
	Id         int64  `json:"id"`
	FacultyId  int64  `json:"facultyId"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	MiddleName string `json:"middleName"`
}

type AudiencesSync struct {
	Id        int64  `json:"id"`
	HousingId int64  `json:"housingId"`
	Number    string `json:"number"`
	Type      string `json:"type"`
}
