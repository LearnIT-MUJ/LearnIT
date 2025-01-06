// JavaScript for more dynamic effects
document.querySelector('.card')?.addEventListener('mouseenter', function() {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function() {
    this.style.transform = "scale(1)";
});


document.addEventListener('DOMContentLoaded', () => {
    const snowflakesContainer = document.querySelector('.snowflakes-container');
    const snowflakeCount = 50; // Adjust the number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 10 + 5; // Snowflake size between 5px and 15px
        const position = Math.random() * 100; // Horizontal position (0% to 100%)
        const duration = Math.random() * 5 + 5; // Falling duration between 5s and 10s
        const delay = Math.random() * 5; // Random delay to stagger animations

        // Apply styles
        snowflake.style.left = `${position}%`;
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.animationDuration = `${duration}s, ${duration / 2}s`; // Sway duration is shorter
        snowflake.style.animationDelay = `${delay}s`;

        // Use a snowflake character or symbol
        snowflake.textContent = '❄'; // You can replace with another symbol if desired

        // Add the snowflake to the container
        snowflakesContainer.appendChild(snowflake);
    }
});
