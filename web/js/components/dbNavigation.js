/** @jsx */
import React from "react";

class NavOption extends React.Component {
	constructor(props) {
		super(props);
	}

	changeCategory(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		let active = this.props.data.category == this.props.active ? "active" : "";
		return (
			<a onClick={this.changeCategory.bind(this)} href="#" data-category={this.props.data.category} className={"list-group-item " + active}>{this.props.data.name}</a>
		);
	}
}

export class Navigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let navigation = this.props.navList.map((field, i) => {
			let props = {
				data: field,
				active: this.props.selectedCategory,
				onClick: this.props.onClick,
				key: i
			};

			return <NavOption {...props} />;
		});
		let loaderShow = 'visible';
		if (!this.props.loader) {
			loaderShow = 'invisible';
		}
		return (
			<div className="col-lg-3">
				<div id="db_navigation" className="panel panel-default">
					<div className="panel-heading">Categories:</div>
					<div className={"loader " + loaderShow}><img src="/public/img/loader.svg"/></div>
					<div id="database_categories" className="list-group">
						{navigation}
					</div>
				</div>
			</div>
		);
	}
}
