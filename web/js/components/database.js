define(['jquery',
				'react',
				'jsx!../components/dbActionMenu',
				'jsx!../components/dbContent',
], ($, React, ActionMenu, Content) => {

	var DataBase = React.createClass({
		render() {
			var dbCols = this.props.categoryFields.map(function (field) {
				return (
					<th>
						{field}
					</th>
				);
			});

			return (
				<div>
					<ActionMenu filters={[{id: "1", name: "First"}, {id: "2", name: "Second"}]} />
					<Content />
				</div>
			);
		},
	});

	return DataBase
});
