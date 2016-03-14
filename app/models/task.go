package models

import (
	"encoding/json"
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
	LectureTime    int64       `json:"lectureTime"`
	PracticeTime   int64       `json:"practiceTime"`
	LaboratoryTime int64       `json:"laboratoryTime"`
}

func (task *Tasks) LoadRelated(db *gorm.DB) *Tasks {
	db.Model(task).Related(&task.Subject, "SubjectId")
	return task
}

func (task *Tasks) Decode(b []byte) error {
	err := json.Unmarshal(b, task)
	if err != nil {
		return err
	}
	if task.Id <= 0 {
		return itemIdErr
	}
	return nil
}
