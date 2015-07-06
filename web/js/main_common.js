import "array.prototype.find";
import "./jquery";
import "bootstrap";
import "./libs/socketEvents";
import React from "react";
import Router from "react-router";
import routes from "./routes";

const rootEl = document.getElementById('page');

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, rootEl);
});