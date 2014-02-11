package controllers

import (
	"github.com/robfig/revel"
)

type Application struct {
	*revel.Controller
}

func (c Application) Admin() revel.Result {
	return c.Render()
}
