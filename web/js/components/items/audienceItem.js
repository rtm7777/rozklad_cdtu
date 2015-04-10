/** @jsx */
import React from "react";
import DBItem from "../dbItem";
import Select from "../select";

class AudienceItem extends DBItem {
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
				<td className="no-padding">
					<Select
						button={true}
						name="housingId"
						onChange={this.onSelectChanged}
						selected={this.props.data.housingId}
						values={this.props.filters[0].values}
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.type}
						name="type"
						onChange={this.onInputChanged}
						type="text"
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.sets}
						name="sets"
						onChange={this.onInputChanged}
						type="number"
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.note}
						name="note"
						onChange={this.onInputChanged}
						type="text"
					/>
				</td>
			</tr>
		);
	}
}

export default AudienceItem;
