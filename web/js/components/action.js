/** @jsx */
import React from "react/addons";
import {dbActions} from "../actions/dbActions";
import {dbstore} from "../stores/dbStore";

export class Action extends React.Component {
	constructor(props) {
		super(props);
		this.state = {count: 1};
	}

	actionClicked(e) {
		e.preventDefault();
		console.log("action clicked");
		dbActions.create(this.state.count);
	}
	componentDidMount() {
		dbstore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		dbstore.removeChangeListener(this.onChange.bind(this));
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

	onChange() {
    this.setState({count: this.state.count + 1});
  }

}
