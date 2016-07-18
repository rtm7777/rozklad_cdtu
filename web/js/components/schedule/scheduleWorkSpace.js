/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

import DaysPairsRows from "./scheduleDaysPairsRows";
import Group from "./scheduleGroup";

class WorkSpace extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {loader: false};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('loaderChange', () => {
			this.setState({loader: store.getLoaderState()});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('loaderChange');
	}

	generateGroups() {
		console.log(this.props);
		return this.props.schedule.map((a, i) => {
			const props = {
				key: i
			};
			return <Group {...props}/>;
		});
	}

	render() {
		const groups = this.generateGroups();
		let tableShow = 'invisible';
		if (!this.state.loader) {
			tableShow = 'visible';
		}

		return (
			<div className='main-container'>
				<DaysPairsRows/>
				<div className='schedule-container'>
				  {groups}
				</div>
			</div>
		);
	}
}

export default WorkSpace;
