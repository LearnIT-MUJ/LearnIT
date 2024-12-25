// JS for executive members' data
const executiveData = [
    {
      image: 'https://via.placeholder.com/150',
      name: 'Sana Singh',
      title: 'Captain:- Leading the voyage with big ideas and even bigger plans, meet Sana, our amazing President! 🏴‍☠️',
      role: 'President of LearnIT',
      LinkedIn: 'https://www.linkedin.com/in/sana-singh-77b29b236/',
      Instagram: 'https://instagram.com/sana_singh',  
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Yash Kamra',
      title: 'Chief Engineer:- Steering the tech engine of our ship with brilliance Yash is our tech wizard extraordinaire! ⚙️',
      role: 'Technical Secretary',
      LinkedIn: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
      Instagram: 'https://instagram.com/yash_kamra',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Vighnesh Nikam',
      title: 'Navigator:- Master of organization, charting the course to success, say hey to Vighnesh, our General Secretary! 🌟',
      role: 'General Secretary',
      LinkedIn: 'https://www.linkedin.com/in/vighnesh-nikam-162371221/',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Varshita',
      title: 'Event Helmsman:- Guiding the ship through exciting adventures and celebrations, meet Varshita, our Head of Events! 🎉',
      role: 'Head of Events',
      LinkedIn: 'https://www.linkedin.com/in/varshita/',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Baibhav',
      title: 'Treasurer of the Ship’s Chest:- Keeping the ship’s finances afloat and the budget in check, shoutout to Baibhav! 🪙',
      role: 'Treasurer',
      LinkedIn: 'https://www.linkedin.com/in/baibhav-kumar-0b15a524a/',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Ritik Laxwani',
      title: 'First Mate of Promotion:- Spreading the word and rallying the crew’s spirit, here’s Ritik, our promo genius! 📢',
      role: 'Head of Promotion',
      LinkedIn: 'https://www.linkedin.com/in/ritik-laxwani/',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Srishti Mahapatra',
      title: 'Sail Designer:- The artist who makes our sails vibrant and eye-catching, with Srishti as Head of Design! 🌈',
      role: 'Head of Design',
      Linkedin: 'https://www.linkedin.com/in/srishti-mahapatra-b54062246/',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Arav Kumar',
      title: 'Logkeeper:- Bringing our journey to life through words, meet Arav, the storyteller of the crew!',
      role: 'Head of Content',
      LinkedIn: 'https://www.linkedin.com/in/arav-kumar-18496824a/',
    },
  ];
  
  // Function to create and display team member cards
  function createTeamCards() {
    const teamContainer = document.getElementById('team-cards');
  
    executiveData.forEach((executive, index) => {
        let socialLinks = '';
    for (const [platform, url] of Object.entries(executive.links)) {
      const iconClass = platform === 'LinkedIn' ? 'fab fa-LinkedIn' :
                       // platform === 'twitter' ? 'fab fa-twitter' :
                        'fab fa-Instagram';
      socialLinks += `<a href="${url}" target="_blank"><i class="${iconClass}"></i></a>`;
    }
        
      const cardHTML = `
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card">
          <img class="card-img-top" src="${executive.image}" alt="${executive.name}">
          <div class="card-body">
            <h5>${executive.name}</h5>
            <p>${executive.title}</p>
            <p>${executive.role}</p>
            <div class="social-links">${socialLinks}</div>
          </div>
        </div>
      </div>
    `;
    teamContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
 
  AOS.init({
    duration: 1200,
    once: true,
  });
}

document.addEventListener('DOMContentLoaded', createTeamCards);
