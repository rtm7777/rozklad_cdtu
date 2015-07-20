import React from "react";
import Navigation from "../navigation";

class DepartmentsNavigation extends Navigation {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired
	}

	selectOption = (el) => {
		this.context.actions.selectDepartment(el.props.data.optionValue);
	}
}

export default DepartmentsNavigation;
