/** @jsx */
import React from "react";

class SelectOption extends React.Component {
	constructor(props) {
		super(props);
	}

	changeValue = (e) => {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		return (
			<li onClick={this.changeValue}><a tabIndex='-1' href='#'>{this.props.data.value}</a></li>
		);
	}
}

class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selected: this.props.selected || 0};
	}

	changeValue = (child) => {
		this.setState({selected: child.props.data.id});
		if (this.props.onChange) {
			this.props.onChange({
				id: child.props.data.id,
				value: child.props.data.value,
				name: this.props.name || ""
			});
		}
	}

	generateDropdownLabel() {
		if (this.props.label) {
			return (
				<div className='dropdown-label'>{this.props.name + ":"}</div>
			);
		}
	}

	render() {
		let value = this.props.values.find(({id}) => id == this.state.selected);
		let selectboxName = value ? value.value + " " : "--- ";
		let selectOptions = this.props.values.map((option, i) => {
			let props = {
				onClick: this.changeValue,
				data: option,
				key: i
			};

			return <SelectOption {...props} />;
		});
		let name = this.generateDropdownLabel();

		if (this.props.button) {
			return (
				<div className='dropdown'>
					{name}
					<button className='dropdown-toggle' data-toggle='dropdown'>
						{selectboxName}
						<span className='glyphicon glyphicon-chevron-down'/>
					</button>
					<ul className='dropdown-menu'>
						{selectOptions}
					</ul>
				</div>
			);
		} else {
			return (
				<li className='dropdown'>
					{name}
					<a className='dropdown-toggle' data-toggle='dropdown' href='#'>
						{selectboxName}
						<span className='caret'/>
					</a>
					<ul className='dropdown-menu'>
						{selectOptions}
					</ul>
				</li>
			);
		}
	}
}

export default Select;
