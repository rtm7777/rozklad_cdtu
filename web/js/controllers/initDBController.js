/** @jsx */
define(['react', 'jsx!../components/database'], (React, DataBase) => {
	if (document.getElementById('page').dataset.id == "database") {
		React.render(
			<DataBase/>,
			document.getElementById('database')
		);
	}
});
