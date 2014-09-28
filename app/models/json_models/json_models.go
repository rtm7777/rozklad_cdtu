package json_models

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

type Schedule struct {
	Id      string
	Type    string
	Subject string
}

type Task struct {
	Id       string
	Subject  string
	Type     string
	Progress string
}
