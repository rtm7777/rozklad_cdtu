define([], () => {

	var storage = localStorage;

	return {
		saveValue(name, value) {
			storage.setItem(name, value);
		},

		getValue(name) {
			return storage.getItem(name);
		}
	};
});