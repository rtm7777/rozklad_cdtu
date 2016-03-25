import React from "react";
import { Route } from "react-router";

import DataBase from "./pages/database";
import Tasks from "./pages/tasks";
import Schedule from "./pages/schedule";

export default (
	<Route name='admin' path='/admin/'>
		<Route name='database' path='database/' component={DataBase}/>
		<Route name='tasks' path='tasks/' component={Tasks}/>
		<Route name='schedule' path='schedule/' component={Schedule}/>
	</Route>
);
