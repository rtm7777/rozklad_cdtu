/** @jsx */
define(['react'], (React) => {
	var Content = React.createClass({
		render() {
			var headerCols = this.props.columns.map(field => {
				return (
					<th>
						{field}
					</th>
				);
			});
			var loaderShow = 'visible';
			var tableShow = 'invisible';
			if (!this.props.loader) {
				loaderShow = 'invisible';
				tableShow = 'visible';
			}
			return (
				<div id="database_container" className="col-lg-9">
					<div className={"loader " + loaderShow}><img src="/web/img/loader.svg"/></div>
					<table className={"table table-bordered table-hover table-striped table-condensed " + tableShow}>
						<thead>
							<tr>
								{headerCols}
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			);
		},
	});

	return Content;
});
