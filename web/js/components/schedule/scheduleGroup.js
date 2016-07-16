/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

import DaysPairsRows from "./scheduleDaysPairsRows";
import ToggleButton from "../toggleButton";

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
				<div className="group-header height47 padding1015" data-toggle="buttons">
					<ToggleButton/>
				</div>
				<div id="<%= groupId %>_<%= day %>_<%= pair %>" className="pair-container">
					<div className="admin-sub"></div>
						<hr className="admin-sub-separator"/>
					<div className="admin-sub"></div>
				</div>
			</div>
		);
	}
}

export default Group;
