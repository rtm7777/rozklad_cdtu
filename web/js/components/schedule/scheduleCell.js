/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

class SсheduleCell extends React.Component {
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
			<div className="pair-container">
				<div className="admin-sub"></div>
					<hr className="admin-sub-separator"/>
				<div className="admin-sub"></div>
			</div>
		);
	}
}

export default SсheduleCell;
