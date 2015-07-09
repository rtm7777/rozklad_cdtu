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

	changedFaculty(facultyId) {
		this.dispatcher.dispatch({
			actionType: 'facultyChanged',
			facultyId
		});
	}

	loadTasks() {
		this.dispatcher.dispatch({
			actionType: 'loadTasks'
		});
	}
}

export default TasksActions;
