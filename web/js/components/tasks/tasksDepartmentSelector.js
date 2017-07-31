/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import SelectButton from "../selectButton";
import Loader from "./tasksLoader";
import DepartmentsNavigation from "./departmentsNavigation";
import TasksStore from "../../stores/tasksStore";
import I18n from "../../services/i18n";
import clickAwayStore from "../../stores/clickAwayStore";

class DepartmentSelector extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(TasksStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			departments: []
		};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('load', () => {
			let facultyId = this.props.selectedFaculty;
			if (facultyId) { this.selectDepartments(facultyId); }
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('load');
	}

	changedFaculty = ({id}) => {
		this.context.actions.changedFaculty(id);
		this.selectDepartments(id);
	};

	selectDepartments = (facultyId) => {
		let data = this.props.data.find((val) => val.id == facultyId);
		if (data) {
			let departments = data.departments.map(({id, name}) => {
				return {optionValue: id, name};
			});
			this.setState({departments});
		}
	};

	render() {
		let selectValues = this.props.data.map(({id, value}) => {
			return {
				id,
				value
			};
		});
		let selectProps = {
			label: true,
			name: I18n.t('faculty'),
			onChange: this.changedFaculty,
			selected: this.props.selectedFaculty,
			values: selectValues,
			elementConatainer: clickAwayStore
		};

		return (
			<div id='department_selector' className='left-navigation panel panel-default'>
				<div className='panel-heading'>
					<SelectButton {...selectProps} />
				</div>
				<Loader/>
				<DepartmentsNavigation navList={this.state.departments} selectedOption={this.props.selectedDepartment} />
			</div>
		);
	}
}

export default DepartmentSelector;
