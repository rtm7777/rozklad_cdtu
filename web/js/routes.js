import React from "react";
import { Route } from "react-router-dom";

import DataBase from "./pages/database";
import Tasks from "./pages/tasks";
import Schedule from "./pages/schedule";

export default (
	<div>
		<Route name='database' path='/admin/database/' component={DataBase}/>
		<Route name='tasks' path='/admin/tasks/' component={Tasks}/>
		<Route name='schedule' path='/admin/schedule/' component={Schedule}/>
	</div>
);
