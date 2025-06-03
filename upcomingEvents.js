
// Global variable to store events data
let eventsData = [];

/**
 * Fetch events data from JSON file using async/await
 */
async function loadEventsData() {
    try {
        const response = await fetch('upcomingEvents.json'); // Adjust path if needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading events data:', error);
        // Return fallback data or empty array
        return [];
    }
}

/**
 * Get registration status for an event
 */
function getRegistrationStatus(event) {
    const now = new Date();
    const regOpenDate = new Date(event.regOpenDate);
    const regCloseDate = new Date(event.regCloseDate);
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    // Event has ended
    if (now > eventEndDate) {
        return {
            status: 'event-ended',
            message: 'Event Ended',
            canRegister: false,
            buttonClass: 'btn-disabled'
        };
    }

    // Event is currently happening
    if (now >= eventStartDate && now <= eventEndDate) {
        return {
            status: 'event-ongoing',
            message: 'Event in Progress',
            canRegister: false,
            buttonClass: 'btn-disabled'
        };
    }

    // Registration not yet open
    if (now < regOpenDate) {
        return {
            status: 'registration-not-open',
            message: 'Registration Opens Soon',
            canRegister: false,
            buttonClass: 'btn-disabled',
            countdown: regOpenDate
        };
    }

    // Registration closed
    if (now > regCloseDate) {
        return {
            status: 'registration-closed',
            message: 'Registration Closed',
            canRegister: false,
            buttonClass: 'btn-disabled'
        };
    }

    // Registration is open
    return {
        status: 'registration-open',
        message: 'Register Now',
        canRegister: true,
        buttonClass: 'btn-register'
    };
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 25 + 's';

        // Random animation duration variation
        const baseDuration = 25 + Math.random() * 10;
        particle.style.animationDuration = baseDuration + 's';

        particlesContainer.appendChild(particle);
    }
}

// Main initialization using async/await
document.addEventListener("DOMContentLoaded", async () => {
    createParticles();

    // Show loading state
    const eventListContainer = document.querySelector(".event-list");
    eventListContainer.innerHTML = `
      <div class="no-events">
        <div class="loading"></div>
        <h3>Loading Events...</h3>
        <p>Please wait while we fetch the latest events.</p>
      </div>
    `;

    try {
        // Load events data using async/await
        eventsData = await loadEventsData();

        // Create event cards with loaded data
        await createEventCards();
    } catch (error) {
        console.error('Failed to initialize events:', error);
        eventListContainer.innerHTML = `
        <div class="no-events">
          <h3>Failed to Load Events</h3>
          <p>Please check your connection and try again.</p>
        </div>
      `;
    }
});

/**
 * Enhanced function to create event cards with registration status
 */
async function createEventCards() {
    const eventListContainer = document.querySelector(".event-list");
    eventListContainer.innerHTML = "";

    // Filter to show only upcoming events
    const upcomingEvents = eventsData.filter(event => {
        const eventEndDate = new Date(event.endDate);
        const now = new Date();
        return eventEndDate > now;
    });

    if (upcomingEvents.length === 0) {
        eventListContainer.innerHTML = `
        <div class="no-events">
          <h3>No Upcoming Events</h3>
          <p>Check back soon for new events!</p>
        </div>
      `;
        return;
    }

    upcomingEvents.forEach((event, index) => {
        const countdownId = `countdown-${index}`;
        const registerBtnId = `register-btn-${index}`;
        const regStatus = getRegistrationStatus(event);

        const eventHTML = `
        <div class="event">
          <img 
            src="${event.image}" 
            alt="${event.title} Image" 
            class="event-img"
            onerror="this.src='https://via.placeholder.com/400x200/1e40af/ffffff?text=Event+Image'"
          />
          
          <h3 class="event-title">${event.title}</h3>
          <p>${event.description}</p>
          
          <p><strong>Event Date:</strong> ${formatEventDate(event.startDate)}</p>
          
          <div class="registration-dates">
            <p><strong>Registration:</strong> ${formatEventDate(event.regOpenDate)} - ${formatEventDate(event.regCloseDate)}</p>
          </div>
          
          <div class="registration-status ${regStatus.status === 'registration-open' ? 'status-open' : regStatus.status === 'registration-closed' || regStatus.status === 'event-ended' ? 'status-closed' : 'status-soon'}">
            ${regStatus.message}
          </div>
          
          <p id="${countdownId}" class="event-countdown">
            <span class="loading"></span> Loading countdown...
          </p>
          
          <button 
            id="${registerBtnId}" 
            class="${regStatus.canRegister ? 'btn-register' : 'btn-disabled'}"
            ${!regStatus.canRegister ? 'disabled' : ''}
            data-registration-link="${event.registrationLink || ''}"
            data-pdf-url="${event.pdfUrl || ''}"
          >
            ${regStatus.message}
          </button>
        </div>
      `;

        eventListContainer.insertAdjacentHTML("beforeend", eventHTML);
        initEventCountdown(event, countdownId, registerBtnId);
    });
}

/**
 * Enhanced countdown initialization with registration status updates
 */
function initEventCountdown(event, countdownId, registerBtnId) {
    const startTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();
    const regOpenTime = new Date(event.regOpenDate).getTime();
    const regCloseTime = new Date(event.regCloseDate).getTime();

    const countdownEl = document.getElementById(countdownId);
    const registerBtn = document.getElementById(registerBtnId);

    // Enhanced button click handler
    registerBtn.addEventListener('click', function () {
        if (this.disabled) {
            return;
        }

        const registrationLink = this.getAttribute('data-registration-link');
        const pdfUrl = this.getAttribute('data-pdf-url');

        if (registrationLink) {
            window.open(registrationLink, '_blank');
        } else if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        } else {
            alert('Registration link not available.');
        }
    });

    const interval = setInterval(() => {
        const now = Date.now();
        const regStatus = getRegistrationStatus(event);

        // Update button state
        if (regStatus.canRegister) {
            registerBtn.disabled = false;
            registerBtn.className = 'btn-register';
            registerBtn.textContent = regStatus.message;
        } else {
            registerBtn.disabled = true;
            registerBtn.className = 'btn-disabled';
            registerBtn.textContent = regStatus.message;
        }

        // Event ended
        if (now >= endTime) {
            clearInterval(interval);
            countdownEl.style.display = 'none';
            return;
        }

        // Event started
        if (now >= startTime && now < endTime) {
            countdownEl.innerHTML = "🚀 Event in Progress!";
        }
        // Event hasn't started yet
        else if (now < startTime) {
            const distance = startTime - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (now < regOpenTime) {
                countdownEl.innerHTML = `⏰ Registration opens in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                countdownEl.innerHTML = `⏰ Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    }, 1000);
}

/**
 * Utility: Format date string into a local, readable form
 */
function formatEventDate(dateStr) {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/**
 * Optional: Refresh events data periodically
 */
async function refreshEventsData() {
    try {
        const newEventsData = await loadEventsData();
        if (newEventsData.length > 0) {
            eventsData = newEventsData;
            await createEventCards();
            console.log('Events data refreshed successfully');
        }
    } catch (error) {
        console.error('Failed to refresh events data:', error);
    }
}

// Optional: Refresh events every 5 minutes
setInterval(refreshEventsData, 5 * 60 * 1000);

