/** @jsx */
define(['jquery',
				'react',
				'jsx!../components/select',
				'jsx!../components/action',
], ($, React, Select, Action) => {
	var ActionMenu = React.createClass({
		getInitialState() {
			return {
				actions: [
					{name: "Delete", hidden: false, icon: "remove"},
					{name: "Add", hidden: false, icon: "plus"},
				]
			};
		},
		actionClicked(action) {
			console.log(action);
		},
		render() {
			var filters = this.props.filters.map((filter, i) => {
				return (
					<Select values={filter.values} key={i} name={filter.name} />
				);
			});
			var actions = this.state.actions.map((action, i) => {
				return (
					<Action onClick={this.actionClicked} key={i} data={action} />
					);
			});
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
