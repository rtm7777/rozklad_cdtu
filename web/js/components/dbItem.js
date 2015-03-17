/** @jsx */
import React from "react";
import Select from "../components/select";

const filters = {
	audiences(data) {
		return [
			{data: data.number},
			{data: data.housingId, type: 'selectbox', order: 0},
			{data: data.type},
			{data: data.sets},
			{data: data.note}
		];
	},
	departments(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name}
		];
	},
	faculties(data) {
		return [
			{data: data.fullName},
			{data: data.shortName}
		];
	},
	groups(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name},
			{data: data.studentsCount},
			{data: data.year, type: 'selectbox', order: 1}
		];
	},
	housings(data) {
		return [
			{data: data.number}
		];
	},
	subjects(data) {
		return [
			{data: data.subject}
		];
	},
	teachers(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.departmentId, type: 'selectbox', order: 1},
			{data: [data.firstName, data.lastName, data.middleName], type: 'name'},
			{data: data.rank}
		];
	}
};

class ItemCell extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.data.type == 'selectbox') {
			return (
				<td className="no-padding">
					<Select values={this.props.filters[this.props.data.order].values} selected={this.props.data.data} button={true} />
				</td>
			);
		} else if (this.props.data.type == 'name') {
			return (
				<td className="no-padding">
					<div className="dropdown">
						<button tabindex="0" className="popove btn" role="button" data-toggle="popover" data-placement="bottom" data-content="khhkufjh">
							{this.props.data.data[1]}
						</button>
					</div>
				</td>
			);
		} else {
			return (
				<td>
					<input type="text" defaultValue={this.props.data.data} />
				</td>
			);
		}
	}
}

class DBItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false
		};
		this.toggleItem = this.toggleItem.bind(this);
	}

	toggleItem(e) {
		if (e.ctrlKey) {
			if (this.state.selected) {
				this.setState({selected: false});
				this.context.actions.itemSelected(this.props.data.id, false);
			} else {
				this.setState({selected: true});
				this.context.actions.itemSelected(this.props.data.id, true);
			}
		}
	}

	render() {
		let itemCells = filters[this.props.category](this.props.data).map((cell, i) => {
			let props = {
				filters: this.props.filters,
				data: cell,
				key: i
			};

			return (
				<ItemCell {...props} />
			);
		});

		let itemClass = this.state.selected ? "info" : "";

		return (
			<tr onClick={this.toggleItem} className={itemClass}>
				{itemCells}
			</tr>
		);
	}
}

DBItem.contextTypes = {
	actions: React.PropTypes.object.isRequired
};

export default DBItem;
