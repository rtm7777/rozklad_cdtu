/** @jsx */
define(['react'], (React) => {
	var Content = React.createClass({
		render() {
			var headerCols = this.props.categoryFields.map(field => {
				return (
					<th>
						{field}
					</th>
				);
			});
			var tableShow = this.props.loader ? '' : "hide";
			return (
				<div className="col-lg-9">
					<div id="content_loader" className={"admin-content-loader " + this.props.loader}>loading.....</div>
					<table id="database_container" className={"table table-bordered table-hover table-striped table-condensed " + tableShow}>
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
