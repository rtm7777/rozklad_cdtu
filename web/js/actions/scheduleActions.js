class ScheduleActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	load() {
		this.dispatcher.dispatch({
			actionType: 'load'
		});
	}

	loadSchedule() {
		this.dispatcher.dispatch({
			actionType: 'loadSchedule'
		});
	}

	facultyChanged(facultyId) {
		this.dispatcher.dispatch({
			actionType: 'facultyChanged',
			facultyId
		});
	}

	yearChanged(year) {
		this.dispatcher.dispatch({
			actionType: 'yearChanged',
			year
		});
	}
}

export default ScheduleActions;
