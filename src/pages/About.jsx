import React from 'react';
import about from '../assets/building.webp';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';



const INTERACTIVE_COLOR = "#FF00FF"; // Magenta for hover effect
const BASE_COLOR = "#00FFFF";      // Cyan base color

const particlesOptions = {
    // Canvas background is black, set transparently
    background: {
        color: { value: "#000000" },
        opacity: 0.0, // Make it transparent to allow underlying CSS/Video background to show
    },
    fullScreen: {
        enable: false, // Control sizing via parent div
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
            distance: 120, // Draw lines up to 120px away
            enable: true,
            opacity: 0.5,
            width: 1,
            triangles: {
                enable: true, // Optional: for a geometric look
                color: BASE_COLOR,
                opacity: 0.05
            }
        },
        move: {
            enable: true,
            speed: 0.5, // Slow, subtle drift
        },
        number: {
            density: { enable: true, area: 800 },
            value: 80, // Number of initial particles
        },
        opacity: {
            value: 0.8,
        },
        size: {
            value: 3, // Base size
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: ["repulse", "bubble"], // Use modes that allow dynamic property changes
            },
            // Push mode for a subtle explosion on click (optional)
            onClick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            // 1. Bubble Mode: Changes size and color on proximity
            bubble: {
                distance: 250, // Activation distance
                size: 8,       // New particle size (larger)
                duration: 2,
                opacity: 1,
                color: {
                    value: INTERACTIVE_COLOR // Change color to Magenta on hover/bubble
                }
            },
            // 2. Repulse Mode: Makes particles move away from the cursor
            repulse: {
                distance: 100, // Activation distance
                duration: 0.4,
            },
            // 3. Grab Mode: Draw stronger lines connecting to the cursor (Optional)
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
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  return (
    <div className="relative w-full min-h-screen">
      <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            className="fixed inset-0 w-screen h-screen z-[-1]"
        />
      {/* Background Image */}
      {/* <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={about}
      />
       */}
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0"></div>

      {/* Main Content Container with top margin */}
      <div className="relative z-10 w-full h-full flex flex-col pt-20 px-6 md:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
          
          {/* Column 1: About NIT Nagaland */}
          <div className="md:w-1/2 p-4 md:p-8 rounded-lg ">
            <h2 className="text-4xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking mb-8 mt-8 text-center">NIT Nagaland</h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-4 Gluten">
              National Institute of Technology Nagaland is a premier technical institute established in 2010 as one of the 31 NITs in India. As an Institute of National Importance, it is dedicated to providing quality technical education and fostering innovation. The institute is located in Chümoukedima, Nagaland, and is committed to promoting regional diversity and a rich, multicultural learning environment. The institution offers a wide range of undergraduate and postgraduate programs, attracting talented students from all over the country. Our faculty, composed of seasoned professionals and researchers, is committed to creating an intellectually stimulating atmosphere. NIT Nagaland is not just an educational hub but also a center for cutting-edge research, contributing significantly to the technological advancement of the region and the nation.
            </p>
          </div>

          {/* Column 2: About Tech Avinya */}
          <div className="md:w-1/2 p-4 md:p-8  rounded-lg">
            <h2 className="text-4xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking mb-8 mt-8 text-center">Tech Avinya</h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-4 Gluten">
              Tech Avinya is the annual technical festival of NIT Nagaland. It serves as a dynamic platform for students to showcase their skills in a series of events, workshops, and hackathons. The fest is a celebration of technology, creativity, and collaboration. Tech Avinya provides a unique opportunity for networking with industry experts and inspiring the next generation of leaders in the world of engineering and innovation. Our events span a wide range of disciplines, including robotics, coding, machine learning, and design, all designed to challenge and inspire. Beyond the competitions, Tech Avinya hosts a variety of interactive sessions, guest lectures from esteemed professionals, and engaging exhibitions. The festival's primary mission is to bridge the gap between academic knowledge and real-world application, empowering students to innovate and create solutions for tomorrow's challenges. It is the perfect venue for both participants and visitors to immerse themselves in a world of technological marvels and groundbreaking ideas.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}