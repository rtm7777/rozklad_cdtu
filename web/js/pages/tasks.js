/** @jsx */
import React from "react";
import Dispatcher from "../dispatcher/dispatcher";
import DepartmentSelector from "../components/tasks/tasksDepartmentSelector";
import Content from "../components/tasks/tasksContent";
import TasksActions from "../actions/tasksActions";
import TasksStore from "../stores/tasksStore";

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
			let state = store.getState();
			this.setState(state);
		});

		this.actions.load();
	}

	componentWillUnmount() {
		this.store.removeListener('load');
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
							<Content {...contentProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Tasks;
