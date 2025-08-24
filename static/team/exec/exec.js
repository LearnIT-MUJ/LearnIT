console.log("exec.js is loaded");

const teamData = [
  {
    image: 'images/Team/Kartik_Gaur.webp',
    name: 'Kartik Ratan Gaur',
    title: 'Captain of Vision 🌟 – Steering LearnIT into uncharted innovation, guiding with wisdom and bold ideas.',
    role: 'President of LearnIT',
    Linkedin: 'https://www.linkedin.com/in/kartikratangaur/',
    Instagram: 'https://www.instagram.com/krg_824?igsh=cGE0MmltajZvODZq',
  },
  {
    image: 'images/Team/Aditya_Saini.webp',
    name: 'Aditya Saini',
    title: 'Strategic Architect 🧠 – The silent force behind operations, transforming vision into structured action.',
    role: 'Managing Director',
    Linkedin: 'https://www.linkedin.com/in/aditya-saini-136041316',
    Instagram: 'https://www.instagram.com/adityasankhlaa/profilecard/?igsh=Ynllb3NxbnFkeHpn',
  },
  {
    image: 'images/Team/Harshita_Rathor.webp',
    name: 'Harshita Rathor',
    title: 'Operations Commander 📋 – Organizing chaos into clarity, and fueling the ship’s momentum forward.',
    role: 'General Secretary',
    Linkedin: 'https://www.linkedin.com/in/harshita-rathor-258207302',
    Instagram: 'https://www.instagram.com/hersheyy_ta?igsh=azVrNnoyeDJtd2hy',
  },
  {
    image: 'images/Team/Akash_Patel.webp',
    name: 'Akash Patel',
    title: 'Finance Anchor 💰 – Holding the club’s resources strong and steady through every financial storm.',
    role: 'Treasurer',
    Linkedin: 'https://www.linkedin.com/in/akash-3676a8280/',
    Instagram: 'https://www.instagram.com/aakash.17_01/',
  },
  {
    image: 'images/Team/Rishit_Kapoor.webp',
    name: 'Rishit Kapoor',
    title: 'Tech Pilot ⚙️ – Driving the engine room of development and innovation with passion and precision.',
    role: 'Technical Secretary and Placement head',
    Linkedin: 'https://www.linkedin.com/in/rishit-kapoor-33b2b81b0',
    Instagram: 'https://www.instagram.com/rishitkapoor_28?igsh=bmlzMG9rcGZobXJl',
  },
  {
    image: 'images/Team/Akshat_Bisht.webp',
    name: 'Akshat Bisht',
    title: 'Code Captain 💻 – Architect of the digital seas, building the backbone of LearnIT’s presence.',
    role: 'Head of Web Development',
    Linkedin: 'https://www.linkedin.com/in/akshat-bisht-586727161/',
    Instagram: 'https://www.instagram.com/akshatbi/',
  },
  {
    image: 'images/Team/Kashyap_Paraser.webp',
    name: 'Kashyap Paraser',
    title: 'Celebration Navigator 🎊 – Crafting unforgettable journeys through events that spark excitement.',
    role: 'Head of Events',
    Linkedin: 'https://www.linkedin.com/in/kashyap-paraser-7024aa22b',
    Instagram: 'https://www.instagram.com/__kashyapp_/',
  },
  {
    image: 'images/Team/Karen_Sylvia.webp',
    name: 'Karen Sylvia',
    title: 'Wordsmith-in-Chief ✍️ – Weaving words into wonder, curating stories that connect and inspire.',
    role: 'Head of Content',
    Linkedin: 'https://www.linkedin.com/in/karen-sylvia-vasmalla-7066b6287',
    Instagram: 'https://www.instagram.com/karenvsylvia?igsh=MnRtdW9pbTU1bWM0'
  },
  {
    image: 'images/Team/Abhinav_Awasthi.webp',
    name: 'Abhinav Awasthi',
    title: 'Design Sorcerer 🎨 – Breathing magic into every pixel, making ideas visually unforgettable.',
    role: 'Head of Graphic Design',
    Linkedin: 'https://www.linkedin.com/in/abhinav-awasthi11?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    Instagram: 'https://www.instagram.com/abhinav_ux/',
  },
  {
    image: 'images/Team/Rajeev_Singh.webp',
    name: 'Rajeev Singh',
    title: 'Media Maestro 📸 – Capturing moments and painting stories through the lens of LearnIT.',
    role: 'Head of Media',
    Linkedin: 'https://www.linkedin.com/in/rajeev-singh-8687232a4/',
    Instagram: 'https://www.instagram.com/rajeev_singh_177?igsh=OHZxM2szY3NwMjY4',
  },
  {
    image: 'images/Team/Naveen_Kumar.webp',
    name: 'Naveen Kumar',
    title: 'Outreach Specialist 🚀 – Amplifying our message and connecting LearnIT to new horizons.',
    role: 'Head of Promotions',
    Linkedin: 'https://www.linkedin.com/in/naveen-kumar-8434092a2',
    Instagram: 'https://www.instagram.com/naveeendhankhar?igsh=MWxxZnNhcnloOXBscw==',
  },
];

