import React from "react";

class Loader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loader: true};
	}

	componentWillMount() {
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
				<div className='bounce1'></div>
				<div className='bounce2'></div>
				<div className='bounce3'></div>
			</div>
		);
	}
}

export default Loader;
