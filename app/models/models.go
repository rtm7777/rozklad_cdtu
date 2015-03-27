package models

import (
	"github.com/jinzhu/gorm"
)

type Faculties struct {
	Id        int64  `json:"id"`
	FullName  string `sql:"size:100" json:"fullName"`
	ShortName string `sql:"size:50" json:"shortName"`
}

type Departments struct {
	Id        int64     `json:"id"`
	FacultyId int64     `json:"facultyId"`
	Faculty   Faculties `json:"faculty"`
	Name      string    `sql:"size:100" json:"name"`
}

type Groups struct {
	Id            int64     `json:"id"`
	FacultyId     int64     `json:"facultyId"`
	Faculty       Faculties `json:"faculty"`
	Name          string    `sql:"size:100" json:"name"`
	NumOfStudents int       `json:"studentsCount"`
	Year          int       `json:"year"`
}

type Teachers struct {
	Id           int64       `json:"id"`
	FacultyId    int64       `json:"facultyId"`
	Faculty      Faculties   `json:"faculty"`
	DepartmentId int64       `json:"departmentId"`
	Department   Departments `json:"department"`
	FirstName    string      `sql:"size:25" json:"firstName"`
	LastName     string      `sql:"size:25" json:"lastName"`
	MiddleName   string      `sql:"size:30" json:"meddleName"`
	Rank         string      `sql:"size:100" json:"rank"`
}

type Housings struct {
	Id     int64  `json:"id"`
	Number string `sql:"size:10" json:"number"`
}

type Audiences struct {
	Id        int64    `json:"id"`
	HousingId int64    `json:"housingId"`
	Housing   Housings `json:"housing"`
	Number    string   `sql:"size:10" json:"number"`
	Sets      int      `json:"sets"`
	Type      string   `sql:"size:50" json:"type"`
	Note      string   `sql:"size:200" json:"note"`
}

type Subjects struct {
	Id      int64  `json:"id"`
	Subject string `sql:"size:100;unique" json:"subject"`
}

type Days struct {
	Id  int64  `json:"id"`
	Day string `sql:"size:10" json:"day"`
}

type Pairs struct {
	Id     int64  `json:"id"`
	Number string `sql:"size:10" json:"number"`
}

type Schedule struct {
	Id          int64     `json:"id"`
	GroupId     int64     `json:"groupId"`
	Group       Groups    `json:"group"`
	TeacherId   int64     `json:"teacherId"`
	Teacher     Teachers  `json:"teacher"`
	AudienceId  int64     `json:"audienceId"`
	Audience    Audiences `json:"audience"`
	SubjectId   int64     `json:"subjectId"`
	Subject     Subjects  `json:"subject"`
	DayId       int64     `json:"dayId"`
	Day         Days      `json:"day"`
	PairId      int64     `json:"pairId"`
	Pair        Pairs     `json:"pair"`
	PairType    string    `sql:"size:25" json:"pairType"`
	PairPeriod  int       `json:"pairPeriod"`
	SubjectType string    `sql:"size:25" json:"subjectType"`
}

func (schedule *Schedule) LoadRelated(db *gorm.DB) *Schedule {
	db.Model(schedule).Related(&schedule.Teacher, "TeacherId")
	db.Model(schedule).Related(&schedule.Audience, "AudienceId").Related(&schedule.Audience.Housing, "HousingId")
	db.Model(schedule).Related(&schedule.Subject, "SubjectId")
	return schedule
}

func (schedule *Schedule) LoadRelatedTeacher(db *gorm.DB) *Schedule {
	db.Model(schedule).Related(&schedule.Group, "GroupId")
	db.Model(schedule).Related(&schedule.Audience, "AudienceId").Related(&schedule.Audience.Housing, "HousingId")
	db.Model(schedule).Related(&schedule.Subject, "SubjectId")
	return schedule
}

type Tasks struct {
	Id           int64       `json:"id"`
	DepartmentId int64       `json:"departmentId"`
	Department   Departments `json:"department"`
	GroupId      int64       `json:"groupId"`
	Group        Groups      `json:"group"`
	SubjectId    int64       `json:"subjectId"`
	Subject      Subjects    `json:"subject"`
	TeacherId    int64       `json:"teacherId"`
	Teacher      Teachers    `json:"teacher"`
	AudienceId   int64       `json:"audienceId"`
	Audience     Audiences   `json:"audience"`
	Time         float32     `json:"time"`
	SubjectType  string      `sql:"size:25" json:"subjectType"`
}

func (task *Tasks) LoadRelated(db *gorm.DB) *Tasks {
	db.Model(task).Related(&task.Subject, "SubjectId")
	return task
}

type Users struct {
	Id             int64
	Username       string `sql:"size:40"`
	HashedPassword []byte `sql:"size:65535"`
}
