import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

$(document).on('mouseup', (e) => {
	$('[data-toggle="popover"]').each((i, elem) => {
		let $elem = $(elem);
		if (!$elem.is(e.target) && $elem.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
			$elem.popover('hide');
		}
	});
});

$(document).on('click', ".dropdown-toggle", (e) => {
	if (e.ctrlKey) {
		if (e.currentTarget.getAttribute('aria-expanded') == "true") {
			$(e.currentTarget).parent().removeClass('open');
		}
	}
});
