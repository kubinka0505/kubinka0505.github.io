document.addEventListener("DOMContentLoaded", () => {

    // ---- Elements ----
    const inputEl   = document.querySelector(".input");
    const targetEl  = document.querySelector(".target");
    const outputEl  = document.querySelector(".output");
    const calcBtn   = document.getElementsByClassName("calcBtn")[0];

    const modeSt    = document.querySelector(".modeSt");
    const altVal    = document.querySelector(".altVal");
    const outMath   = document.querySelector(".outMath");

    const outDiv    = document.querySelector(".outDiv");

    // ---- Helper: background color ----
    function setOutputState(color = null) {
        outDiv.style.background = color ?? "";
    }

    // ---- Mutually exclusive checkboxes ----
    function handleCheckboxChange() {
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
    }

    altVal.addEventListener("change", handleCheckboxChange);
    modeSt.addEventListener("change", handleCheckboxChange);

    // ---- Main calculation ----
    function calculate() {
        const input  = parseFloat(inputEl.value);
        const target = parseFloat(targetEl.value);

        if (!input || isNaN(input)) {
            outputEl.textContent = "Input is empty or invalid";
            setOutputState("rgba(219, 0, 0, 0.375)");
            return;
        }

        if (!target || isNaN(target)) {
            outputEl.textContent = "Target is empty or invalid";
            setOutputState("rgba(219, 0, 0, 0.375)");
            return;
        }

        try {
            const isLogarithmic = modeSt.checked;
            const isAltVal      = altVal.checked;
            const isOutMath     = outMath.checked;

            let value;

            // --- Base calculation ---
            if (isLogarithmic) {
                value = (1200 / Math.log(2)) * Math.log(target / input);
            } else {
                value = 100 * (input / target);
            }

            // --- Alternative scale ---
            if (!isAltVal) {
                value = 200 - value;
            }

            //const fixedValue = value.toFixed(3);
			const fixedValue = value;

            // --- Output formatting ---
            if (isOutMath) {
                let latex;

                if (isLogarithmic) {
                    latex = isAltVal
                        ? `\\frac{1200}{\\log{2}} \\cdot \\log\\left(\\frac{${target}}{${input}}\\right)`
                        : `200 - \\left(\\frac{1200}{\\log{2}} \\cdot \\log\\left(\\frac{${target}}{${input}}\\right)\\right)`;
                } else {
                    latex = isAltVal
                        ? `100 \\cdot \\frac{${input}}{${target}}`
                        : `200 - \\left(100 \\cdot \\frac{${input}}{${target}}\\right)`;
                }

                latex += ` = ${fixedValue}`;
                latex += isLogarithmic ? " \\text{ semitones}" : " \\text{ %}";

                outputEl.innerHTML = `\\(${latex}\\)`;

                if (window.MathJax) {
                    MathJax.typesetPromise([outputEl]);
                }
            } else {
                const unit = isLogarithmic ? " semitones" : "%";
                outputEl.textContent = fixedValue + unit;
            }

            setOutputState();

        } catch (err) {
            outputEl.textContent = "Error: " + err.message;
            setOutputState("rgba(219, 0, 0, 0.375)");
        }
    }

    calcBtn.addEventListener("click", calculate);
});
