package custom_structs

import (
	"encoding/json"
)

type ItemsData struct {
	Category string
	Data     json.RawMessage
}
