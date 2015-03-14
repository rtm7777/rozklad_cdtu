/** @jsx */
import React from "react";
import ComponentWithloader from "./componentWithLoader";
import DBStore from "../stores/dbStore";

class NavOption extends React.Component {
	constructor(props) {
		super(props);
		this.changeCategory = this.changeCategory.bind(this);
	}

	changeCategory(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		let active = this.props.data.category == this.props.active ? "active" : "";
		return (
			<a onClick={this.changeCategory} href="#" data-category={this.props.data.category} className={`list-group-item ${active}`}>{this.props.data.name}</a>
		);
	}
}

class Navigation extends ComponentWithloader {
	constructor(props) {
		super(props);
		this.selectCategory = this.selectCategory.bind(this);
	}

	selectCategory(el) {
		this.context.actions.selectCategory(el.props.data.category);
	}

	render() {
		let navigation = this.props.navList.map((field, i) => {
			let props = {
				data: field,
				active: this.props.selectedCategory,
				onClick: this.selectCategory,
				key: i
			};

			return <NavOption {...props} />;
		});
		let loaderShow = 'visible';
		if (!this.state.loader) {
			loaderShow = 'invisible';
		}
		return (
			<div className="col-lg-3">
				<div id="db_navigation" className="panel panel-default">
					<div className="panel-heading">Categories:</div>
					<div className={`loader ${loaderShow}`}><img src="/public/img/loader.svg"/></div>
					<div id="database_categories" className="list-group">
						{navigation}
					</div>
				</div>
			</div>
		);
	}
}

Navigation.contextTypes = {
	actions: React.PropTypes.object.isRequired,
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default Navigation;
