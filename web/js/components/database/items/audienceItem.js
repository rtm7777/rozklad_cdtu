/** @jsx */
import React from "react";
import Item from "../../item";
import SelectButton from "../../selectButton";
import clickAwayStore from "../../../stores/clickAwayStore";

class AudienceItem extends Item {
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
				<td className='no-padding'>
					<SelectButton
						name='housingId'
						onChange={this.onSelectChanged}
						selected={this.props.data.housingId}
						values={this.props.filters[0].values}
						elementConatainer={clickAwayStore}
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.type}
						name='type'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.sets}
						name='sets'
						onChange={this.onInputChanged}
						onKeyDown={this.onNumberKeyDown}
						type='number'
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.note}
						name='note'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
			</tr>
		);
	}
}

export default AudienceItem;
