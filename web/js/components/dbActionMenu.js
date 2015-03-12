/** @jsx */
import React from "react";
import {Select} from "../components/select";
import Action from "../components/action";

export class ActionMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actions: [
				{name: "Delete", hidden: false, icon: "remove"},
				{name: "Add", hidden: false, icon: "plus"},
			]
		};
	}

	render() {
		let filters = this.props.filters.map((filter, i) => {
			let props = {
				values: filter.values,
				key: i,
				name: filter.name
			};

			return <Select {...props} />;
		});

		let actions = this.state.actions.map((action, i) => {
			let props = {
				key: i,
				data: action
			};

			return <Action {...props} />;
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="panel clearfix panel-default">
							<ul className="nav nav-pills pull-left filter-menu">
								{filters}
							</ul>
							<ul className="nav nav-pills pull-right action-menu">
								{actions}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
