// JavaScript for Background Slideshow

// Array of background images for the slideshow
const images = [
    'images/Hero/IMG_0341-Enhanced-NR.webp', 
    'images/Hero/IMG_1629-Enhanced-NR.webp', 
    'images/Hero/IMG_2071-Enhanced-NR.webp'
];

// Select the hero section
const heroSection = document.querySelector('.hero-content-right');

// Set initial background image index
let currentIndex = 0;

// Function to preload an image and execute a callback when the image is loaded
function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;

    // When the image has fully loaded, run the callback
    img.onload = () => {
        callback(url); // Call the callback function and pass the image URL
    };
}

// Function to change the background image with preload
function changeBackgroundImage() {
    const nextIndex = (currentIndex + 1) % images.length;

    // Preload the next image before switching
    preloadImage(images[nextIndex], (loadedImage) => {
        // Change the background image after preloading
        heroSection.style.backgroundImage = `url(${loadedImage})`;

        // Increment the index to point to the next image
        currentIndex = nextIndex;
    });
}

// Preload the first image on page load to avoid initial blank moment
preloadImage(images[0], (loadedImage) => {
    // Set the first background image after it's preloaded
    heroSection.style.backgroundImage = `url(${loadedImage})`;

    // Start the slideshow once the first image is loaded
    setInterval(changeBackgroundImage, 5000); // Change the background image every 5 seconds
});
