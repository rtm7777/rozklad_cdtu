package controllers

import (
	"github.com/revel/revel"
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
	return c.Render(User)
}
