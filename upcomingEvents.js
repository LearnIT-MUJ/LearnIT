let upcomingEventsData = [];

/**
 * Load upcoming events from JSON
 */
async function loadUpcomingEventsData() {
    try {
        const res = await fetch('upcomingEvents.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('Error loading upcoming events:', err);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".upcoming-events");

    container.innerHTML = `
      <div class="no-events">
        <div class="loading"></div>
        <h3>Loading Upcoming Events...</h3>
        <p>Please wait while we fetch upcoming events data.</p>
      </div>
    `;

    try {
        upcomingEventsData = await loadUpcomingEventsData();
        await createUpcomingEventCards();
    } catch (err) {
        console.error('Failed to init upcoming events:', err);
        container.innerHTML = `
        <div class="no-events">
          <h3>Failed to Load Upcoming Events</h3>
          <p>Please try again later.</p>
        </div>`;
    }
});

async function createUpcomingEventCards() {
    const container = document.querySelector(".upcoming-events");
    container.innerHTML = "";

    const sorted = upcomingEventsData
        .filter(e => new Date(e.startDate) >= new Date())
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    if (sorted.length === 0) {
        container.innerHTML = `
        <div class="no-events">
          <h3>No Upcoming Events Found</h3>
          <p>Stay tuned for updates!</p>
        </div>`;
        return;
    }

    let html = '';
    sorted.forEach((event, i) => {
        const countdownId = `countdown-${i}`;
        const registerBtnId = `register-btn-${i}`;
        const regStatus = getRegistrationStatus(event);

        html += `
        <div class="event">
          <img src="${event.image}" alt="${event.title}" class="event-img"
               onerror="this.src='https://via.placeholder.com/400x200/1e3a8a/ffffff?text=Upcoming+Event'" />
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>
          <p class="event-date"><strong>Event Date:</strong> ${formatDateTime(event.startDate)}</p>
          <div class="registration-dates">
            <p><strong>Registration:</strong> ${formatDateTime(event.regOpenDate)} - ${formatDateTime(event.regCloseDate)}</p>
          </div>
          <div class="registration-status ${regStatus.status}">${regStatus.message}</div>
          <p id="${countdownId}" class="event-countdown"><span class="loading"></span> Loading countdown...</p>
          <button id="${registerBtnId}" class="${regStatus.buttonClass}" ${!regStatus.canRegister ? 'disabled' : ''} 
            data-registration-link="${event.registrationLink || ''}" data-pdf-url="${event.pdfUrl || ''}">
            ${regStatus.message}
          </button>
        </div>`;
    });

    container.innerHTML = html;

    sorted.forEach((event, i) => {
        initEventCountdown(event, `countdown-${i}`, `register-btn-${i}`);
    });
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

function initEventCountdown(event, countdownId, registerBtnId) {
    const start = new Date(event.startDate).getTime();
    const regOpen = new Date(event.regOpenDate).getTime();
    const end = new Date(event.endDate).getTime();

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

        const t = now < start ? start - now : regOpen - now;
        const d = Math.floor(t / (1000 * 60 * 60 * 24));
        const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((t % (1000 * 60)) / 1000);

        el.textContent = now < regOpen ?
            `⏳ Registration opens in: ${d}d ${h}h ${m}m ${s}s` :
            `🚀 Event starts in: ${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
}

function formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

function formatDateOnly(dateStr) {
    return new Date(dateStr).toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
