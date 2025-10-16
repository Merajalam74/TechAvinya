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
          className={`w-full max-w-7xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
        >
          <div className="relative w-full overflow-hidden" style={{ minHeight: '700px' }}>

            <div
              className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${currentCard === 0
                  ? 'translate-x-0 opacity-100'
                  : slideDirection === 'left'
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
                }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 h-full">

                <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 bg-gradient-to-br from-black/40 to-transparent">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-8 leading-tight">
                    Tech Avinya
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 font-light">
                      Tech Avinya is the annual technical festival of NIT Nagaland, serving as a dynamic platform for students to showcase their skills in a series of events, workshops, and hackathons.
                    </p>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
                      The fest is a celebration of technology, creativity, and collaboration, providing unique opportunities for networking with industry experts and inspiring the next generation of leaders in engineering and innovation.
                    </p>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
                      Our events span robotics, coding, machine learning, and design, all designed to challenge and inspire. Beyond competitions, Tech Avinya hosts interactive sessions, guest lectures, and engaging exhibitions.
                    </p>
                  </div>
                </div>

                <div className="relative h-96 lg:h-auto order-1 lg:order-2 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img
                    src="./about/tech-avinya.png"
                    alt="Tech Avinya"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-5xl md:text-6xl font-bold text-white opacity-20 font-['Press_Start_2P']">2025</div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20 h-full">

                <div className="relative h-96 lg:h-auto overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-700 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img
                    src="./about/nitn.png"
                    alt="NIT Nagaland"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-8 right-8">
                    <div className="text-3xl md:text-4xl font-bold text-white opacity-30 font-['Press_Start_2P']">NIT</div>
                  </div>
                </div>

                <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-bl from-black/40 to-transparent">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 mb-8 leading-tight">
                    NIT Nagaland
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 font-light">
                      National Institute of Technology Nagaland is a premier technical institute established in 2010 as one of the 31 NITs in India, dedicated to providing quality technical education and fostering innovation.
                    </p>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
                      Located in Chümoukedima, Nagaland, the institute is committed to promoting regional diversity and a rich, multicultural learning environment, offering a wide range of undergraduate and postgraduate programs.
                    </p>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
                      Our faculty, composed of seasoned professionals and researchers, creates an intellectually stimulating atmosphere. NIT Nagaland is a center for cutting-edge research, contributing significantly to technological advancement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={handlePrev}
              disabled={currentCard === 0}
              className={`group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform ${currentCard === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 hover:scale-105'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tech Avinya
              </span>
            </button>

            <div className="flex gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentCard === 0 ? 'bg-cyan-400 w-8' : 'bg-gray-600'
                  }`}
              />
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentCard === 1 ? 'bg-purple-400 w-8' : 'bg-gray-600'
                  }`}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={currentCard === 1}
              className={`group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform ${currentCard === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105'
                }`}
            >
              <span className="flex items-center gap-2">
                NIT Nagaland
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}