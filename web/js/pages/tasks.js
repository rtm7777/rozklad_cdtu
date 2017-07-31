/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import Dispatcher from "../dispatcher/dispatcher";
import TasksActions from "../actions/tasksActions";
import TasksStore from "../stores/tasksStore";
import clickAway from "../libs/clickAwayUtils";

import Loader from "../components/tasks/tasksLoader";
import ActionMenu from "../components/tasks/tasksActionMenu";
import DepartmentSelector from "../components/tasks/tasksDepartmentSelector";
import Content from "../components/tasks/tasksContent";

class Tasks extends React.Component {
	static childContextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(TasksStore).isRequired
	};

	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = TasksStore.defaultState;
		this.actions = new TasksActions(dispatcher);
		this.store = new TasksStore(dispatcher, this.state);

		this.store.on('load', () => {
			const state = this.store.getState();
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
		const departmentSelectorProps = {
			data: this.state.facultiesDepartments,
			selectedFaculty: this.state.selectedFaculty,
			selectedDepartment: this.state.selectedDepartment
		};
		const contentProps = {
			fields: this.state.fields,
			columns: this.state.columns
		};
		return (
			<div>
				<ActionMenu/>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3'>
							<DepartmentSelector {...departmentSelectorProps} />
						</div>
						<div id='work_space' className='col-lg-9'>
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
