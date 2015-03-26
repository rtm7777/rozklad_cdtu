const itemCellsSchema = {
	audiences(data) {
		return [
			{data: data.number},
			{data: data.housingId, type: 'selectbox', order: 0},
			{data: data.type},
			{data: data.sets},
			{data: data.note}
		];
	},
	departments(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name}
		];
	},
	faculties(data) {
		return [
			{data: data.fullName},
			{data: data.shortName}
		];
	},
	groups(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name},
			{data: data.studentsCount},
			{data: data.year, type: 'selectbox', order: 1}
		];
	},
	housings(data) {
		return [
			{data: data.number}
		];
	},
	subjects(data) {
		return [
			{data: data.subject}
		];
	},
	teachers(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.departmentId, type: 'selectbox', order: 1},
			{data: [data.firstName, data.lastName, data.middleName], type: 'name'},
			{data: data.rank}
		];
	}
};

export default itemCellsSchema;