/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import ScheduleStore from "../../../stores/scheduleStore";
import I18n from "../../../services/i18n";
import clickAwayStore from "../../../stores/clickAwayStore";

import SelectLink from "../../selectLink";

class ScheduleFilters extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = ScheduleStore.defaultFiltersState;
	}

	componentWillMount() {
		const store = this.context.store;
		store.on('initialDataLoaded', () => { this.renderFilters(); });
		store.on('filterChanged', () => { this.renderFilters(); });
	}

	renderFilters() {
		this.setState(this.context.store.getFiltersState());
	}

	facultyChanged = ({id}) => {
		this.context.actions.facultyChanged(id);
	};

	yearChanged = ({id}) => {
		this.context.actions.yearChanged(id);
	};

	render() {
		let filtersData = this.state.filtersData;
		let facultyFilterProps = {
			notAutonomic: true,
			values: filtersData.faculties,
			onChange: this.facultyChanged,
			selected: this.state.selectedFaculty,
			name: I18n.t('faculty'),
			label: true,
			elementConatainer: clickAwayStore
		};
		let yearFilterProps = {
			notAutonomic: true,
			values: this.state.filtersData.years,
			onChange: this.yearChanged,
			selected: this.state.selectedYear,
			name: I18n.t('groupYear'),
			label: true,
			elementConatainer: clickAwayStore
		};

		return (
			<ul className='nav nav-pills pull-left filter-menu'>
				<SelectLink {...facultyFilterProps} />
				<SelectLink {...yearFilterProps} />
			</ul>
		);
	}
}

export default ScheduleFilters;
