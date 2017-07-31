/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import ScheduleStore from "../../stores/scheduleStore";

import DaysPairsRows from "./scheduleDaysPairsRows";
import ScheduleCell from "./scheduleCell";
import ToggleButton from "../toggleButton";

class Group extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(ScheduleStore).isRequired
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
			<div className='group-container'>
				<div className='group-header'>
					<ToggleButton/>
					{this.props.groupName}
				</div>

			</div>
		);
	}
}

export default Group;
