/** @jsx */
import React from "react";
import {DBItem} from "../components/dbItem";

export var Content = React.createClass({
	render() {
		var headerCols = this.props.columns.map((column, i) => {
			return (
				<th key={i}>
					{column}
				</th>
			);
		});

		var items = [];
		if (this.props.fields) {
			items = this.props.fields.map(field => {
				return (
					<DBItem key={field.id} data={field} category={this.props.selectedCategory} filters={this.props.filters}/>
				);
			});
		}

		var loaderShow = 'visible';
		var tableShow = 'invisible';
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
	},
});
