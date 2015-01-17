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
				selectedCategory: "",
				fields: [],
				loader: "",
				error_message: ""
			};
		},
		componentWillMount() {
			var storageCategory = storage.getValue("category");
			if (storageCategory) {
				this.loadFields(storageCategory);
				this.setState({selectedCategory: storageCategory});
			}
		},
		changeCategory(child) {
			console.log(child);
		},
		loadFields(category) {
			Promise.all([
				promise.post('/get_category_list'),
				promise.post('/get_category', {category: category})
			]).then(function(a, b) {
				console.log(a, b);
			});
		},
		render() {
			return (
				<div>
					<ActionMenu filters={[{id: "1", name: "First"}, {id: "2", name: "Second"}]} />
					<div className="container">
						<div className="row">
							<Navigation onClick={this.changeCategory} navList={[this.state.selectedCategory]}/>
							<Content categoryFields={this.state.fields} loader={this.state.loader} />
						</div>
					</div>
				</div>
			);
		},
	});

	return DataBase;
});
