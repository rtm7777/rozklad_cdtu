/** @jsx */
import React from "react";
import Select from "./select";

class SelectButton extends Select {
	constructor(props) {
		super(props);
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
