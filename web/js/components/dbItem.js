/** @jsx */
import React from "react";
import Select from "../components/select";
import itemCellsSchema from "../schemas/itemCellsSchema";

class ItemCell extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSelectChanged = this.onSelectChanged.bind(this);
	}

	onInputChanged(event) {
		let currentValue = event.target.value;
		let changed = currentValue != event.target.defaultValue;
		this.props.onChange(this);
	}

	onSelectChanged(event) {
		let currentValue = event.props.data.id;
		let changed = currentValue != this.props.data.data;
		this.props.onChange(this);
	}

	render() {
		if (this.props.data.type == 'selectbox') {
			return (
				<td className="no-padding">
					<Select onChange={this.onSelectChanged} values={this.props.filters[this.props.data.order].values} selected={this.props.data.data} button={true} />
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
					<input onChange={this.onInputChanged} type="text" defaultValue={this.props.data.data} />
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
		this.itemChanged = this.itemChanged.bind(this);
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

	itemChanged(item) {
		console.log(this);
		console.log(this.props.data);
	}

	render() {
		let itemCells = itemCellsSchema[this.props.category](this.props.data).map((cell, i) => {
			console.log(cell);
			if (cell.data === undefined) {
				cell.data = "";
			}
			let props = {
				filters: this.props.filters,
				onChange: this.itemChanged,
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
