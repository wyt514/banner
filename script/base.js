// 处理scrollTop在不同浏览器的兼容性问题
function getScrollTop() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}