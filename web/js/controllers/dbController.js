define(['jquery',
		'../views/dbContentView',
], ($, dbView) => {
	$("#add_db").on("click", () => {
		var category = $("#database_categories .active").attr("data-category");
		dbView.addEmptyField(category);
	});

	$("#database_container").on("click", "tbody tr", (e) => {
		$this = $(e.currentTarget);
		if (e.ctrlKey) {
			var selectedItems;
			if ($this.hasClass("info")) {
				$this.removeClass("info");
			} else {
				$this.addClass("info");
			}
			selectedItems = $("#database_container tbody tr.info");
			if (selectedItems.length > 0) {
				$("#delete_db").removeClass("hide");
			} else {
				$("#delete_db").addClass("hide");
			}
		}
	});

});