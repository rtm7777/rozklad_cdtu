/** @jsx */
define(['react'], (React) => {
	var Action = React.createClass({
		changeValue() {
			this.props.onClick(this);
		},
		render() {
			var cx = React.addons.classSet;
			var classes = cx({
		    'hide': this.props.data.hidden
		  });
		  var icon = "glyphicon glyphicon-" + this.props.data.icon;
			return (
				<li className={classes}>
					<a onClick={this.changeValue} href="#"><span className={"glyphicon glyphicon-" + this.props.data.icon}></span> {this.props.data.name}</a>
				</li>
			);
		}
	});

	return Action;
});
