import React, { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const INTERACTIVE_COLOR = "#FF00FF";
const BASE_COLOR = "#00FFFF";

const particlesOptions = {
  background: {
    color: { value: "#000000" },
    opacity: 0.0,
  },
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: BASE_COLOR,
      animation: {
        enable: true,
        speed: 10,
        sync: true,
      }
    },
    links: {
      color: BASE_COLOR,
      distance: 120,
      enable: true,
      opacity: 0.5,
      width: 1,
      triangles: {
        enable: true,
        color: BASE_COLOR,
        opacity: 0.05
      }
    },
    move: {
      enable: true,
      speed: 0.5,
    },
    number: {
      density: { enable: true, area: 800 },
      value: 80,
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["repulse", "bubble"],
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
        opacity: 1,
        color: {
          value: INTERACTIVE_COLOR
        }
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      grab: {
        distance: 150,
        links: {
          opacity: 1
        }
      },
    },
  },
};

export default function About() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setSlideDirection('left');
    setCurrentCard(1);
  };

  const handlePrev = () => {
    setSlideDirection('right');
    setCurrentCard(0);
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="fixed inset-0 w-screen h-screen z-0"
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-16">
        <div
          className={`w-full max-w-4xl lg:max-w-5xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
        >
          <div className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
            
            <div
              className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${currentCard === 0
                  ? 'translate-x-0 opacity-100'
                  : slideDirection === 'left'
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
                }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 h-full">
                
                <div className="relative p-6 md:p-10 flex flex-col justify-center order-2 lg:order-1 bg-gradient-to-br from-black/40 to-transparent">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-6 leading-tight">
                    Tech Avinya
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base md:text-lg leading-relaxed text-gray-200 font-light">
                      Tech Avinya is the annual technical festival of NIT Nagaland, serving as a dynamic platform for students to showcase their skills in a series of events, workshops, and hackathons.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-gray-300 font-light">
                      The fest is a celebration of technology, creativity, and collaboration, providing unique opportunities for networking with industry experts and inspiring the next generation of leaders in engineering and innovation.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-gray-300 font-light">
                      Our events span robotics, coding, machine learning, and design, all designed to challenge and inspire. Beyond competitions, Tech Avinya hosts interactive sessions, guest lectures, and engaging exhibitions.
                    </p>
                  </div>
                </div>
                <div className="group relative order-1 lg:order-2 overflow-hidden bg-black h-[260px] sm:h-[320px] lg:h-full">
                  <img
                    src="/about/tech-avinya.png"
                    alt="Tech Avinya"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-3xl md:text-4xl font-bold text-white opacity-20 font-['Press_Start_2P']">2025</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${currentCard === 1
                  ? 'translate-x-0 opacity-100'
                  : slideDirection === 'left'
                    ? 'translate-x-full opacity-0'
                    : '-translate-x-full opacity-0'
                }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20 h-full">
                <div className="group relative bg-black h-[260px] sm:h-[320px] lg:h-full">
                  <img
                    src="/about/nitn.png"
                    alt="NIT Nagaland"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-700 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="text-2xl md:text-3xl font-bold text-white opacity-30 font-['Press_Start_2P']">NIT</div>
                  </div>
                </div>
                <div className="relative p-6 md:p-10 flex flex-col justify-center bg-gradient-to-bl from-black/40 to-transparent">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 mb-6 leading-tight">
                    NIT Nagaland
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base md:text-lg leading-relaxed text-gray-200 font-light">
                      National Institute of Technology Nagaland is a premier technical institute established in 2010 as one of the 31 NITs in India, dedicated to providing quality technical education and fostering innovation.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-gray-300 font-light">
                      Located in Chümoukedima, Nagaland, the institute is committed to promoting regional diversity and a rich, multicultural learning environment, offering a wide range of undergraduate and postgraduate programs.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-gray-300 font-light">
                      Our faculty, composed of seasoned professionals and researchers, creates an intellectually stimulating atmosphere. NIT Nagaland is a center for cutting-edge research, contributing significantly to technological advancement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSlideDirection('right');
              setCurrentCard((prev) => (prev === 0 ? 1 : 0));
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-cyan-500 to-blue-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            style={{ boxShadow: '0 0 24px 0 rgba(0,255,255,0.2)' }}
            aria-label="Previous"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M14 8l-4 4 4 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>

          <button
            onClick={() => {
              setSlideDirection('left');
              setCurrentCard((prev) => (prev === 1 ? 0 : 1));
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            style={{ boxShadow: '0 0 24px 0 rgba(255,0,255,0.2)' }}
            aria-label="Next"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}