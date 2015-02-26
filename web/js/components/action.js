/** @jsx */
import React from "react/addons";

export class Action extends React.Component {
	constructor(props) {
		super(props);
	}

	actionClicked(e) {
		e.preventDefault();
		this.props.actionClicked(this);
	}

	render() {
		let cx = React.addons.classSet;
		let classes = cx({
			'hide': this.props.data.hidden
		});
		return (
			<li className={classes}>
				<a onClick={this.actionClicked.bind(this)} href="#"><span className={"glyphicon glyphicon-" + this.props.data.icon}></span> {this.props.data.name}</a>
			</li>
		);
	}
}
