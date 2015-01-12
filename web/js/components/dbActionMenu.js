/** @jsx */
define(['jquery',
				'react',
				'jsx!../components/select',
], ($, React, Select) => {
	var ActionMenu = React.createClass({
		getInitialState() {
			return {data: []};
		},
		render() {
			var f = this.props.filters;
			var filters = this.props.filters.map(function (filter) {
				return (
					<Select data={f} current={"selected"} />
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
									<li id="delete_db" className="dropdown hide">
										<a href="#"><span className="glyphicon glyphicon-remove"></span> Delete</a>
									</li>
									<li id="add_db" className="dropdown">
										<a href="#"><span className="glyphicon glyphicon-plus"></span> Add</a>
									</li>
									<li id="add_tmp" className="dropdown">
										<a href="#"><span className="glyphicon glyphicon-plus"></span> tmp</a>
									</li>
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
