import storage from "../services/localStorage";
import promise from "../libs/promise";
import dbDispatcher from "../dispatcher/dbDispatcher";
import {EventEmitter} from "events";

const CHANGE_EVENT = 'change';

class DBStore extends EventEmitter {
	constructor(dispatcher) {
		this.state = DBStore.defaultState;

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'create':
					this.emit('change');
					break;
				case 'load':
					this.load().then(() => {
						this.emit('load');
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
			this.state.loader = false;
		}, Promise.resolve()).catch(() => {
			console.log("loading error");
		});
	}

	changeCategory(action) {
		this.state.loader = true;
		this.state.filters = [];
		this.state.fields = [];

		this.emit('load');

		let category = action.name;
		storage.saveValue("category", category);
		this.state.selectedCategory = category;
		this.emit('load');
		this.loadFields(category).then(data => {
			this.state.loader = false;
			this.emit('load');
		});
	}

	loadFields(category) {
		return promise.post('/get_category', {category: category}).then(data => {
			this.state.fields = data.items;
			this.state.columns = data.columns;
			this.state.filters = data.filters || [];
		});
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getState() {
		return this.state;
	}
}

DBStore.defaultState = {
	categoryList: [],
	selectedCategory: storage.getValue("category") || "",
	fields: [],
	columns: [],
	filters: [],
	loader: true,
	error_message: ""
};

export default DBStore;