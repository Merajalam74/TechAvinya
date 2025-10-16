import React, { useState, useEffect } from 'react';
import backvideo from '../assets/events.mp4';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import VantaNetBackground from '../components/VantaNetBackground';

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('home-video');
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
    }
  }, []);

  return (
    <>
      
      <div className="relative w-full h-screen overflow-hidden">
        <VantaNetBackground />

        <div className="absolute inset-0">
          <video
            id="home-video"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={backvideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              TECH AVINYA
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 font-light">
              NIT Nagaland's Premier Technical Festival
            </p>
            <div className="mt-8 animate-pulse">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <AftermovieCard />
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <Aboutus />
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </>
  );
}