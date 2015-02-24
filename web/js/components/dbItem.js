/** @jsx */
import React from "react";
import {Select} from "../components/select";

var filters = {
	audiences(data) {
		return [
			{data: data.number},
			{data: data.housingId, type: 'selectbox', order: 0},
			{data: data.type},
			{data: data.sets},
			{data: data.note}
		];
	},
	departments(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name}
		];
	},
	faculties(data) {
		return [
			{data: data.fullName},
			{data: data.shortName}
		];
	},
	groups(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.name},
			{data: data.studentsCount},
			{data: data.year, type: 'selectbox', order: 1}
		];
	},
	housings(data) {
		return [
			{data: data.number}
		];
	},
	subjects(data) {
		return [
			{data: data.subject}
		];
	},
	teachers(data) {
		return [
			{data: data.facultyId, type: 'selectbox', order: 0},
			{data: data.departmentId, type: 'selectbox', order: 1},
			{data: [data.firstName, data.lastName, data.middleName], type: 'name'},
			{data: data.rank}
		];
	}
};

var ItemCell = React.createClass({
	render() {
		if (this.props.data.type == 'selectbox') {
			return (
				<td className="no-padding">
					<Select values={this.props.filters[this.props.data.order].values} selected={this.props.data.data} button={true} />
				</td>
			);
		} else if (this.props.data.type == 'name') {
			return (
				<td className="no-padding">
					<div className="dropdown">
						<button tabindex="0" className="popove btn" role="button" data-toggle="popover" data-placement="bottom" data-content="khhkufjh">{this.props.data.data[1]}</button>
					</div>
				</td>
			);
		} else {
			return (
				<td>
					<input type="text" defaultValue={this.props.data.data} />
				</td>
			);
		}
	}
});

export var DBItem = React.createClass({
	changeValue() {
		this.props.onClick(this);
	},
	render() {
		var itemCells = filters[this.props.category](this.props.data).map((cell, i) => {
			return (
				<ItemCell key={i} data={cell} filters={this.props.filters}/>
			);
		});
		return (
			<tr>
				{itemCells}
			</tr>
		);
	}
});
