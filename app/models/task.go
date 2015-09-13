package models

import (
	"github.com/jinzhu/gorm"
)

type Tasks struct {
	Id             int64       `json:"id"`
	DepartmentId   int64       `json:"departmentId"`
	Department     Departments `json:"-"`
	GroupId        int64       `json:"groupId"`
	Group          Groups      `json:"-"`
	SubjectId      int64       `json:"subjectId"`
	Subject        Subjects    `json:"-"`
	TeacherId      int64       `json:"teacherId"`
	Teacher        Teachers    `json:"-"`
	AudienceId     int64       `json:"audienceId"`
	Audience       Audiences   `json:"-"`
	LectureTime    float32     `json:"lectureTime"`
	PracticeTime   float32     `json:"practiceTime"`
	LaboratoryTime float32     `json:"laboratoryTime"`
}

func (task *Tasks) LoadRelated(db *gorm.DB) *Tasks {
	db.Model(task).Related(&task.Subject, "SubjectId")
	return task
}
