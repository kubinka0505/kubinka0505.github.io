/* --- Variables --- */
const Audio_Path = "assets/media/sound/mp3";
var Counter = 0
var GEID = function(ID) {return document.getElementById(ID)};
var GEBC = function(Class) {return document.getElementsByClassName(Class)};
var DOCSTL = document.documentElement.style

/* ---------------- */
/* --- Builtins --- */

class Random {
	static integer(Min = 0, Max) {
		Min = Math.ceil(Min);
		Max = Math.floor(Max);
		return Math.floor(Math.random() * (Max - Min + 1)) + Min
	};
	static choice(Array) {
		return Array[Math.floor(Math.random() * Array.length)]
	}
};

String.prototype.capitalize = function() {
	return this[0].toUpperCase() + this.substring(1)
};

/* ------------- */
/* --- Links --- */

class Links {
	static Website = "https://kubinka0505.github.io";
	static Acapella = "https://mega.nz/folder/zU1w0JyS#0Jwa1fkF9SYEjPR8RirbPw";
	static Savegames = "https://mega.nz/folder/zU9S0T6a#JhJHWefRIl9qBnICiTPDUg"
};

function Redirect(URL) {
	return window.location.replace(URL)
};

/* ------------- */
/* --- Audio --- */

function Play_Sound(URL, Volume) {
	return new Promise(function(resolve, reject) {
		var audio = new Audio();
		audio.preload = "auto";
		audio.loop = 0,
		audio.autoplay = 1;
		audio.onerror = reject;
		audio.onended = resolve;
		audio.volume = Volume;
		audio.src = URL
	})
};

async function Play(Dirname, Max, Avatar_Name) {
	var Dirname = Audio_Path + "/" + Dirname + "/";

	var Avatar = document.getElementsByClassName("avatar")[0];
	var Avatar_Directory = "assets/media/img/png/Avatars/";

	const Extension = Dirname.split("/");
	const File = Random.integer(1, Max).toString().padStart(3, "0") + "." + Extension.slice(-3)[0];

	Avatar.src = Avatar_Directory + Avatar_Name + ".png";
	Play_Sound(Dirname + File, 0.25).then(function() {
		Avatar.src = Avatar_Directory + "Default.png";
	})
};

/* --------------- */
/* --- Various --- */

function SetThemeColor(Color = "#000001") {
	var ThemeColor = document.querySelector("meta[name=theme-color]");
	return ThemeColor.setAttribute("content", Color)
}