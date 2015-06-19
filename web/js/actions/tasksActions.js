class TasksActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	load() {
		this.dispatcher.dispatch({
			actionType: 'load'
		});
	}

	selectDepartment(department) {
		this.dispatcher.dispatch({
			actionType: 'departmentSelected',
			name: department
		});
	}
}

export default TasksActions;
