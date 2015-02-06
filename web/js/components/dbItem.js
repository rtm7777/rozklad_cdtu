/** @jsx */
define(['react'], (React) => {
	var filters = {
		audiences(data) {
			return [data.number, data.housingId, data.type, data.sets];
		},
		departments(data) {
			return [data.facultyId, data.name];
		},
		faculties(data) {
			return [data.fullName, data.shortName];
		},
		groups(data) {
			return [data.facultyId, data.fullName, data.fullName, data.studentsCount, data.year];
		},
		housings(data) {
			return [data.number];
		},
		subjects(data) {
			return [data.subject];
		},
		teachers(data) {
			return [data.facultyId, data.departmentId, data.lastName, data.sets];
		}
	};

	var ItemCell = React.createClass({
		render() {
			return (
				<td>
					{this.props.data}
				</td>
			);
		}
	});

	var DBItem = React.createClass({
		changeValue() {
			this.props.onClick(this);
		},
		render() {
			// var cx = React.addons.classSet;
			// var classes = cx({
			// 	'hide': this.props.data.hidden
			// });
			var itemCells = filters[this.props.category](this.props.data).map((cell, i) => {
				return (
					<ItemCell key={i} data={cell}/>
				);
			});
			return (
				<tr>
					{itemCells}
				</tr>
			);
		}
	});

	return DBItem;
});
