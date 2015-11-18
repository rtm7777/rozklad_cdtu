/** @jsx */
import React from "react";
import Item from "../../item";
import Select from "../../select";

class GroupItem extends Item {
	constructor(props) {
		super(props);
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td className='no-padding'>
					<Select
						button
						name='facultyId'
						onChange={this.onSelectChanged}
						selected={this.props.data.facultyId}
						values={this.props.filters[0].values}
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.name}
						name='name'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.studentsCount}
						name='studentsCount'
						onChange={this.onInputChanged}
						onKeyDown={this.onNumberKeyDown}
						type='number'
					/>
				</td>
				<td className='no-padding'>
					<Select
						button
						name='year'
						onChange={this.onSelectChanged}
						selected={this.props.data.year}
						values={this.props.filters[1].values}
					/>
				</td>
			</tr>
		);
	}
}

export default GroupItem;
