/** @jsx */
import React from "react";
import DBItem from "../dbItem";

class HousingItem extends DBItem {
	constructor() {
		super();
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<input
						defaultValue={this.props.data.number}
						name="number"
						onChange={this.onInputChanged}
						type="text"
					/>
				</td>
			</tr>
		);
	}
}

export default HousingItem;
