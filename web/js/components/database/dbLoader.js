import React from "react";
import PropTypes from 'prop-types';
import Loader from "../loader";
import DBStore from "../../stores/dbStore";

class DBLoader extends Loader {
	static contextTypes = {
		store: PropTypes.instanceOf(DBStore).isRequired
	};
}

export default DBLoader;
