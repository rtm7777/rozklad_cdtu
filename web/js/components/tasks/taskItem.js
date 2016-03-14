/** @jsx */
import React from "react";
import Item from "../item";
import SelectInput from "../selectInput";
import Popover from "../popover";
import TasksStore from "../../stores/tasksStore";
import clickAwayStore from "../../stores/clickAwayStore";
import I18n from "../../services/i18n";

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

		let popoverContent = ['lectureTime', 'practiceTime', 'laboratoryTime'].map((field, i) => {
			return (
				<div key={i}>
					<label>{I18n.t(field)}</label>
					<input
						className={'form-control'}
						defaultValue={this.props.data[field]}
						name={field}
						onChange={this.onPopoverChange}
						onKeyDown={this.onNumberKeyDown}
						type='number'
						max='20'
						min='0'
					/>
				</div>
			);
		});

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
						className={'tasks-popover'}
						width={200}
						text={this.state.popoverText}
						elementConatainer={clickAwayStore}
					>
						{popoverContent}
					</Popover>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
