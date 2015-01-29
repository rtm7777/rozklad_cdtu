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
				<li onClick={this.changeValue}><a tabIndex="-1" href="#">{this.props.data}</a></li>
			);
		}
	});

	var Select = React.createClass({
		getInitialState() {
			return {selected: ""};
		},
		changeValue(child) {
			this.setState({selected: child.props.data});
		},
		render() {
			var selectboxName = [this.state.selected, this.props.initialName].join(" ");
			var selectOptions = this.props.values.map((option, i) => {
				return (
					<SelectOption onClick={this.changeValue} key={i} data={option} />
				);
			});

			if (this.props.dropdownType == "button") {
				return (
					<div className="dropdown">
						<button className="dropdown-toggle" data-toggle="dropdown" ref="button" data-id="">
							{selectboxName}
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
							{selectboxName}
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
