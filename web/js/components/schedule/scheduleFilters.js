/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

import SelectLink from "../selectLink";

class ScheduleFilters extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			filters: {}
		};
	}

	componentWillMount() {
		const store = this.context.store;
		store.on('initialDataLoaded', () => {
			const lala = store.getFacultiesYearsData();
			this.setState({filters: lala});
		});
	}

	render() {
		// let filters = this.props.filters.map((filter, i) => {
		// 	let props = {
		// 		values: filter.values,
		// 		key: i,
		// 		name: filter.name,
		// 		label: true,
		// 		elementConatainer: clickAwayStore
		// 	};

		// 	return <SelectLink {...props} />;
		// });

		return (
			<ul className='nav nav-pills pull-left filter-menu'>

			</ul>
		);
	}
}

export default ScheduleFilters;
