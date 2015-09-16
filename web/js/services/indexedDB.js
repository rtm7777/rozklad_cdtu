import Dexie from "dexie";
import model from "../indexedDB/model";
import promise from "../libs/promise";

class DataBase {
	constructor() {
		this.db = new Dexie("rozklad");
		this.db.version(1).stores(model);
		this.db.open();
	}

	getInstance() {
		return this.db;
	}

	synchronize(table) {
		promise.get('/synchronization/get_data', {dataType: table}).then((data) => {
			this.db.transaction('rw', this.db[table], () => {
				data.forEach((row) => {
					this.db[table].put(row);
				});
			});
		});
	}

	synchronizeAll() {
		Object.keys(model).forEach((key) => {
			this.synchronize(key);
		});
	}
}

export default DataBase;
