import dbDispatcher from "../dispatcher/dbDispatcher";
import {EventEmitter} from "events";

var CHANGE_EVENT = 'change';

var _items = ['la', 'lala', 'lalala'];


class dbStore extends EventEmitter {
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

export var store = new dbStore();

var dispatcherFunctions = {
	create(action) {
		console.log(action);
		store.emitChange();
	}
};

dbDispatcher.register(action => {
	dispatcherFunctions[action.actionType](action);
});