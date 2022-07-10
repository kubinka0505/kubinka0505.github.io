function Position(Axis) {return ((Axis + 10) / 20) * 100};
function get_(tag) {return document.getElementsByTagName(tag)[0]};

var Sound = new Audio('assets/media/mp3/1.mp3')
Sound.volume = Sound_Volume * 2.5;

/*---*/

window.onload = function() {
	var Container = get_("a");

	/*---*/

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		Content = "ᗜˬᗜ";
		Container.innerHTML = Content;
		const html_ = get_("html");
		
		var Width = html_.getBoundingClientRect().width;
		var Height = html_.getBoundingClientRect().height;

		html_.setAttribute("onclick", "Sound.play()");
		Container.setAttribute("href", "https://www.google.com/search?q=%E1%97%9C%CB%AC%E1%97%9C&tbm=isch")
	} else {
		Content = ">no mobile ᗜ˰ᗜ";
		Container.innerHTML = "<p style='color: lime'>" + Content + "</p>"
	}

	document.title = Content

	/*---*/

	function handleMotionEvent(event) {
		var X = event.accelerationIncludingGravity.x;
		var Y = event.accelerationIncludingGravity.y;

		Container.style.right = Width / (100 / Position(X)) + "px";
		Container.style.top = Height / (100 / Position(Y)) + "px"
	}

	window.addEventListener("devicemotion", handleMotionEvent, 1)
}