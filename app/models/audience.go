package models

import (
	"encoding/json"
)

type Audiences struct {
	Id        int64    `json:"id"`
	HousingId int64    `json:"housingId"`
	Housing   Housings `json:"-"`
	Number    string   `sql:"size:10" json:"number"`
	Sets      int      `json:"sets,string"`
	Type      string   `sql:"size:50" json:"type"`
	Note      string   `sql:"size:200" json:"note"`
}

func (audience *Audiences) Decode(b []byte) error {
	err := json.Unmarshal(b, audience)
	if err != nil {
		return err
	}
	if audience.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (audience *Audiences) Value() interface{} {
	return *audience
}
