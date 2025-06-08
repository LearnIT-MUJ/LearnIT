const aluminiData = [
    {
        image: 'images/Alumini/2023 -24/Sana_Singh.jpg',
        name: 'Sana Singh',
        title: 'Captain:- Leading the voyage with big ideas and even bigger plans, meet Sana, our amazing President! 👑',
        role: 'President of LearnIT',
        Linkedin: 'https://www.linkedin.com/in/sana-singh-77b29b236/',
        Instagram: 'https://www.instagram.com/sana_singh_31?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
        image: 'images/Alumini/2023 -24/Yash_kamra.jpg',
        name: 'Yash Kamra',
        title: 'Chief Engineer:- Steering the tech engine of our ship with brilliance Yash is our tech wizard extraordinaire! 🛠️',
        role: 'Technical Secretary',
        Linkedin: 'https://www.linkedin.com/in/yash-kamra-a9aa73259/',
        Instagram: 'https://www.instagram.com/yashkamra11?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
        image: 'images/Alumini/2023 -24/Vignesh_Nikam.jpg',
        name: 'Vighnesh Nikam',
        title: 'Navigator:- Master of organization, charting the course to success, say hey to Vighnesh, our General Secretary! 🌟',
        role: 'General Secretary',
        Linkedin: 'https://www.linkedin.com/in/vighnesh-nikam-162371221/',
        Instagram: 'https://www.instagram.com/im.vighnesh/?utm_source=ig_web_button_share_sheet',
    },
    {
        image: 'images/Alumini/2023 -24/Baibhav_Kumar.jpg',
        name: 'Baibhav Kumar',
        title: 'Treasurer of the Ship’s Chest:- Keeping the ship’s finances afloat and the budget in check, shoutout to Baibhav! 💰',
        role: 'Treasurer',
        Linkedin: 'https://www.linkedin.com/in/baibhav-kumar-0b15a524a/',
        Instagram: 'https://www.instagram.com/its_me_b___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
        image: 'images/Alumini/2023 -24/Varshita_Jain.jpg',
        name: 'Varshita Jain',
        title: 'Event Helmsman:- Guiding the ship through exciting adventures and celebrations, meet Varshita, our Head of Events! 🎉',
        role: 'Head of Events',
        Linkedin: 'https://www.linkedin.com/in/varshita-jain-35a735205/',
        Instagram: 'https://www.instagram.com/varshi.hihihi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    
    {
        image: 'images/Alumini/2023 -24/Ritik_Laxwani.jpeg',
        name: 'Ritik Laxwani',
        title: 'First Mate of Promotion:- Spreading the word and rallying the crew’s spirit, here’s Ritik, our promo genius! 📢',
        role: 'Head of Promotion',
        Linkedin: 'https://www.linkedin.com/in/ritiklaxwani/',
        Instagram: 'https://www.instagram.com/ritiklaxwani/?utm_source=ig_web_button_share_sheet',
    },
    {
        image: 'images/Alumini/2023 -24/Srishti_Mahapatra.jpg',
        name: 'Srishti Mahapatra',
        title: 'Sail Designer:- The artist who makes our sails vibrant and eye-catching, with Srishti as Head of Design! 🌈',
        role: 'Head of Design',
        Linkedin: 'https://www.linkedin.com/in/srishti-mahapatra-b54062246/',
        Instagram: 'https://www.instagram.com/srishtimahapatra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
        image: 'images/Alumini/2023 -24/Parth.jpg',
        name: 'Parth Agrawal',
        role: 'Joint Head of Media',
        Linkedin: 'https://www.linkedin.com/in/parth-agrawal-897605265/',
    },
    {
        image: 'images/Alumini/2023 -24/Parth.jpg',
        name: 'Guneet Singh',
        role: 'Joint Head of Media',
        Linkedin: 'https://www.linkedin.com/in/guneet-singh-5a179a291/',
    },
    // {
    //     image: 'https://via.placeholder.com/150',
    //     name: 'Arav Kumar',
    //     title: 'Logkeeper:- Bringing our journey to life through words, meet Arav, the storyteller of the crew! 📰',
    //     role: 'Head of Content',
    //     Linkedin: 'https://www.linkedin.com/in/arav-kumar-18496824a/',
    //     Instagram: 'https://www.instagram.com/aravv.kumar/?utm_source=ig_web_button_share_sheet',
    // },
];

// Function to create and display team member cards
function createTeamCards() {
    const teamContainer = document.getElementById('team-cards');

    aluminiData.forEach((team, index) => {
        let socialLinks = '';

        // Validate and add social media links dynamically
        if (team.Linkedin) {
            socialLinks += `<a href="${team.Linkedin}" target="_blank" class="social linkedin"><i class="fab fa-linkedin"></i></a>`;
        }
        // Check for Instagram
        if (team.Instagram) {
            socialLinks += `<a href="${team.Instagram}" target="_blank" class="social instagram"><i class="fab fa-instagram"></i></a>`;
        }


        const cardHTML = `
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card">
          <div class="card-img-wrapper">
            <img class="card-img-top" src="${team.image}" alt="${team.name}">
          </div>
          <div class="card-body">
            <h5>${team.name}</h5>
            <p class="member-role">${team.role}</p>
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

