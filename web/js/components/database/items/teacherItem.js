/** @jsx */
import React from "react";
import Item from "../../item";
import Select from "../../select";
import Popover from "../../popover";
import clickAwayStore from "../../../stores/clickAwayStore";

class TeacherItem extends Item {
	constructor() {
		super();
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
				<td className='no-padding'>
					<Select
						button
						name='departmentId'
						onChange={this.onSelectChanged}
						selected={this.props.data.departmentId}
						values={this.props.filters[1].values}
					/>
				</td>
				<td className='no-padding'>
					<Popover
						text={'text'}
						elementConatainer={clickAwayStore}
					>
						<input
							defaultValue={this.props.data.lastName}
							name='lastName'
							onChange={this.onInputChanged}
							type='text'
						/>
						<input
							defaultValue={this.props.data.firstName}
							name='firstName'
							onChange={this.onInputChanged}
							type='text'
						/>
						<input
							defaultValue={this.props.data.middleName}
							name='middleName'
							onChange={this.onInputChanged}
							type='text'
						/>
					</Popover>
				</td>
				<td>
					<input
						defaultValue={this.props.data.rank}
						name='rank'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
			</tr>
		);
	}
}

export default TeacherItem;
