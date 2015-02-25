/** @jsx */
import React from "react/addons";

export class Action extends React.Component {
	constructor(props) {
		super(props);
	}

	changeValue() {
		this.props.onClick(this);
	}

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'hide': this.props.data.hidden
		});
		return (
			<li className={classes}>
				<a onClick={this.changeValue.bind(this)} href="#"><span className={"glyphicon glyphicon-" + this.props.data.icon}></span> {this.props.data.name}</a>
			</li>
		);
	}
}
