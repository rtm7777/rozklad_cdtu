package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/qbsDB"
)

func init() {
	revel.OnAppStart(func() { qbsDB.Setup() })
	revel.InterceptMethod(Admin.checkUser, revel.BEFORE)
}
