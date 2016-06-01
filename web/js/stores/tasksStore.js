import storage from "../services/localStorage";
import promise from "../libs/promise";
import dataBase from "../services/indexedDB";
import {EventEmitter} from "events";

class TasksStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = TasksStore.defaultState;
		this.loader = true;
		this.db = dataBase;
		this.selectedItems = [];

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
				case 'itemSelected':
					this.itemSelected(action);
					break;
				case 'itemChanged':
					this.itemChanged(action);
					break;
				case 'facultyChanged':
					this.facultyChanged(action);
					break;
				case 'loadTasks':
					this.loadTasks();
					break;
				case 'deleteAction':
					this.deleteTasks();
					break;
				case 'addAction':
					this.addTask();
					break;
			}
		});
	}

	load() {
		// this.db.synchronizeAll();
		let promises = [
			promise.get('/get_faculty_departments_list')
		];
		if (this.state.selectedFaculty && this.state.selectedDepartment) {
			promises.push(this.loadTasks(this.state.selectedDepartment));
		}

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

		this.state.fields = [];

		let department = action.departmentId;
		storage.saveValue('selectedDepartment', department);
		this.state.selectedDepartment = department;
		this.emit('load');
		this.loadTasks(action.departmentId).then(() => {
			this.emit('load');

			this.loader = false;
			this.emit('loaderChange');
		});
	}

	loadTasks(departmentId) {
		return promise.get('/get_tasks', {departmentId}).then(({columns, items}) => {
			this.state.columns = columns || [];
			return this.db.loadTasksDetails(items).then((data) => {
				this.state.fields = data || [];
			});
		});
	}

	itemSelected({id, selected}) {
		let selectedItems = this.selectedItems;
		if (selected) {
			selectedItems.push(id);
		} else {
			let i;
			if ((i = selectedItems.indexOf(id)) > -1) {
				selectedItems.splice(i, 1);
			}
		}
		this.actionMenuChange();
	}

	itemChanged(item) {
		let data = item.data;
		data.laboratoryTime = Number(data.laboratoryTime);
		data.lectureTime = Number(data.lectureTime);
		data.practiceTime = Number(data.practiceTime);

		promise.post('update_task', item.data, 'json').then(() => {

		});
	}

	deleteTasks() {
		let json = {
			ids: this.selectedItems
		};
		promise.post('delete_tasks', json, 'json').then(() => {
			this.state.fields = this.state.fields.filter(({id}) => {
				return this.selectedItems.indexOf(id) === -1;
			});
			this.emit('load');
			this.selectedItems = [];
			this.actionMenuChange();
		});
	}

	addTask() {
		promise.post('add_task', {faculty: this.state.selectedFaculty, department: this.state.selectedDepartment}).then((data) => {
			this.state.fields.push(data);
			console.log(data);
			this.emit('load');
		});
	}

	actionMenuChange() {
		this.emit('itemSelected');
	}

	getState() {
		return this.state;
	}

	getLoaderState() {
		return this.loader;
	}

	getSelectedItems() {
		return this.selectedItems;
	}

}

TasksStore.defaultState = {
	facultiesDepartments: [{'id': 0, 'name': "---", "departments": []}],
	selectedFaculty: storage.getValue('selectedFaculty') || '',
	selectedDepartment: storage.getValue('selectedDepartment') || '',
	fields: [],
	columns: []
};

export default TasksStore;
