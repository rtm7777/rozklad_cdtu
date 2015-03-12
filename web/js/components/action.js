/** @jsx */
import React from "react/addons";
import DBStore from "../stores/dbStore";

class Action extends React.Component {
	constructor(props) {
		super(props);
		this.state = {count: 1};
	}

	actionClicked(e) {
		e.preventDefault();
		this.context.actions.create(this.state.count);
	}

	componentDidMount() {
		this.context.store.on('change', () => {
			this.onChange.bind(this);
		});
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

Action.contextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default Action;