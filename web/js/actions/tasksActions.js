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

	itemSelected(item, state) {
		this.dispatcher.dispatch({
			actionType: 'itemSelected',
			id: item,
			selected: state
		});
	}

	itemChanged(data) {
		this.dispatcher.dispatch({
			actionType: 'itemChanged',
			data
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

	deleteAction() {
		this.dispatcher.dispatch({
			actionType: 'deleteAction'
		});
	}

	addAction() {
		this.dispatcher.dispatch({
			actionType: 'addAction'
		});
	}
}

export default TasksActions;
