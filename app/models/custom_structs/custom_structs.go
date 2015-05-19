package custom_structs

import (
	"encoding/json"
)

type ItemsData struct {
	Category string          `json:"category"`
	Data     json.RawMessage `json:"data"`
}

type ItemsForDeleting struct {
	Category string  `json:"category"`
	Ids      []int64 `json:"ids"`
}
