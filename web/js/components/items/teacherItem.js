/** @jsx */
import React from "react";
import DBItem from "../dbItem";
import Select from "../select";

class TeacherItem extends DBItem {
	constructor() {
		super();
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td className="no-padding">
					<Select
						button={true}
						onChange={this.onSelectChanged}
						selected={this.props.data.facultyId}
						values={this.props.filters[0].values}
					/>
				</td>
				<td className="no-padding">
					<Select
						button={true}
						onChange={this.onSelectChanged}
						selected={this.props.data.departmentId}
						values={this.props.filters[1].values}
					/>
				</td>
				<td className="no-padding">
					<div className="dropdown">
						<button tabindex="0" className="popove btn" role="button" data-toggle="popover" data-placement="bottom" data-content="khhkufjh">
							{this.props.data.firstName}
						</button>
					</div>
				</td>
				<td>
					<input
						defaultValue={this.props.data.rank}
						name="rank"
						onChange={this.onInputChanged}
						type="text"
					/>
				</td>
			</tr>
		);
	}
}

export default TeacherItem;
