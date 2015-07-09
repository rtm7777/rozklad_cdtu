import storage from "../services/localStorage";
import promise from "../libs/promise";
import {EventEmitter} from "events";

class TasksStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = TasksStore.defaultState;
		this.loader = true;

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'load':
					this.load().then(() => {
						this.emit('load');
						this.emit('loaderChange');
					});
					break;
				case 'departmentSelected':
					this.departmentSelected(action);
					break;
				case 'facultyChanged':
					this.facultyChanged(action);
					break;
				case 'loadTasks':
					this.loadTasks();
					break;
				}
		});
	}

	load() {
		let promises = [promise.get('/get_faculty_departments_list')];

		return Promise.all(promises).then((data) => {
			this.state.facultiesDepartments = data[0];
			this.loader = false;
		}).catch(() => {
			console.log('loading error');
		});
	}

	facultyChanged(action) {
		this.state.selectedFaculty = action.facultyId;
		storage.saveValue('selectedFaculty', action.facultyId);
		this.state.selectedDepartment = '';
		storage.saveValue('selectedDepartment', '');
		this.emit('load');
	}

	departmentSelected(action) {
		this.loader = true;
		this.emit('loaderChange');

		let department = action.departmentId;
		storage.saveValue('selectedDepartment', department);
		this.state.selectedDepartment = department;
		this.emit('load');
		// this.loadFields(category).then(data => {
		// 	this.emit('load');

		// 	this.loader = false;
		// 	this.emit('loaderChange');
		// });
	}

	loadTasks() {
		return 0;
	}

	getState() {
		return this.state;
	}

	getLoaderState() {
		return this.loader;
	}

}

TasksStore.defaultState = {
	facultiesDepartments: [{'facultyId': 0, 'facultyName': "---", "departments": []}],
	selectedFaculty: storage.getValue('selectedFaculty') || '',
	selectedDepartment: storage.getValue('selectedDepartment') || ''
};

export default TasksStore;
