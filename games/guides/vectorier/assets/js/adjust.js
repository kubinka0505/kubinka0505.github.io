document.addEventListener("DOMContentLoaded", () => {
    const tocContainer = document.querySelector(".stackedit__toc");

    if (tocContainer) {
        const adjustTocStyling = (element, level = 0) => {
            Array.from(element.children).forEach(child => {
                if (child.tagName === "UL" || child.tagName === "OL") {
                    adjustTocStyling(child, level + 1);
                } else {
                    const baseFontSize = 15;
                    const newFontSize = baseFontSize - level;

                    if (child.tagName === "LI") {
                        // Indent only the text node, not child tags
                        child.style.fontSize = `${Math.max(newFontSize, 10)}px`;

                        const firstChild = child.firstElementChild;

                        if (firstChild) {
                            firstChild.innerHTML = `${"&nbsp;".repeat(2*level-1)}${firstChild.innerHTML}`;
						}
                    } else if (child.tagName === "A") {
                        // Adjust font size for <a> and <span>
                        child.style.fontSize = `${Math.max(newFontSize, 10)}px`;
                    }

                    if (child.children.length > 0) {
                        adjustTocStyling(child, level);
                    }
                }
            });
        };

        adjustTocStyling(tocContainer);
    }
});
