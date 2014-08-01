package tests

import (
	_ "fmt"
	"github.com/revel/revel"
)

type AppTest struct {
	revel.TestSuite
}

func (t *AppTest) TestMainPage() {
	t.Get("/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestGroupPage() {
	t.Get("/group/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestAboutPage() {
	t.Get("/about/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestTeacherPage() {
	t.Get("/teacher/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestGMapsPage() {
	t.Get("/gmaps/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestAdminPage() {
	t.Get("/admin/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestLoginPage() {
	t.Get("/login/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestLoginPostPage() {
	t.Post("/login/", "", nil)
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestLogoutPage() {
	t.Get("/logout/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}