function renderTeamCards() {
  const container = document.getElementById('teamCardContainer');
  if (!container) return;

  teamData.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-card';

    card.innerHTML = `
      <div class="card-glow"></div>
      <div class="card-inner">
        <div class="card-grid-bg"></div>
        <div class="card-scan-line"></div>

        <div class="card-header">
          <div class="card-status">
            <div class="online-indicator">
              <div class="online-dot"></div>
              <span class="online-text">ONLINE</span>
            </div>
            <div class="tech-icons">
              <i class="fas fa-terminal"></i>
              <i class="fas fa-code"></i>
              <i class="fas fa-microchip"></i>
            </div>
          </div>
          <div class="role-badge">
            <i class="fas fa-bolt"></i>
            <span class="role-text">${member.role.toUpperCase()}</span>
          </div>
        </div>

        <div class="image-section">
          <div class="image-container">
            <img src="${member.image}" alt="${member.name}" class="member-image">
            <div class="holographic-overlay"></div>
            <div class="image-scan-lines">
              <div class="scan-line-1"></div>
              <div class="scan-line-2"></div>
              <div class="scan-line-3"></div>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="name-container">
            <h3 class="member-name">${member.name}</h3>
            <div class="name-glitch">${member.name}</div>
          </div>
          <p class="member-title">${member.title}</p>

          <div class="social-links">
            <a href="${member.Linkedin}" target="_blank" class="social-link linkedin">
              <i class="fab fa-linkedin"></i>
              <div class="social-overlay"></div>
            </a>
            <a href="${member.Instagram}" target="_blank" class="social-link instagram">
              <i class="fab fa-instagram"></i>
              <div class="social-overlay"></div>
            </a>
          </div>
        </div>

        <div class="corner-accent top-left"></div>
        <div class="corner-accent top-right"></div>
        <div class="corner-accent bottom-left"></div>
        <div class="corner-accent bottom-right"></div>
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
      </div>
    `;
    container.appendChild(card);
  });
}



// ========== INIT APP ==========
document.addEventListener('DOMContentLoaded', () => {
  initializeFuturisticEffects();
  renderTeamCards();  // New
  addInteractiveEffects();
  optimizePerformance();
  handleMissingElements();
  console.log("Futuristic team card initialized successfully");
});

// Initialize futuristic visual effects
function initializeFuturisticEffects() {
    // Add dynamic grid animation
    animateGridPattern();
    
    // Initialize floating orbs
    animateFloatingOrbs();
    
    // Add scanning line effects
    initializeScanningLines();
    
    // Add particle system
    initializeParticleSystem();
}

// Animate the grid pattern background
function animateGridPattern() {
    const gridPattern = document.querySelector('.grid-pattern');
    if (gridPattern) {
        let opacity = 0.1;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                opacity += 0.005;
                if (opacity >= 0.15) increasing = false;
            } else {
                opacity -= 0.005;
                if (opacity <= 0.05) increasing = true;
            }
            gridPattern.style.opacity = opacity;
        }, 100);
    }
}

// Animate floating orbs
function animateFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        let scale = 1;
        let increasing = true;
        const baseDelay = index * 1000;
        
        setTimeout(() => {
            setInterval(() => {
                if (increasing) {
                    scale += 0.01;
                    if (scale >= 1.2) increasing = false;
                } else {
                    scale -= 0.01;
                    if (scale <= 0.8) increasing = true;
                }
                orb.style.transform = `scale(${scale})`;
            }, 50);
        }, baseDelay);
    });
}

