function limiter(input) {
	var min = 1.0;
	var max = 1e6;

	// Define the allowed characters: digits, "-", and "."
	var allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "."];

	// Filter the input value to only allow the allowed characters
	var sanitizedValue = "";
	var hasDecimal = false;
	var hasMinus = false;

	for (var i = 0; i < input.value.length; i++) {
		var char = input.value[i];

		if (allowedChars.includes(char)) {
			// Allow only one minus at the beginning
			if (char === "-") {
				if (i === 0 && !hasMinus) {
					sanitizedValue += char;
					hasMinus = true;
				}
			}
			// Allow only one decimal point
			else if (char === ".") {
				if (!hasDecimal) {
					sanitizedValue += char;
					hasDecimal = true;
				}
			} else {
				// Add numeric characters
				sanitizedValue += char;
			}
		}
	}

	// Remove spaces for the purpose of numeric validation
	var numericString = sanitizedValue.replace(/ /g, "");

	// Convert sanitized value to a floating-point number
	var numericValue = parseFloat(numericString);

	// Check if the numeric value is within the specified range
	if (!isNaN(numericValue)) {
		if (numericValue < min && numericValue > 0) {
			input.value = formatNumber(min.toString());
		} else if (numericValue > max) {
			input.value = formatNumber(max.toString());
		} else {
			input.value = formatNumber(numericString);
		}
	} else {
		// If sanitized value is not a valid number, keep the original value
		input.value = formatNumber(numericString);
	}
}

// Function to format the number with spaces as thousand separators
function formatNumber(numberString) {
	// Ensure numberString is treated as a string
	numberString = numberString.toString();

	// Check if the number is negative
	var isNegative = numberString.startsWith("-");
	if (isNegative) {
		numberString = numberString.substring(1);
	}

	// Split integer and decimal parts
	var parts = numberString.split(".");
	var integerPart = parts[0];
	var decimalPart = parts.length > 1 ? "." + parts[1] : "";

	// Add spaces as thousand separators to the integer part
	var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	// Return the formatted number with negative sign if applicable
	return (isNegative ? "-" : "") + formattedInteger + decimalPart;
}

// -=-=-=- //

function cbc(elem, clr = "initial", i = 0) {
	GEBC(elem)[0].style.background = clr;
};