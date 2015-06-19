import storage from "../services/localStorage";
import promise from "../libs/promise";
import {EventEmitter} from "events";

class TasksStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = TasksStore.defaultState;
		this.loader = true;
		this.selectedItems = [];

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'load':
					this.load().then(() => {
						this.emit('load');
						this.emit('loaderChange');
					});
					break;
				case 'categorySelected':
					this.changeCategory(action);
					break;
				case 'itemSelected':
					this.itemSelected(action);
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
			console.log("loading error");
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

}

TasksStore.defaultState = {
	facultiesDepartments: ["---"]
};

export default TasksStore;
