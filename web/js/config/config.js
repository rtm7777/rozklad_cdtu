define([],function() {
	return {
		days : {"Понеділок": 1, "Вівторок": 2, "Середа": 3, "Четвер": 4, "П'ятниця": 5, "Субота": 6},
		pairs : {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7},
		database : {
			faculties: [
				{field: "fullName", name: "Повне і'мя", editable: true},
				{field: "shortName", name: "Скорочене і'мя", editable: true}
			],
			audiences: [
				{field: "number", name: "Номер", editable: true},
				{field: "housing.number", name: "Корпус"},
				{field: "type", name: "Тип"},
				{field: "sets", name: "Кількість місць", editable: true}
			],
			teachers: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "department.name", name: "Кафедра"},
				{field: "lastName", name: "П.І.Б"},
				{field: "rank", name: "Звання", editable: true}
			],
			subjects: [
				{field: "subject", name: "Назва", editable: true}
			],
			groups: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "fullName", name: "Повне і'мя", editable: true},
				{field: "shortName", name: "Скорочене і'мя", editable: true},
				{field: "studentsCount", name: "Кількість студентів", editable: true},
				{field: "year", name: "Курс"}
			],
			housings: [
				{field: "number", name:"Номер", editable: true}
			],
			departments: [
				{field: "faculty.shortName", name: "Факультет"},
				{field: "name", name: "Назва", editable: true}
			]
		}
	};
});
