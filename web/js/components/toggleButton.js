/** @jsx */
import React from "react";

class ToggleButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false
		};
	}

	toggleState = () => {
		const checked = this.state.checked;
		this.setState({checked: !checked});

		if (this.props.onChange) {
			this.props.onChange();
		}
	};

	render() {
		const active = this.state.checked ? 'active' : '';
		return (
			<button onClick={this.toggleState} type='button' className={`${active} btn btn-primary`}>
				Single toggle
			</button>
		);
	}
}

export default ToggleButton;
