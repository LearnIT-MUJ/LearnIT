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
    Linkedin: 'https://www.linkedin.com/in/baibhav-kumar-0b15a524a/',
    Instagram: 'https://www.instagram.com/its_me_b___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
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
  },
  {
    image: 'images/Team/Abhinav_Awasthi.webp',
    name: 'Abhinav Awasthi',
    title: 'Design Sorcerer 🎨 – Breathing magic into every pixel, making ideas visually unforgettable.',
    role: 'Joint Head of Graphic Design',
    Linkedin: 'https://www.linkedin.com/in/srishti-mahapatra-b54062246/',
    Instagram: 'https://www.instagram.com/srishtimahapatra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  {
    image: 'images/Team/Nishant.webp',
    name: 'Nishant',
    title: 'Visual Artisan 🖌️ – Turning blank canvases into stories, crafting the soul of our identity.',
    role: 'Joint Head of Graphic Design',
    Linkedin: 'https://www.linkedin.com/in/blabhardwaj',
    Instagram: 'https://www.instagram.com/ne.shant?igsh=MXdrZGZvY2JndXRhZA==',
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


// Function to create and display team member cards
function createTeamCards() {
  const teamContainer = document.getElementById('team-cards');

  teamData.forEach((team, index) => {
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
            <p>${team.title}</p>
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
