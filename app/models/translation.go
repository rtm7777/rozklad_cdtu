package models

type Adaptation struct {
	Language    string `json:"lang"`
	Translation string `json:"tr"`
}

type Translations struct {
	Key         string       `json:"key"`
	Adaptations []Adaptation `json:"adaptations"`
}

type ParsedTranslations struct {
	Key         string `json:"key"`
	Language    string `json:"language"`
	Translation string `json:"translation"`
}
