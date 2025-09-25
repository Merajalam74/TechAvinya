import React, { useState, useEffect, useRef } from 'react';
import gallary from '../assets/gallary.mp4';

export default function Gallery() {
  const [photos] = useState([
    { id: 1, src: '/gallary/1.jpg', alt: 'TechFest Event 1' },
    { id: 2, src: '/gallary/2.jpg', alt: 'TechFest Event 2' },
    { id: 3, src: '/gallary/3.jpg', alt: 'TechFest Event 3' },
    { id: 4, src: '/gallary/4.jpg', alt: 'TechFest Event 4' },
    { id: 5, src: '/gallary/5.jpg', alt: 'TechFest Event 5' },
    { id: 6, src: '/gallary/6.jpg', alt: 'TechFest Event 6' },
    { id: 7, src: '/gallary/7.jpg', alt: 'TechFest Event 7' },
    { id: 8, src: '/gallary/8.jpg', alt: 'TechFest Event 8' },
    { id: 9, src: '/gallary/9.jpg', alt: 'TechFest Event 9' },
    { id: 10, src: '/gallary/10.jpg', alt: 'TechFest Event 10' },
    { id: 11, src: '/gallary/11.jpg', alt: 'TechFest Event 11' },
    { id: 12, src: '/gallary/12.jpg', alt: 'TechFest Event 12' },
  ]);
  const [isVisible, setIsVisible] = useState({});
  const photoRefs = useRef([]);
  const [tiltStyle, setTiltStyle] = useState({}); // State to manage dynamic tilt

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    photoRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      photoRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [photos]);
  
  // --- Dynamic Tilt Handlers ---
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Calculate rotation based on mouse position relative to the card center
    const rotateX = (y / height - 0.5) * 26; // Adjust the 26 for tilt intensity
    const rotateY = (x / width - 0.5) * -26; // Adjust the -26 for tilt intensity
    
    setTiltStyle(prev => ({ 
      ...prev,
      [id]: { 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
        boxShadow: `0 20px 40px rgba(0, 255, 255, 0.5)`, // Add a glow effect
        transition: 'transform 0.05s linear, box-shadow 0.05s linear', // Smoother transition
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', // Revert shadow
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out', // Smooth return
      }
    }));
  };
  // --- End Dynamic Tilt Handlers ---

  // --- Image Viewer Handlers ---
  const handleDoubleClick = (photoIndex) => {
    setIsViewerOpen(true);
    setCurrentPhotoIndex(photoIndex);
  };
  
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
  // --- End Image Viewer Handlers ---

  return (
    <div className="relative w-full min-h-screen">
      {/* The background video is now a fixed element */}
      <video
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={gallary}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* A semi-transparent overlay to ensure text readability */}
      <div className="fixed inset-0 bg-black/50 z-0"></div>

      {/* The content is now on a new layer above the video and overlay */}
      <div className="relative z-10 pt-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-4 Graduate text-cyan-400">Photo Gallery</h1>
        

        {/* Masonry-style Image Grid with enhanced 3D effect */}
        <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-4 pb-20 perspective-1000">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={el => photoRefs.current[index] = el}
              data-id={photo.id}
              onDoubleClick={() => handleDoubleClick(index)}
              onMouseMove={(e) => handleMouseMove(e, photo.id)} // Dynamic tilt
              onMouseLeave={() => handleMouseLeave(photo.id)}   // Dynamic tilt reset
              className={`relative overflow-hidden rounded-lg shadow-lg mb-4 cursor-pointer transform-gpu
                ${isVisible[photo.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ 
                ...tiltStyle[photo.id], // Apply dynamic tilt styles
                transitionDelay: `${index * 50}ms`,
                // Default transition for entry animation if no tilt style is active
                transition: tiltStyle[photo.id] ? tiltStyle[photo.id].transition : 'transform 0.7s ease-in-out, opacity 0.7s ease-in-out, box-shadow 0.7s ease-in-out',
                boxShadow: tiltStyle[photo.id] ? tiltStyle[photo.id].boxShadow : '0 10px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover backface-hidden"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Full-Screen Image Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button 
            onClick={handleCloseViewer}
            className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full hover:bg-white/20 transition-all"
          >
            &times;
          </button>
          
          <button 
            onClick={handlePrevious}
            className="absolute left-4 p-4 text-white text-5xl hover:bg-white/20 transition-all rounded-full"
          >
            &#8249;
          </button>
          
          <img 
            src={photos[currentPhotoIndex].src} 
            alt={photos[currentPhotoIndex].alt} 
            // Ensures image fits screen, maintains aspect ratio, and is larger
            className="max-w-[90vw] max-h-[90vh] object-contain" 
          />
          
          <button 
            onClick={handleNext}
            className="absolute right-4 p-4 text-white text-5xl hover:bg-white/20 transition-all rounded-full"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}