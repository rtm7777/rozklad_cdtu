package models

type UserRoles struct {
	Id     int64
	UserID int64  `gorm:"index"`
	Role   string `gorm:"type:varchar(20);unique_index"`
}

// admin, db_edit, task_edit, schedule_edit, db_view, task_view, schedule_view
