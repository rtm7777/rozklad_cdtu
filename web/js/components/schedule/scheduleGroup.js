/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

import DaysPairsRows from "./scheduleDaysPairsRows";
import ToggleButton from "../toggleButton";

const SheduleTask = (props) => {
	return (
		<div className="pair-container">
			<div className="admin-sub"></div>
				<hr className="admin-sub-separator"/>
			<div className="admin-sub"></div>
		</div>
	);
};

class Group extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}


	render() {

		return (
			<div className="group-container">
				<div className="group-header">
					<ToggleButton/>
				</div>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
				<SheduleTask/>
			</div>
		);
	}
}

export default Group;
