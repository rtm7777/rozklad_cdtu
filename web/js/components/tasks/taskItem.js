/** @jsx */
import React from "react";
import Item from "../item";
import Select from "../select";
import SelectInput from "../selectInput";
import Popover from "../popover";
import TasksStore from "../../stores/tasksStore";
import clickAwayStore from "../../stores/clickAwayStore";

class TaskItem extends Item {
	static contextTypes = {
		store: React.PropTypes.instanceOf(TasksStore).isRequired,
		actions: React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state.popoverText = this.generatePopoverText();
	}

	onPopoverChange = (e) => {
		this.onInputChanged(e);
		this.setState({popoverText: this.generatePopoverText()});
	};

	generatePopoverText() {
		let {lectureTime, practiceTime, laboratoryTime} = this.data;
		return `${lectureTime || 0}, ${practiceTime || 0}, ${laboratoryTime || 0}`;
	}

	render() {
		super.render();

		return (
			<tr onClick={this.toggleItem} className={this.itemClass}>
				<td>
					<SelectInput
						value={this.props.data.group}
						name={'groupId'}
						onChange={this.onInputSelectChanged}
						searchFunc={this.context.store.db.searchInGroups}
						elementConatainer={clickAwayStore}
					/>
				</td>
				<td>
					<SelectInput
						value={this.props.data.subject}
						name={'subjectId'}
						onChange={this.onInputSelectChanged}
						searchFunc={this.context.store.db.searchInSubjects}
						elementConatainer={clickAwayStore}
					/>
				</td>
				<td>
					<SelectInput
						value={this.props.data.teacher}
						name={'teacherId'}
						onChange={this.onInputSelectChanged}
						searchFunc={this.context.store.db.searchInTeachers}
						elementConatainer={clickAwayStore}
					/>
				</td>
				<td>
					<SelectInput
						value={this.props.data.audience}
						name={'audienceId'}
						onChange={this.onInputSelectChanged}
						searchFunc={this.context.store.db.searchInAudiences}
						elementConatainer={clickAwayStore}
					/>
				</td>
				<td>
					<Popover
						text={this.state.popoverText}
						elementConatainer={clickAwayStore}
					>
						<input
							defaultValue={this.props.data.lectureTime}
							name='lectureTime'
							onChange={this.onPopoverChange}
							type='text'
						/>
						<input
							defaultValue={this.props.data.practiceTime}
							name='practiceTime'
							onChange={this.onPopoverChange}
							type='text'
						/>
						<input
							defaultValue={this.props.data.laboratoryTime}
							name='laboratoryTime'
							onChange={this.onPopoverChange}
							type='text'
						/>
					</Popover>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
