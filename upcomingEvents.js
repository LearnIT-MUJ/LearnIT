let upcomingEventsData = [];

/**
 * Load upcoming events from JSON
 */
async function loadUpcomingEventsData() {
  try {
    const res = await fetch("upcomingEvents.json");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error loading upcoming events:", err);
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
    console.error("Failed to init upcoming events:", err);
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
    .filter(e => new Date(e.endDate) >= new Date() || new Date(e.regCloseDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="no-events">
        <h3>No Upcoming Events Found</h3>
        <p>Stay tuned for updates!</p>
      </div>`;
    return;
  }

  let html = "";
  sorted.forEach((event, i) => {
    const countdownId = `countdown-${i}`;
    const registerBtnId = `register-btn-${i}`;
    const regStatus = getRegistrationStatus(event);
    const hasRegLink = !!event.registrationLink;
    const hasWhatsappLink = !!event.whatsappLink;

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
        ${hasRegLink && regStatus.canRegister ? `
          <button id="${registerBtnId}" class="${regStatus.buttonClass}"
            data-registration-link="${event.registrationLink}" data-pdf-url="${event.pdfUrl || ""}">
            ${regStatus.message}
          </button>` : ""}

        ${hasWhatsappLink && regStatus.canRegister ? `
          <a href="${event.whatsappLink}" class="btn-whatsapp" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 32 32" width="20" style="vertical-align:middle; margin-right:6px; fill:fill:#ffffff;;">
              <path d="M16.04 2C8.68 2 2.67 8.01 2.67 15.36c0 2.72.8 5.25 2.18 7.38L2 30l7.46-2.26a13.17 13.17 0 006.58 1.74c7.36 0 13.37-6.01 13.37-13.38C29.33 8.01 23.32 2 16.04 2zm0 24.4a11.05 11.05 0 01-5.66-1.53l-.4-.24-4.42 1.33 1.36-4.3-.26-.44a10.95 10.95 0 01-1.61-5.83c0-6.05 4.92-10.96 10.99-10.96S27 8.3 27 14.36c0 6.07-4.91 11.04-10.96 11.04zM21.3 18.88c-.32-.16-1.9-.94-2.2-1.06-.3-.12-.52-.16-.74.16-.22.3-.86 1.06-1.06 1.27-.2.2-.38.22-.7.06-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.88-1.75-2.2-.18-.3-.02-.46.14-.61.14-.14.32-.38.48-.57.16-.2.22-.32.32-.52.1-.2.04-.4 0-.57-.06-.18-.73-1.77-1-2.44-.26-.62-.52-.54-.74-.55h-.63c-.2 0-.52.06-.8.38s-1.04 1.02-1.04 2.5 1.06 2.9 1.2 3.1c.14.2 2.1 3.2 5.1 4.48.72.3 1.28.48 1.7.62.72.22 1.37.18 1.88.1.58-.08 1.9-.78 2.17-1.53.26-.76.26-1.41.18-1.53-.08-.1-.3-.16-.62-.32z"/>
            </svg>
            Join us on WhatsApp
          </a>` : ""}
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

  if (now > eventEndDate)
    return {
      status: "event-ended",
      message: "Event Ended",
      canRegister: false,
      buttonClass: "btn-disabled"
    };

  // ✅ Registration is still open
  if (now >= regOpenDate && now <= regCloseDate)
    return {
      status: "registration-open",
      message: "Register Now",
      canRegister: true,
      buttonClass: "btn-register"
    };

  if (now < regOpenDate)
    return {
      status: "registration-not-open",
      message: "Registration Opens Soon",
      canRegister: false,
      buttonClass: "btn-disabled"
    };

  // ✅ Registration closed but event may be in progress
  if (now >= eventStartDate && now <= eventEndDate)
    return {
      status: "event-ongoing",
      message: "Event in Progress",
      canRegister: false,
      buttonClass: "btn-disabled"
    };

  // Registration closed and event hasn’t started yet (edge case)
  return {
    status: "registration-closed",
    message: "Registration Closed",
    canRegister: false,
    buttonClass: "btn-disabled"
  };
}


function initEventCountdown(event, countdownId, registerBtnId) {
  const regOpen = new Date(event.regOpenDate).getTime();
  const regClose = new Date(event.regCloseDate).getTime();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();

  const el = document.getElementById(countdownId);
  const btn = document.getElementById(registerBtnId);

  if (btn) {
    btn.addEventListener("click", function () {
      if (this.disabled) return;
      const link = this.getAttribute("data-registration-link");
      const pdf = this.getAttribute("data-pdf-url");
      if (link) window.open(link, "_blank");
      else if (pdf) window.open(pdf, "_blank");
      else alert("Registration link not available.");
    });
  }

  const timer = setInterval(() => {
    const now = Date.now();

    if (now > end) {
      clearInterval(timer);
      if (el) el.style.display = "none";
      return;
    }

    const status = getRegistrationStatus(event);
    if (btn) {
      btn.disabled = !status.canRegister;
      btn.className = status.buttonClass;
      btn.textContent = status.message;
    }

    let label = "", t = 0;

    if (now < regOpen) {
      t = regOpen - now;
      label = "⏳ Registration opens in:";
    } else if (now < regClose) {
      t = regClose - now;
      label = "📝 Registration closes in:";
    } else if (now < start) {
      t = start - now;
      label = "🚀 Event starts in:";
    } else if (now < end) {
      t = end - now;
      label = "✅ Event ends in:";
    }

    const d = Math.floor(t / (1000 * 60 * 60 * 24));
    const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((t % (1000 * 60)) / 1000);

    if (el) {
      el.textContent = `${label} ${d}d ${h}h ${m}m ${s}s`;
    }
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
