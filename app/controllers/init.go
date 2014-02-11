package controllers

import (
	"github.com/robfig/revel"
	"schedule/app/qbsDB"
)

func init() {
	revel.OnAppStart(func() { qbsDB.Setup() })
}
