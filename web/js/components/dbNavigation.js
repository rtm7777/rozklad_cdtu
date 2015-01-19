/** @jsx */
define(['react'], (React) => {
	var Navigation = React.createClass({
		changeCategory() {
			this.props.onClick(this);
		},
		render() {
			var navigation = this.props.navList.map(field => {
				return (
					<a onClick={this.changeCategory} href="#" data-category={field.category} className="list-group-item">{field.name}</a>
				);
			});
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


