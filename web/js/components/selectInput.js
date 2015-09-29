/** @jsx */
import React from "react";
import ClickAway from "./clickAway";

class SelectInput extends ClickAway {
	constructor(props) {
		super(props);
		this.state = {opened: false};
		this.fields = ['one', 'two'];
	}

	onInputChanged = (e) => {
		this.props.searchFunc(e.target.value).then((result) => {
			console.log(result);
		});
	}

	optionSelected = (e) => {
		if (this.props.onChange) {
			this.props.onChange({
				name: this.props.name,
				value: e.target.dataset.value
			});
		}
		this.setState({opened: false});
	}

	toggleSelect = () => {
		this.setState({opened: !this.state.opened});
	}

	componentClickAway = () => {
		this.setState({opened: false});
	}

	render() {
		let style = {
			display: this.state.opened ? 'block' : 'none'
		};
		let options = this.fields.map((option, i) => {
			return (
				<li key={i}><a href='#' onClick={this.optionSelected} data-value={i}>{option}</a></li>
			);
		});
		return (
			<div ref="control" className={'input-select'}>
				<input
						className={'table-input'}
						defaultValue={this.props.value}
						name={this.props.name}
						onFocus={this.toggleSelect}
						onChange={this.onInputChanged}
						type='text'
					/>
				<ul className='dropdown-menu' style={style}>
					{options}
				</ul>
			</div>
		);
	}
}

export default SelectInput;
