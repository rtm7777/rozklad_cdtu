/** @jsx */
import React from "react";
import Select from "./select";

class SelectLink extends Select {
	constructor(props) {
		super(props);
	}

	render() {
		super.render();

		return (
			<li className={this.open} onMouseDown={this.openSelect}>
				{this.name}
				<a className='dropdown-toggle' data-toggle='dropdown' href='#'>
					{this.selectboxName}
					<span className='caret'/>
				</a>
				<ul className='dropdown-menu'>
					{this.selectOptions}
				</ul>
			</li>
		);
	}
}

export default SelectLink;
