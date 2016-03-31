/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";
import I18n from "../../services/i18n";

import DaysPairsRows from "./scheduleDaysPairsRows";

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


	render() {
		let tableShow = 'invisible';
		if (!this.state.loader) {
			tableShow = 'visible';
		}

		return (
			<div className='main-container'>
				<DaysPairsRows/>
				<div/>
			</div>
		);
	}
}

export default WorkSpace;
