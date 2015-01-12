/** @jsx */
define(['react'], (React) => {
	var Content = React.createClass({
		render() {
			var headerCols = this.props.categoryFields.map(function (field) {
				return (
					<th>
						{field}
					</th>
				);
			});
			return (
				<div className="col-lg-9">
					<div id="content_loader" className="admin-content-loader">loader</div>
					<table id="database_container" className="table table-bordered table-hover table-striped table-condensed hide">
						<thead>
							{headerCols}
						</thead>
						<tbody></tbody>
					</table>
				</div>
			);
		},
	});

	return Content;
});
