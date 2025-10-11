import React from 'react';
import about from '../assets/building.webp';
export default function About() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={about}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-black-800/40 backdrop-blur-[2px] "></div>

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