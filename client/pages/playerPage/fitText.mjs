export function fitText(outputDiv) {
    // max font size in pixels
    const maxFontSize = 50;
    // get element's width
    let width = outputDiv.clientWidth;
    // get content's width
    let contentWidth = outputDiv.scrollWidth;
    // get fontSize
    let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'), 10);
    // if content's width is bigger than elements width - overflow
    if (contentWidth > width) {
        fontSize = Math.ceil(fontSize * width / contentWidth, 10);
        fontSize = fontSize > 50 ? fontSize = 50 : fontSize - 1;
        outputDiv.style.fontSize = fontSize + 'px';
    } else {
        // content is smaller than width... let's resize in 1 px until it fits 
        while (contentWidth === width && fontSize < maxFontSize) {
            fontSize = Math.ceil(fontSize) + 1;
            fontSize = fontSize > 50 ? fontSize = 50 : fontSize;
            outputDiv.style.fontSize = fontSize + 'px';
            // update widths
            width = outputDiv.clientWidth;
            contentWidth = outputDiv.scrollWidth;
            if (contentWidth > width) {
                outputDiv.style.fontSize = fontSize - 1 + 'px';
            }
        }
    }
}