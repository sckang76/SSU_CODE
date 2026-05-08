const APP_VERSION = "0.03";
document.addEventListener('DOMContentLoaded', () => {
    const tag = document.querySelector('.version-tag');
    if (tag) tag.textContent = `ver.${APP_VERSION}`;
});
