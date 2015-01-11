define(['jquery',
				'react'
], ($, React) => {
	var Content = React.createClass({
		render() {
			// var filters = this.props.filters.map(function (filter) {
			// 	return (
			// 		<th>
			// 			{field}
			// 		</th>
			// 	);
			// });
			return (
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<div className="panel panel-default">
								<div className="panel-heading">Categories:</div>
								<div id="database_categories" className="list-group">
									<a href="#" data-category="{{$i.Category}}" className="list-group-item">LALAL</a>
								</div>
							</div>
						</div>
						<div className="col-lg-9">
							<div id="content_loader" className="admin-content-loader">loader</div>
							<table id="database_container" className="table table-bordered table-hover table-striped table-condensed hide"></table>
						</div>
					</div>
				</div>
			);
		},
	});

	return Content
});
