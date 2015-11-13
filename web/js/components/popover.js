/** @jsx */
import React from "react";

class Popover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {opened: false};
	}

	openPopover = () => {
		this.setState({opened: true});
		if (this.props.elementConatainer) this.props.elementConatainer.element = this;
	}

	componentClickAway = () => {
		this.setState({opened: false});
		this.props.elementConatainer.element = null;
	}

	calculateLeft() {
		if (this.refs.control) {
			return 90 - this.refs.control.offsetWidth / 2;
		} else {
			return 0;
		}
	}

	render() {
		let left = this.calculateLeft();
		let style = {
			left: `-${left}px`,
			display: this.state.opened ? 'block' : 'none'
		};
		return (
			<div ref="control" onMouseDown={this.openPopover}>
				<div className="popover-control">{this.props.text}</div>
				<div ref="popover" className="popover bottom" style={style}>
					<div className="arrow"></div>
					<div className="popover-content">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default Popover;
