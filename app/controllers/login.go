package controllers

import (
	"code.google.com/p/go.crypto/bcrypt"
	_ "fmt"
	"github.com/revel/revel"
	"rozkladchdtu/app/models"
	"rozkladchdtu/app/qbsDB"
	_ "strings"
)

func (c Application) connected() *models.Users {
	if c.RenderArgs["user"] != nil {
		return c.RenderArgs["user"].(*models.Users)
	}
	if username, ok := c.Session["user"]; ok {
		return c.getUser(username)
	}
	return nil
}

func (c Application) getUser(username string) *models.Users {
	db := qbsDB.DB
	user := new(models.Users)
	err := db.WhereEqual("username", username).Find(user)
	if err != nil {
		return nil
	}
	return user
}

func (c Application) Login() revel.Result {
	return c.Render()
}

func (c Application) LoginPost(email, password string) revel.Result {
	//db := qbsDB.DB
	user := c.getUser(email)
	if user != nil {
		err := bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
		if err == nil {
			c.Session["user"] = user.Username
			c.Session.SetDefaultExpiration()
			return c.Redirect(Admin.Main)
		}
	} //else {
	// 	fmt.Println("false")
	// 	user := new(models.Users)
	// 	user.Username = email

	// 	user.HashedPassword, _ = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	// 	_, err := db.Save(user)
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	c.Session["user"] = user.Username
	// 	c.Session.SetDefaultExpiration()
	// 	return c.Redirect(Admin.Main)
	// }
	return c.Redirect(Application.Login)
}

func (c Application) Logout() revel.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.Redirect(Application.Login)
}
