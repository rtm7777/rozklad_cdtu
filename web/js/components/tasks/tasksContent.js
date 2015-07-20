/** @jsx */
import React from "react";
import TasksStore from "../../stores/tasksStore";

class Content extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(TasksStore).isRequired
	}

	constructor(props) {
		super(props);
		this.state = {loader: false};
	}

	componentDidMount() {
		let store = this.context.store;
		store.on('loaderChange', () => {
			this.setState({loader: store.getLoaderState()});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('loaderChange');
	}


	render() {
		let headerCols = this.props.columns.map((column, i) => {
			return (
				<th key={i}>
					{column}
				</th>
			);
		});

		let items = [];
		if (this.props.fields) {
			items = this.props.fields.map(field => {

				return (
					<tr><td>lsihglsdkhg</td></tr>
				);
			});
		}

		let tableShow = 'invisible';
		if (!this.state.loader) {
			tableShow = 'visible';
		}

		return (
			<table className={`table table-bordered table-hover table-striped table-condensed ${tableShow}`}>
				<thead>
					<tr>
						{headerCols}
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		);
	}
}

export default Content;
