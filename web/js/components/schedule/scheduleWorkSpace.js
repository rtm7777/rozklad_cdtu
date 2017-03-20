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
		return this.props.schedule.map(({groupId, groupName, schedule}) => {
			const props = {
				groupId,
				groupName,
				schedule,
				key: groupId
			};
			return <Group {...props}/>;
		});
	}

	render() {
		let tableShow = 'invisible';
		let groups;

		if (!this.state.loader) {
			tableShow = 'visible';
			groups = this.generateGroups();
		}

		return (
			<div className={`main-container ${tableShow}`}>
				<DaysPairsRows/>
				<div className='schedule-container'>
				  {groups}
				</div>
			</div>
		);
	}
}

export default WorkSpace;
