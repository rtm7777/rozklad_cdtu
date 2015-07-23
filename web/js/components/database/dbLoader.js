import React from "react";
import Loader from "../loader";
import DBStore from "../../stores/dbStore";

class DBLoader extends Loader {
	static contextTypes = {
		store: React.PropTypes.instanceOf(DBStore).isRequired
	}
}

export default DBLoader;
