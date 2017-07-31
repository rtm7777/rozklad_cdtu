package models

import (
	"github.com/jinzhu/gorm"
)

type Users struct {
	Id             int64
	Username       string      `sql:"size:40;unique"`
	HashedPassword []byte      `sql:"size:65535"`
	Active         bool        `sql:"DEFAULT:false"`
	UserRoles      []UserRoles `gorm:"ForeignKey:UserID"`
}

// func (u *User) AfterCreate(db *gorm.DB) (err error) {
// 	db.Model(u).Update("role", "admin")
// 	return
// }

func (u *Users) IsAdmin(db *gorm.DB) bool {
	var roles []UserRoles
	db.Model(u).Where("role = ?", "admin").Related(&roles, "UserRoles")
	if len(roles) > 0 {
		return true
	}
	return false
}

func (u *Users) IsActive() bool {
	return u.Active
}
