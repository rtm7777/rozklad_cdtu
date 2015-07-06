class TasksActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	load() {
		this.dispatcher.dispatch({
			actionType: 'load'
		});
	}

	selectDepartment(departmentId) {
		this.dispatcher.dispatch({
			actionType: 'departmentSelected',
			departmentId
		});
	}
}

export default TasksActions;
