/** @jsx */
import React from "react";

class ActionMenuButton extends React.Component {
	constructor(props) {
		super(props);
	}

	actionButtonClicked = (e) => {
		e.preventDefault();
		this.props.onClick(this);
	};

	render() {
		return (
			<li className={this.props.data.hidden ? 'hide' : ''}>
				<a onClick={this.actionButtonClicked} href='#'><span className={`glyphicon glyphicon-${this.props.data.icon}`}></span> {this.props.data.name}</a>
			</li>
		);
	}
}

export default ActionMenuButton;
