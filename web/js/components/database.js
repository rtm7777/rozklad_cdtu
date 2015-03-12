/** @jsx */
import React from "react";
import DBStore from "../stores/dbStore";
import {ActionMenu} from "../components/dbActionMenu";
import {Content} from "../components/dbContent";
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

	render() {
		let actionMenuProps = {
			filters: this.state.filters
		};
		let navProps = {
			loader: this.state.loader,
			navList: this.state.categoryList,
			selectedCategory: this.state.selectedCategory
		};
		let contentProps = {
			loader: this.state.loader,
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
						<Navigation {...navProps} />
						<Content {...contentProps} />
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
