import React from "react";
import DBStore from "../../stores/dbStore";

class Loader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loader: true};
	}

	componentDidMount() {
		let store = this.context.store;
		store.on('loaderChange', () => {
			this.setState({loader: store.getLoaderState()});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('loaderChange');
  }

  render() {
		let loaderShow = 'visible';
		if (!this.state.loader) {
			loaderShow = 'invisible';
		}
		return (
			<div className={`loader ${loaderShow}`}>
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		);
	}
}

Loader.contextTypes = {
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default Loader;