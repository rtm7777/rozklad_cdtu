define(['jquery',
		"../views/contentView",
],function($, contentView) {
	$("#faculty_sel .dropdown-menu a").on("click", function() {
		$.post('/get_faculty_groups',
			{
				faculty_id: $(this).data("faculty-id"),
				year: "4"
			})
		.done(function(data){
			$("#schedule_container").html("");
			$("#content_loader").addClass("hide");
			$("#day_table_row, #pair_table_row, #schedule_container").removeClass("hide");
			for (var group in data) {
				contentView.addGroup(data[group].ShortName);
			}
		}).always(function() {

		});
	});

});