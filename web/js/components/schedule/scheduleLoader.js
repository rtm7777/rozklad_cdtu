import React from "react";
import Loader from "../loader";
import ScheduleStore from "../../stores/scheduleStore";

class ScheduleLoader extends Loader {
	static contextTypes = {
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};
}

export default ScheduleLoader;
