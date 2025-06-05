// Global variable to store events data
let eventsData = [];

/**
 * Fetch events data from JSON file using async/await
 */
async function loadEventsData() {
    try {
        const response = await fetch('upcomingEvents.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading events data:', error);
        return [];
    }
}

function getRegistrationStatus(event) {
    const now = new Date();
    const regOpenDate = new Date(event.regOpenDate);
    const regCloseDate = new Date(event.regCloseDate);
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    if (now > eventEndDate) return { status: 'event-ended', message: 'Event Ended', canRegister: false, buttonClass: 'btn-disabled' };
    if (now >= eventStartDate && now <= eventEndDate) return { status: 'event-ongoing', message: 'Event in Progress', canRegister: false, buttonClass: 'btn-disabled' };
    if (now < regOpenDate) return { status: 'registration-not-open', message: 'Registration Opens Soon', canRegister: false, buttonClass: 'btn-disabled', countdown: regOpenDate };
    if (now > regCloseDate) return { status: 'registration-closed', message: 'Registration Closed', canRegister: false, buttonClass: 'btn-disabled' };

    return { status: 'registration-open', message: 'Register Now', canRegister: true, buttonClass: 'btn-register' };
}

function createParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 25 + 's';
        p.style.animationDuration = 25 + Math.random() * 10 + 's';
        container.appendChild(p);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    createParticles();

    const container = document.querySelector(".upcoming-events");
    container.innerHTML = `
      <div class="no-events">
        <div class="loading"></div>
        <h3>Loading Events...</h3>
        <p>Please wait while we fetch the latest events.</p>
      </div>
    `;

    try {
        eventsData = await loadEventsData();
        await createEventCards();
    } catch (error) {
        console.error('Failed to initialize events:', error);
        container.innerHTML = `
        <div class="no-events">
          <h3>Failed to Load Events</h3>
          <p>Please check your connection and try again.</p>
        </div>`;
    }
});

async function createEventCards() {
    const container = document.querySelector(".upcoming-events");
    container.innerHTML = "";

    const upcoming = eventsData.filter(e => new Date(e.endDate) > new Date());

    if (upcoming.length === 0) {
        container.innerHTML = `<div class="no-events"><h3>No Upcoming Events</h3><p>Check back soon!</p></div>`;
        return;
    }

    upcoming.forEach((event, i) => {
        const countdownId = `countdown-${i}`;
        const registerBtnId = `register-btn-${i}`;
        const regStatus = getRegistrationStatus(event);

        container.insertAdjacentHTML("beforeend", `
        <div class="event">
          <img src="${event.image}" alt="${event.title}" class="event-img"
               onerror="this.src='https://via.placeholder.com/400x200/1e40af/ffffff?text=Event+Image'" />
          <h3 class="event-title">${event.title}</h3>
          <p>${event.description}</p>
          <p><strong>Event Date:</strong> ${formatDate(event.startDate)}</p>
          <div class="registration-dates">
            <p><strong>Registration:</strong> ${formatDate(event.regOpenDate)} - ${formatDate(event.regCloseDate)}</p>
          </div>
          <div class="registration-status ${regStatus.status}">${regStatus.message}</div>
          <p id="${countdownId}" class="event-countdown"><span class="loading"></span> Loading countdown...</p>
          <button id="${registerBtnId}" class="${regStatus.buttonClass}" ${!regStatus.canRegister ? 'disabled' : ''} 
            data-registration-link="${event.registrationLink || ''}" data-pdf-url="${event.pdfUrl || ''}">
            ${regStatus.message}
          </button>
        </div>
        `);

        initEventCountdown(event, countdownId, registerBtnId);
    });
}

function initEventCountdown(event, countdownId, registerBtnId) {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    const regOpen = new Date(event.regOpenDate).getTime();

    const el = document.getElementById(countdownId);
    const btn = document.getElementById(registerBtnId);

    btn.addEventListener('click', function () {
        if (this.disabled) return;
        const link = this.getAttribute('data-registration-link');
        const pdf = this.getAttribute('data-pdf-url');
        if (link) window.open(link, '_blank');
        else if (pdf) window.open(pdf, '_blank');
        else alert('Registration link not available.');
    });

    const timer = setInterval(() => {
        const now = Date.now();
        const status = getRegistrationStatus(event);
        btn.disabled = !status.canRegister;
        btn.className = status.buttonClass;
        btn.textContent = status.message;

        if (now >= end) {
            clearInterval(timer);
            el.style.display = 'none';
            return;
        }

        if (now >= start) {
            el.textContent = "🚀 Event in Progress!";
        } else {
            const t = start - now;
            const d = Math.floor(t / (1000 * 60 * 60 * 24));
            const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((t % (1000 * 60)) / 1000);
            el.textContent = now < regOpen ?
                `⏰ Registration opens in: ${d}d ${h}h ${m}m ${s}s` :
                `⏰ Event starts in: ${d}d ${h}h ${m}m ${s}s`;
        }
    }, 1000);
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString([], {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
    });
}

setInterval(refreshEventsData, 5 * 60 * 1000);

async function refreshEventsData() {
    try {
        const newData = await loadEventsData();
        if (newData.length > 0) {
            eventsData = newData;
            await createEventCards();
            console.log("Events refreshed");
        }
    } catch (error) {
        console.error("Failed to refresh events", error);
    }
}
