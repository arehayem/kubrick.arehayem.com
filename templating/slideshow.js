var slides = [
	{
	'primary_img': 'cat-1.jpg',
	'caption': 'cats!',
	'secondary_imgs': ['cat-2.jpg', 'cat-3.jpg']
	},
	{
	'primary_img': 'cat-4.jpg',
	'caption': 'cats!',
	'secondary_imgs': ['cat-5.jpg', 'cat-6.jpg']
	},
	{
	'primary_img': 'cat-7.jpg',
	'caption': 'cats!',
	'secondary_imgs': ['cat-8.jpg', 'cat-10.jpg']
	}
];
var slideTmpl = $('#slideTmpl')[0].innerHTML;
var slideshow = $('#cat_show ul')

$.each(slides, function(i,slide){

	var imagePath = '../images/cats/';
	var slideNode = $(slideTmpl);
	console.log('node:' + slideNode);
	slideNode.find('.primary_img').attr('src', imagePath + slide.primary_img);

	$.each(slide.secondary_imgs, function(i,secondary_img){
		var imgNode = $('<img />');
		imgNode.attr('src', imagePath + secondary_img)
		slideNode.find('.secondary_imgs').append(imgNode);
	})

	slideNode.find('h2').text(slide.caption);
	slideshow.append(slideNode);
});

$('#cat_show li:first-child').addClass('active');
activateSlideshow();

function activateSlideshow(){

	var slides = $('#cat_show li');
	var n = slides.length; //number of slides
	var i = 0; //slide index
	//do something when we click prev
	$('.prev').on('click', function(){
		i = (i - 1 + n) % n;
		slides.removeClass('active');
		$(slides[i]).addClass('active');
		console.log(i);
	});

	//do something when we click next
	$('.next').on('click', function(){
		i = (i + 1 + n) % n;
		slides.removeClass('active');
		$(slides[i]).addClass('active');
		console.log(i);
	});

	console.log(slides);

}