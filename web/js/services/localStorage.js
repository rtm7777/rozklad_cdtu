define([],function() {

	var storage = localStorage;

	return {
		saveValue: function(name, value) {
			storage.setItem(name, value);
		},

		getValue: function(name) {
			return storage.getItem(name);
		}
	};
});