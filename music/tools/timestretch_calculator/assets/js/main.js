var modeSt  = GEBC("cfg.modeSt")[0];
var altVal  = GEBC("cfg.altVal")[0];
var outMath = GEBC("cfg.outMath")[0];

function limiter(input) {
    var min = 1.0;
    var max = 1e8;

    if (parseFloat(input.value) < min) {
        input.value = min;
    };
    if (parseFloat(input.value) > max) {
        input.value = max;
    }
}

function cbChange() {
	if (altVal.checked) {
		modeSt.checked = false;
		modeSt.disabled = true;
	} else {
		modeSt.disabled = false;
	};

	if (modeSt.checked) {
		altVal.checked = false;
		altVal.disabled = true;
	} else {
		altVal.disabled = false;
	};
};

function cbc(elem, clr = "initial", i = 0) {
	GEBC(elem)[0].style.background = clr;
};

function calculate() {
	var input = GEBC("input")[0].value;
	var target = GEBC("target")[0].value;
	var output = GEBC("output")[0];

	if (!input) {
		output.innerHTML = "Input is empty or NaN";
		cbc("outDiv", "rgba(219, 0, 0, 0.375")
	} else if (!target) {
		output.innerHTML = "Target is empty or NaN";
		cbc("outDiv", "rgba(219, 0, 0, 0.375")
	} else {
		var val = ((1200 / Math.log(2)) * Math.log(target / input)).toFixed(3);

		if (altVal.checked) {
			val = (100 - val) + 100
		};
		val = val.toString();
		cbc("outDiv");

		/* --- */

		if (outMath.checked) {
			val = `(1200 ÷ log(2)) × log(${target} ÷ ${input}) = ${val}`
		};

		if (modeSt.checked) {
			val += " semitones";
		} else {
			val += "%"
		};

		output.innerHTML = val
	}
}