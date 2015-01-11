define(['jquery',
				'react'
], ($, React) => {
	var SelectOption = React.createClass({
		changeValue() {
			this.props.onClick(this);
		},
		render() {
			return (
				<li onClick={this.changeValue}><a tabIndex="-1" data-id={this.props.data.id} href="#">{this.props.data.name}{this.props.kreactKey}</a></li>
			);
		},
	})

	var Select = React.createClass({
		getInitialState() {
			return {selected: this.props.current};
		},
		changeValue(child) {
			this.refs.button.getDOMNode().setAttribute("data-id", child.props.data.id);
			this.props.current = child.props.data.name
			// this.setState({selected: child.props.data.name})
		},
		render() {
			var selectOptions = this.props.data.map(function (option) {
				return (
					<SelectOption onClick={this.changeValue} key={option.id} data={option} />
				);
			}.bind(this));

			var selected = this.state.selected ? this.state.selected : this.props.current

			if (this.props.dropdownType == "button") {
				return (
					<div className="dropdown">
						<button className="dropdown-toggle" data-toggle="dropdown" ref="button" data-id="">
							{selected}
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
		},
	});

	return Select
});
