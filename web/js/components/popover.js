/** @jsx */
import React from "react";
import ClickAway from "./clickAway";

class Popover extends ClickAway {
	constructor(props) {
		super(props);
		this.state = {opened: false};
	}

	togglePopover = () => {
		this.setState({opened: !this.state.opened});
	}

	componentClickAway = () => {
		this.setState({opened: false});
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
			<div ref="control" onClick={this.togglePopover}>
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
