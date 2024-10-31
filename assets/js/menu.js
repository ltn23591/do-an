const iconClose = document.querySelector(".icon__close");
const menuTablet = document.querySelector(".menu__tablet");
const logoImg = document.querySelector(".menu__img");
iconClose.addEventListener("click", () => {
    menuTablet.style.transform = "translateX(-125%)";
});

logoImg.addEventListener("click", () => {
    menuTablet.style.transform = "translateX(-25%)";
});
