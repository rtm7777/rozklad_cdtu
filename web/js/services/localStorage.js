define([],function() {

	var storage = localStorage;

	return {
		saveValue: function(name, value) {
			storage.setItem(name, value);
		},

		getValue: function(name) {
			storage.getItem(name);
		}
	};
});