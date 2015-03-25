package jobs

import (
	_ "github.com/revel/modules/jobs/app/jobs"
	_ "github.com/revel/revel"
)

func init() {
	// revel.OnAppStart(func() { jobs.Now(AudiencesImport{}) })
	// revel.OnAppStart(func() { jobs.Now(SubjectsImport{}) })
	// revel.OnAppStart(func() { jobs.Now(GroupsImport{}) })
}
