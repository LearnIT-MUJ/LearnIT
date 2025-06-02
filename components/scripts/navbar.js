fetch("components/navbar.html")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to load navbar.html");
    }
    return res.text();
  })
  .then(data => {
    // Inject navbar HTML
    const placeholder = document.getElementById("navbar-placeholder");
    placeholder.innerHTML = data;

    // Inject navbar-specific CSS if not already present
    if (!document.getElementById("navbar-css")) {
      const link = document.createElement("link");
      link.id = "navbar-css";
      link.rel = "stylesheet";
      link.href = "CSS/navbar.css"; // Update this path if different
      document.head.appendChild(link);
    }

    // Query navbar elements after injection
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = mobileMenu?.querySelectorAll("a");

    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        const isActive = hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll", isActive);
        hamburger.setAttribute("aria-expanded", isActive.toString());
      });

      navLinks?.forEach(link => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("active");
          document.body.classList.remove("no-scroll");
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    } else {
      console.warn("Hamburger or MobileMenu element not found.");
    }
  })
  .catch(error => {
    console.error("Error loading navbar:", error);
  });
