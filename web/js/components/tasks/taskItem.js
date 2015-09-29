/** @jsx */
import React from "react";
import Item from "../item";
import Select from "../select";
import SelectInput from "../selectInput";
import Popover from "../popover";
import TasksStore from "../../stores/tasksStore";

class TaskItem extends Item {
	static contextTypes = {
		store: React.PropTypes.instanceOf(TasksStore).isRequired
	}

	constructor() {
		super();
	}

	onInputSelectChanged(value) {
		console.log(value);
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<input
						defaultValue={this.props.data.group}
						name='groupId'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.subject}
						name='subjectId'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
				<td>
					<SelectInput
						value={this.props.data.teacher}
						name={'teacherId'}
						onChange={this.onInputSelectChanged}
						searchFunc={this.context.store.db.searchInTeachers}
					/>
				</td>
				<td>
					<input
						defaultValue={this.props.data.audience}
						name='audienceId'
						onChange={this.onInputChanged}
						type='text'
					/>
				</td>
				<td>
					<Popover
						text={'text'}
					>
						<input
							defaultValue={this.props.data.lectureTime}
							name='lectureTime'
							onChange={this.onInputChanged}
							type='text'
						/>
						<input
							defaultValue={this.props.data.practiceTime}
							name='practiceTime'
							onChange={this.onInputChanged}
							type='text'
						/>
						<input
							defaultValue={this.props.data.laboratoryTime}
							name='laboratoryTime'
							onChange={this.onInputChanged}
							type='text'
						/>
					</Popover>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
