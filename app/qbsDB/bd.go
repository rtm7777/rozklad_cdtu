package qbsDB

import (
	"fmt"
	"github.com/robfig/revel"
	"github.com/coocood/qbs"
	_ "github.com/go-sql-driver/mysql"
)

var (
	DB           *qbs.Qbs
	Adapter      string
	databaseName string
	username     string
	password     string
	port         string
	hostname     string
	dataSource   string
)

func Setup() (err error) {
	configRequired := func(key string) string {
		value, found := revel.Config.String(key)
		if !found {
			revel.ERROR.Fatal(fmt.Sprintf("Configuration for %s missing in app.conf.", key))
		}
		return value
	}

	// Read configuration.
	Adapter = configRequired("db.adapter")
	databaseName = configRequired("db.database_name")
	username = configRequired("db.username")
	password = configRequired("db.password")
	hostname = revel.Config.StringDefault("db.hostname", "localhost")
	
	if Adapter == "mysql" {
		Adapter = "mysql"
		port = revel.Config.StringDefault("db.port", "3306")
		dataSource = username + ":" + password + "@tcp(" + hostname + ":" + port + ")/" + databaseName + "?charset=utf8mb4,utf8"
	}
	
	qbs.Register(Adapter, dataSource, databaseName, qbs.NewMysql())
	DB, err = qbs.GetQbs()
	if err != nil {
		revel.ERROR.Fatal(err)
	}
	return err
}
