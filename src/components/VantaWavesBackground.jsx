import React, { useRef, useEffect } from 'react';

// Access the global VANTA object created by the script tags.
const VantaWavesBackground = ({ options }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    // Check if the VANTA object is available after the scripts have loaded
    if (window.VANTA) {
      // 1. Initialize the Vanta Waves animation on the target div
      vantaEffectRef.current = window.VANTA.WAVES({
        el: vantaRef.current, // Use the ref to target the div
        mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
        // Recommended Colors for a Cyberpunk/Tech Aesthetic
        color: 0x4988, // Cyan wave color
        shininess: 30.00,
        waveHeight: 15.00,
        waveSpeed: 1.00,
        zoom: 1.00,
        // Optional: Custom Background Color (Deep Blue/Black)
        backgroundColor: 0x17191a, 
        ...options // Allows passing specific options from the parent component
      });
    }

    // 2. Cleanup function: Destroys the animation when the component unmounts
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, [options]); // Re-run if options change

  return (
    // This div serves as the full-screen container for the 3D animation
    <div 
      ref={vantaRef} 
      className="fixed inset-0 w-screen h-screen z-0" 
    />
  );
};

export default VantaWavesBackground;