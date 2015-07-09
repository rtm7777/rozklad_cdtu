import React from "react";
import Navigation from "../navigation";

class DBNavigation extends Navigation {
	selectOption(el) {
		this.context.actions.selectCategory(el.props.data.optionValue);
	}
}

DBNavigation.contextTypes = {
	actions: React.PropTypes.object.isRequired
};

export default DBNavigation;
