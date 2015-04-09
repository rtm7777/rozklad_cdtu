/** @jsx */
import React from "react";
import DBItem from "../dbItem";

class FacultyItem extends DBItem {
	constructor() {
		super();
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<input onChange={this.onInputChanged} type="text" name="fullName" defaultValue={this.props.data.fullName} />
				</td>
				<td>
					<input onChange={this.onInputChanged} type="text" name="shortName" defaultValue={this.props.data.shortName} />
				</td>
			</tr>
		);
	}
}

export default FacultyItem;
