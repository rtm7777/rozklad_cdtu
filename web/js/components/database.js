/** @jsx */
import React from "react";
import DBStore from "../stores/dbStore";
import Loader from "./loader";
import ActionMenu from "../components/dbActionMenu";
import Content from "../components/dbContent";
import Navigation from "../components/dbNavigation";

class DataBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.store.getState();
	}

	getChildContext() {
		return {
			actions: this.props.actions,
			store: this.props.store
		};
	}

	componentWillMount() {
		let store = this.props.store;

		store.on('load', () => {
			let state = store.getState();
			this.setState(state);
		});

		this.props.actions.load();
	}

	componentWillUnmount() {
		this.props.store.removeListener('load');
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
			<div>
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

DataBase.propTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default DataBase;
