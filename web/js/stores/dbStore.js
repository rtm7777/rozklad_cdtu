import storage from "../services/localStorage";
import promise from "../libs/promise";
import dbDispatcher from "../dispatcher/dbDispatcher";
import {EventEmitter} from "events";

const CHANGE_EVENT = 'change';

class DBStore extends EventEmitter {
	constructor(dispatcher) {
		this.state = DBStore.defaultState;
		this.loader = true;

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
				}
		});
	}

	load() {
		let promises = [promise.post('/get_category_list')];
		if (this.state.selectedCategory) {
			promises.push(this.loadFields(this.state.selectedCategory));
		}
		return Promise.all(promises).then((data) => {
			this.state.categoryList = data[0];
			this.loader = false;
		}).catch(() => {
			console.log("loading error");
		});
	}

	changeCategory(action) {
		this.loader = true;
		this.emit('loaderChange');

		this.state.filters = [];
		this.state.fields = [];

		let category = action.name;
		storage.saveValue("category", category);
		this.state.selectedCategory = category;
		this.emit('load');
		this.loadFields(category).then(data => {
			this.emit('load');

			this.loader = false;
			this.emit('loaderChange');
		});
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	loadFields(category) {
		return promise.post('/get_category', {category: category}).then(data => {
			this.state.fields = data.items;
			this.state.columns = data.columns;
			this.state.filters = data.filters || [];
		});
	}

	getState() {
		return this.state;
	}

	getLoaderState() {
		return this.loader;
	}
}

DBStore.defaultState = {
	categoryList: [],
	selectedCategory: storage.getValue("category") || "",
	fields: [],
	columns: [],
	filters: [],
	error_message: ""
};

export default DBStore;
