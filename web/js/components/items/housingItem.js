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
					<input onChange={this.onInputChanged} type="text" name="number" defaultValue={this.props.data.number} />
				</td>
			</tr>
		);
	}
}

export default HousingItem;
