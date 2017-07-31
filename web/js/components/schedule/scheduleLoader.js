import React from "react";
import PropTypes from 'prop-types';
import Loader from "../loader";
import ScheduleStore from "../../stores/scheduleStore";

class ScheduleLoader extends Loader {
	static contextTypes = {
		store: PropTypes.instanceOf(ScheduleStore).isRequired
	};
}

export default ScheduleLoader;
