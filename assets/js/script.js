const cartDesc = document.getElementById("active");
const overlay = document.querySelector(".menu-overlay");
const menushop = document.querySelector(".menu-drawer");
const closeIcon = document.querySelector(".icon__shop-close");

cartDesc.addEventListener("click", (event) => {
    document.body.classList.add("lock-scroll");
    overlay.style.display = "block";
    menushop.style.transform = "translateX(0)";
    menushop.style.opacity = "1";
});

closeIcon.addEventListener("click", () => {
    document.body.classList.remove("lock-scroll");
    overlay.style.display = "none";
    menushop.style.transform = "translateX(100%)";
    menushop.style.opacity = "0";
});

overlay.addEventListener("click", () => {
    document.body.classList.remove("lock-scroll");
    overlay.style.display = "none";
    menushop.style.transform = "translateX(100%)";
});

const btn = document.querySelectorAll(".product__buy");
btn.forEach(function (button) {
    button.addEventListener("click", function (e) {
        var btnItem = e.target;
        var productItem = btnItem.parentElement.parentElement;
        var imgElement = productItem.querySelector(".product__img");

        if (imgElement) {
            var Img = imgElement.src;
        } else {
            console.error("Không tìm thấy hình ảnh cho sản phẩm.");
            return;
        }

        var Price = productItem.querySelector(".product__price").innerText;
        var nameItem = productItem.querySelector(".product__title").innerText;
        var toast = document.querySelector(".toast");
        toast.style.transform = "translateX(0)";
        setTimeout(() => {
            toast.style.transform = "translateX(115%)";
        }, 1000);
        addCard(nameItem, Img, Price);
    });
});

function addCard(nameItem, Img, Price) {
    var productList = document.createElement("ul");
    productList.classList.add("card__item");
    productList.style.borderBottom = "2px solid #ccc";
    productList.style.paddingBottom = "15px";
    const wrapper = document.querySelector(".card-wrapper");
    wrapper.appendChild(productList);

    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");

    var liImg = document.createElement("img");
    liImg.classList.add("card__item-img");
    liImg.src = Img;
    li1.appendChild(liImg);

    var liName = document.createElement("h3");
    liName.classList.add("product__title");
    liName.innerText = nameItem;
    liName.style.marginTop = "10px";
    liName.style.fontWeight = "700";
    li1.classList.add("card__item-media");
    li1.appendChild(liName);

    var liInput = document.createElement("input");
    liInput.classList.add("card__input");
    liInput.value = "1";
    liInput.min = "0";
    liInput.type = "number";
    li2.classList.add("card__item-media");
    li2.appendChild(liInput);

    var liPrice = document.createElement("span");
    liPrice.classList.add("card__price");
    liPrice.innerText = Price;
    li3.classList.add("card__item-media");
    li3.appendChild(liPrice);

    var liRemove = document.createElement("span");
    liRemove.classList.add("card__remove");
    liRemove.innerText = "Xóa";
    li4.classList.add("card__item-media");
    li4.appendChild(liRemove);

    productList.appendChild(li1);
    productList.appendChild(li2);
    productList.appendChild(li3);
    productList.appendChild(li4);

    li4.addEventListener("click", () => {
        productList.remove();
        updateTotal();
    });
    liInput.addEventListener("change", updateTotal);
    updateTotal();
    saveContent();
}

function saveContent() {
    const content = document.querySelector(".card-wrapper").innerHTML.trim();
    localStorage.setItem("content", content);
}

function updateTotal() {
    var total = 0;
    var Cards = document.querySelectorAll(".card__item");
    Cards.forEach(function (item) {
        var price = parseFloat(
            item
                .querySelector(".card__price")
                .innerText.replace("VNĐ", "")
                .replace(/\./g, "")
        );
        var soluongInput = parseInt(item.querySelector("input").value);
        total += price * soluongInput;
    });

    document.querySelector(".total").innerText =
        "Tổng: " + total.toLocaleString() + " VNĐ";
    document.getElementById("totalPrice").value = total;
}

