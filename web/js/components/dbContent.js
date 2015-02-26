/** @jsx */
import React from "react";
import {DBItem} from "../components/dbItem";

export class Content extends React.Component {
	constructor(props) {
		super(props);
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
				let props = {
					category: this.props.selectedCategory,
					filters: this.props.filters,
					data: field,
					key: field.id
				};

				return <DBItem {...props} />;
			});
		}

		let loaderShow = 'visible';
		let tableShow = 'invisible';
		if (!this.props.loader) {
			loaderShow = 'invisible';
			tableShow = 'visible';
		}
		return (
			<div id="database_container" className="col-lg-9">
				<div className={"loader " + loaderShow}><img src="/public/img/loader.svg"/></div>
				<table className={"table table-bordered table-hover table-striped table-condensed " + tableShow}>
					<thead>
						<tr>
							{headerCols}
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
		);
	}
}
