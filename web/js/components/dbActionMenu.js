/** @jsx */
import React from "react";
import Select from "../components/select";
import ActionMenuButton from "../components/actionMenuButton";
import DBStore from "../stores/dbStore";

class ActionMenu extends React.Component {
	constructor(props) {
		super(props);
		this.actionButtons = {
			delete: {
				action: 'delete',
				name: "Delete",
				hidden: true,
				icon: "remove"
			},
			add: {
				action: 'add',
				name: "Add",
				hidden: false,
				icon: "plus"
			}
		};
		this.state = {
			actions: this.actionButtons
		};
		this.actionButtonsActions = this.actionButtonsActions.bind(this);
	}

	actionButtonsActions(child) {
		let actions = {
			delete: () => {this.context.actions.deleteAction();},
			add: () => {this.context.actions.addAction();}
		};

		return actions[child.props.data.action]();
	}

	componentDidMount() {
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

	render() {
		let filters = this.props.filters.map((filter, i) => {
			let props = {
				values: filter.values,
				key: i,
				name: filter.name
			};

			return <Select {...props} />;
		});

		let actions = [];
		let i = 0;
		for (let key of Object.keys(this.state.actions)) {
			let props = {
				onClick: this.actionButtonsActions,
				key: i,
				data: this.state.actions[key]
			};

			actions.push(<ActionMenuButton {...props} />);
			i++;
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="panel clearfix panel-default">
							<ul className="nav nav-pills pull-left filter-menu">
								{filters}
							</ul>
							<ul className="nav nav-pills pull-right action-menu">
								{actions}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ActionMenu.contextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default ActionMenu;
