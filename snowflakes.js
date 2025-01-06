document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.snowflakes-container');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        container.appendChild(snowflake);
    }
});
