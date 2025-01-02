// JavaScript for more dynamic effects
document.querySelector('.card')?.addEventListener('mouseenter', function() {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function() {
    this.style.transform = "scale(1)";
});
