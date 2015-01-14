/** @jsx */
define(['../services/localStorage',
				'react',
				'jsx!../components/dbActionMenu',
				'jsx!../components/dbContent',
				'jsx!../components/dbNavigation',
], (storage, React, ActionMenu, Content, Navigation) => {

	var DataBase = React.createClass({
		getInitialState() {
			var storageCategory = storage.getValue("category");

			return {};
		},
		render() {

			return (
				<div>
					<ActionMenu filters={[{id: "1", name: "First"}, {id: "2", name: "Second"}]} />
					<div className="container">
						<div className="row">
							<Navigation navList={["sdf"]}/>
							<Content categoryFields={["sdf"]}/>
						</div>
					</div>
				</div>
			);
		},
	});

	return DataBase;
});
