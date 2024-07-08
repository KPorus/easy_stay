export const handleHtmlBodyOverFlow = (isChecked: boolean) => {
    const bodyElement = document.getElementById("body");
    if (bodyElement) {
        bodyElement.style.overflow = isChecked ? "hidden" : "auto";
    }
};