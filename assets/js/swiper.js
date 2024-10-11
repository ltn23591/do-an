// Sử dụng thư viện swiper
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".hero__swiper", {
        direction: "horizontal", // 'horizontal' hoặc 'vertical'
        loop: true, // Lặp lại các slide

        // Phân trang (pagination)
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        // Tự động chuyển slide (autoplay)
        autoplay: {
            delay: 5000, // 5 giây
            disableOnInteraction: false,
        },
        // Hiệu ứng chuyển slide
        effect: "slide", // 'slide', 'fade', 'cube', 'coverflow', 'flip'
    });
});
