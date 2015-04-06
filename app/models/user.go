package models

type Users struct {
	Id             int64
	Username       string `sql:"size:40"`
	HashedPassword []byte `sql:"size:65535"`
}
