package models

import (
	"encoding/json"
)

type Housings struct {
	Id      int64  `json:"id"`
	Number  string `sql:"size:10;unique" json:"number"`
	Address string `sql:"size:100" json:"address"`
}

func (housing *Housings) Decode(b []byte) error {
	err := json.Unmarshal(b, housing)
	if err != nil {
		return err
	}
	if housing.Id <= 0 {
		return itemIdErr
	}
	return nil
}

func (housing *Housings) Value() interface{} {
	return *housing
}
