const dark = document.querySelector(".control__dark");
const light = document.querySelector(".control__light");
const body = document.querySelector("body");
const imgLogo = document.querySelector(".logo img");
dark.addEventListener("click", () => {
    body.classList.add("dark-mode");
    light.style.display = "block";
    dark.style.display = "none";
    imgLogo.style.filter = "var(--icon-filter)";
});
light.addEventListener("click", () => {
    body.classList.remove("dark-mode");
    light.style.display = "none";
    dark.style.display = "block";
    imgLogo.style.filter = "none";
});
