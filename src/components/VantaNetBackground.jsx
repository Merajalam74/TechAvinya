import React, { useRef, useEffect } from 'react';

// IMPORTANT: Vanta.js is designed to attach to the window object.
// We access the global VANTA object created by the script tags.
const VantaNetBackground = ({ options }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    // Check if the VANTA object is available on the window
    if (window.VANTA) {
      // 1. Initialize the Vanta Net animation on the target div
      vantaEffectRef.current = window.VANTA.NET({
        el: vantaRef.current, // Use the ref to target the div
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        // Optional: Custom Colors
        color: 0x00FFFF, // Cyan nodes
        backgroundColor: 0x0a0a2a, // Deep blue/black background
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
    // This div will serve as the container for the 3D animation
    <div 
      ref={vantaRef} 
      className="fixed inset-0 w-screen h-screen z-0" 
    />
  );
};

export default VantaNetBackground;