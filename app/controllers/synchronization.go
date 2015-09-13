package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Synchronization struct {
	Admin
}

func (c Synchronization) GetGroupsSync() revel.Result {

	groups := database.GroupsSync(c.DB)
	fmt.Println(groups)

	return c.RenderJson(groups)
}
