package controllers

import (
	"code.google.com/p/go.crypto/bcrypt"
	"code.google.com/p/go.net/websocket"
	"github.com/revel/revel"
	"github.com/revel/revel/cache"
	"rozklad_cdtu/app/libs"
	"rozklad_cdtu/app/roomevents"
	"time"
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

func (c Admin) GetWSToken() revel.Result {
	secret, _ := revel.Config.String("app.secret")
	token, err := bcrypt.GenerateFromPassword([]byte(time.Now().String()+secret), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	cache.Set(string(token), c.connected().Username, 30*time.Minute)
	c.Response.Out.Header().Set("Web-Socket-Token", string(token))

	return c.RenderText("token generated and saved")
}

func (c Admin) Main() revel.Result {
	connection := c.connected()
	User := connection.Username

	days, pairs := db_lib.DaysPairsData(c.DB)
	faculties := db_lib.FacultiesList(c.DB)
	return c.Render(User, days, pairs, faculties)
}

func (c Admin) DataBase() revel.Result {
	connection := c.connected()
	User := connection.Username

	type Categories struct {
		Category string
		Name     string
	}

	categories := []Categories{
		{Category: "faculties", Name: "Факультети"},
		{Category: "departments", Name: "Кафедри"},
		{Category: "groups", Name: "Групи"},
		{Category: "housings", Name: "Корпуси"},
		{Category: "audiences", Name: "Аудиторії"},
		{Category: "teachers", Name: "Викладачі"},
		{Category: "subjects", Name: "Предмети"},
	}

	return c.Render(User, categories)
}

func (c Admin) Tasks() revel.Result {
	connection := c.connected()
	User := connection.Username

	return c.Render(User)
}

func (c Admin) SocketConn(token string, ws *websocket.Conn) revel.Result {
	var access bool
	user := ""
	if err := cache.Get(token, &user); err != nil {
		access = false
	} else {
		access = true
	}
	cache.Delete(token)

	if access {
		subscription := roomevents.Subscribe()
		defer subscription.Cancel()

		roomevents.Join(user)
		defer roomevents.Leave(user)

		newMessages := make(chan string)
		go func() {
			var msg string
			for {
				err := websocket.Message.Receive(ws, &msg)
				if err != nil {
					close(newMessages)
					return
				}
				newMessages <- msg
			}
		}()
		for {
			select {
			case event := <-subscription.New:
				if websocket.JSON.Send(ws, &event) != nil {
					// They disconnected.
					return nil
				}
			case msg, ok := <-newMessages:

				if !ok {
					return nil
				}

				roomevents.Say(user, msg)
			}
		}
	}
	return nil
}
