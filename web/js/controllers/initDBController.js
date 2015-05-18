/** @jsx */
import React from 'react';
import {Dispatcher} from 'flux';
import DataBase from "../components/database";
import DBStore from "../stores/dbStore";
import DBActions from "../actions/dbActions";

class DBApp {
	constructor(state) {
		const dispatcher = new Dispatcher();

		this.actions = new DBActions(dispatcher);
		this.store = new DBStore(dispatcher, state);
	}

	render(element) {
		const dbAppRootElement = <DataBase actions={this.actions} store={this.store} />;

		if(element) {
			React.render(dbAppRootElement, element);
		}
	}

	renderToDOM(element) {
		this.render(element);
	}

	getState() {
		return this.store.state;
	}
}

export default DBApp;
