var bar = $('.bar')

$('[href="'+document.location.href.match(/[^\/]+$/)[0]+'"]').attr('id', 'current');

bar.on('mouseover', function(){
	
	bar.attr('class', 'visiblebar');
	
});

bar.on('mouseout', function(){
	
	bar.attr('class', 'bar');

});
