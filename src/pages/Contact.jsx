import React, { useState } from 'react';
import aboutvideo from '../assets/globe.jpg';
import { FaInstagram, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
  const contactPersons = [
    {
      id: 1,
      name: "Nirmal Prajapati",
      role: "General Secretary",
      image: "/secretary/general.jpg",
      contact: "+91 7623063076",
      social: { instagram: "nirmal.pra", linkedin: "nirmal-prajapati", email: "nirmal@example.com" }
    },
    {
      id: 2,
      name: "Hrishabh Raj",
      role: "Technical Secretary",
      image: "/secretary/technical.jpg",
      contact: "+91 6203754637",
      social: { instagram: "https://www.instagram.com/i_hrishabhr", linkedin: "https://www.linkedin.com/in/hrishabhxcode", email: "hrishabhtest@gmail.com" }
    },
    {
      id: 3,
      name: "Akhil Naik",
      role: "Technical Secretary",
      image: "/secretary/technical2.jpg",
      contact: "+91 9730934366",
      social: { instagram: "akhil.n", linkedin: "akhil-naik", email: "akhil@example.com" }
    },
    {
      id: 4,
      name: "VISHAL KUMAR",
      role: "Coding Club Secretary",
      image: "/secretary/coding.jpg",
      contact: "+91 9876543210",
      social: { instagram: "vishal.k", linkedin: "vishal-kumar", email: "vishal@example.com" }
    },
    {
      id: 5,
      name: "Chubamanen jamir",
      role: "Coding Club Secretary",
      image: "/secretary/coding2.png",
      contact: "+91 8798585322",
      social: { instagram: "swapnil.s", linkedin: "https://www.linkedin.com/in/chuba-manen-39241a1b8", email: "Chunamanen572@gmail.com" }
    },
    {
      id: 6,
      name: "Dev yadav",
      role: "Robotics Club Secretary",
      image: "/secretary/robotics.jpg",
      contact : "+91 9350229098",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/dev-yadav-2207022", email: "dev2025roboforge@gmail.com" }
    },
    {
      id: 7,
      name: "Mhademo R Kikon",
      role: "Robotics Club Secretary",
      image: "/secretary/robotics2.jpg",
      contact: "+91 9362725370",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/mhademo-r-kikon-5478992a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "mhademok034@gmail.com" }
    },
    {
      id: 8,
      name: "Richa Das",
      role: "Entrepreneurship Club Secretary",
      image: "/secretary/ecell.jpeg",
      contact: "+91 9864541768",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/richa-das-22636a387", email: "dasricha454@gmail.com" }
    },
    {
      id: 9,
      name: "SAURABH KUMAR",
      role: "Entrepreneurship Club Secretary",
      image: "/secretary/ecell2.jpg",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 10,
      name: "Elias.s.thonger",
      role: "Esports Secretary",
      image: "/secretary/esport.jpg",
      contact: "+91 7005383559",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/elias-thonger-410a56292", email: "lolobosti@gmail.com" }
    },
    {
      id: 11,
      name: "SAURABH KUMAR",
      role: "Esports Secretary",
      image: "/secretary/esport2.jpg",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 12,
      name: "Kesogi Seb ",
      role: "Digital Art Club Secretary",
      image: "/secretary/art.jpg",
      contact: "+91 9362794809",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/kesogi-seb-485375387", email: "kesogiseb@gmail.com" }
    },
    {
      id: 13,
      name: "Shalu Priya Murmu",
      role: "Digital Art Club Secretary",
      image: "/secretary/art2.jpg",
      contact: "+91 7488269197",
      social: { instagram: "#", linkedin: "https://www.linkedin.com/in/shalu-priya-murmu-053000313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "shalumurmu.55@gmail.com" }
    },
    {
      id: 14,
      name: "Ankit Kumar",
      role: "Website creator",
      image: "/secretary/web.jpg",
      contact: "+91 9229434627",
      social: { instagram: "https://www.instagram.com/raj_ankit_95/", linkedin: "https://www.linkedin.com/in/ankit-kumar-922ankit/", email: "ankitkumar43975@gmail.com" }
    },
    {
      id: 15,
      name: "Divyanshu mishra",
      role: "Animation designer",
      image: "/secretary/web1.jpg",
      contact: "+91 7755803253",
      social: { instagram: "https://www.instagram.com/divyanshu_mishra_1911/", linkedin: "https://www.linkedin.com/in/divyanshu-mishra-nit20241033/", email: "kesogiseb@gmail.com" }
    },
  ];

  const teamCategories = [
    { name: "General", members: contactPersons.slice(0, 1) },
    { name: "Technical Board", members: contactPersons.slice(1, 3) },
    { name: "Coding Club", members: contactPersons.slice(3,5) },
    { name: "Robotics Club", members: contactPersons.slice(5,7) },
    { name: "Entrepreneurship Club", members: contactPersons.slice(7,9) },
    { name: "Esports Arena", members: contactPersons.slice(9,11) },
    { name: "Digital Art Club", members: contactPersons.slice(11,13) },
    { name: "Web Team", members: contactPersons.slice(13,16) }
  ];

  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 26;
    const rotateY = (x / width - 0.5) * -26;
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
        boxShadow: '0 20px 40px rgba(0, 255, 255, 0.5)',
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
      }
    }));
  };

  return (
    <div className="relative w-full min-h-screen  text-white overflow-hidden">
      {/* Background Video and Overlay */}
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={aboutvideo}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full pt-20 pb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking">
          TEAM TECH AVINYA'25
        </h1>
        <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto mb-16 Gluten text-gray-300">
          Meet the dedicated team making it all happen.
        </p>

        {teamCategories.map((category, catIndex) => (
  <div key={catIndex} className="w-full mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-8 font-vt323 tracking-wide">
      {category.name}
    </h2>
    <div className=" gap-8 px-4 max-w-6xl mx-auto flex flex-wrap justify-center items-center">
      {category.members.map(person => (
        <div
          key={person.id}
          onMouseMove={(e) => handleMouseMove(e, person.id)}
          onMouseLeave={() => handleMouseLeave(person.id)}
          className="card-wrapper group relative w-[280px] h-[360px] mx-auto p-1 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out flex justify-center items-center"
          style={tiltStyle[person.id]}
        >
          <div className="relative rounded-xl h-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-300 group-hover:border-cyan-500">
            
            <div className="w-full h-1/2 overflow-hidden flex items-center justify-center rounded-t-xl flex-shrink-0">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-grow flex flex-col justify-center p-4">
              <h3 className="text-xl md:text-2xl font-semibold Graduate text-white transition-colors duration-300 group-hover:text-cyan-300">
                {person.name}
              </h3>
              <p className="text-sm md:text-base Gluten text-gray-300 mt-1">{person.role}</p>
              <p className="text-md font-medium Gluten text-cyan-400 mt-2 mb-6">{person.contact}</p>
            </div>

            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href={`mailto:${person.social.email}`} aria-label="Email" className="text-cyan-400 hover:text-cyan-200"><FaEnvelope className="text-xl" /></a>
              <a href={person.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cyan-400 hover:text-cyan-200"><FaInstagram className="text-xl" /></a>
              <a href={person.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cyan-400 hover:text-cyan-200"><FaLinkedinIn className="text-xl" /></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
))}
      </div>
    </div>
  );
}