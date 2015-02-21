/** @jsx */
import React from "react";

var SelectOption = React.createClass({
	changeValue(e) {
		e.preventDefault();
		this.props.onClick(this);
	},
	render() {
		return (
			<li onClick={this.changeValue}><a tabIndex="-1" href="#">{this.props.data.value}</a></li>
		);
	}
});

export var Select = React.createClass({
	getInitialState() {
		return {selected: this.props.selected || 0};
	},
	changeValue(child) {
		this.setState({selected: child.props.data.id});
	},
	generateDropdownLabel() {
		if (this.props.name) {
			return (
				<div className='dropdown-label'>{this.props.name + ":"}</div>
			);
		}
	},
	render() {
		var selectboxName = this.props.values[this.state.selected].value + " ";
		var selectOptions = this.props.values.map((option, i) => {
			return (
				<SelectOption onClick={this.changeValue} key={i} data={option} />
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
});
