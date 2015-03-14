/** @jsx */
import React from "react";

class SelectOption extends React.Component {
	constructor(props) {
		super(props);
		this.changeValue= this.changeValue.bind(this);
	}

	changeValue(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		return (
			<li onClick={this.changeValue}><a tabIndex="-1" href="#">{this.props.data.value}</a></li>
		);
	}
}

class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selected: this.props.selected || 0};
		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(child) {
		this.setState({selected: child.props.data.id});
	}

	generateDropdownLabel() {
		if (this.props.name) {
			return (
				<div className='dropdown-label'>{this.props.name + ":"}</div>
			);
		}
	}

	render() {
		let selectboxName = this.props.values[this.state.selected].value + " ";
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
				<div className="dropdown">
					<button className="dropdown-toggle" data-toggle="dropdown">
						{selectboxName}
						<span className="glyphicon glyphicon-chevron-down"/>
					</button>
					<ul className="dropdown-menu">
						{selectOptions}
					</ul>
				</div>
			);
		} else {
			return (
				<li className="dropdown">
					{name}
					<a className="dropdown-toggle" data-toggle="dropdown" href="#">
						{selectboxName}
						<span className="caret"/>
					</a>
					<ul className="dropdown-menu">
						{selectOptions}
					</ul>
				</li>
			);
		}
	}
}

export default Select;
