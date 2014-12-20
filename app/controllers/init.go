package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/qbsDB"
)

func init() {
	revel.OnAppStart(func() { qbsDB.Setup() })
	revel.InterceptMethod(Admin.checkUser, revel.BEFORE)
	revel.OnAppStart(InitDB)
	revel.InterceptMethod((*GormController).Begin, revel.BEFORE)
	revel.InterceptMethod((*GormController).Commit, revel.AFTER)
	revel.InterceptMethod((*GormController).Rollback, revel.FINALLY)
}
