/** @jsx */
import React from "react";
import DBItem from "../dbItem";

class SubjectItem extends DBItem {
	constructor() {
		super();
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<input onChange={this.onInputChanged} type="text" name="subject" defaultValue={this.props.data.subject} />
				</td>
			</tr>
		);
	}
}

export default SubjectItem;
