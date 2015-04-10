package custom_structs

import (
	"encoding/json"
)

type ItemsData struct {
	Category string          `json:"category"`
	Data     json.RawMessage `json:"data"`
}
