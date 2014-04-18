var slides = [
	{
	'primary_img': 'cat-1.jpg',
	'caption': 'cats!',
	'secondary_imgs': ['cat-2.jpg', 'cat-3.jpg']
	},
	{
	'primary_img': 'cat-4.jpg',
	'caption': 'cats!2',
	'secondary_imgs': ['cat-5.jpg', 'cat-6.jpg']
	},
	{
	'primary_img': 'cat-7.jpg',
	'caption': 'cats!3',
	'secondary_imgs': ['cat-8.jpg', 'cat-10.jpg']
	}
];

var tmplText = $('#slideTmpl').html();
var slideshowTmpl = Hogan.compile(tmplText);
var slideshow = slideshowTmpl.render( {slides:slides} );
$('#cat_show').append(slideshow);

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

activateSlideshow();
