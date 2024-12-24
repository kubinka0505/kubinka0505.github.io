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

let Links = {
	"Website": "https://kubinka0505.github.io",
	"Acapella": "https://mega.nz/folder/zU1w0JyS#0Jwa1fkF9SYEjPR8RirbPw",
	"Savegames": "https://mega.nz/folder/zU9S0T6a#JhJHWefRIl9qBnICiTPDUg"
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

MathJax = {
  options: {
    renderActions: {
      addMenu: []
    }
  }
};

/**
 * Displays a customizable SweetAlert2 toast notification.
 *
 * @param {string} title - The title of the alert.
 * @param {string} content - The content (message) of the alert.
 * @param {string} [icon="info"] - The icon to display in the alert. Default is "info".
 * @param {number} [time=5000] - The duration the alert should be visible in milliseconds. Default is 3000ms.
 * @param {number|string} [position="bottom-right"] - The position of the alert on the screen. "top-center" if window width < 800. Can be:
 *     - A number (0-8) corresponding to predefined positions (top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right).
 *     - A string specifying a custom position (e.g., "top-left", "bottom-right"). Default is "top-right".
 * @param {string} [cssClass="_swal-popup-custom"] - The CSS class to apply to the popup for custom styling. Default is "_swal-popup-custom".
 *
 * @throws {TypeError} Throws an error if `title`, `content`, `icon`, `time`, or `cssClass` are not of the expected type or are empty.
 * @throws {RangeError} Throws an error if `position` is a number but is outside the 0-8 range.
 * @throws {Error} Throws an error if `position` is a string but does not match a valid position.
 *
 * @returns {Object} Returns an object containing the parameters used to configure the alert:
 *   - `title` {string} - The title of the alert.
 *   - `content` {string} - The content (message) of the alert.
 *   - `icon` {string} - The icon to display in the alert.
 *   - `time` {number} - The duration the alert should be visible.
 *   - `position` {number|string} - The position of the alert on the screen.
 *   - `cssClass` {string} - The CSS class applied to the popup for custom styling.
 */
function showAlert(title, content, icon = "info", time = 5000, position = "bottom-right", cssClass = "_swal-popup-custom") {
	// Ensure SweetAlert2 is available
	if (typeof Swal === "undefined") {
		console.error("SweetAlert2 is not loaded.");
		return;
	}

	const positionMap = {
		0: "top-left",    1: "top-center",    2: "top-right",
		3: "center-left", 4: "center",        5: "center-right",
		6: "bottom-left", 7: "bottom-center", 8: "bottom-right"
	};

	// -=-=-=- //
	// Exception handling

	// Validate required parameters
	if (typeof title !== "string" || title.trim() === "") {
		throw new TypeError("The title parameter is required and must be a non-empty string.");
	}

	if (typeof content !== "string" || content.trim() === "") {
		throw new TypeError("The content parameter is required and must be a non-empty string.");
	}

	// Validate optional parameters
	if (typeof icon !== "string") {
		throw new TypeError("The icon parameter must be a string.");
	}

	if (typeof time !== "number" || time <= 0) {
		throw new TypeError("The time parameter must be a positive number.");
	}

	if (typeof position === "number") {
		if (!positionMap.hasOwnProperty(position)) {
			throw new RangeError("The position number must be between 0 and 8.");
		}
	} else if (typeof position === "string") {
		if (!Object.values(positionMap).includes(position)) {
			throw new Error("The position string must be a valid position (e.g., \"top-left\", \"bottom-right\").");
		}
	} else {
		throw new TypeError("The position parameter must be a number (0-8) or a valid position string.");
	}

	if (typeof cssClass !== "string" || cssClass.trim() === "") {
		cssClass = "swal-popup-custom";
	}

	// Determine the position
	let swalPosition;

	if (window.innerWidth < 800) {
		swalPosition = "top-center"
	} else {
		swalPosition = typeof position === "number"
			? positionMap[position]
			: position;
	}

	// Inject custom styles once, not on every alert
	if (!document.querySelector(`.${cssClass}-style`)) {
		const style = document.createElement("style");
		style.className = `${cssClass}-style`;
		style.innerHTML = `.${cssClass} {
			backdrop-filter: none !important;
			background: #333 !important;
			color: #FFF !important;
		}`;

		document.head.appendChild(style);
	}

	// Display
	Swal.fire({
		title: title,
		html: content,
		icon: icon,
		toast: true,
		position: swalPosition,
		timer: time,
		timerProgressBar: true,
		showConfirmButton: false,
		customClass: {
			popup: cssClass
		}
	});

	// Return
	let retval = {title, content, icon, time, position, cssClass};
	return retval;
}

/* -=-=-=- */

const fmtDate = (date) => {
	const day = date.getDate();
	const month = date.toLocaleString("en-US", {month: "long"});
	const year = date.getFullYear();

	// Determine the ordinal suffix for the day
	const suffix = (day % 10 === 1 && day !== 11) ? "st" :
		(day % 10 === 2 && day !== 12) ? "nd" :
		(day % 10 === 3 && day !== 13) ? "rd" : "th";

	return `${day}${suffix} ${month} ${year}`;
}