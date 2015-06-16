/** @jsx */
import React from "react";
import Dispatcher from '../dispatcher/dispatcher';
import DBActions from "../actions/dbActions";
import DBStore from "../stores/dbStore";

import Loader from "../components/database/loader";
import ActionMenu from "../components/database/dbActionMenu";
import Content from "../components/database/dbContent";
import Navigation from "../components/database/dbNavigation";



class DataBase extends React.Component {
	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = DBStore.defaultState;
		this.actions = new DBActions(dispatcher);
		this.store = new DBStore(dispatcher, this.state);
	}

	getChildContext() {
		return {
			actions: this.actions,
			store: this.store
		};
	}

	componentWillMount() {
		let store = this.store;

		store.on('load', () => {
			let state = store.state;
			this.setState(state);
		});

		this.actions.load();
	}

	componentWillUnmount() {
		this.store.removeListener('load');
	}

	render() {
		let actionMenuProps = {
			filters: this.state.filters
		};
		let navProps = {
			navList: this.state.categoryList,
			selectedCategory: this.state.selectedCategory
		};
		let contentProps = {
			fields: this.state.fields,
			columns: this.state.columns,
			selectedCategory: this.state.selectedCategory,
			filters: this.state.filters
		};

		return (
			<div className="database">
				<ActionMenu {...actionMenuProps} />
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<div id="db_navigation" className="panel panel-default">
								<div className="panel-heading">Categories:</div>
								<Loader/>
								<Navigation {...navProps} />
							</div>
						</div>
						<div id="database_container" className="col-lg-9">
							<Loader/>
							<Content {...contentProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DataBase.childContextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default DataBase;
