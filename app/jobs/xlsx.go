package jobs

import (
	"fmt"
	"github.com/tealeg/xlsx"
)

func OpenExcelFile(filename string) *xlsx.File {
	fmt.Println("| Opening file")
	xlFile, err := xlsx.OpenFile(filename)
	if err != nil {
		fmt.Printf("| Can't open file - \"%s\"\n", filename)
		return nil
	} else {
		fmt.Printf("| File \"%s\" successfully opened\n", filename)
		return xlFile
	}
}