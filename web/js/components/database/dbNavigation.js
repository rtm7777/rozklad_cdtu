import React from "react";
import Navigation from "../navigation";

class DBNavigation extends Navigation {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired
	}

	selectOption = (el) => {
		this.context.actions.selectCategory(el.props.data.optionValue);
	}
}

export default DBNavigation;
