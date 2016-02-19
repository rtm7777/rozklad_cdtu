import "array.prototype.find";
import "./jquery";
import "bootstrap";
import "./libs/socketEvents";
import I18n from "./services/i18n";

import React from "react";
import {render} from "react-dom";

import {Router} from "react-router";
import createHistory from "history/lib/createBrowserHistory";
import routes from "./routes";

const rootEl = document.getElementById('page');
const history = createHistory();

I18n.load().then(() => {
	render((
		<Router history={ history }>
			{routes}
		</Router>
	), rootEl);
});
