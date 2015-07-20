/** @jsx */
import React from "react";
import debounce from "debounce";
import {validateNumber} from "../../libs/validation";

class DBItem extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.itemClass = '';
		this.state = {
			selected: false
		};
		this.data = {};
		this.onItemChange = debounce(this.onItemChange, 600).bind(this);
	}

	componentDidMount() {
		this.data = this.props.data;
	}

	toggleItem = (e) => {
		if (e.ctrlKey) {
			if (this.state.selected) {
				this.setState({selected: false});
				this.context.actions.itemSelected(this.props.data.id, false);
			} else {
				this.setState({selected: true});
				this.context.actions.itemSelected(this.props.data.id, true);
			}
		}
	}

	onInputChanged = (event) => {
		this.data[event.target.name] = event.target.value;
		this.onItemChange();
	}

	onSelectChanged = (event) => {
		this.data[event.name] = event.id;
		this.onItemChange();
	}

	onItemChange() {
		this.context.actions.itemChanged(this.data);
	}

	onNumberKeyDown(event) {
		validateNumber(event);
	}

	render() {
		this.itemClass = this.state.selected ? 'info' : '';
	}
}

export default DBItem;
