package jobs

import (
	"github.com/revel/revel"
	"github.com/revel/revel/modules/jobs/app/jobs"
)

func init() {
	// 	revel.OnAppStart(func() { jobs.Now(AudiencesImport{}) })
	revel.OnAppStart(func() { jobs.Now(SubjectsImport{}) })
}
