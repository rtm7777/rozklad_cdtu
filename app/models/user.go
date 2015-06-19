package models

type Users struct {
	Id             int64
	Username       string `sql:"size:40;unique"`
	HashedPassword []byte `sql:"size:65535"`
	Role           string `sql:"size:15"`
}
