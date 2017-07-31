import storage from "../services/localStorage";
import promise from "../libs/promise";
import {EventEmitter} from "events";

class AdminStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = AdminStore.defaultState;
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
				case 'itemChanged':
					this.itemChanged(action);
					break;
				case 'deleteAction':
					this.deleteItems();
					break;
				case 'addAction':
					this.addItem();
					break;
			}
		});
	}

	load() {
		return Promise.resolve()
	}

	changeCategory(action) {
		this.loader = true;
		this.emit('loaderChange');
		this.emit('load');
	}

	itemSelected(item) {

	}

	itemChanged(item) {

	}

	deleteItems() {

	}

	addItem() {

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

AdminStore.defaultState = {
	selectedCategory: '',
	fields: []
};

export default AdminStore;
