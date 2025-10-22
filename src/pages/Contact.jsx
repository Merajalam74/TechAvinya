import React, { useState } from 'react';
import aboutvideo from '../assets/globe.jpg';
import { FaInstagram, FaEnvelope, FaLinkedinIn, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const contactPersons = [
    {
      id: 1,
      name: "Khrieketouzo Peter Sekhose",
      role: "General Secretary",
      image: "/secretary/general.jpg",
      contact: "+91 7640859887",
      social: { instagram: "https://www.instagram.com/khrieketouzosekhose/", linkedin: "NULL", email: "khrieketouzopetersekhose@gmail.com" }
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
      name: "Lanuyanger Aier",
      role: "Technical Secretary",
      image: "/secretary/technical2.jpg",
      contact: "+91 9730934366",
      social: { instagram: "akhil.n", linkedin: "akhil-naik", email: "akhil@example.com" }
    },
    {
      id: 4,
      name: "Satyam Singh",
      role: "Coding Club Secretary",
      image: "/secretary/coding.jpg",
      contact: "+91 9918437706",
      social: { instagram: "vishal.k", linkedin: "vishal-kumar", email: "vishal@example.com" }
    },
    {
      id: 5,
      name: "Chubamanen Jamir",
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
      contact: "+91 9350229098",
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
      name: "Aviji Singson",
      role: "Entrepreneurship Club Secretary",
      image: "/secretary/ecell2.jpg",
      contact: "+91 6909697937",
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
      name: "Ajay Singh",
      role: "Esports Secretary",
      image: "/secretary/ajay.jpg",
      contact: "+91 8769275797",
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
      role: "creator",
      image: "/secretary/web2.jpg",
      contact: "+91 7755803253",
      social: { instagram: "https://www.instagram.com/divyanshu_mishra_1911/", linkedin: "https://www.linkedin.com/in/divyanshu-mishra-nit20241033/", email: "kesogiseb@gmail.com" }
    },
  ];

  const teamCategories = [
    { name: "Convener", members: contactPersons.slice(0, 1) },
    { name: "Technical Board", members: contactPersons.slice(1, 3) },
    { name: "Coding Club", members: contactPersons.slice(3, 5) },
    { name: "Robotics Club", members: contactPersons.slice(5, 7) },
    { name: "Entrepreneurship Club", members: contactPersons.slice(7, 9) },
    { name: "Esports Arena", members: contactPersons.slice(9, 11) },
    { name: "Digital Art Club", members: contactPersons.slice(11, 13) },
    { name: "Web Team", members: contactPersons.slice(13, 16) }
  ];

  
  const formatLink = (platform, value) => {
    if (!value || value === '#') return null;
    const hasProtocol = /^https?:\/\//i.test(value);
    if (platform === 'instagram') {
      return hasProtocol ? value : `https://www.instagram.com/${value.replace(/^@/, '')}`;
    }
    if (platform === 'linkedin') {
      return hasProtocol ? value : `https://www.linkedin.com/in/${value}`;
    }
    return value;
  };

  const [tiltStyle, setTiltStyle] = useState({});
  const [flipped, setFlipped] = useState({}); 

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 16; // slightly reduced for smoother feel
    const rotateY = (x / width - 0.5) * -16;

    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
        boxShadow: '0 20px 40px rgba(0, 255, 255, 0.25)',
      }
    }));
  };

  const handleMouseEnter = (id) => {
    setFlipped(prev => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
      }
    }));
    setFlipped(prev => ({ ...prev, [id]: false }));
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={aboutvideo}
        alt="Background"
      />

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

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
            <div className="gap-8 px-4 max-w-6xl mx-auto flex flex-wrap justify-center items-center">
              {category.members.map(person => {
                const ig = formatLink('instagram', person.social.instagram);
                const li = formatLink('linkedin', person.social.linkedin);
                const email = person.social.email;
                const isFlipped = !!flipped[person.id];

                return (
                  <div
                    key={person.id}
                    onMouseMove={(e) => handleMouseMove(e, person.id)}
                    onMouseEnter={() => handleMouseEnter(person.id)}
                    onMouseLeave={() => handleMouseLeave(person.id)}
                    onClick={() => toggleFlip(person.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(person.id)}
                    className="group relative w-[280px] h-[380px] mx-auto cursor-pointer select-none"
                    style={tiltStyle[person.id]}
                  >
                    
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400/60 via-teal-500/40 to-blue-600/60 shadow-[0_15px_40px_rgba(0,255,255,0.15)]">
                     
                      <div className="relative h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 overflow-hidden">
                      
                        <div
                          className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          }}
                        >
                          
                          <div
                            className="absolute inset-0 flex flex-col"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div className="relative w-full h-[50%] overflow-hidden">
                              <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                            </div>

                            <div className="flex-grow flex flex-col items-center justify-center p-5 text-center">
                              <h3 className="text-xl md:text-2xl font-semibold Graduate text-white">
                                {person.name}
                              </h3>
                              <p className="mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                                {person.role}
                              </p>
                              <a
                                href={`tel:${person.contact.replace(/\s+/g, '')}`}
                                className="mt-3 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaPhone className="text-sm" />
                                <span className="Gluten">{person.contact}</span>
                              </a>

                              <p className="mt-4 text-xs text-gray-400">
                                Hover or tap to flip for socials
                              </p>
                            </div>
                          </div>

                      
                          <div
                            className="absolute inset-0 p-5 flex flex-col items-center justify-between"
                            style={{
                              transform: 'rotateY(180deg)',
                              backfaceVisibility: 'hidden'
                            }}
                          >
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-emerald-500/10" />

                            <div className="relative w-full">
                              <h3 className="text-lg font-semibold Graduate text-white">
                                Connect with {person.name.split(' ')[0]}
                              </h3>
                              <p className="text-sm text-gray-300 Gluten">{person.role}</p>
                            </div>

                            <div className="relative flex flex-col items-center gap-4">
                              <div className="flex items-center gap-5">
                                {/* Email */}
                                {email && (
                                  <a
                                    href={`mailto:${email}`}
                                    aria-label="Email"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaEnvelope className="text-xl" />
                                  </a>
                                )}
                                
                                {ig && (
                                  <a
                                    href={ig}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-pink-300 hover:text-pink-200 hover:border-pink-400/40 hover:bg-pink-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaInstagram className="text-xl" />
                                  </a>
                                )}
                                
                                {li && (
                                  <a
                                    href={li}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-blue-300 hover:text-blue-200 hover:border-blue-400/40 hover:bg-blue-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaLinkedinIn className="text-xl" />
                                  </a>
                                )}
                              </div>

                              <div className="text-center text-xs text-gray-400">
                                Tip: Click phone/email to contact directly
                              </div>
                            </div>

                            <div className="relative w-full">
                              <a
                                href={`tel:${person.contact.replace(/\s+/g, '')}`}
                                className="inline-flex items-center justify-center w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-200 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-colors Gluten"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaPhone className="mr-2" /> Call
                              </a>
                            </div>
                          </div>
                        </div>
            
                        <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[inset_0_0_60px_rgba(20,200,220,0.08)]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
