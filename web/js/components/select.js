/** @jsx */
import React from "react";

class SelectOption extends React.Component {
	changeValue(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		return (
			<li onClick={this.changeValue.bind(this)}><a tabIndex="-1" href="#">{this.props.data.value}</a></li>
		);
	}
}

export class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selected: this.props.selected || 0};
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
		var selectboxName = this.props.values[this.state.selected].value + " ";
		var selectOptions = this.props.values.map((option, i) => {
			return (
				<SelectOption onClick={this.changeValue.bind(this)} key={i} data={option} />
			);
		});
		var name = this.generateDropdownLabel();

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
