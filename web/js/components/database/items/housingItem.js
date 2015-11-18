/** @jsx */
import React from "react";
import Item from "../../item";

class HousingItem extends Item {
	constructor(props) {
		super(props);
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<input
						defaultValue={this.props.data.number}
						name='number'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
			</tr>
		);
	}
}

export default HousingItem;
