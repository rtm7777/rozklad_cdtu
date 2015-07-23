import React from "react";
import Loader from "../loader";
import TasksStore from "../../stores/tasksStore";

class TasksLoader extends Loader {
	static contextTypes = {
		store: React.PropTypes.instanceOf(TasksStore).isRequired
	}
}

export default TasksLoader;
