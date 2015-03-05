import dbDispatcher from "../dispatcher/dbDispatcher";

export var dbActions = {
	create: function() {
		dbDispatcher.dispatch({
			actionType: 'create'
		});
	}
};