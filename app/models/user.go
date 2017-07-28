package models

type Users struct {
	Id             int64
	Username       string `sql:"size:40;unique"`
	HashedPassword []byte `sql:"size:65535"`
	Activated      bool
	UserRoles      []UserRoles `gorm:"ForeignKey:UserID"`
}

// func (u *User) AfterCreate(db *gorm.DB) (err error) {
// 	db.Model(u).Update("role", "admin")
// 	return
// }
