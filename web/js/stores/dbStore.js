import dbDispatcher from "../dispatcher/dbDispatcher";
import {EventEmitter} from "events";

const CHANGE_EVENT = 'change';

var _items = ['la', 'lala', 'lalala'];


class DBStore extends EventEmitter {
	constructor(dispatcher) {
		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'create':
					console.log(action, action.count);
					this.emitChange();
					break;
				}
		});
	}

	getAll() {
		return _items;
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

export default DBStore;