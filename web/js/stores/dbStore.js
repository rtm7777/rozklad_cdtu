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
					console.log(action, action.count);
					this.emit('change');
					break;
				case 'load':
					console.log(action);
					console.log("load action emited");
					this.load();
					break;
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

			this.emit('load');
		});
	}

	changeCategory(child) {
		this.setState({
			loader: true,
			filters: [],
			fields: []
		});

		let category = child.props.data.category;
		storage.saveValue("category", category);
		this.setState({selectedCategory: category});
		this.loadFields(category).then(data => {
			this.setState({loader: false});
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