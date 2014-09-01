package models

import (
	_ "github.com/coocood/qbs"
)

type Faculties struct {
	Id        int64  `qbs:"pk"`
	FullName  string `qbs:"size:100"`
	ShortName string `qbs:"size:50"`
}

type Departments struct {
	Id        int64 `qbs:"pk"`
	FacultyId int64 `qbs:"fk:Faculty"`
	Faculty   *Faculties
	Name      string `qbs:"size:100"`
}

type Groups struct {
	Id            int64      `qbs:"pk"`
	FacultyId     int64      `qbs:"fk:Faculty" json:"-"`
	Faculty       *Faculties `json:"-"`
	FullName      string     `qbs:"size:100"`
	ShortName     string     `qbs:"size:20"`
	NumOfStudents int        `json:"-"`
	Year          int        `json:"-"`
}

type Teachers struct {
	Id           int64 `qbs:"pk"`
	FacultyId    int64 `qbs:"fk:Faculty"`
	Faculty      *Faculties
	DepartmentId int64 `qbs:"fk:Department"`
	Department   *Departments
	FirstName    string `qbs:"size:25"`
	LastName     string `qbs:"size:25"`
	MiddleName   string `qbs:"size:30"`
	Rank         string `qbs:"size:100"`
}

type Housings struct {
	Id     int64  `qbs:"pk"`
	Number string `qbs:"size:10"`
}

type Audiences struct {
	Id        int64 `qbs:"pk"`
	HousingId int64 `qbs:"fk:House"`
	House     *Housings
	Number    string `qbs:"size:10"`
	Sets      int
	Type      string `qbs:"size:50"`
}

type Subjects struct {
	Id      int64  `qbs:"pk"`
	Subject string `qbs:"size:100"`
}

type Days struct {
	Id  int64  `qbs:"pk"`
	Day string `qbs:"size:10"`
}

type Pairs struct {
	Id     int64  `qbs:"pk"`
	Number string `qbs:"size:10"`
}

type Schedule struct {
	Id          int64 `qbs:"pk"`
	GroupId     int64 `qbs:"fk:Group"`
	Group       *Groups
	TeacherId   int64 `qbs:"fk:Teacher"`
	Teacher     *Teachers
	AudienceId  int64 `qbs:"fk:Audience"`
	Audience    *Audiences
	SubjectId   int64 `qbs:"fk:Subject"`
	Subject     *Subjects
	DayId       int64 `qbs:"fk:Day"`
	Day         *Days
	PairId      int64 `qbs:"fk:Pair"`
	Pair        *Pairs
	PairType    string `qbs:"size:25"`
	PairPeriod  int
	SubjectType string `qbs:"size:25"`
}

type Tasks struct {
	Id           int64 `qbs:"pk"`
	DepartmentId int64 `qbs:"fk:Department"`
	Department   *Departments
	GroupId      int64 `qbs:"fk:Group"`
	Group        *Groups
	SubjectId    int64 `qbs:"fk:Subject"`
	Subject      *Subjects
	TeacherId    int64 `qbs:"fk:Teacher"`
	Teacher      *Teachers
	AudienceId   int64 `qbs:"fk:Audience"`
	Audience     *Audiences
	Time         float32
	SubjectType  string `qbs:"size:25"`
}

type Users struct {
	Id             int64  `qbs:"pk"`
	Username       string `qbs:"size:40"`
	HashedPassword []byte
}
