// Event Data
const events = [
    {
        title: "AI & Machine Learning",
        description: "Learn the fundamentals of AI in our hands-on workshop. Suitable for beginners.",
        date: "2024-12-30", // Date format: YYYY-MM-DD
        link: "https://example.com/event1"
    },
    {
        title: "Hackathon 2024",
        description: "Compete with peers in our 48-hour hackathon. Prizes and networking opportunities await!",
        date: "2024-11-15",
        link: "https://example.com/event2"
    },
    {
        title: "Tech Talk Series",
        description: "Industry experts share insights into the latest trends in AI, cloud computing, and more.",
        date: "2024-12-05",
        link: "https://example.com/event3"
    }
];

// Function to display upcoming events
function displayEvents() {
    const eventList = document.getElementById('event-list');
    const today = new Date();

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const timeRemaining = eventDate - today;
        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        // Create event card HTML
        const eventCard = document.createElement('div');
        eventCard.classList.add('event');

        eventCard.innerHTML = `
            <h3 class="event-title">${event.title}</h3>
            <p>${event.description}</p>
            <a href="${event.link}" class="btn-cta">Join Event</a>
        `;

        eventList.appendChild(eventCard);
    });

    // Automatically update the countdown for the next event
    updateCountdown();
}

// Function to update the countdown timer
function updateCountdown() {
    const today = new Date();
    let nextEvent = events[0]; // Default to the first event

    // Find the next event by checking dates
    for (let event of events) {
        const eventDate = new Date(event.date);
        if (eventDate > today) {
            nextEvent = event;
            break;
        }
    }

    // Calculate the time remaining for the next event
    const eventDate = new Date(nextEvent.date);
    const timeRemaining = eventDate - today;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    const countdownText = document.getElementById('days-remaining');
    countdownText.textContent = Countdown to ${nextEvent.title}: ${days}d ${hours}h ${minutes}m ${seconds}s;

    // Update the countdown every second
    setInterval(updateCountdown, 1000); // Update every second
}

// Slideshow for Past Events
let currentImageIndex = 0;

function slideshow() {
    const images = document.querySelectorAll('.slider-image');
    setInterval(() => {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = 'block';
    }, 3000); // Change image every 3 seconds
}

// Call functions to initialize the page
displayEvents();
slideshow();
