package controllers

import (
	_ "github.com/coocood/qbs"
	"github.com/revel/revel"
	"rozkladchdtu/app/qbsDB"
)

type Admin struct {
	Application
}

func (c Admin) checkUser() revel.Result {
	if user := c.connected(); user == nil {
		return c.Redirect(Application.Login)
	}
	return nil
}

func (c Admin) Main() revel.Result {
	connection := c.connected()
	User := connection.Username

	db := qbsDB.DB
	days, pairs := DaysPairsData(db)
	return c.Render(User, days, pairs)
}
