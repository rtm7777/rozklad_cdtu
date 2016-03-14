/** @jsx */
import React from "react";
import SelectButton from "../selectButton";
import Loader from "./tasksLoader";
import DepartmentsNavigation from "./departmentsNavigation";
import TasksStore from "../../stores/tasksStore";
import I18n from "../../services/i18n";
import clickAwayStore from "../../stores/clickAwayStore";

class DepartmentSelector extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(TasksStore).isRequired
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

	changedFaculty = (faculty) => {
		this.context.actions.changedFaculty(faculty.id);
		this.selectDepartments(faculty.id);
	};

	selectDepartments = (facultyId) => {
		let data = this.props.data.find((val) => val.facultyId == facultyId);
		if (data) {
			let departments = data.departments.map(({id, name}) => {
				return {optionValue: id, name: name};
			});
			this.setState({departments});
		}
	};

	render() {
		let selectValues = this.props.data.map(({facultyId, facultyName}) => {
			return {
				id: facultyId,
				value: facultyName
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
			<div id='department_selector' className='panel panel-default'>
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
