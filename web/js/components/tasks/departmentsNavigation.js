import React from "react";
import PropTypes from 'prop-types';
import Navigation from "../navigation";

class DepartmentsNavigation extends Navigation {
	static contextTypes = {
		actions: PropTypes.object.isRequired
	};

	selectOption = (el) => {
		this.context.actions.selectDepartment(el.props.data.optionValue);
	};
}

export default DepartmentsNavigation;
