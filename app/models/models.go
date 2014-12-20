package models

import (
	_ "github.com/coocood/qbs"
)

type Lalala struct { // example user fields
	Id       int64
	Name     string
	Password string `sql:"-"`
}

type Faculties struct {
	Id        int64  `qbs:"pk" json:"id"`
	FullName  string `qbs:"size:100" json:"fullName"`
	ShortName string `qbs:"size:50" json:"shortName"`
}

type Departments struct {
	Id        int64      `qbs:"pk" json:"id"`
	FacultyId int64      `qbs:"fk:Faculty" json:"facultyId"`
	Faculty   *Faculties `json:"faculty"`
	Name      string     `qbs:"size:100" json:"name"`
}

type Groups struct {
	Id            int64      `qbs:"pk" json:"id"`
	FacultyId     int64      `qbs:"fk:Faculty" json:"facultyId"`
	Faculty       *Faculties `json:"faculty"`
	FullName      string     `qbs:"size:100" json:"fullName"`
	ShortName     string     `qbs:"size:20" json:"shortName"`
	NumOfStudents int        `json:"studentsCount"`
	Year          int        `json:"year"`
}

type Teachers struct {
	Id           int64        `qbs:"pk" json:"id"`
	FacultyId    int64        `qbs:"fk:Faculty" json:"facultyId"`
	Faculty      *Faculties   `json:"faculty"`
	DepartmentId int64        `qbs:"fk:Department" json:"departmentId"`
	Department   *Departments `json:"department"`
	FirstName    string       `qbs:"size:25" json:"firstName"`
	LastName     string       `qbs:"size:25" json:"lastName"`
	MiddleName   string       `qbs:"size:30" json:"meddleName"`
	Rank         string       `qbs:"size:100" json:"rank"`
}

type Housings struct {
	Id     int64  `qbs:"pk" json:"id"`
	Number string `qbs:"size:10" json:"number"`
}

type Audiences struct {
	Id        int64     `qbs:"pk" json:"id"`
	HousingId int64     `qbs:"fk:Housing" json:"housingId"`
	Housing   *Housings `json:"housing"`
	Number    string    `qbs:"size:10" json:"number"`
	Sets      int       `json:"sets"`
	Type      string    `qbs:"size:50" json:"type"`
}

type Subjects struct {
	Id      int64  `qbs:"pk" json:"id"`
	Subject string `qbs:"size:100" json:"subject"`
}

type Days struct {
	Id  int64  `qbs:"pk" json:"id"`
	Day string `qbs:"size:10" json:"day"`
}

type Pairs struct {
	Id     int64  `qbs:"pk" json:"id"`
	Number string `qbs:"size:10" json:"number"`
}

type Schedule struct {
	Id          int64      `qbs:"pk" json:"id"`
	GroupId     int64      `qbs:"fk:Group" json:"groupId"`
	Group       *Groups    `json:"group"`
	TeacherId   int64      `qbs:"fk:Teacher" json:"teacherId"`
	Teacher     *Teachers  `json:"teacher"`
	AudienceId  int64      `qbs:"fk:Audience" json:"audienceId"`
	Audience    *Audiences `json:"audience"`
	SubjectId   int64      `qbs:"fk:Subject" json:"subjectId"`
	Subject     *Subjects  `json:"subject"`
	DayId       int64      `qbs:"fk:Day" json:"dayId"`
	Day         *Days      `json:"day"`
	PairId      int64      `qbs:"fk:Pair" json:"pairId"`
	Pair        *Pairs     `json:"pair"`
	PairType    string     `qbs:"size:25" json:"pairType"`
	PairPeriod  int        `json:"pairPeriod"`
	SubjectType string     `qbs:"size:25" json:"subjectType"`
}

type Tasks struct {
	Id           int64        `qbs:"pk" json:"id"`
	DepartmentId int64        `qbs:"fk:Department" json:"departmentId"`
	Department   *Departments `json:"department"`
	GroupId      int64        `qbs:"fk:Group" json:"groupId"`
	Group        *Groups      `json:"group"`
	SubjectId    int64        `qbs:"fk:Subject" json:"subjectId"`
	Subject      *Subjects    `json:"subject"`
	TeacherId    int64        `qbs:"fk:Teacher" json:"teacherId"`
	Teacher      *Teachers    `json:"teacher"`
	AudienceId   int64        `qbs:"fk:Audience" json:"audienceId"`
	Audience     *Audiences   `json:"audience"`
	Time         float32      `json:"time"`
	SubjectType  string       `qbs:"size:25" json:"subjectType"`
}

type Users struct {
	Id             int64  `qbs:"pk"`
	Username       string `qbs:"size:40"`
	HashedPassword []byte
}
