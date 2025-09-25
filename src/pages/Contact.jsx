import React, { useState } from 'react';
import aboutvideo from '../assets/contact.mp4';
import { FaInstagram, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
  const contactPersons = [
    {
      id: 1,
      name: "Nirmal Prajapati",
      role: "General Secretary",
      image: "https://i.ibb.co/r7XyWpY/nirmal.jpg",
      contact: "+91 7623063076",
      social: { instagram: "nirmal.pra", linkedin: "nirmal-prajapati", email: "nirmal@example.com" }
    },
    {
      id: 2,
      name: "Hrishabh Raj",
      role: "Technical Secretary",
      image: "https://i.ibb.co/f4gq69r/amandeep.jpg",
      contact: "+91 8318785132",
      social: { instagram: "amandeep.u", linkedin: "amandeep-upadhyay", email: "amandeep@example.com" }
    },
    {
      id: 3,
      name: "Akhil Naik",
      role: "Technical Secretary",
      image: "https://i.ibb.co/q7v8G9k/akhil.jpg",
      contact: "+91 9730934366",
      social: { instagram: "akhil.n", linkedin: "akhil-naik", email: "akhil@example.com" }
    },
    {
      id: 4,
      name: "VISHAL KUMAR",
      role: "Coding Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s",
      contact: "+91 9876543210",
      social: { instagram: "vishal.k", linkedin: "vishal-kumar", email: "vishal@example.com" }
    },
    {
      id: 5,
      name: "SWAPNIL SINGH",
      role: "Coding Club Secretary",
      image: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
      contact: "+91 9876543210",
      social: { instagram: "swapnil.s", linkedin: "swapnil-singh", email: "swapnil@example.com" }
    },
    {
      id: 6,
      name: "ADITYA RAJ",
      role: "Robotics Club Secretary",
      image: "https://media.istockphoto.com/id/500221637/photo/digital-world.jpg?s=612x612&w=0&k=20&c=wbMfTwRUtss0b5kswrlh-ivsm8bajmcbuksi30d6ryo=",
      contact: "+91 9876543210",
      social: { instagram: "aditya.r", linkedin: "aditya-raj", email: "aditya@example.com" }
    },
    {
      id: 7,
      name: "PRASHANT KUMAR",
      role: "Robotics Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXjJK3VeXvtD3ctA&s",
      contact: "+91 9876543210",
      social: { instagram: "prashant.k", linkedin: "prashant-kumar", email: "prashant@example.com" }
    },
    {
      id: 8,
      name: "SAURABH KUMAR",
      role: "Entrepreneurship Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 9,
      name: "SAURABH KUMAR",
      role: "Entrepreneurship Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 10,
      name: "SAURABH KUMAR",
      role: "Esports Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 11,
      name: "SAURABH KUMAR",
      role: "Esports Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 12,
      name: "SAURABH KUMAR",
      role: "Digital Art Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
    {
      id: 13,
      name: "SAURABH KUMAR",
      role: "Digital Art Club Secretary",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      contact: "+91 9876543210",
      social: { instagram: "saurabh.k", linkedin: "saurabh-kumar", email: "saurabh@example.com" }
    },
  ];

  const teamCategories = [
    { name: "General", members: contactPersons.slice(0, 1) },
    { name: "Technical Board", members: contactPersons.slice(1, 3) },
    { name: "Coding Club", members: contactPersons.slice(3,5) },
    { name: "Robotics Club", members: contactPersons.slice(5,7) },
    { name: "Entrepreneurship Club", members: contactPersons.slice(7,9) },
    { name: "Esports Arena", members: contactPersons.slice(9,11) },
    { name: "Digital Art Club", members: contactPersons.slice(11,13) }
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
      <video
  className="fixed inset-0 w-screen h-screen object-cover z-[-1] transform scale-125"
  src={aboutvideo}
  autoPlay
  loop
  muted
  playsInline
/>
      
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full pt-20 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold Graduate text-cyan-400 mb-2 tracking-wider font-anton">
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
              <p className="text-sm md:text-base text-gray-300 mt-1 Gluten">{person.role}</p>
              <p className="text-md font-medium text-cyan-400 mt-2 mb-6 Gluten">{person.contact}</p>
            </div>

            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href={`mailto:${person.social.email}`} aria-label="Email" className="text-cyan-400 hover:text-cyan-200"><FaEnvelope className="text-xl" /></a>
              <a href={`https://instagram.com/${person.social.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cyan-400 hover:text-cyan-200"><FaInstagram className="text-xl" /></a>
              <a href={`https://linkedin.com/in/${person.social.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cyan-400 hover:text-cyan-200"><FaLinkedinIn className="text-xl" /></a>
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