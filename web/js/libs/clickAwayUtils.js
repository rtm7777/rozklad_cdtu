import ReactDOM from "react-dom";
import clickAwayStore from "../stores/clickAwayStore";

function isDescendant(parent, child) {
	let node = child.parentNode;
	while (node !== null) {
		if (node === parent) return true;
		node = node.parentNode;
	}
	return false;
}

export default {
	checkClickAway(e) {
		let element = clickAwayStore.element;
		if (element) {
			let el = ReactDOM.findDOMNode(element);
			if (el !== e.target && !isDescendant(el, e.target)) {
				element.componentClickAway();
			}
		};
	}
};
