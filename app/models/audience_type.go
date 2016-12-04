package models

type AudienceTypes struct {
	Id   int64  `json:"id"`
	Type string `json:"type"`
}

var AudienceTypesList = []Days{
	{1, "lecture"},
	{2, "laboratory"},
	{3, "computer_room"},
	{4, "educational"},
}
