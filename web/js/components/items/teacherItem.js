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
					<Select onChange={this.onSelectChanged} values={this.props.filters[0].values} selected={this.props.data.facultyId} button={true} />
				</td>
				<td className="no-padding">
					<Select onChange={this.onSelectChanged} values={this.props.filters[1].values} selected={this.props.data.departmentId} button={true} />
				</td>
				<td className="no-padding">
					<div className="dropdown">
						<button tabindex="0" className="popove btn" role="button" data-toggle="popover" data-placement="bottom" data-content="khhkufjh">
							{this.props.data.firstName}
						</button>
					</div>
				</td>
				<td>
					<input onChange={this.onInputChanged} type="text" name="rank" defaultValue={this.props.data.rank} />
				</td>
			</tr>
		);
	}
}

export default TeacherItem;
