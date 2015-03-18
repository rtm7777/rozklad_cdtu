/** @jsx */
import React from "react/addons";
import DBStore from "../stores/dbStore";

class ActionMenuButton extends React.Component {
	constructor(props) {
		super(props);
		this.actionButtonClicked = this.actionButtonClicked.bind(this);
	}

	actionButtonClicked(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		let cx = React.addons.classSet;
		let classes = cx({
			'hide': this.props.data.hidden
		});
		return (
			<li className={classes}>
				<a onClick={this.actionButtonClicked} href="#"><span className={`glyphicon glyphicon-${this.props.data.icon}`}></span> {this.props.data.name}</a>
			</li>
		);
	}
}

export default ActionMenuButton;
