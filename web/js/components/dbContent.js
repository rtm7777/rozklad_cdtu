/** @jsx */
import React from "react";
import ComponentWithloader from "./componentWithLoader";
import AudienceItem from "./items/audienceItem";
import DepartmentItem from "./items/departmentItem";
import FacultyItem from "./items/facultyItem";
import GroupItem from "./items/groupItem";
import HousingItem from "./items/housingItem";
import SubjectItem from "./items/subjectItem";
import TeacherItem from "./items/teacherItem";
import DBStore from "../stores/dbStore";

class Content extends ComponentWithloader {
	constructor(props) {
		super(props);
	}

	itemByType(type, props) {
		let items = {
			audiences:   (props) => <AudienceItem {...props} />,
			departments: (props) => <DepartmentItem {...props} />,
			faculties:   (props) => <FacultyItem {...props} />,
			groups:      (props) => <GroupItem {...props} />,
			housings:    (props) => <HousingItem {...props} />,
			subjects:    (props) => <SubjectItem {...props} />,
			teachers:    (props) => <TeacherItem {...props} />
		};

		return items[type](props);
	}

	render() {
		let headerCols = this.props.columns.map((column, i) => {
			return (
				<th key={i}>
					{column}
				</th>
			);
		});

		let items = [];
		if (this.props.fields) {
			items = this.props.fields.map(field => {
				let props = {
					category: this.props.selectedCategory,
					filters: this.props.filters,
					data: field,
					key: field.id
				};

				return this.itemByType(this.props.selectedCategory, props);
			});
		}

		let loaderShow = 'visible';
		let tableShow = 'invisible';
		if (!this.state.loader) {
			loaderShow = 'invisible';
			tableShow = 'visible';
		}
		return (
			<div id="database_container" className="col-lg-9">
				<div className={`loader ${loaderShow}`}><img src="/public/img/loader.svg"/></div>
				<table className={`table table-bordered table-hover table-striped table-condensed ${tableShow}`}>
					<thead>
						<tr>
							{headerCols}
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
		);
	}
}

Content.contextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default Content;
