/** @jsx */
define(['react'], (React) => {
	var NavOption = React.createClass({
		changeCategory(e) {
			e.preventDefault();
			this.props.onClick(this);
		},
		render() {
			var active = this.props.data.category == this.props.active ? "active" : "";
			return (
				<a onClick={this.changeCategory} href="#" data-category={this.props.data.category} className={"list-group-item " + active}>{this.props.data.name}</a>
			);
		}
	});

	var Navigation = React.createClass({
		render() {
			var navigation = this.props.navList.map(field => {
				return (
					<NavOption onClick={this.props.onClick} data={field} active={this.props.selectedCategory} />
				);
			});
			var loaderShow = 'visible';
			if (!this.props.loader) {
				loaderShow = 'invisible';
			}
			return (
				<div className="col-lg-3">
					<div id="db_navigation" className="panel panel-default">
						<div className="panel-heading">Categories:</div>
						<div className={"loader " + loaderShow}><img src="/web/img/loader.svg"/></div>
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


