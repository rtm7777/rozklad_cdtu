/** @jsx */
import React from "react";

import ActionMenuButton from "../../actionMenuButton";
import ScheduleActions from "./scheduleActions";
import ScheduleFilters from "./scheduleFilters";

class ActionMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className='actions-bar container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='panel clearfix panel-default'>
							<ScheduleFilters/>
							<ScheduleActions/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ActionMenu;
