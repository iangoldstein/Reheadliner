// Function to check if the site is in dark mode
function isDarkMode() {
    // Get the computed background color of the body
    const bgColor = window.getComputedStyle(document.body).backgroundColor;

    // Convert the background color to an array of RGB values
    const rgb = bgColor.replace(/[^\d,]/g, '').split(',').map(Number);

    // Compute the brightness of the color
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

    // Return true if brightness is below a threshold, say 128
    return brightness < 128;
}

function modifyContent() {
    const parentDivs = document.querySelectorAll('div[data-testid="card.layoutLarge.media"]:not([data-modified])');

    parentDivs.forEach(parentDiv => {
        const anchorElement = parentDiv.querySelector('a[aria-label]');
        if (anchorElement) {
            const labelText = anchorElement.getAttribute('aria-label');
            const firstSpaceIndex = labelText.indexOf(' ');
            const url = labelText.substring(0, firstSpaceIndex);
            const headline = labelText.substring(firstSpaceIndex + 1);
            const textColor = isDarkMode() ? 'rgba(231,233,234,1.00)' : 'black';

            const matchingSpan = Array.from(parentDiv.querySelectorAll('span')).find(span => span.textContent.trim() === url);
            if (matchingSpan) {
                matchingSpan.parentElement.parentElement.style.display = 'none';
            }

            const urlDiv = document.createElement('div');
            urlDiv.textContent = url;
            urlDiv.style.color = 'gray';
            urlDiv.style.marginBottom = '5px';

            const headlineDiv = document.createElement('div');
            headlineDiv.textContent = headline;
            headlineDiv.style.color = textColor;
            headlineDiv.style.marginBottom = '5px';

            const bottomContentDiv = document.createElement('div');
            bottomContentDiv.style.display = 'inline-block';
            bottomContentDiv.style.margin = '10px';
            bottomContentDiv.style.fontFamily = 'TwitterChirp';

            bottomContentDiv.appendChild(urlDiv);
            bottomContentDiv.appendChild(headlineDiv);
            anchorElement.appendChild(bottomContentDiv);

            // Mark the div as modified
            parentDiv.setAttribute('data-modified', 'true');
        }
    });
}

document.addEventListener('DOMContentLoaded', modifyContent);
new MutationObserver(modifyContent).observe(document.body, { childList: true, subtree: true });
