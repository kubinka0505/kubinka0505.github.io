function populateDropdown() {
    let dropdown = document.getElementsByClassName("dictionary")[0];
    dropdown.innerHTML = "";

    Object.keys(presets).forEach(key => {
        let option = document.createElement("option");
        option.value = key;
        option.textContent = `${meta[key.toLowerCase()] ? meta[key.toLowerCase()][0] : "No description available"}`;
        dropdown.appendChild(option);
    });
}

function transformText() {
    let inputText = document.getElementsByClassName("inputText")[0].value;
    let type = document.getElementsByClassName("dictionary")[0].value;

    if (presets[type]) {
        for (let key in presets[type]) {
            inputText = inputText.split(key).join(presets[type][key]);
        }

        document.getElementsByClassName("outputText")[0].textContent = inputText;
    } else {
        alert("Invalid dictionary selection.");
    }
}

function copyToClipboard(time) {
	const outputText = document.getElementsByClassName("outputText")[0].textContent;

	navigator.clipboard.writeText(outputText).then(() => {
		showAlert('Info', 'Text copied to clipboard <emoji>📋</emoji>', 'info', time);
	});
}