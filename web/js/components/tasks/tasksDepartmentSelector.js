/** @jsx */
import React from "react";
import Select from "../select";
import DepartmentsNavigation from "./departmentsNavigation";

class DepartmentSelector extends React.Component {
	constructor(props) {
		super(props);
		this.changedFaculty = this.changedFaculty.bind(this);
	}

	changedFaculty(el) {
		console.log(el);
	}

	render() {
		let selectValues = this.props.data.map((faculty) => {
			return {
				id: faculty.facultyId,
				value: faculty.facultyName
			};
		});

		return (
			<div id="department_selector" className="panel panel-default">
				<div className="panel-heading">
					<Select
						button={true}
						name="departmentId"
						onChange={this.changedFaculty}
						values={selectValues}
					/>
				</div>
				<DepartmentsNavigation navList={[{optionValue: 345, name: "sdtgsd"}]} />
			</div>
		);
	}
}

export default DepartmentSelector;