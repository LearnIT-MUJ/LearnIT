let pastEventsData = [];

/* ===========================
   Data loading
=========================== */
async function loadPastEventsData() {
  try {
    const res = await fetch("pastEvents.json"); // adjust path if needed
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error loading past events:", err);
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
    console.error("Failed to init past events:", err);
    container.innerHTML = `
      <div class="no-events">
        <h3>Failed to Load Past Events</h3>
        <p>Please try again later.</p>
      </div>`;
  }
});

/* ===========================
   Render cards (with carousel)
=========================== */
async function createPastEventCards() {
  const container = document.querySelector(".past-events");
  container.innerHTML = "";

  const sorted = pastEventsData
    .filter((e) => new Date(e.endDate) < new Date())
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  if (sorted.length === 0) {
    container.innerHTML = `<div class="no-events"><h3>No Past Events Found</h3><p>Check back later!</p></div>`;
    return;
  }

  sorted.forEach((event, i) => {
    const cardId = `past-${i}`;
    const pdfAttr = event.pdfUrl ? `data-pdf-url="${event.pdfUrl}"` : "";

    // Use event.images if provided; else fall back to single image
    const images = Array.isArray(event.images) && event.images.length
      ? event.images
      : (event.image ? [event.image] : []);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="event" id="${cardId}">
        <figure class="event-media">
          <div class="carousel" role="region" aria-roledescription="carousel" aria-label="${escapeHtml(
            event.title || "Event Images"
          )}">
            <div class="carousel-track">
              ${images
                .map(
                  (src, idx) => `
                <div class="carousel-slide${idx === 0 ? " is-active" : ""}" data-index="${idx}">
                  <img class="event-img" src="${src}" alt="${escapeHtml(
                    event.title || "Event"
                  )} — image ${idx + 1}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://via.placeholder.com/800x450/111827/9ca3af?text=Past+Event';">
                </div>`
                )
                .join("")}
            </div>

            ${
              images.length > 1
                ? `
              <button class="carousel-btn prev" aria-label="Previous image">‹</button>
              <button class="carousel-btn next" aria-label="Next image">›</button>
              <div class="carousel-dots" role="tablist">
                ${images
                  .map(
                    (_, idx) =>
                      `<button class="dot ${
                        idx === 0 ? "is-active" : ""
                      }" role="tab" aria-selected="${
                        idx === 0 ? "true" : "false"
                      }" aria-label="Go to image ${idx + 1}" data-to="${idx}"></button>`
                  )
                  .join("")}
              </div>`
                : ""
            }
          </div>
        </figure>

        <div class="event-content">
          <div class="event-info">
            <p class="event-date">${formatDateOnly(event.startDate)} – ${formatDateOnly(
        event.endDate
      )}</p>
            <h3 class="event-title">${escapeHtml(event.title || "Untitled Event")}</h3>
            <p class="event-description">${escapeHtml(event.description || "")}</p>
            <p class="registration-dates"><strong>Duration:</strong> ${formatDateOnly(
              event.startDate
            )} – ${formatDateOnly(event.endDate)}</p>
            <div class="event-participants">👥 ${Number(event.attendees || 0).toLocaleString()} Participants</div>
          </div>
          <button class="btn-view-details" ${pdfAttr}>View Event Summary</button>
        </div>
      </article>
    `
    );

    // PDF button click
    const btn = document.querySelector(`#${cardId} .btn-view-details`);
    btn.addEventListener("click", function () {
      const url = this.getAttribute("data-pdf-url");
      if (url) window.open(url, "_blank");
      else alert("Event summary not available.");
    });

    // Initialize the carousel for this card (if there are images)
    initCarousel(document.querySelector(`#${cardId} .carousel`));
  });
}

/* ===========================
   Carousel logic (vanilla)
=========================== */
function initCarousel(root) {
  if (!root) return;

  const track = root.querySelector(".carousel-track");
  const slides = [...root.querySelectorAll(".carousel-slide")];
  const prev = root.querySelector(".carousel-btn.prev");
  const next = root.querySelector(".carousel-btn.next");
  const dots = [...root.querySelectorAll(".dot")];

  if (slides.length <= 1) return; // nothing to do

  let index = 0;

  const update = (to) => {
    index = (to + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  };

  prev?.addEventListener("click", () => update(index - 1));
  next?.addEventListener("click", () => update(index + 1));
  dots.forEach((d) => d.addEventListener("click", () => update(Number(d.dataset.to))));

  // Keyboard support
  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") update(index - 1);
    if (e.key === "ArrowRight") update(index + 1);
  });

  // Pointer swipe
  let startX = 0,
    delta = 0,
    activeId = null;
  track.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    activeId = e.pointerId;
    track.setPointerCapture?.(activeId);
  });
  track.addEventListener("pointermove", (e) => {
    if (!startX) return;
    delta = e.clientX - startX;
  });
  track.addEventListener("pointerup", (e) => {
    if (!startX) return;
    if (Math.abs(delta) > 40) update(index + (delta < 0 ? 1 : -1));
    startX = 0;
    delta = 0;
    if (activeId) track.releasePointerCapture?.(activeId);
    activeId = null;
  });
}

/* ===========================
   Utilities
=========================== */
function formatDateOnly(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ===========================
   Periodic refresh (10 min)
=========================== */
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
