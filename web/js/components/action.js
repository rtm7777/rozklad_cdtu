/** @jsx */
define(['jquery',
				'react'
], ($, React) => {
	var Action = React.createClass({
		changeValue() {
			this.props.onClick(this);
		},
		render() {
			var cx = React.addons.classSet;
			var classes = cx({
		    'hide': this.props.hidden
		  });
			return (
				<li className={classes}>
					<a onClick={this.changeValue} href="#"><span className="glyphicon glyphicon-plus"></span> {this.props.name}</a>
				</li>
			);
		}
	});

	return Action;
});
