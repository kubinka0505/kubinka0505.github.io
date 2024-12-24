var Time = 5;
var Timer = setInterval(
	function() {
		document.getElementsByTagName("b")[0].innerHTML = Time;
		Time--;
		/*---*/
		if (Time < 0) {
			document.getElementsByTagName("i")[0].innerHTML = "Redirecting...";
			clearInterval(Timer)
			Redirect(Links.Website);
		}
	}, 1000
)