const formUser = document.getElementById("userForm");
const overlayUser = document.querySelector(".menu-overlay-user");
const iconUser = document.querySelector(".icon__user");
// Khi người dùng nhấn "Đặt hàng ngay"
document.getElementById("exportButton").addEventListener("click", function () {
    // Hiển thị form người dùng
    formUser.style.opacity = "1";
    formUser.style.zIndex = "100";
    formUser.style.translate = "50% 20%";
    formUser.style.visibility = "visible";
    overlayUser.style.display = "block";
});
// Đóng form khi nhấn icon "X" hoặc nhấn overlay
iconUser.addEventListener("click", () => {
    overlayUser.style.display = "none";
    formUser.style.opacity = "0";
    formUser.style.visibility = "hidden";
});
overlayUser.addEventListener("click", () => {
    overlayUser.style.display = "none";
    formUser.style.opacity = "0";
    formUser.style.visibility = "hidden";
});

const buyItem = document.getElementById("confirmOrderButton");
buyItem.addEventListener("click", function (e) {
    e.preventDefault();

    // Thu thập thông tin người dùng
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.querySelector("#phone-user").value.trim();
    const address = document.getElementById("address").value.trim();

    // Kiểm tra các trường thông tin có được điền hay chưa
    if (!fullName || !phone || !address) {
        alert("Vui lòng điền đầy đủ thông tin trước khi xác nhận đơn hàng.");
        return;
    }

    // Lấy thông tin từ giỏ hàng
    let items = document.querySelectorAll(".card__item");
    let data = [];

    items.forEach((item) => {
        let nameItem = item.querySelector(".product__title").innerText;
        let quantity = item.querySelector("input").value;
        let price = item.querySelector(".card__price").innerText;

        let priceValue = parseFloat(
            price.replace("VNĐ", "").replace(/\./g, "")
        );
        let totalPriceForItem = priceValue * quantity;

        data.push({
            name: nameItem,
            quantity: quantity,
            price: totalPriceForItem,
        });
    });

    document.getElementById("dataField").value = JSON.stringify(data);

    // Gửi thêm thông tin người dùng vào biểu mẫu
    const orderForm = document.getElementById("orderForm");
    orderForm.appendChild(createHiddenInput("fullName", fullName));
    orderForm.appendChild(createHiddenInput("phone", phone));
    orderForm.appendChild(createHiddenInput("address", address));

    // Gửi biểu mẫu đến Google Sheets
    const actionUrl =
        "https://script.google.com/macros/s/AKfycbwZNECv5hpK6IstStoc_6jNVLqm3zj5NFa4QjMS1-ZbIVC7olT-52_cLkyH22gQAHXUDw/exec";
    orderForm.action = actionUrl;
    orderForm.method = "POST";
    orderForm.target = "_blank";
    orderForm.submit();
});

function createHiddenInput(name, value) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
}

const main = document.querySelector(".hide-elm");
const listDanhmuc = document.querySelectorAll(".product-cate__item");
let act = document.querySelector(".act-block");

listDanhmuc.forEach((item) => {
    item.addEventListener("click", () => {
        if (act) {
            act.classList.remove("act-block");
        }
        main.style.display = "none";
        let abc = item.id + "Section";
        let bcd = document.getElementById(abc);
        if (abc) {
            bcd.classList.add("act-block");
            act = bcd;
        }
        document.getElementById("phone-scroll").scrollIntoView({
            behavior: "smooth", // Hiệu ứng cuộn mượt mà
        });
    });
});
const back = document.querySelectorAll(".icon-wrap");
back.forEach((item) => {
    item.addEventListener("click", () => {
        if (act) {
            act.classList.remove("act-block");
        }
        main.style.display = "block";
        phoneSection.style.display = "none";
    });
});
