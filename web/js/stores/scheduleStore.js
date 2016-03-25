import storage from "../services/localStorage";
import promise from "../libs/promise";
import dataBase from "../services/indexedDB";
import {EventEmitter} from "events";

class ScheduleStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = ScheduleStore.defaultState;
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
				}
		});
	}

	load() {
		let promises = [
			promise.get('get_faculty_list'),
			promise.get('get_days_pairs_list')
		];
		if (this.state.selectedCategory) {
			promises.push(this.loadFields(this.state.selectedCategory));
		}
		return Promise.all(promises).then((data) => {
			this.state.categoryList = data[0];
			this.loader = false;
		}).catch(() => {
			console.log('loading error');
		});
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

ScheduleStore.defaultState = {
	facultiesDepartments: [{'facultyId': 0, 'facultyName': "---", "departments": []}],
	selectedFaculty: storage.getValue('selectedFaculty') || '',
	selectedDepartment: storage.getValue('selectedDepartment') || '',
	fields: [],
	columns: []
};

export default ScheduleStore;
