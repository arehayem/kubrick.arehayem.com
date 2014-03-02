var bar = $('.bar')
var a = $('.bar a')
bar.on('mouseover', function(){
	
	a.css({
		'visibility':'visible'
	});
	bar.css({
		'height':'auto',
		'width':'auto',
		'background':'darkslategray'
	});
});
bar.on('mouseout', function(){
	
	a.css({
		'visibility':''
	});
	bar.css({
		'height':'',
		'width':'',
		'background':''
	});
});
