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
					<input onChange={this.onInputChanged} type="text" name="number" defaultValue={this.props.data.number} />
				</td>
				<td className="no-padding">
					<Select onChange={this.onSelectChanged} values={this.props.filters[0].values} selected={this.props.data.housingId} button={true} />
				</td>
				<td>
					<input onChange={this.onInputChanged} type="text" name="type" defaultValue={this.props.data.type} />
				</td>
				<td>
					<input onChange={this.onInputChanged} type="number" name="sets" defaultValue={this.props.data.sets} />
				</td>
				<td>
					<input onChange={this.onInputChanged} type="text" name="note" defaultValue={this.props.data.note} />
				</td>
			</tr>
		);
	}
}

export default AudienceItem;
