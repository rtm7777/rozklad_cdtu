let storage = localStorage;

export default {
	saveValue(name, value) {
		storage.setItem(name, value);
	},

	getValue(name) {
		return storage.getItem(name);
	}
};
