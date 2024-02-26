var Dictionary = Random.choice([
	{"Title": "go away", "File": "assets/media/mp4/1.mp4"},
	{"Title": "gone", "File": "assets/media/mp4/2.mp4"}
]);

document.title = Object.values(Dictionary)[0];

/*---*/

var Elements = document.querySelectorAll("video");
for (var i = 0; i < Elements.length; i++) {
	Elements[i].setAttribute("class", "vid")
	Elements[i].setAttribute("autoplay", "")
};

var Elements = document.querySelectorAll("source");
for (var i = 0; i < Elements.length; i++) {
	Elements[i].setAttribute("src", Object.values(Dictionary)[1])
	Elements[i].setAttribute("type", "video/mp4")
}