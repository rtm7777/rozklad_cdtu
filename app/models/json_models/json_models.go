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
	Type    int
	Subject string
}
