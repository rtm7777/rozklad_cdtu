package database

import (
	"github.com/jinzhu/gorm"
	"github.com/rtm7777/rozklad_cdtu/app/models"
	"github.com/rtm7777/rozklad_cdtu/app/models/custom_structs"
	"github.com/rtm7777/rozklad_cdtu/app/models/json_models"
)

func CategoryItems(db *gorm.DB, category string) json_models.DBItems {
	var items json_models.DBItems
	records := models.DBTypesCollectionMap()[category]

	err := db.Find(records).Error
	if err != nil {
		panic(err)
	}
	items.Items = records

	return items
}

func UpdateItem(db *gorm.DB, data custom_structs.ItemsData) error {
	var err error
	item := models.DBTypesMap()[data.Category]

	err = item.Decode(data.Data)
	if err == nil {
		itemValue := item.Value()
		err = db.Model(itemValue).Updates(itemValue).Error
		if err != nil {
			return err
		}
	}
	if err != nil {
		return err
	}
	return nil
}

func AddItem(db *gorm.DB, category string) (error, interface{}) {
	item := models.DBTypesMap()[category]
	db.NewRecord(item)
	db.Create(item)
	return nil, item
}

func DeleteItems(db *gorm.DB, data custom_structs.ItemsForDeleting) error {
	item := models.DBTypesMap()[data.Category]
	err := db.Where("id in (?)", data.Ids).Delete(item).Error
	if err != nil {
		return err
	}
	return nil
}
