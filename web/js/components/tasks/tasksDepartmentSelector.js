/** @jsx */
import React from "react";
import Select from "../select";
import DepartmentsNavigation from "./departmentsNavigation";
import TasksStore from "../../stores/tasksStore";

class DepartmentSelector extends React.Component {

	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(TasksStore).isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			departments: []
		};
	}

	componentDidMount() {
		let store = this.context.store;
		store.on('load', () => {
			let facultyId = this.props.selectedFaculty;
			if (facultyId) { this.selectDepartments(facultyId); }
		});
	}

	changedFaculty = (faculty) => {
		this.context.actions.changedFaculty(faculty.id);
		this.selectDepartments(faculty.id);
	}

	selectDepartments = (facultyId) => {
		let departments = this.props.data.find((val) => val.facultyId === facultyId).departments.map((department) => {
			return {optionValue: department.id, name: department.name};
		});
		this.setState({departments: departments});

	}

	render() {
		let selectValues = this.props.data.map((faculty) => {
			return {
				id: faculty.facultyId,
				value: faculty.facultyName
			};
		});
		let selectProps = {
			button: true,
			label: true,
			name: 'Faculty',
			onChange: this.changedFaculty,
			selected: this.props.selectedFaculty,
			values: selectValues
		};

		return (
			<div id='department_selector' className='panel panel-default'>
				<div className='panel-heading'>
					<Select {...selectProps} />
				</div>
				<DepartmentsNavigation navList={this.state.departments} selectedOption={this.props.selectedDepartment} />
			</div>
		);
	}
}

export default DepartmentSelector;
