package custom_responses

import (
	"encoding/json"
	"github.com/revel/revel"
)

type EmptyResult struct {
	StatusCode int
}

func (r EmptyResult) Apply(req *revel.Request, resp *revel.Response) {
	resp.WriteHeader(r.StatusCode, "text/html; charset=utf-8")
}

type JsonErrorResult struct {
	StatusCode   int
	ErrorMessage string
}

type JsonError struct {
	Error string `json:"error"`
}

func (r JsonErrorResult) Apply(req *revel.Request, resp *revel.Response) {
	var b []byte
	resultJson := JsonError{Error: r.ErrorMessage}

	b, err := json.Marshal(resultJson)

	if err != nil {
		revel.ErrorResult{Error: err}.Apply(req, resp)
		return
	}

	resp.WriteHeader(r.StatusCode, "application/json; charset=utf-8")
	resp.Out.Write(b)
}
