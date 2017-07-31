/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import Dispatcher from "../dispatcher/dispatcher";
import AdminActions from "../actions/adminActions";
import AdminStore from "../stores/adminStore";
import clickAway from "../libs/clickAwayUtils";

import I18n from "../services/i18n";

class Admin extends React.Component {
	static childContextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(AdminStore).isRequired
	};

	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = AdminStore.defaultState;
		this.actions = new AdminActions(dispatcher);
		this.store = new AdminStore(dispatcher, this.state);

		this.store.on('load', () => {
			let state = this.store.getState();
			this.setState(state);
		});

		this.actions.load();
		document.addEventListener('mousedown', clickAway.checkClickAway);
	}

	getChildContext() {
		return {
			actions: this.actions,
			store: this.store
		};
	}

	componentWillUnmount() {
		this.store.removeListener('load');
		document.removeEventListener('mousedown', clickAway.checkClickAway);
	}

	render() {
		return (
			<div>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3'>
							<div id='db_navigation' className='left-navigation panel panel-default'>
								<div className='panel-heading'>{I18n.t('categories')}:</div>
							</div>
						</div>
						<div id='work_space' className='col-lg-9'>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;
