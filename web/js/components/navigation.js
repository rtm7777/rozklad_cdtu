/** @jsx */
import React from "react";

class NavOption extends React.Component {
	constructor(props) {
		super(props);
		this.optionSelected = this.optionSelected.bind(this);
	}

	optionSelected(e) {
		e.preventDefault();
		this.props.onClick(this);
	}

	render() {
		console.log(this.props.data.optionValue, this.props.active);
		let active = this.props.data.optionValue == this.props.active ? 'active' : '';
		return (
			<a onClick={this.optionSelected} href='#' data-category={this.props.data.optionValue} className={`list-group-item ${active}`}>{this.props.data.name}</a>
		);
	}
}

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.selectOption = this.selectOption.bind(this);
	}

	selectOption(el) {
		console.error('Prease override this method');
	}

	render() {
		let navigation = this.props.navList.map((field, i) => {
			let props = {
				data: field,
				active: this.props.selectedOption,
				onClick: this.selectOption,
				key: i
			};

			return <NavOption {...props} />;
		});

		return (
			<div className='list-group navigation'>
				{navigation}
			</div>
		);
	}
}

export default Navigation;
