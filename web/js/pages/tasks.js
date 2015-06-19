/** @jsx */
import React from "react";
import Dispatcher from '../dispatcher/dispatcher';
import DepartmentSelector from '../components/tasks/tasksDepartmentSelector';
import TasksActions from "../actions/tasksActions";
import TasksStore from "../stores/tasksStore";

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = TasksStore.defaultState;
		this.actions = new TasksActions(dispatcher);
		this.store = new TasksStore(dispatcher, this.state);
	}

	getChildContext() {
		return {
			actions: this.actions,
			store: this.store
		};
	}

	componentWillMount() {
		let store = this.store;

		store.on('load', () => {
			let state = store.state;
			this.setState(state);
		});

		this.actions.load();
	}

	componentWillUnmount() {
		this.store.removeListener('load');
	}

	render() {

		return (
			<div className="database">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<DepartmentSelector data={this.state.facultiesDepartments} />
						</div>
						<div id="database_container" className="col-lg-9">
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Tasks.childContextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(TasksStore).isRequired
};

export default Tasks;
