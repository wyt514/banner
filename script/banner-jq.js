$(function() {
	var $banner = $('.jd_banner');
	var bannerWidth = $banner.width();
	// console.log('bannerWidth: '+bannerWidth);
	var $imgbox = $banner.children('ul:first-of-type');
	// 修改页面结构
	var $first = $imgbox.children('li:first')
	var $last = $imgbox.children('li:last');
	$last.clone().prependTo($imgbox);
	$first.clone().appendTo($imgbox);
	// 修改对应样式
	var $lis = $imgbox.children('li');
	var len = $lis.length;
	// console.log(len);
	var imgboxWidth = len*100+'%';
	$imgbox.css({'width': imgboxWidth});
	var lisWidth = 100/len+'%';
	$lis.css({'width': lisWidth});
	
	// 默认图片索引
	var index = 1;

	// 点标记
	var $indicators = $banner.children('ul:last-of-type');
	var $li = $('<li></li>');
	for(var i = 0;i < len-2; i++) {
		$li.clone().appendTo($indicators);
	}
	$indicators.children('li:first-of-type').addClass('active');
	var setIndicator = function(index) {
		$indicators.children().removeClass('active');
		$indicators.children('li:nth-of-type('+index+')').addClass('active');
	}


	/*------ 自动轮播 ------*/
	var timeId;
	var startTime = function() {
		timeId = setInterval(function() {
		index++;
		console.log('index: '+index);
		//设置过渡效果
		$imgbox.css('transition','left 0.5s ease-in-out');
		//设置图片偏移
		$imgbox.css('left',-index*100+'%');
		/*setTimeout(function() {
			if(index === len-1) {
				index = 1;
				//清除过渡效果
				$imgbox.css('transition','none');
				$imgbox.css('left',-index*100+'%');
			}
		},500);*/
				
	},2000)
	}
	startTime();
	
	/*------ 手动轮播 ------*/
	var startX, moveX, distanceX, isEnd = true;

	//touchstart
	$imgbox.on('touchstart', function(e) {
		// 清除定时器
		clearInterval(timeId);
		// 获取起始位置
		startX = e.originalEvent.targetTouches[0].clientX;
	})

	// touchmove
	$imgbox.on('touchmove', function(e) {
		if(isEnd) {
			//获取滑动后的位置
			moveX = e.originalEvent.targetTouches[0].clientX;
			// 滑动的位置
			distanceX = moveX - startX;
			// console.log(distanceX);
			//清除过渡效果
			bannerWidth = $banner.width();
			// console.log('bannerWidth: ' + bannerWidth);
			$imgbox.css({
				'left':-index*bannerWidth+distanceX+'px',
				'transition':'none'
			});
			// $imgbox.css({'transform':'translateX('+distanceX+'px)'})
		}
	})

	//touchend
	$imgbox.on('touchend', function(e) {
		isEnd = false;
		if(Math.abs(distanceX) >= bannerWidth/3){
			if(distanceX < 0) {
				index++;				
				// $imgbox.css({'transform':'translateX(-'+lisWidth+')'});
			}else {
				index--;
				// $imgbox.css({'transform':'translateX('+lisWidth+')'});
			}
			// 翻页
			$imgbox.css('transition','left 0.5s ease-in-out');			
			$imgbox.css('left',-index*100+'%');
		}else if(Math.abs(distanceX) > 0){
			// 回弹
			$imgbox.css('left',-index*100+'%');
			// $imgbox.css({'transform':'none'});
		}
		// console.log('index: '+index);
		startX = moveX = distanceX = 0;
		startTime();
	})

	// 监听当前元素的过渡效果执行完毕
	$imgbox.on('transitionend', function() {
		console.log('transitionend');
		if(index === 0) {
			index = len-2;
			$imgbox.css('transition','none');
			$imgbox.css('left',-index*100+'%');
		}else if(index === len-1) {
			index = 1;
			$imgbox.css('transition','none');
			$imgbox.css('left',-index*100+'%');
		}
		isEnd = true;
		setIndicator(index);
		// clearInterval(timeId);
	})

})