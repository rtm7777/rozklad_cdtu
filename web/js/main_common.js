import "./libs/socketEvents";
import I18n from "./services/i18n";

import React from "react";
import {render} from "react-dom";

import {Router, browserHistory} from "react-router";
import routes from "./routes";

const rootEl = document.getElementById('page');

I18n.load().then(() => {
	render((
		<Router history={ browserHistory }>
			{routes}
		</Router>
	), rootEl);
});
