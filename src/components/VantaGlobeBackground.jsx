// src/components/VantaGlobeBackground.jsx

import React, { useRef, useEffect } from 'react';

// Define the name of the global VANTA object
const GLOBAL_VANTA_FUNC_NAME = 'VANTA';

export default function VantaGlobeBackground() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    let intervalId;

    const initializeVantaEffect = () => {
      // 1. Check if the global VANTA object is loaded and the component container is ready
      if (window[GLOBAL_VANTA_FUNC_NAME] && vantaRef.current) {
        
        // Stop the polling interval once loaded
        if (intervalId) {
          clearInterval(intervalId);
        }

        // 2. Initialize the Vanta Globe animation on the target div
        if (!vantaEffectRef.current) {
          vantaEffectRef.current = window.VANTA.GLOBE({
            el: vantaRef.current, // Use the ref to target the div
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3f62ff, // The specified color (a deep purple/blue)
            backgroundColor: 0x0a0a2a, // Deep black-blue background
          });
        }
      }
    };
    
    // Start polling every 100ms
    intervalId = setInterval(initializeVantaEffect, 100);
    initializeVantaEffect(); // Initial check

    // 3. Cleanup function: Destroys the animation and clears the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (vantaEffectRef.current && vantaEffectRef.current.destroy) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []); 

  // Render a dark div as the container for the Vanta animation
  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 w-screen h-screen z-0 bg-black" 
    />
  );
}