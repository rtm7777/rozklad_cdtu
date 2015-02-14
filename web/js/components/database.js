/** @jsx */
define(['../services/localStorage',
				'../libs/promise',
				'react',
				'jsx!../components/dbActionMenu',
				'jsx!../components/dbContent',
				'jsx!../components/dbNavigation',
], (storage, promise, React, ActionMenu, Content, Navigation) => {

	var DataBase = React.createClass({
		getInitialState() {
			return {
				categoryList: [],
				selectedCategory: storage.getValue("category") || "",
				fields: [],
				columns: [],
				filters: [],
				loader: true,
				error_message: ""
			};
		},

		componentWillMount() {
			var promises = [];
			promises.push(promise.post('/get_category_list'));
			if (this.state.selectedCategory) {
				promises.push(this.loadFields(this.state.selectedCategory));
			}
			Promise.all(promises).then(data => {
				this.setState({
					categoryList: data[0],
					loader: false
				});
			});
		},

		changeCategory(child) {
			this.setState({
				loader: true,
				filters: [],
				fields: []
			});

			var category = child.props.data.category;
			storage.saveValue("category", category);
			this.setState({selectedCategory: category});
			this.loadFields(category).then(data => {
				this.setState({loader: false});
			});
		},

		loadFields(category) {
			return promise.post('/get_category', {category: category}).then(data => {
				this.setState({
					fields: data.items,
					columns: data.columns,
					filters: data.filters || []
				});
			});
		},

		render() {
			return (
				<div>
					<ActionMenu filters={this.state.filters} />
					<div className="container">
						<div className="row">
							<Navigation onClick={this.changeCategory} loader={this.state.loader} navList={this.state.categoryList} selectedCategory={this.state.selectedCategory} />
							<Content loader={this.state.loader} fields={this.state.fields} columns={this.state.columns} selectedCategory={this.state.selectedCategory} filters={this.state.filters} />
						</div>
					</div>
				</div>
			);
		},
	});

	return DataBase;
});
