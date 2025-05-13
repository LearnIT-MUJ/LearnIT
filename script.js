// === Card Hover Effect ===
document.querySelector('.card')?.addEventListener('mouseenter', function () {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function () {
    this.style.transform = "scale(1)";
});

// === Sticky Navbar Scroll Behavior ===
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add("sticky");
        navbar.classList.remove("show");
    } else {
        // Scrolling up
        navbar.classList.add("sticky", "show");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
