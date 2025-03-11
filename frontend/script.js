const container = document.querySelector('.history-container');
const glowBottom = document.querySelector('.glow-bottom');

function updateGlowLines() {
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight < scrollHeight) {
        glowBottom.style.opacity = 1;
    } else {
        glowBottom.style.opacity = 0;
    }
}
container.addEventListener('scroll', updateGlowLines);
updateGlowLines();


function copyToClipboard(buttonElement) {
    const shortUrlElement = buttonElement.previousElementSibling;
    const shortUrlText = shortUrlElement.textContent.trim();
    navigator.clipboard.writeText(shortUrlText);
}


