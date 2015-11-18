/** @jsx */
import React from "react";
import Item from "../../item";

class SubjectItem extends Item {
	constructor(props) {
		super(props);
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
