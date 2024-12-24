var modeSt  = GEBC("cfg.modeSt")[0];
var altVal  = GEBC("cfg.altVal")[0];
var outMath = GEBC("cfg.outMath")[0];

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

// -=-=-=- //

var modeSt  = GEBC("cfg.modeSt")[0].replace(/ /g, "");
var altVal  = GEBC("cfg.altVal")[0].replace(/ /g, "");;
var outMath = GEBC("cfg.outMath")[0];

function cbChange() {
	if (altVal.checked) {
		modeSt.checked = false;
		modeSt.disabled = true;
	} else {
		modeSt.disabled = false;
	}

	if (modeSt.checked) {
		altVal.checked = false;
		altVal.disabled = true;
	} else {
		altVal.disabled = false;
	}
};

// -=-=-=- //

function calc_tsp() {
	var input = GEBC("input")[0].value;
	var target = GEBC("target")[0].value;
	var output = GEBC("output")[0];

	if (isNaN(input) || !input) {
		output.innerHTML = "Input is empty or NaN";
		cbc("outDiv", "rgba(219, 0, 0, 0.375)");
	} else if (isNaN(target) || !target) {
		output.innerHTML = "Target is empty or NaN";
		cbc("outDiv", "rgba(219, 0, 0, 0.375)");
	} else {
		try {
			let val;
			const isLogarithmic = modeSt.checked;
			const isAltVal = altVal.checked;
			const isOutMath = outMath.checked;

			// Calculate the main value based on the selected mode
			if (isLogarithmic) {
				val = (1200 / Math.log(2)) * Math.log(target / input);
			} else {
				val = 100 * (input / target);
			}

			// Adjust the value if altVal is checked
			if (!isAltVal) {
				val = 200 - val;
			}
			val = val.toFixed(3).toString();

			// Format the output for LaTeX rendering if isOutMath is checked
			if (isOutMath) {
				let latex;

				if (isLogarithmic) {
					latex = isAltVal
						? `\\frac{1200}{\\log{2}} \\times \\log{\\left(\\frac{${target}}{${input}}\\right)} = ${val}`
						: `\\left|200 - \\left(\\frac{1200}{\\log{2}} \\times \\log{\\left(\\frac{${target}}{${input}}\\right)}\\right)\\right| = ${val}`;
				} else {
					latex = isAltVal
						? `100 \\times \\frac{${input}}{${target}} = ${val}`
						: `\\left|200 - \\left(100 \\times \\frac{${input}}{${target}}\\right)\\right| = ${val}`;
				}

				latex += isLogarithmic ? " \\text{ [semitones]}" : " \\text{ [%]}";
				val = `\\(${latex}\\)`;
			} else {
				if (isLogarithmic) {
					val += " semitones";
				} else {
					val += "%";
				}
			}

			// Call the function cbc with "outDiv"
			cbc("outDiv");

			// Set the output value
			output.innerHTML = isOutMath ? `${val}` : val;

			// Trigger MathJax to process the LaTeX content in the output
			if (isOutMath) {
				MathJax.typeset();
			}
		} catch (error) {
			output.innerHTML = "Error: " + error.message;
			cbc("outDiv", "rgba(219, 0, 0, 0.375)");
		}
	}
}
