const cartDesc = document.getElementById("active"); // Chọn Giỏ hàng
const overlay = document.querySelector(".menu-overlay"); // Overlay
const menushop = document.querySelector(".menu-drawer"); // Menu drawer
const closeIcon = document.querySelector(".icon__shop-close"); // Icon đóng

// Khi click vào "Giỏ hàng" (cartDesc), mở menu
cartDesc.addEventListener("click", (event) => {
    document.body.classList.add("lock-scroll"); // Khóa cuộn cho body
    overlay.style.display = "block"; // Hiển thị overlay
    menushop.style.transform = "translateX(0)"; // Hiển thị menu
    menushop.style.opacity = "1"; // Hiển thị menu
});

// Khi click vào icon đóng, ẩn menu
closeIcon.addEventListener("click", () => {
    document.body.classList.remove("lock-scroll"); // Mở khóa cuộn cho body
    overlay.style.display = "none"; // Ẩn overlay
    menushop.style.transform = "translateX(100%)"; // Ẩn menu
    menushop.style.opacity = "0";
});

// Khi click vào overlay, ẩn menu
overlay.addEventListener("click", () => {
    document.body.classList.remove("lock-scroll"); // Mở khóa cuộn cho body
    overlay.style.display = "none"; // Ẩn overlay
    menushop.style.transform = "translateX(100%)"; // Ẩn menu
});

// Sự kiện click cho các nút sản phẩm
const btn = document.querySelectorAll("button");
btn.forEach(function (button) {
    button.addEventListener("click", function (e) {
        var btnItem = e.target;
        var productItem = btnItem.parentElement.parentElement;
        var imgElement = productItem.querySelector(".product__img");

        // Kiểm tra xem phần tử img có tồn tại không
        if (imgElement) {
            var Img = imgElement.src; // Lấy thuộc tính src của img
        } else {
            console.error("Không tìm thấy hình ảnh cho sản phẩm.");
            return; // Ngưng thực thi hàm nếu không tìm thấy hình ảnh
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
    // Chọn thẻ cha lớn nhất
    var productList = document.createElement("ul");
    productList.classList.add("card__item");
    productList.style.borderBottom = "2px solid #ccc";
    productList.style.paddingBottom = "15px";
    const wrapper = document.querySelector(".card-wrapper");
    wrapper.appendChild(productList);

    // Tạo các thẻ li
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");

    // Img
    var liImg = document.createElement("img");
    liImg.classList.add("card__item-img");
    liImg.src = Img;
    li1.appendChild(liImg);

    // Lấy tên của Item
    var liName = document.createElement("h3");
    liName.classList.add("product__title");
    liName.innerText = nameItem;
    liName.style.marginTop = "10px";
    liName.style.fontWeight = "700";
    li1.classList.add("card__item-media");
    li1.appendChild(liName);

    // Input
    var liInput = document.createElement("input");
    liInput.classList.add("card__input");
    liInput.value = "1";
    liInput.min = "0";
    liInput.type = "number";
    li2.classList.add("card__item-media");
    li2.appendChild(liInput);

    // Giá
    var liPrice = document.createElement("span");
    liPrice.classList.add("card__price");
    liPrice.innerText = Price;
    li3.classList.add("card__item-media");
    li3.appendChild(liPrice);

    // Nút xóa
    var liRemove = document.createElement("span");
    liRemove.classList.add("card__remove");
    liRemove.innerText = "Xóa";
    li4.classList.add("card__item-media");
    li4.appendChild(liRemove);

    // Thêm các li vào productList
    productList.appendChild(li1);
    productList.appendChild(li2);
    productList.appendChild(li3);
    productList.appendChild(li4);

    // Thêm sự kiện xóa
    li4.addEventListener("click", () => {
        productList.remove();
        updateTotal();
    });
    liInput.addEventListener("change", updateTotal); // Cập nhật khi số lượng thay đổi
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

    // Cập nhật tổng tiền vào giao diện
    document.querySelector(".total").innerText =
        "Tổng tiền: " + total.toLocaleString() + " VNĐ";

    // Cập nhật tổng giá vào trường hidden trong form
    document.getElementById("totalPrice").value = total; // Cập nhật tổng tiền
}

// Gán sự kiện click cho nút "Đặt hàng ngay"
// Gán sự kiện click cho nút "Đặt hàng ngay"
document
    .getElementById("exportButton")
    .addEventListener("click", function (event) {
        // Ngăn chặn hành động gửi mặc định
        event.preventDefault();

        // Thu thập dữ liệu từ giỏ hàng
        let items = document.querySelectorAll(".card__item");
        let data = [];

        items.forEach((item) => {
            let nameItem = item.querySelector(".product__title").innerText;
            let quantity = item.querySelector("input").value;
            let price = item.querySelector(".card__price").innerText;
            data.push({
                name: nameItem,
                quantity: quantity,
                price: price,
            });
        });

        // Chuyển đổi dữ liệu thành JSON và cập nhật vào trường ẩn
        document.getElementById("dataField").value = JSON.stringify(data);

        // Cập nhật tổng giá vào trường hidden trong form
        const totalPrice = document.getElementById("totalPrice").value;
        document.getElementById("totalPrice").value = totalPrice; // Cập nhật tổng tiền

        // Gửi biểu mẫu
        document.getElementById("orderForm").submit();
    });

// Gán sự kiện click cho nút "Đặt hàng ngay"
document
    .getElementById("exportButton")
    .addEventListener("click", function (event) {
        // Ngăn chặn hành động gửi mặc định
        event.preventDefault();

        // Thu thập dữ liệu từ giỏ hàng
        let items = document.querySelectorAll(".card__item");
        let data = [];

        items.forEach((item) => {
            let nameItem = item.querySelector(".product__title").innerText;
            let quantity = item.querySelector("input").value;
            let price = item.querySelector(".card__price").innerText;
            data.push({
                name: nameItem,
                quantity: quantity,
                price: price,
            });
        });

        // Chuyển đổi dữ liệu thành JSON và cập nhật vào trường ẩn
        document.getElementById("dataField").value = JSON.stringify(data);

        // Cập nhật tổng giá vào trường hidden trong form
        const totalPrice = document.getElementById("totalPrice").value;
        document.getElementById("totalPrice").value = totalPrice; // Cập nhật tổng tiền

        // Kiểm tra xem giỏ hàng có sản phẩm trước khi gửi
        if (data.length > 0) {
            // Gửi yêu cầu đến Google Apps Script
            fetch(
                "https://script.google.com/macros/s/AKfycbwlkX6k27dDY4RtJhtjWfxbXzDPQ_tUE_UWul2MeRaHsbh6-ZDUJjAEvn7BDS0EUSZW-Q/exec",
                {
                    method: "POST",
                    body: new URLSearchParams({
                        data: JSON.stringify(data),
                        totalPrice: totalPrice,
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    console.log(result); // Hiển thị phản hồi từ server
                    alert("Dữ liệu đã được gửi thành công!");
                })
                .catch((error) => {
                    console.error("Có lỗi xảy ra:", error);
                    alert("Gửi dữ liệu không thành công.");
                });
        } else {
            alert("Giỏ hàng của bạn đang trống!");
        }
    });
