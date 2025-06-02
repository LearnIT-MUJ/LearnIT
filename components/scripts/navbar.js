// Load navbar.html into the placeholder div
fetch("components/navbar.html")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to load navbar.html");
    }
    return res.text();
  })
  .then(data => {
    // Inject HTML into the placeholder
    document.getElementById("navbar-placeholder").innerHTML = data;

    // Query after DOM injection
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = mobileMenu?.querySelectorAll("a");

    if (hamburger && mobileMenu) {
      // Toggle hamburger and mobile menu
      hamburger.addEventListener("click", () => {
        const isActive = hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll", isActive);
        hamburger.setAttribute("aria-expanded", isActive.toString());
      });

      // Close menu on nav link click (for better UX)
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
