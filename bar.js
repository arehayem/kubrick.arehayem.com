var bar = $('.bar')

bar.on('mouseover', function(){
	
	bar.attr('class', 'visiblebar');
	
});

bar.on('mouseout', function(){
	
	bar.attr('class', 'bar');

});
