/* --- Variables --- */
const Audio_Path = "assets/media/sound/mp3";

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

function Play_Sound(Sound){
	return new Promise(res => {
		Sound.play()
		Sound.onended = res
	})
}

async function Play(Dirname, Max, Avatar_Name = "Default") {
	var Dirname = Audio_Path + "/" + Dirname + "/";

	var Avatar = document.getElementsByClassName("avatar")[0]
	var Avatar_Name_Default = "assets/media/img/png/Avatars/Default.png";
	var Avatar_Name = Avatar_Name_Default.replace("Default", Avatar_Name);

	const Format = Dirname.split("/");
	const File = Random.integer(1, Max) + "." + Format.slice(-3)[0];

	const Sound = new Audio(Dirname + File);
	Sound.loop = false;
	Sound.volume = .175;

	Avatar.src = Avatar_Name;
	await Play_Sound(Sound);
	return Avatar.src = Avatar_Name_Default
};

/* --------------- */
/* --- Various --- */

function SetThemeColor(Color = "#000001") {
	var ThemeColor = document.querySelector("meta[name=theme-color]");
	return ThemeColor.setAttribute("content", Color)
}