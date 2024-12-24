function calc_rbc() {
    var input = GEBC("input")[0].value.replace(/ /g, "");
    var target = GEBC("target")[0].value.replace(/ /g, "");
    var output = GEBC("output")[0];

    if (isNaN(input) || !input) {
        output.innerHTML = "Input is empty or NaN";
        cbc("outDiv", "rgba(219, 0, 0, 0.375)");
    } else if (isNaN(target) || !target) {
        output.innerHTML = "Target is empty or NaN";
        cbc("outDiv", "rgba(219, 0, 0, 0.375)");
    } else {
        try {
            var isOutMath = GEBC("cfg.outMath")[0].checked;
            let sign = target > 0 ? "" : "-";

            let resample_by_display = Math.abs(target).toString();
            let val = parseInt(input * Math.pow(2, target / 1200));

            if (isOutMath) {
                let latex = `${input} \\times 2^{\\frac{${sign}${resample_by_display}}{1200}} = ${val} \\text{ [Hz]}`;
                val = `\\(${latex}\\)`;
            } else {
                val += " Hz";
            }

            // Call the function cbc with "outDiv"
            cbc("outDiv");

            // Set the output value
            output.innerHTML = val;

            // If using MathJax, trigger it to typeset the LaTeX
            if (isOutMath) {
                MathJax.typeset();
            }
        } catch (error) {
            output.innerHTML = "Error: " + error.message;
            cbc("outDiv", "rgba(219, 0, 0, 0.375)");
        }
    }
}
