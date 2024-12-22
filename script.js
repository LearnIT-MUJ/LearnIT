// JavaScript for more dynamic effects
document.querySelector('.card')?.addEventListener('mouseenter', function() {
    this.style.transform = "scale(1.05)";
});

document.querySelector('.card')?.addEventListener('mouseleave', function() {
    this.style.transform = "scale(1)";
});

// JS for team members data
const executiveData = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'Sana Singh',
    title: 'Captain:- Leading the voyage with big ideas and even bigger plans, meet Sana, our amazing President! 🏴‍☠️',
    role: 'President of LearnIT',
    LinkedIn: 'https://www.linkedin.com/in/sana-singh-77b29b236/',
    isNormalLink: true
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Yash Kamra',
    title: 'Chief Engineer:- Steering the tech engine of our ship with brilliance Yash is our tech wizard extraordinaire! ⚙️',
    role: 'Technical Secretary',
    linkedIn: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
    isNormalLink: true
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Vighnesh Nikam',
    title: 'Navigator:- Master of organization, charting the course to success, say hey to Vighnesh, our General Secretary! 🌟',
    role: 'General Secretary',
    linkedIn: 'https://www.linkedin.com/in/vighnesh-nikam-162371221/',
    isNormalLink: true
},
{
    image: 'https://via.placeholder.com/150',
    name: 'Varshita',
    title: 'Event Helmsman:- Guiding the ship through exciting adventures and celebrations, meet Varshita, our Head of Events! 🎉',
    role: 'Head of Events',
    linkedIn: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
    isNormalLink: true
  },
    {
    image: 'https://via.placeholder.com/150',
    name: 'Baibhav',
    title: 'Treasurer of the Ship’s Chest:- Keeping the ship’s finances afloat and the budget in check, shoutout to Baibhav! 🪙',
    role: 'Treasurer',
    LinkedIn: 'https://www.linkedin.com/in/baibhav-kumar-0b15a524a/',
    isNormalLink: true
  },
    {
    image: 'https://via.placeholder.com/150',
    name: 'Ritik Laxwani',
    title: 'First Mate of Promotion:- Spreading the word and rallying the crew’s spirit, here’s Ritik, our promo genius! 📢',
    role: 'Head of Promotion',
    linkedIn: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
    isNormalLink: true
  },
    {
    image: 'https://via.placeholder.com/150',
    name: 'Srishti Mahapatra',
    title: 'Sail Designer:- The artist who makes our sails vibrant and eye-catching, with Srishti as Head of Design! 🌈',
    role: 'Head of Design',
    linkedIn: 'https://www.linkedin.com/in/srishti-mahapatra-b54062246/',
    isNormalLink: true
  },
    {
    image: 'https://via.placeholder.com/150',
    name: 'Arav Kumar',
    title: 'Logkeeper:- Bringing our journey to life through words, meet Arav, the storyteller of the crew!',
    role: 'Head of Content',
    LinkedIn: 'https://www.linkedin.com/in/arav-kumar-18496824a/',
    isNormalLink: true
  },

  
];// Add more team members here

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
                                    ${faculty.isNormalLink ? '<i class="fa fa-globe"></i>' : '<i class="fab fa-LinkedIn"></i>'}
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
