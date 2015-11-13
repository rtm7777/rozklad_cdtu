/** @jsx */
import React from "react";
import Dispatcher from "../dispatcher/dispatcher";
import TasksActions from "../actions/tasksActions";
import TasksStore from "../stores/tasksStore";
import clickAway from "../libs/clickAwayUtils";

import Loader from "../components/tasks/tasksLoader";
import DepartmentSelector from "../components/tasks/tasksDepartmentSelector";
import Content from "../components/tasks/tasksContent";

class Tasks extends React.Component {
	static childContextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(TasksStore).isRequired
	}

	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = TasksStore.defaultState;
		this.actions = new TasksActions(dispatcher);
		this.store = new TasksStore(dispatcher, this.state);

		this.store.on('load', () => {
			let state = this.store.getState();
			this.setState(state);
		});

		this.actions.load();
		document.addEventListener('mousedown', clickAway.checkClickAway);
	}

	getChildContext() {
		return {
			actions: this.actions,
			store: this.store
		};
	}

	componentWillUnmount() {
		this.store.removeListener('load');
		document.removeEventListener('mousedown', clickAway.checkClickAway);
	}

	render() {
		let departmentSelectorProps = {
			data: this.state.facultiesDepartments,
			selectedFaculty: this.state.selectedFaculty,
			selectedDepartment: this.state.selectedDepartment
		};
		let contentProps = {
			fields: this.state.fields,
			columns: this.state.columns
		};
		return (
			<div className='database'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3'>
							<DepartmentSelector {...departmentSelectorProps} />
						</div>
						<div id='database_container' className='col-lg-9'>
							<Loader/>
							<Content {...contentProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Tasks;
