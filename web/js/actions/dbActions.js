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

	create(count) {
		this.dispatcher.dispatch({
			actionType: 'create',
			count
		});
	}
}

export default DBActions;