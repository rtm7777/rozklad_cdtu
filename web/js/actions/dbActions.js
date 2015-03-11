import dbDispatcher from "../dispatcher/dbDispatcher";

class DBActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	create(count) {
		this.dispatcher.dispatch({
			actionType: 'create',
			count
		});
	}
}

export default DBActions;