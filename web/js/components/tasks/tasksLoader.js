import React from "react";
import PropTypes from 'prop-types';
import Loader from "../loader";
import TasksStore from "../../stores/tasksStore";

class TasksLoader extends Loader {
	static contextTypes = {
		store: PropTypes.instanceOf(TasksStore).isRequired
	};
}

export default TasksLoader;
