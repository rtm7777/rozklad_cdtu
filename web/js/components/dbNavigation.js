/** @jsx */
define(['react'], (React) => {
	var Navigation = React.createClass({
		changeCategory() {
			this.props.onClick(this);
		},
		render() {
			var navigation = this.props.navList.map(function (field) {
				return (
					<a onClick={this.changeCategory} href="#" data-category="" className="list-group-item">{field}</a>
				);
			}.bind(this));
			return (
				<div className="col-lg-3">
					<div className="panel panel-default">
						<div className="panel-heading">Categories:</div>
						<div id="database_categories" className="list-group">
							{navigation}
						</div>
					</div>
				</div>
			);
		},
	});

	return Navigation;
});


