/** @jsx */
define(['jquery',
				'react',
				'jsx!../components/select',
				'jsx!../components/action',
], ($, React, Select, Action) => {
	var ActionMenu = React.createClass({
		getInitialState() {
			return {actions: [
				{name: "Delete", hidden: false, icon: "remove"},
				{name: "Add", hidden: false, icon: "plus"},
			]}
		},
		actionClicked(action) {
			console.log(action)
		},
		render() {
			var f = this.props.filters;
			var filters = this.props.filters.map(function (filter) {
				return (
					<Select data={f} current={"selected"} />
				);
			});
			var actions = this.state.actions.map(function (action) {
				return (
					<Action onClick={this.actionClicked} data={action} />
					);
			}.bind(this));
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
		},
	});

	return ActionMenu;
});
