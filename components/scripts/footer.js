// components/scripts/footer.js

// 1. Dynamically fetch and inject the footer HTML
fetch("/components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;

    // 2. Dynamically load Font Awesome only after footer is injected
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faLink.crossOrigin = 'anonymous';
    document.head.appendChild(faLink);
  })
  .catch(err => {
    console.error("Error loading footer:", err);
  });
