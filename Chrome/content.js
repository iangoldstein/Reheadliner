function modifyContent() {
    const parentDivs = document.querySelectorAll('div[data-testid="card.layoutLarge.media"]:not([data-modified])');

    parentDivs.forEach(parentDiv => {
        const anchorElement = parentDiv.querySelector('a[aria-label]');
        if (anchorElement) {
            const labelText = anchorElement.getAttribute('aria-label');
            const firstSpaceIndex = labelText.indexOf(' ');
            const url = labelText.substring(0, firstSpaceIndex);
            const headline = labelText.substring(firstSpaceIndex + 1);
            
            const matchingSpan = Array.from(parentDiv.querySelectorAll('span')).find(span => span.textContent.trim() === url);
            if (matchingSpan) {
                matchingSpan.style.display = 'none';
            }
            
            const urlDiv = document.createElement('div');
            urlDiv.textContent = url;
            urlDiv.style.color = 'gray';

            const headlineDiv = document.createElement('div');
            headlineDiv.textContent = headline;

            const bottomContentDiv = document.createElement('div');
            bottomContentDiv.style.display = 'inline-block';
            bottomContentDiv.style.margin = '10px';
            bottomContentDiv.style.fontFamily = 'TwitterChirp';

            bottomContentDiv.appendChild(urlDiv);
            bottomContentDiv.appendChild(headlineDiv);
            parentDiv.appendChild(bottomContentDiv);

            // Mark the div as modified
            parentDiv.setAttribute('data-modified', 'true');
        }
    });
}

document.addEventListener('DOMContentLoaded', modifyContent);
new MutationObserver(modifyContent).observe(document.body, { childList: true, subtree: true });
