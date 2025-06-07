// Sample events data
const eventsData = [
  {
    title: "AI & Machine Learning",
    startDate: "2025-02-16T09:00:00",  // When the event starts
    endDate: "2025-02-16T18:00:00",    // When the event ends
    regEndDate: "2025-02-10T23:59:59", // Last date/time to register
    description: "Learn the fundamentals of AI in our hands-on workshop. Suitable for beginners.",
    // image: "https://via.placeholder.com/400x200", // Updated Placeholder
  },
  {
    title: "Hackathon 2024",
    startDate: "2024-02-10T08:00:00",
    endDate: "2024-02-12T08:00:00",
    regEndDate: "2024-02-05T23:59:59",
    description: "Compete in our 48-hour hackathon. Prizes and networking opportunities await!",
    // image: "https://via.placeholder.com/400x200", 
  },
  {
    title: "Tech Talk Series",
    startDate: "2024-03-05T10:00:00",
    endDate: "2024-03-05T12:00:00",
    regEndDate: "2024-02-28T23:59:59",
    description: "Industry experts share insights into the latest trends in AI, cloud computing, and more.",
    // image: "https://via.placeholder.com/400x200", 
  },
  {
    title: "Cybersecurity Summit",
    startDate: "2023-12-20T10:00:00",
    endDate: "2023-12-20T17:00:00",
    regEndDate: "2023-12-15T23:59:59",
    description: "Learn best practices and new developments in cybersecurity from top professionals.",
    // image: "https://via.placeholder.com/400x200", 
  },
];

// Wait until DOM is loaded to manipulate elements
document.addEventListener("DOMContentLoaded", () => {
  createEventCards();
});

/**
 * Dynamically create event cards and insert them into .event-list
 */
function createEventCards() {
  const eventListContainer = document.querySelector(".event-list");
  eventListContainer.innerHTML = "";

  eventsData.forEach((event, index) => {
    // Unique IDs for each event's countdown & button
    const countdownId = `countdown-${index}`;
    const registerBtnId = `register-btn-${index}`;

    // Build the event card HTML
    const eventHTML = `
      <div class="event">
        <!-- Placeholder image -->
        <img 
          src="${event.image}" 
          alt="${event.title} Image" 
          class="event-img"
          style="width: 100%; max-width: 400px; height: auto; border-radius: 8px;"
        />
        
        <h3 class="event-title">${event.title}</h3>
        <p>${event.description}</p>
        
        <p><strong>Start:</strong> ${formatEventDate(event.startDate)}</p>
        <p><strong>End:</strong> ${formatEventDate(event.endDate)}</p>
        
        <!-- Countdown placeholder -->
        <p id="${countdownId}" class="event-countdown">Loading countdown...</p>
        
        <!-- Registration button -->
        <button id="${registerBtnId}" class="btn-register">
          Register
        </button>
      </div>
    `;

    eventListContainer.insertAdjacentHTML("beforeend", eventHTML);

    // Initialize logic for countdown & register button
    initEventCountdown(event, countdownId, registerBtnId);
  });
}

/**
 * Initialize countdown for each event
 * - If current time < startDate => Show countdown
 * - If startDate <= now < endDate => "Event Started!"
 * - If now >= endDate => "Event Ended!"
 * - Disable register button after regEndDate or after event ends
 */
function initEventCountdown(event, countdownId, registerBtnId) {
  const startTime = new Date(event.startDate).getTime();
  const endTime = new Date(event.endDate).getTime();
  const regEndTime = new Date(event.regEndDate).getTime();
  
  const countdownEl = document.getElementById(countdownId);
  const registerBtn = document.getElementById(registerBtnId);

  // Check registration state at the beginning
  updateRegisterButton(registerBtn, regEndTime, endTime);

  // Update everything every second
  const interval = setInterval(() => {
    const now = Date.now();

    // 1. Check event end
    if (now >= endTime) {
      clearInterval(interval);
      countdownEl.textContent = "Event Ended!";
      registerBtn.disabled = true; // no registration after event ended
      return;
    }

    // 2. If the event has started (now between start and end)
    if (now >= startTime && now < endTime) {
      countdownEl.textContent = "Event Started!";
      updateRegisterButton(registerBtn, regEndTime, endTime);
    }
    // 3. If the event hasn't started yet, show countdown
    else if (now < startTime) {
      const distance = startTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      
      updateRegisterButton(registerBtn, regEndTime, endTime);
    }
  }, 1000);
}

/**
 * Enable/Disable the "Register" button based on current time vs. regEndTime and endTime
 */
function updateRegisterButton(registerBtn, regEndTime, endTime) {
  const now = Date.now();

  // If it's past the registration end time or the event has ended, disable the button
  if (now > regEndTime || now > endTime) {
    registerBtn.disabled = true;
    registerBtn.textContent = "Registration Closed";
  } else {
    registerBtn.disabled = false;
    registerBtn.textContent = "Register";
  }
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
