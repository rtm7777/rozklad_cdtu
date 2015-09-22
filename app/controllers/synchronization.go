package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Synchronization struct {
	Admin
}

func (c Synchronization) GetData(dataType string) revel.Result {
	data := database.SynchronizationTypes[dataType](c.DB)
	return c.RenderJson(data)
}

func checkDataTypeParam(c *revel.Controller) revel.Result {
	dataType, ok := c.Params.Values["dataType"]
	if ok && dataType[0] != "" {
		if _, ok := database.SynchronizationTypes[dataType[0]]; !ok {
			c.Response.Status = 400
			return c.RenderJson("wrong dataType attribute")
		}
		return nil
	}
	c.Response.Status = 400
	return c.RenderJson("mandatory parameter dataType is not present")
}

func init() {
	revel.InterceptFunc(checkDataTypeParam, revel.BEFORE, &Synchronization{})
}