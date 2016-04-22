package controllers

import (
	"github.com/revel/revel"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"golang.org/x/crypto/bcrypt"
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
	user := models.Users{}
	err := c.DB.Where(&models.Users{Username: username}).First(&user).Error
	if err != nil {
		if err.Error() == "record not found" {
			return nil
		} else {
			panic(err)
		}
	}
	return &user
}

func (c Application) Login() revel.Result {
	return c.Render()
}

func (c Application) LoginPost(email, password string) revel.Result {
	user := c.getUser(email)
	if user != nil {
		err := bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
		if err == nil {
			c.Session["user"] = user.Username
			c.Session.SetDefaultExpiration()
			return c.Redirect(Admin.Main)
		}
	} else {
		user := models.Users{Username: email}
		user.HashedPassword, _ = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		c.DB.NewRecord(user)
		c.DB.Create(&user)

		c.Session["user"] = user.Username
		c.Session.SetDefaultExpiration()
		return c.Redirect(Admin.Main)
	}
	return c.Redirect(Application.Login)
}

func (c Application) Logout() revel.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.Redirect(Application.Login)
}
