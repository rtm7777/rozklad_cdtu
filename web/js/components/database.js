/** @jsx */
import storage from "../services/localStorage";
import promise from "../libs/promise";
import React from "react";
import {ActionMenu} from "../components/dbActionMenu";
import {Content} from "../components/dbContent";
import {Navigation} from "../components/dbNavigation";

export class DataBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryList: [],
			selectedCategory: storage.getValue("category") || "",
			fields: [],
			columns: [],
			filters: [],
			loader: true,
			error_message: ""
		};
	}

	componentWillMount() {
		let promises = [promise.post('/get_category_list')];
		if (this.state.selectedCategory) {
			promises.push(this.loadFields(this.state.selectedCategory));
		}
		Promise.all(promises).then(data => {
			this.setState({
				categoryList: data[0],
				loader: false
			});
		});
	}

	changeCategory(child) {
		this.setState({
			loader: true,
			filters: [],
			fields: []
		});

		let category = child.props.data.category;
		storage.saveValue("category", category);
		this.setState({selectedCategory: category});
		this.loadFields(category).then(data => {
			this.setState({loader: false});
		});
	}

	actionClicked(action) {
		console.log(action);
	}

	loadFields(category) {
		return promise.post('/get_category', {category: category}).then(data => {
			this.setState({
				fields: data.items,
				columns: data.columns,
				filters: data.filters || []
			});
		});
	}

	render() {
		let actionMenuProps = {
			filters: this.state.filters,
			actionClicked: this.actionClicked.bind(this),
		};
		let navProps = {
			onClick: this.changeCategory.bind(this),
			loader: this.state.loader,
			navList: this.state.categoryList,
			selectedCategory: this.state.selectedCategory
		};
		let contentProps = {
			loader: this.state.loader,
			fields: this.state.fields,
			columns: this.state.columns,
			selectedCategory: this.state.selectedCategory,
			filters: this.state.filters
		};

		return (
			<div>
				<ActionMenu {...actionMenuProps} />
				<div className="container">
					<div className="row">
						<Navigation {...navProps} />
						<Content {...contentProps} />
					</div>
				</div>
			</div>
		);
	}
}
