/** @jsx */
import React from "react";
import I18n from "../services/i18n";
import Select, {SelectOption} from "./select";

class SelectButton extends Select {
	constructor(props) {
		super(props);
		this.values = [
			{
				id: 'no',
				value: I18n.t('no')
			},
			{
				id: 'yes',
				value: I18n.t('yes')
			}
		];
	}

	generateNameAndOptions() {
		let selected = this.props.notAutonomic ? this.props.selected : this.state.selected;
		let value = this.values.find(({id}) => id == selected);
		this.selectboxName = value ? value.value + " " : "--- ";
		this.selectOptions = this.values.map((option, i) => {
			let props = {
				onClick: this.changeValue,
				data: option,
				key: i
			};

			return <SelectOption {...props} />;
		});
	}

	render() {
		super.render();

		return (
			<div className={this.open} onMouseDown={this.openSelect}>
				{this.name}
				<button className='dropdown-toggle' data-toggle='dropdown'>
					{this.selectboxName}
					<span className='glyphicon glyphicon-chevron-down'/>
				</button>
				<ul className='dropdown-menu'>
					{this.selectOptions}
				</ul>
			</div>
		);
	}
}

export default SelectButton;
