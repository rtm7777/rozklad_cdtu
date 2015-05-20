package models

import (
	"encoding/json"
)

type Subjects struct {
	Id      int64  `json:"id"`
	Subject string `sql:"size:100;unique" json:"subject"`
}

func (subject *Subjects) Decode(b []byte) error {
	err := json.Unmarshal(b, subject)
	if err != nil {
		return err
	}
	if subject.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (subject *Subjects) Value() interface{} {
	return *subject
}
