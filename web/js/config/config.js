define([], () => {
	return {
		days : {"Понеділок": 1, "Вівторок": 2, "Середа": 3, "Четвер": 4, "П'ятниця": 5, "Субота": 6},
		pairs : {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7},
		database : {
			faculties: {
				fields: ["Повне і'мя", "Скорочене і'мя"],
				filters: []
			},
			audiences: {
				fields: ["Номер", "Корпус", "Тип", "Кількість місць"],
				filters: ["housing"]
			},
			teachers: {
				fields: ["Факультет", "Кафедра", "П.І.Б", "Звання"],
				filters: ["faculty", "department"]
			},
			subjects: {
				fields: ["Назва"],
				filters: []
			},
			groups: {
				fields: ["Факультет", "Повне і'мя", "Скорочене і'мя", "Кількість студентів", "Курс"],
				filters: ["faculty", "year"]
			},
			housings: {
				fields: ["Номер"],
				filters: []
			},
			departments: {
				fields: ["Факультет", "Назва"],
				filters: ["faculty"]
			}
		}
	};
});
