/** @jsx */
define(['jquery',
				'react'
], ($, React) => {
	var SelectOption = React.createClass({
		changeValue(e) {
			e.preventDefault();
			this.props.onClick(this);
		},
		render() {
			return (
				<li onClick={this.changeValue}><a tabIndex="-1" data-id={this.props.data.id} href="#">{this.props.data.name}{this.props.kreactKey}</a></li>
			);
		}
	});

	var Select = React.createClass({
		getInitialState() {
			return {selected: this.props.current};
		},
		changeValue(child) {
			this.refs.button.getDOMNode().setAttribute("data-id", child.props.data.id);
			this.setState({selected: child.props.data.name});
		},
		render() {
			var selectOptions = this.props.data.map(option => {
				return (
					<SelectOption onClick={this.changeValue} key={option.id} data={option} />
				);
			});

			if (this.props.dropdownType == "button") {
				return (
					<div className="dropdown">
						<button className="dropdown-toggle" data-toggle="dropdown" ref="button" data-id="">
							{this.state.selected}
							<span className="glyphicon glyphicon-chevron-down"/>
						</button>
						<ul className="dropdown-menu">
							{selectOptions}
						</ul>
					</div>
				);
			} else {
				return (
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" ref="button" data-id="" href="#">
							{this.state.selected}
							<span className="caret"/>
						</a>
						<ul className="dropdown-menu">
							{selectOptions}
						</ul>
					</li>
				);
			}
		}
	});

	return Select;
});
