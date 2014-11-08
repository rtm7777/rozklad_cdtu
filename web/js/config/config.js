define([],function() {
	return {
		days : {"Понеділок": 1, "Вівторок": 2, "Середа": 3, "Четвер": 4, "П'ятниця": 5, "Субота": 6},
		pairs : {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7},
		database : {
			faculties: [
				{field: "fullName", name: "Повне і'мя"},
				{field: "shortName", name: "Скорочене і'мя"}
			],
			audiences: [
				{field: "number", name: "Номер"},
				{field: "housing.number", name: "Корпус"},
				{field: "type", name: "Тип"},
				{field: "sets", name: "Кількість місць"}
			],
			teachers: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "department.name", name: "Кафедра"},
				{field: "lastName", name: "П.І.Б"},
				{field: "rank", name: "Звання"}
			],
			subjects: [
				{field: "subject", name: "Назва"}
			],
			groups: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "fullName", name: "Повне і'мя"},
				{field: "shortName", name: "Скорочене і'мя"},
				{field: "studentsCount", name: "Кількість студентів"},
				{field: "year", name: "Курс"}
			],
			housings: [
				{field: "number", name:"Номер"}
			],
			departments: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "name", name: "Назва"}
			]
		}
	};
});
