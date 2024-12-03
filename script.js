// JavaScript for more dynamic effects
document.querySelector('.card')?.addEventListener('mouseenter', function() {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function() {
    this.style.transform = "scale(1)";
});

// JS for team members data
const facultyData = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'Sana Singh',
    title: 'President of LearnIT',
    role: 'Head of LearnIT',
    linkedin: 'https://www.linkedin.com/in/sana-singh-77b29b236/',
    isNormalLink: true
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Yash Kamra',
    title: 'Technical Secretary',
    role: 'Techky Guy',
    linkedin: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
    isNormalLink: true
  },
  // Add more team members here
];

// Function to create and display team member cards
function createTeamCards() {
    const teamContainer = document.getElementById('team-cards');
    
    facultyData.forEach((faculty, index) => {
        const cardHTML = `
            <div class="col-md-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="card">
                    <a href="#">
                        <img class="card-img-top img-raised" src="${faculty.image}" alt="${faculty.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title mb-2">${faculty.name}</h5>
                        <p class="text-muted small-xl mb-2">${faculty.title}</p>
                        <p class="card-text">${faculty.role}</p>
                        <ul class="list-inline social social-sm">
                            <li class="list-inline-item">
                                <a href="${faculty.linkedin}">
                                    ${faculty.isNormalLink ? '<i class="fa fa-globe"></i>' : '<i class="fab fa-linkedin"></i>'}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML.trim();
        
        const card = cardElement.firstChild; // Get the newly created card element
        card.addEventListener('mouseenter', function() {
            this.style.transform = "scale(1.05)";
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = "scale(1)";
        });

        teamContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    createTeamCards();
    AOS.init(); // Initialize AOS for animations
});
