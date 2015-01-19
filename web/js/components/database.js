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
				loader: "",
				error_message: ""
			};
		},

		componentWillMount() {
			if (this.state.selectedCategory) {
				Promise.all([
					promise.post('/get_category_list'),
					promise.post('/get_category', {category: this.state.selectedCategory})
				]).then(data => {
					this.setState({categoryList: data[0]});
					this.setState({fields: data[1]});
				});
			} else {
				promise.post('/get_category_list').then(data => {
					this.setState({categoryList: data});
				});
			}
		},

		changeCategory(child) {

			this.setState({selectedCategory: child.category});
			loadFields(child.category);
		},

		loadFields(category) {
			promise.post('/get_category', {category: this.state.selectedCategory}).then(data => {
				this.setState({fields: data});
			});
		},

		render() {
			return (
				<div>
					<ActionMenu filters={[{id: "1", name: "First"}, {id: "2", name: "Second"}]} />
					<div className="container">
						<div className="row">
							<Navigation onClick={this.changeCategory} navList={this.state.categoryList} selectedCategory={this.state.selectedCategory}/>
							<Content categoryFields={this.state.fields} loader={this.state.loader} />
						</div>
					</div>
				</div>
			);
		},
	});

	return DataBase;
});
