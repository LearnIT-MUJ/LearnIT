let pastEventsData = [];

async function loadPastEventsData() {
    try {
        const res = await fetch('pastEvents.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('Error loading past events:', err);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".past-events");
    container.innerHTML = `
      <div class="no-events">
        <div class="loading"></div>
        <h3>Loading Past Events...</h3>
        <p>Please wait while we fetch past events data.</p>
      </div>
    `;

    try {
        pastEventsData = await loadPastEventsData();
        await createPastEventCards();
    } catch (err) {
        console.error('Failed to init past events:', err);
        container.innerHTML = `
        <div class="no-events">
          <h3>Failed to Load Past Events</h3>
          <p>Please try again later.</p>
        </div>`;
    }
});

async function createPastEventCards() {
    const container = document.querySelector(".past-events");
    container.innerHTML = "";

    const sorted = pastEventsData
        .filter(e => new Date(e.endDate) < new Date())
        .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    if (sorted.length === 0) {
        container.innerHTML = `<div class="no-events"><h3>No Past Events Found</h3><p>Check back later!</p></div>`;
        return;
    }

    sorted.forEach((event, i) => {
        const btnId = `past-btn-${i}`;
        container.insertAdjacentHTML("beforeend", `
        <div class="event">
          <img src="${event.image}" alt="${event.title}" class="event-img"
               onerror="this.src='https://via.placeholder.com/400x200/1e40af/ffffff?text=Past+Event'" />

          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>

          <p class="event-date"><strong>Event Date:</strong> ${formatDateOnly(event.startDate)}</p>

          <div class="registration-dates">
            <p><strong>Duration:</strong> ${formatDateOnly(event.startDate)} - ${formatDateOnly(event.endDate)}</p>
          </div>

          <div class="event-participants">
            👥 ${event.attendees} Participants
          </div>

          <button id="${btnId}" class="btn-view-details" data-pdf-url="${event.pdfUrl || ''}">
            View Event Summary
          </button>
        </div>
        `);

        document.getElementById(btnId).addEventListener("click", function () {
            const url = this.getAttribute("data-pdf-url");
            if (url) window.open(url, '_blank');
            else alert('Event summary not available.');
        });
    });
}

function formatDateOnly(dateStr) {
    return new Date(dateStr).toLocaleDateString([], {
        year: "numeric", month: "long", day: "numeric"
    });
}

setInterval(refreshPastEventsData, 10 * 60 * 1000);

async function refreshPastEventsData() {
    try {
        const newData = await loadPastEventsData();
        if (newData.length > 0) {
            pastEventsData = newData;
            await createPastEventCards();
            console.log("Past events refreshed");
        }
    } catch (err) {
        console.error("Failed to refresh past events", err);
    }
}
