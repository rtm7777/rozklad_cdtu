import dbDispatcher from "../dispatcher/dbDispatcher";

export var dbActions = {
	create(count) {
		dbDispatcher.dispatch({
			actionType: 'create',
			count
		});
	}
};