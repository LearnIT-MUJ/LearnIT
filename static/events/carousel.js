document.addEventListener("DOMContentLoaded", () => {
    fetch('static/events/slide_data.json')
        .then(response => response.json())
        .then(data => {
            const slickAboutDiv = document.querySelector('.slick-about');
            
            // Create and append the images from the JSON data
            data.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'img-fluid rounded d-block mx-auto';
                img.alt = 'Event Slideshow Image';
                slickAboutDiv.appendChild(img);
            });

            // Initialize slick carousel after images are added
            $(slickAboutDiv).slick({
                dots: true, // Display navigation dots
                infinite: true, // Infinite loop of images
                speed: 500, // Transition speed
                slidesToShow: 1, // Show one image at a time
                adaptiveHeight: true, // Adjust the height based on image size
                autoplay: true, // Enable autoplay
                autoplaySpeed: 4000 // Set autoplay speed (2 seconds)
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
