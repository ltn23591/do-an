const dark = document.querySelector(".control__dark");
const light = document.querySelector(".control__light");
const body = document.querySelector("body");
const imgLogo = document.querySelectorAll(".logo img");
const imgMenu = document.querySelector(".menu__tablet-wrap .logo__title img");

dark.addEventListener("click", () => {
    body.classList.add("dark-mode");
    light.style.display = "block";
    dark.style.display = "none";
    imgLogo.forEach((item) => {
        item.style.filter = "var(--icon-filter)";
    });
    footerLogo.style.filter = "var(--icon-filter)";
    imgMenu.style.filter = "var(--icon-filter)";
});

light.addEventListener("click", () => {
    body.classList.remove("dark-mode");
    light.style.display = "none";
    dark.style.display = "block";
    imgLogo.forEach((item) => {
        item.style.filter = "none";
    });
    imgMenu.style.filter = "none";
    footerLogo.style.filter = "none";
});
