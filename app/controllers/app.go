package controllers

import (
	"code.google.com/p/go.net/websocket"
	"github.com/coocood/qbs"
	"github.com/revel/revel"
	"rozkladchdtu/app/models"
	"rozkladchdtu/app/qbsDB"
	"rozkladchdtu/app/roomevents"
	"strings"
)

type Application struct {
	*revel.Controller
}

func (c Application) Index() revel.Result {
	db := qbsDB.DB
	type Days struct {
		Id  int64  `qbs:"pk"`
		Day string `qbs:"size:65536"`
	}
	day := new(Days)
	day.Id = 1
	e := db.Find(day)
	if e != nil {
		panic(e)
	}
	var days []*Days
	err := db.FindAll(&days)
	if err != nil {
		panic(err)
	}

	return c.Render(day, days)
}

func CreateTables() error {
	migration, err := qbs.GetMigration()
	if err != nil {
		return err
	}
	defer migration.Close()
	err = migration.CreateTableIfNotExists(new(models.Faculties))
	err = migration.CreateTableIfNotExists(new(models.Departments))
	err = migration.CreateTableIfNotExists(new(models.Groups))
	err = migration.CreateTableIfNotExists(new(models.Teachers))
	err = migration.CreateTableIfNotExists(new(models.Housings))
	err = migration.CreateTableIfNotExists(new(models.Audiences))
	err = migration.CreateTableIfNotExists(new(models.Subjects))
	err = migration.CreateTableIfNotExists(new(models.Days))
	err = migration.CreateTableIfNotExists(new(models.Pairs))
	err = migration.CreateTableIfNotExists(new(models.Schedule))
	err = migration.CreateTableIfNotExists(new(models.Tasks))
	err = migration.CreateTableIfNotExists(new(models.Users))
	return err
}

func GroupsData(db *qbs.Qbs) ([]*models.Faculties, []*models.Groups, []int, []*models.Days, []*models.Pairs) {

	years := make([]int, 6)
	for i := 0; i < 6; i++ {
		years[i] = i + 1
	}

	var faculties []*models.Faculties
	err := db.FindAll(&faculties)
	if err != nil {
		panic(err)
	}
	var groups []*models.Groups
	err = db.FindAll(&groups)
	if err != nil {
		panic(err)
	}
	var days []*models.Days
	err = db.FindAll(&days)
	if err != nil {
		panic(err)
	}
	var pairs []*models.Pairs
	err = db.FindAll(&pairs)
	if err != nil {
		panic(err)
	}
	return faculties, groups, years, days, pairs
}

func TeachersData(db *qbs.Qbs) ([]*models.Faculties, []*models.Departments, []*models.Teachers, []*models.Days, []*models.Pairs) {
	var faculties []*models.Faculties
	err := db.FindAll(&faculties)
	if err != nil {
		panic(err)
	}
	var departments []*models.Departments
	err = db.FindAll(&departments)
	if err != nil {
		panic(err)
	}
	var teachers []*models.Teachers
	err = db.OrderBy("last_name").FindAll(&teachers)
	if err != nil {
		panic(err)
	}
	var days []*models.Days
	err = db.FindAll(&days)
	if err != nil {
		panic(err)
	}
	var pairs []*models.Pairs
	err = db.FindAll(&pairs)
	if err != nil {
		panic(err)
	}
	return faculties, departments, teachers, days, pairs
}

func (c Application) Main() revel.Result {
	// CreateTables()
	return c.Render()
}

func (c Application) Gmaps() revel.Result {
	return c.Render()
}

func (c Application) About() revel.Result {
	return c.Render()
}

func (c Application) Group() revel.Result {
	db := qbsDB.DB
	faculties, groups, years, days, pairs := GroupsData(db)
	return c.Render(faculties, groups, years, days, pairs)
}

func (c Application) GroupCurrent(groupName string) revel.Result {
	db := qbsDB.DB
	group := new(models.Groups)
	err := db.WhereEqual("groups.short_name", groupName).Find(group)

	if err != nil {
		return c.Redirect(Application.Group)
	} else {
		faculties, groups, years, days, pairs := GroupsData(db)
		var schedule []*models.Schedule

		type Pair struct {
			Id       int64
			Num      string
			Subject1 string
			Subject2 string
			Type     int
		}

		type Day struct {
			Id   int64
			Day  string
			Pair []Pair
		}

		var days_out []Day

		for j := range days {
			var pairs_out []Pair
			for i := range pairs {
				pairs_out = append(pairs_out, Pair{pairs[i].Id, pairs[i].Number, "", "", 0})
			}
			days_out = append(days_out, Day{days[j].Id, days[j].Day, pairs_out})
		}

		err = db.WhereEqual("schedule.group_id", group.Id).FindAll(&schedule)
		if err == nil {
			for i := range schedule {
				if schedule[i].PairType == "0" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].Subject.Subject
				} else if schedule[i].PairType == "1" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].PairType
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
				} else if schedule[i].PairType == "2" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject2 = schedule[i].PairType
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
				}

			}
		}

		return c.Render(faculties, groups, years, days, pairs, group, days_out)
	}

}

func (c Application) Teacher() revel.Result {
	db := qbsDB.DB
	faculties, departments, teachers, days, pairs := TeachersData(db)
	return c.Render(faculties, departments, teachers, days, pairs)
}

func (c Application) TeacherCurrent(teacherName string) revel.Result {
	db := qbsDB.DB
	teacher := new(models.Teachers)
	parsedTeacherName := strings.Split(teacherName, "_")
	err := db.WhereEqual("first_name", parsedTeacherName[0]).WhereEqual("last_name", parsedTeacherName[1]).WhereEqual("middle_name", parsedTeacherName[2]).Find(teacher)
	if err != nil {
		return c.Redirect(Application.Teacher)
	} else {
		faculties, departments, teachers, days, pairs := TeachersData(db)
		var schedule []*models.Schedule

		type Pair struct {
			Id       int64
			Num      string
			Subject1 string
			Subject2 string
			Type     int
		}

		type Day struct {
			Id   int64
			Day  string
			Pair []Pair
		}

		var days_out []Day

		for j := range days {
			var pairs_out []Pair
			for i := range pairs {
				pairs_out = append(pairs_out, Pair{pairs[i].Id, pairs[i].Number, "", "", 0})
			}
			days_out = append(days_out, Day{days[j].Id, days[j].Day, pairs_out})
		}

		err = db.WhereEqual("schedule.teacher_id", teacher.Id).FindAll(&schedule)
		if err == nil {
			for i := range schedule {
				if schedule[i].PairType == "0" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].Subject.Subject
				} else if schedule[i].PairType == "1" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject1 = schedule[i].PairType
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
				} else if schedule[i].PairType == "2" {
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Subject2 = schedule[i].PairType
					days_out[schedule[i].DayId].Pair[schedule[i].PairId].Type = 1
				}

			}
		}
		return c.Render(faculties, departments, teachers, days, pairs, teacher, days_out)
	}
}

func (c Application) Socket(user string) revel.Result {
	return c.Render(user)
}

func (c Application) SocketConn(user string, ws *websocket.Conn) revel.Result {

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
	return nil
}
