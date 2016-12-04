/** @jsx */
import React from "react";

export class SelectOption extends React.Component {
	constructor(props) {
		super(props);
	}

	changeValue = (e) => {
		e.preventDefault();
		this.props.onClick(this);
	};

	render() {
		return (
			<li onClick={this.changeValue}><a tabIndex='-1' href='#'>{this.props.data.value}</a></li>
		);
	}
}

class Select extends React.Component {
	constructor(props) {
		super(props);
		this.stateObj = {
			opened: false,
			selected: this.props.selected || 0
		};
		this.state = this.stateObj;
	}

	changeValue = (child) => {
		if (!this.props.notAutonomic) {
			this.stateObj.selected = child.props.data.id;
			this.updateState();
		}
		this.closeSelect();
		if (this.props.onChange) {
			this.props.onChange({
				id: child.props.data.id,
				value: child.props.data.value,
				name: this.props.name || ""
			});
		}
	};

	openSelect = (e) => {
		if (e.nativeEvent.which !== 1 || this.state.opened || e.ctrlKey) return;
		if (this.props.elementConatainer) this.props.elementConatainer.element = this;
		this.stateObj.opened = true;
		this.updateState();
	};

	closeSelect = () => {
		this.stateObj.opened = false;
		this.updateState();
		if (this.props.elementConatainer) {
			this.props.elementConatainer.element = null;
		}
	};

	componentClickAway = () => {
		if (this.state.opened) {
			this.closeSelect();
		};
	};

	generateDropdownLabel() {
		if (this.props.label) {
			return (
				<div className='dropdown-label'>{this.props.name + ":"}</div>
			);
		}
	}

	generateNameAndOptions() {
		let selected = this.props.notAutonomic ? this.props.selected : this.state.selected;
		let value = this.props.values.find(({id}) => id == selected);
		this.selectboxName = value ? value.value + " " : "--- ";
		this.selectOptions = this.props.values.map((option, i) => {
			let props = {
				onClick: this.changeValue,
				data: option,
				key: i
			};

			return <SelectOption {...props} />;
		});
	}

	updateState() {
		this.setState(this.stateObj);
	}

	render() {
		this.name = this.generateDropdownLabel();
		this.open = this.state.opened ? "dropdown open" : "dropdown";

		this.generateNameAndOptions();
	}
}

export default Select;
