import React from "react";
import Navigation from "../navigation";

class DepartmentsNavigation extends Navigation {
	selectOption(el) {
		this.context.actions.selectDepartment(el.props.data.optionValue);
	}
}

DepartmentsNavigation.contextTypes = {
	actions: React.PropTypes.object.isRequired
};

export default DepartmentsNavigation;