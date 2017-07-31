import React from "react";
import PropTypes from 'prop-types';
import Navigation from "../navigation";

class DBNavigation extends Navigation {
	static contextTypes = {
		actions: PropTypes.object.isRequired
	};

	selectOption = (el) => {
		this.context.actions.selectCategory(el.props.data.optionValue);
	};
}

export default DBNavigation;
