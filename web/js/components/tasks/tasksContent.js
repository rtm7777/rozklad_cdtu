/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import TasksStore from "../../stores/tasksStore";
import TaskItem from "./taskItem";
import I18n from "../../services/i18n";

class Content extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(TasksStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {loader: false};
	}

	componentWillMount() {
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
					{I18n.t(column)}
				</th>
			);
		});

		let items = [];
		if (this.props.fields) {
			items = this.props.fields.map(field => {
				let props = {
					data: field,
					key: field.id
				};

				return (
					<TaskItem {...props}/>
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
