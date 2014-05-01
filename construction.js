var ready = ['2001.html', 'index.html'];

$.each($(".bar a"), function(index) {
	var href = $(this).attr('href');
	if (ready.indexOf(href) == -1)
		$(this).replaceWith( $("<span>" + $(this).html() + "</span>") );
});
