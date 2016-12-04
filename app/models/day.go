package models

type Days struct {
	Id  int64  `json:"id"`
	Day string `json:"day"`
}

var DaysList = []Days{
	{1, "monday"},
	{2, "tuesday"},
	{3, "wednesday"},
	{4, "thursday"},
	{5, "friday"},
	{6, "saturday"},
}
