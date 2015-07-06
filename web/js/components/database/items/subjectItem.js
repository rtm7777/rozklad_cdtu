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
					<input
						defaultValue={this.props.data.subject}
						name='subject'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
			</tr>
		);
	}
}

export default SubjectItem;
