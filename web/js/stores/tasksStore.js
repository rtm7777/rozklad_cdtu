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
				case 'categorySelected':
					this.changeCategory(action);
					break;
				case 'itemSelected':
					this.itemSelected(action);
					break;
				}
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

};

export default TasksStore;
