/** @jsx */
import React from "react/addons";
import DBStore from "../stores/dbStore";

class Action extends React.Component {
	constructor(props) {
		super(props);
		this.actionClicked = this.actionClicked.bind(this);
	}

	actionClicked(e) {
		e.preventDefault();
	}

	componentDidMount() {

	}

	render() {
		let cx = React.addons.classSet;
		let classes = cx({
			'hide': this.props.data.hidden
		});
		return (
			<li className={classes}>
				<a onClick={this.actionClicked} href="#"><span className={`glyphicon glyphicon-${this.props.data.icon}`}></span> {this.props.data.name}</a>
			</li>
		);
	}
}

Action.contextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default Action;
