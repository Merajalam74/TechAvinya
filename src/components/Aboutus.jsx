import React, { useState, useEffect, useRef } from 'react';

export default function Aboutus() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen py-10 text-white flex items-center justify-center">
      <div 
        ref={aboutRef}
        className="max-w-7xl mx-auto px-6 text-center md:text-left"
      >
        <h2 
          className={`text-4xl md:text-5xl font-bold mb-10 transition-all Graduate duration-2000 ease-in-out text-cyan-400
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          About
        </h2>
        <div className="space-y-6">
          <p 
            className={`text-lg md:text-xl leading-relaxed Gluten transition-all duration-2000 ease-in-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
          >
            <span className="text-cyan-400 font-bold">Tech Avinya</span> is the annual  <span className="text-cyan-400 font-bold">technical festival</span> of <span className="text-cyan-400 font-bold">NIT Nagaland</span>. It serves as a premier platform for young innovators, engineers, and tech enthusiasts from across the nation to showcase their technical skills, exchange groundbreaking ideas, and push the boundaries of technology. Organized with a vision to foster a culture of innovation and learning, <span className="text-cyan-400 font-bold">Tech Avinya</span> brings together brilliant minds for a series of events, workshops, and competitions. From intense coding challenges and robotics competitions to insightful guest lectures and hands-on workshops, the fest offers a diverse range of activities. <span className="text-cyan-400 font-bold">Tech Avinya</span> is more than just a competition; it's a celebration of technology, creativity, and collaboration. Join us as we explore the future of technology and inspire the next generation of leaders in the world of engineering and innovation. The festival also provides a unique opportunity for networking with industry experts, leading academics, and a vibrant community of alumni. Our goal is to create an ecosystem where ideas flourish, and a passion for technology is ignited in every participant. This year, we continue our tradition of excellence, bringing you a lineup of events designed to challenge, inspire, and entertain. Be a part of the legacy of innovation at <span className="text-cyan-400 font-bold">NIT Nagaland's</span> most awaited technical extravaganza.
          </p>
        </div>
      </div>
    </div>
  );
}