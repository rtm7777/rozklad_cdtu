define(['jquery',
				'react',
				'jsx!../components/select'
], ($, React, Select) => {
	var data = [
	  {id: "1", name: "This is one comment"},
	  {id: "2", name: "This is cent"},
	  {id: "3", name: "This ise comment"},
	  {id: "4", name: "Tghis is comment"},
	  {id: "5", name: "Thisg is coment"},
	];
	var comp
	return {
		addGroup() {
			comp = React.render(
				<Select data={data} current={"selected"} />,
				$("#database_container tbody")[0]
			);
		},
		newGroup() {
			data.push({})
			comp.setProps(data)
		}
	}
});