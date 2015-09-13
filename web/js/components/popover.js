/** @jsx */
import React from "react";

class Popover extends React.Component {
	constructor(props) {
		super(props);
		this.left = 0;
	}

	componentDidMount() {
		this.left = React.findDOMNode(this.refs.popover).offsetWidth / 2 - React.findDOMNode(this.refs.control).offsetWidth / 2 - 5;
	}

	render() {
		return (
			<div>
				<div className="popover-control" ref="control">Button</div>
				<div ref="popover" className="popover bottom" style={{left: `-${this.left}px`}}>
					<div className="arrow"></div>
					<div className="popover-content">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default Popover;
