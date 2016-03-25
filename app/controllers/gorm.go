package controllers

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/revel/revel"
	"rozklad_cdtu/app/models"
)

// type: revel controller with `*gorm.DB`
// c.Txn will keep `Gdb *gorm.DB`
type GormController struct {
	*revel.Controller
	DB *gorm.DB
}

var (
	Adapter      string
	databaseName string
	username     string
	password     string
	port         string
	hostname     string
	dataSource   string
)

// it can be used for jobs
var Gdb *gorm.DB

// init db
func InitDB() {
	var err error
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
		dataSource = username + ":" + password + "@tcp(" + hostname + ":" + port + ")/" + databaseName + "?charset=utf8&parseTime=True"
	}

	// open db
	Gdb, err = gorm.Open(Adapter, dataSource)
	if err != nil {
		revel.ERROR.Println("FATAL", err)
		panic(err)
	}
	Gdb.AutoMigrate(&models.Faculties{})
	Gdb.AutoMigrate(&models.Departments{})
	Gdb.AutoMigrate(&models.Groups{})
	Gdb.AutoMigrate(&models.Teachers{})
	Gdb.AutoMigrate(&models.Housings{})
	Gdb.AutoMigrate(&models.Audiences{})
	Gdb.AutoMigrate(&models.Subjects{})
	Gdb.AutoMigrate(&models.Schedule{})
	Gdb.AutoMigrate(&models.Tasks{})
	Gdb.AutoMigrate(&models.Users{})
}

// transactions

// This method fills the c.Txn before each transaction
func (c *GormController) Begin() revel.Result {
	db := Gdb.Begin()
	if db.Error != nil {
		panic(db.Error)
	}
	c.DB = db
	return nil
}

// This method clears the c.Txn after each transaction
func (c *GormController) Commit() revel.Result {
	if c.DB == nil {
		return nil
	}
	c.DB.Commit()
	if err := c.DB.Error; err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.DB = nil
	return nil
}

// This method clears the c.Txn after each transaction, too
func (c *GormController) Rollback() revel.Result {
	if c.DB == nil {
		return nil
	}
	c.DB.Rollback()
	if err := c.DB.Error; err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.DB = nil
	return nil
}
