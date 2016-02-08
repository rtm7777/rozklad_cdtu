import React from "react";
import ReactDOM from "react-dom";

class ClickAway extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		document.addEventListener('mousedown', this._checkClickAway);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this._checkClickAway);
	}

	_checkClickAway = (e) => {
		let el = ReactDOM.findDOMNode(this);

		if (el !== e.target && el !== e.target.parentNode) {
			if (this.componentClickAway) this.componentClickAway();
		}
	};
}

export default ClickAway;
