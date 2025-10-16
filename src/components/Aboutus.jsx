import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.478605175001!2d93.77168327523175!3d25.787779977335646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374607c5cdfdde91%3A0xf69a2518890fea22!2sNational%20Institute%20of%20Technology%20Nagaland!5e0!3m2!1sen!2sin!4v1758637874895!5m2!1sen!2sin";

  return (
    <div className="relative w-full py-16 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div
        ref={aboutRef}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-12 mt-8 text-center md:text-left"
          style={{
            fontFamily: 'Arial, sans-serif',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.7), 0 0 40px rgba(56, 189, 248, 0.4)'
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          About
        </motion.h2>

        
        <motion.div
          className="relative rounded-3xl border-2 border-cyan-500/40 bg-slate-900/30 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400 rounded-br-xl"></div>

          <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-400/30 rounded-tl-xl blur-sm"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-400/30 rounded-tr-xl blur-sm"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-400/30 rounded-bl-xl blur-sm"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-400/30 rounded-br-xl blur-sm"></div>

          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-5">
                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  <span className="text-cyan-400 font-bold">Tech Avinya</span> is the annual <span className="text-cyan-400 font-bold">technical festival</span> of <span className="text-cyan-400 font-bold">NIT Nagaland</span>. It serves as a premier platform for young innovators, engineers, and tech enthusiasts from across the nation to showcase their technical skills, exchange groundbreaking ideas, and push the boundaries of technology.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  Organized with a vision to foster a culture of innovation and learning, <span className="text-cyan-400 font-bold">Tech Avinya</span> brings together brilliant minds for a series of events, workshops, and competitions. From intense coding challenges and robotics competitions to insightful guest lectures and hands-on workshops, the fest offers a diverse range of activities.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  <span className="text-cyan-400 font-bold">Tech Avinya</span> is more than just a competition; it's a celebration of technology, creativity, and collaboration. The festival provides unique networking opportunities with industry experts, leading academics, and alumni. Join us as we explore the future of technology and inspire the next generation of engineering leaders.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-[45%] w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-2xl overflow-hidden border border-cyan-500/30 shadow-lg">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 border-b border-cyan-500/20">
                  <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
                    Find Us
                  </h3>
                </div>
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <iframe
                    src={googleMapsEmbedUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}