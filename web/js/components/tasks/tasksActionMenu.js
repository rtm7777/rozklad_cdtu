/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import ActionMenuButton from "../actionMenuButton";
import TasksStore from "../../stores/tasksStore";
import I18n from "../../services/i18n";

class ActionMenu extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(TasksStore).isRequired
	};

	constructor(props) {
		super(props);
		this.actionButtons = {
			delete: {
				action: 'delete',
				hidden: true,
				icon: 'remove'
			},
			add: {
				action: 'add',
				hidden: false,
				icon: 'plus'
			}
		};
		this.state = {
			actions: this.actionButtons
		};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('itemSelected', () => {
			if (store.getSelectedItems().length) {
				this.actionButtons.delete.hidden = false;
			} else {
				this.actionButtons.delete.hidden = true;
			}
			this.setState({actions: this.actionButtons});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('itemSelected');
	}

	actionButtonsActions = (child) => {
		let actions = {
			delete: () => this.context.actions.deleteAction(),
			add: () => this.context.actions.addAction()
		};

		return actions[child.props.data.action]();
	};

	render() {
		let actions = [];
		let i = 0;
		for (let key of Object.keys(this.state.actions)) {
			let props = {
				onClick: this.actionButtonsActions,
				key: i,
				data: this.state.actions[key],
				name: I18n.t(key)
			};

			actions.push(<ActionMenuButton {...props} />);
			i++;
		}

		return (
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='panel clearfix panel-default'>
							<ul className='nav nav-pills pull-right action-menu'>
								{actions}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ActionMenu;
