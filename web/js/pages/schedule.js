/** @jsx */
import React from "react";
import Dispatcher from "../dispatcher/dispatcher";
import ScheduleActions from "../actions/scheduleActions";
import ScheduleStore from "../stores/scheduleStore";
import clickAway from "../libs/clickAwayUtils";

import Loader from "../components/schedule/scheduleLoader";
import ActionMenu from "../components/schedule/scheduleActionMenu";
import WorkSpace from "../components/schedule/scheduleWorkSpace";
import TaskList from "../components/schedule/scheduleTaskList";

class Schedule extends React.Component {
	static childContextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = ScheduleStore.defaultState;
		this.actions = new ScheduleActions(dispatcher);
		this.store = new ScheduleStore(dispatcher, this.state);

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
		let contentProps = {
			fields: this.state.fields,
			columns: this.state.columns
		};
		return (
			<div>
				<ActionMenu/>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3'>
							<TaskList/>
						</div>
						<div id='work_space' className='col-lg-9'>
							<Loader/>
							<WorkSpace {...contentProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Schedule;
