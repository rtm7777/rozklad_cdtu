// import "./libs/socketEvents";
import I18n from "./services/i18n";

import React from "react";
import {render} from "react-dom";

import {BrowserRouter} from "react-router-dom";
import routes from "./routes";

const rootEl = document.getElementById('page');

I18n.load().then(() => {
	render((
		<BrowserRouter>
			{routes}
		</BrowserRouter>
	), rootEl);
});
