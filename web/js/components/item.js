/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import debounce from "debounce";
import {validateNumber, validateMinMax} from "../libs/validation";

class Item extends React.Component {
	static propTypes = {
		data: PropTypes.object
	};

	static contextTypes = {
		actions: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.itemClass = '';
		this.state = {
			selected: false
		};
		this.data = props.data;
		this.onItemChange = debounce(this.onItemChange, 600).bind(this);
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
	};

	onInputChanged = (event) => {
		validateMinMax(event);
		this.data[event.target.name] = event.target.value;
		this.onItemChange();
	};

	onSelectChanged = (event) => {
		this.data[event.name] = event.id;
		this.onItemChange();
	};

	onInputSelectChanged = (event) => {
		this.data[event.name] = event.value;
		this.onItemChange();
	};

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

export default Item;
