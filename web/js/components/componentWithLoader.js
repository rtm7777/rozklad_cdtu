import React from "react";
import DBStore from "../stores/dbStore";

class ComponentWithloader extends React.Component {
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
}

ComponentWithloader.contextTypes = {
	store: React.PropTypes.instanceOf(DBStore).isRequired
};

export default ComponentWithloader;