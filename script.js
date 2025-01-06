// JavaScript for more dynamic effects
document.querySelector('.card')?.addEventListener('mouseenter', function() {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function() {
    this.style.transform = "scale(1)";
});


// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.querySelector('.snowflakes-container');
//     const snowflakeCount = 50; // Adjust for more/less snowflakes

//     for (let i = 0; i < snowflakeCount; i++) {
//         const snowflake = document.createElement('div');
//         snowflake.className = 'snowflake';

//         // Randomize snowflake properties
//         const size = Math.random() * 10 + 10; // Size between 10px and 20px
//         const position = Math.random() * 100; // Horizontal position (0% to 100%)
//         const duration = Math.random() * 10 + 5; // Fall duration between 5s and 15s
//         const delay = Math.random() * 5; // Random delay

//         // Apply styles
//         snowflake.style.left = `${position}%`; // Horizontal starting position
//         snowflake.style.fontSize = `${size}px`; // Snowflake size
//         snowflake.style.animationDuration = `${duration}s, ${duration / 2}s`; // Fall and sway durations
//         snowflake.style.animationDelay = `${delay}s`; // Stagger animations

//         // Add snowflake to the container
//         snowflake.textContent = '❄'; // You can replace this with another symbol if desired
//         container.appendChild(snowflake);
//     }
// });
