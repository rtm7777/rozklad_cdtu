/** @jsx */
import React from "react";
import DBItem from "../dbItem";
import Select from "../select";

class GroupItem extends DBItem {
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
				<td>
					<input onChange={this.onInputChanged} type="text" name="name" defaultValue={this.props.data.name} />
				</td>
				<td>
					<input onChange={this.onInputChanged} type="number" name="studentsCount" defaultValue={this.props.data.studentsCount} />
				</td>
				<td className="no-padding">
					<Select onChange={this.onSelectChanged} values={this.props.filters[1].values} selected={this.props.data.year} button={true} />
				</td>
			</tr>
		);
	}
}

export default GroupItem;
