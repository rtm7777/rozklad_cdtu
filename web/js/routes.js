import React from 'react';
import { Route } from 'react-router';

import DataBase from "./pages/database";

export default (
	<Route name='admin' path='/admin/'>
		<Route name="database" path="database/?" handler={DataBase}/>
	</Route>
);