// Initialize scanning line effects
function initializeScanningLines() {
    const scanLines = document.querySelectorAll('.scan-line');
    scanLines.forEach((line, index) => {
        let opacity = 0;
        let increasing = true;
        const delay = index * 500;
        
        setTimeout(() => {
            setInterval(() => {
                if (increasing) {
                    opacity += 0.02;
                    if (opacity >= 1) increasing = false;
                } else {
                    opacity -= 0.02;
                    if (opacity <= 0) increasing = true;
                }
                line.style.opacity = opacity;
            }, 30);
        }, delay);
    });
}

// Initialize particle system
function initializeParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const delay = index * 667; // Stagger the animations
        
        setTimeout(() => {
            setInterval(() => {
                // Random position adjustment for floating effect
                const randomX = (Math.random() - 0.5) * 4;
                const randomY = (Math.random() - 0.5) * 4;
                particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 2000);
        }, delay);
    });
}

// Add interactive effects to the team card
function addInteractiveEffects() {
    const teamCard = document.getElementById('teamCard');
    if (!teamCard) return;
    
    // Enhanced hover effects
    teamCard.addEventListener('mouseenter', function() {
        // Intensify all animations on hover
        intensifyAnimations(true);
        
        // Add dynamic glow effect
        addDynamicGlow();
        
        // Trigger holographic scan
        triggerHolographicScan();
    });
    
    teamCard.addEventListener('mouseleave', function() {
        // Normalize animations
        intensifyAnimations(false);
        
        // Remove dynamic effects
        removeDynamicEffects();
    });
    
    // Add click effects for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(e, this);
        });
    });
    
    // Add tech tag hover effects
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Intensify animations on hover
function intensifyAnimations(intensify) {
    const animatedElements = document.querySelectorAll('.card-glow, .card-scan-line, .holographic-overlay');
    animatedElements.forEach(element => {
        if (intensify) {
            element.style.animationDuration = '0.5s';
        } else {
            element.style.animationDuration = '2s';
        }
    });
}

// Add dynamic glow effect
function addDynamicGlow() {
    const cardGlow = document.querySelector('.card-glow');
    if (cardGlow) {
        let hue = 0;
        const glowInterval = setInterval(() => {
            hue = (hue + 2) % 360;
            cardGlow.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%), 
                hsl(${(hue + 120) % 360}, 100%, 50%), 
                hsl(${(hue + 240) % 360}, 100%, 50%))`;
        }, 50);
        
        // Store interval for cleanup
        cardGlow.dataset.glowInterval = glowInterval;
    }
}

// Trigger holographic scan effect
function triggerHolographicScan() {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        // Create scanning beam
        const scanBeam = document.createElement('div');
        scanBeam.className = 'scan-beam';
        scanBeam.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 255, 0.3), 
                transparent);
            animation: scanBeam 2s ease-in-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Add scan beam animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scanBeam {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(style);
        
        imageContainer.appendChild(scanBeam);
        
        // Remove scan beam after animation
        setTimeout(() => {
            if (scanBeam.parentNode) {
                scanBeam.parentNode.removeChild(scanBeam);
            }
        }, 2000);
    }
}

// Remove dynamic effects
function removeDynamicEffects() {
    const cardGlow = document.querySelector('.card-glow');
    if (cardGlow && cardGlow.dataset.glowInterval) {
        clearInterval(parseInt(cardGlow.dataset.glowInterval));
        // Reset to original gradient
        cardGlow.style.background = 'linear-gradient(45deg, #00ffff, #9333ea, #ec4899)';
    }
}

// Create ripple effect for social links
function createRippleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Add focus indicators for accessibility
        const focusableElements = document.querySelectorAll('.social-link, .tech-tag');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #00ffff';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
});

// Performance optimization: Throttle animations on slower devices
function optimizePerformance() {
    const isSlowDevice = navigator.hardwareConcurrency < 4 || 
                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isSlowDevice) {
        // Reduce animation frequency for better performance
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(element => {
            const currentDuration = element.style.animationDuration || '2s';
            const newDuration = parseFloat(currentDuration) * 1.5 + 's';
            element.style.animationDuration = newDuration;
        });
        
        console.log("Performance optimizations applied for slower device");
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.team-card', '.card-glow', '.member-image'];
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element ${selector} not found`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

console.log("Futuristic team card script loaded successfully");