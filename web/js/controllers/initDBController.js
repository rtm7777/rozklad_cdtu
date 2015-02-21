/** @jsx */
import React from "react";
import {DataBase} from "../components/database";

if (document.getElementById('page').dataset.id == "database") {
	React.render(
		<DataBase/>,
		document.getElementById('database')
	);
}
