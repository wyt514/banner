$(function() {
	var items = $('.carousel-inner .item');
	$(window).on('resize', function() {
		var width = $(this).width();
		console.log(width);
		if(width >= 768) {
			items.each(function(index, value) {
				var img = $(this).data('largeImg');
				$(this).html($('<a href="JavaScript:;" class="pcImg"></a>').css({'backgroundImage': 'url("'+img+'")'}));
			})
		}else {
			items.each(function(index, value) {
				var img = $(this).data('smallImg');
				$(this).html('<a href="JavaScript:;" class="mobileImg"><img src="'+img+'" alt="..."></a>');
			})
		}
	}).trigger('resize')
})