class AdminActions {
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

export default AdminActions;
