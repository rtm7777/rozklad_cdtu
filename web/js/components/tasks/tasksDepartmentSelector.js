/** @jsx */
import React from "react";
import Select from "../select";
import DepartmentsNavigation from "./departmentsNavigation";

class DepartmentSelector extends React.Component {
	constructor(props) {
		super(props);
		this.changedFaculty = this.changedFaculty.bind(this);
		this.state = {
			departments: []
		};
	}

	changedFaculty(el) {
		console.log(el);
		let departments = this.props.data.find((val) => val.facultyId == el.id).departments.map((el) => {
			return {optionValue: el.id, name: el.name};
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

		return (
			<div id='department_selector' className='panel panel-default'>
				<div className='panel-heading'>
					<Select
						button={true}
						name='Faculty'
						label={true}
						onChange={this.changedFaculty}
						values={selectValues}
					/>
				</div>
				<DepartmentsNavigation navList={this.state.departments} selectedOption={this.props.selectedDepartment} />
			</div>
		);
	}
}

export default DepartmentSelector;