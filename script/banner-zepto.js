var banner = $('.jd_banner');
var imgbox = banner.find('ul:eq(0)');
var indicator = banner.find('ul:eq(1)');

// 首尾添加图片
var first = imgbox.find('li:first-of-type');
var last = imgbox.find('li:last-of-type');
imgbox.append(first.clone());
first.before(last.clone());

//修改对应样式
var lis = imgbox.children('li');
var len = lis.length;
imgbox.width(len*100+'%');
lis.width(100/len+'%');

//添加点标记
var li = $('<li></li>');
for(var i = 0;i < len-2;i++) {
	indicator.append(li.clone());
}
var indicators = indicator.children('li');
indicators.eq(0).addClass('active');

var imgAmination = function(){
	imgbox.animate(
		{
			left : -index*100+'%',
		},
		500,
		'ease-in-out',
		function() {
			if(index === len-1) {
				index = 1;
				imgbox.css({'left' : -index*100+'%'});
			}else if(index === 0) {
				index = len-2;
				imgbox.css({'left' : -index*100+'%'});
			}
			indicators.removeClass('active').eq(index-1).addClass('active');
			clearInterval(timeId);
			startTime();
		}
	)
}

//自动轮播
var index = 1;
var timeId;
var startTime = function() {
	timeId = setInterval(function() {
	index++;
	console.log(index);
	imgAmination();
},2000)
}
startTime();


//手动轮播
imgbox.on('swipeLeft', function() {
	console.log('swipeLeft');
	clearInterval(timeId);
	index++;
	imgAmination();
}).on('swipeRight', function() {
	clearInterval(timeId);
	console.log('swipeRight');
	index--;
	imgAmination();
})

