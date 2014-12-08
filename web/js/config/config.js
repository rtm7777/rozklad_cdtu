define([],function() {
	return {
		days : {"Понеділок": 1, "Вівторок": 2, "Середа": 3, "Четвер": 4, "П'ятниця": 5, "Субота": 6},
		pairs : {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7},
		database : {
			faculty: {
				fields: ["Повне і'мя", "Скорочене і'мя"],
				filters: []
			},
			audience: {
				fields: ["Номер", "Корпус", "Тип", "Кількість місць"],
				filters: ["housing"]
			},
			teacher: {
				fields: ["Факультет", "Кафедра", "П.І.Б", "Звання"],
				filters: ["faculty", "department"]
			},
			subject: {
				fields: ["Назва"],
				filters: []
			},
			group: {
				fields: ["Факультет", "Повне і'мя", "Скорочене і'мя", "Кількість студентів", "Курс"],
				filters: ["faculty", "year"]
			},
			housing: {
				fields: ["Номер"],
				filters: []
			},
			department: {
				fields: ["Факультет", "Назва"],
				filters: ["faculty"]
			}
		}
	};
});
