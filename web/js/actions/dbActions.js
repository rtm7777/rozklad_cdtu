import dbDispatcher from "../dispatcher/dbDispatcher";

class DBActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	load() {
		this.dispatcher.dispatch({
			actionType: 'load'
		});
	}

	selectCategory(category) {
		this.dispatcher.dispatch({
			actionType: 'categorySelected',
			name: category
		});
	}
}

export default DBActions;
