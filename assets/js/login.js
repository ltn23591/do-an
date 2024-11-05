const container = document.getElementById("container");
const registerBtn = document.querySelectorAll("#register");
const loginBtn = document.getElementById("login");

registerBtn.forEach(function (item) {
    item.addEventListener("click", () => {
        container.classList.add("active");
    });
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});
