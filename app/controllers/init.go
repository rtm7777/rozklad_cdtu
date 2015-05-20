package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/models/custom_responses"
)

func jsonError(code int, err error) custom_responses.JsonErrorResult {
	return custom_responses.JsonErrorResult{
		StatusCode:   code,
		ErrorMessage: err.Error(),
	}
}

func init() {
	revel.OnAppStart(InitDB)
	revel.InterceptMethod((*GormController).Begin, revel.BEFORE)
	revel.InterceptMethod(Admin.checkUser, revel.BEFORE)
	revel.InterceptMethod((*GormController).Commit, revel.AFTER)
	revel.InterceptMethod((*GormController).Rollback, revel.FINALLY)
}
