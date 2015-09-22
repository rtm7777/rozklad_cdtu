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

	loadTasksDetails(tasks) {
		let promises = [];

		tasks.map((task) => {
			promises.push(Promise.all([
				this.db.groups.where('id').equals(task.groupId).first().then((row) => {
					task.group = row ? row.name : '';
				}),
				this.db.subjects.where('id').equals(task.subjectId).first().then((row) => {
					task.subject = row ? row.subject : '';
				}),
				this.db.teachers.where('id').equals(task.teacherId).first().then((row) => {
					task.teacher = row ? `${row.lastName} ${row.firstName[0]}. ${row.middleName[0]}.` : '';
				}),
				this.db.audiences.where('id').equals(task.audienceId).first().then((row) => {
					task.audience = row ? row.number : '';
				}),
			]).then(() => {
				return task;
			}));
		});

		return Promise.all(promises);
	}

	startsWithAnyOfIgnoreCase(tableOrCollection, index, prefixes) {
		if (!prefixes || prefixes.length === 0) throw 'must supply at least one prefix';
		return prefixes.reduce((collection, prefix) => {
				return collection ?
						collection.or(index).startsWithIgnoreCase(prefix) :
						(tableOrCollection.where ? tableOrCollection.where(index) :
							tableOrCollection.or(index)).startsWithIgnoreCase(prefix);
		}, null);
	}

	searchMultiple(tableOrCollection, indices, prefixes) {
		return indices.reduce((collection, index) => {
			return collection ?
				this.startsWithAnyOfIgnoreCase(collection, index, prefixes) :
				this.startsWithAnyOfIgnoreCase(tableOrCollection, index, prefixes);
		}, null);
	}
}

export default DataBase;
