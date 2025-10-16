// src/components/VantaGlobeBackground.jsx


import React, { useRef, useEffect } from 'react';
const GLOBAL_VANTA_FUNC_NAME = 'VANTA';


export default function VantaGlobeBackground() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    let intervalId;
    const initializeVantaEffect = () => {
      if (window[GLOBAL_VANTA_FUNC_NAME] && vantaRef.current) {
        if (intervalId) clearInterval(intervalId);
        if (!vantaEffectRef.current) {
          vantaEffectRef.current = window.VANTA.GLOBE({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            minHeight: 0,
            minWidth: 0,
            scale: window.innerWidth < 640 ? 1.2 : 1.0,
            scaleMobile: 1.3,
            color: 0x00ffd0,
            color2: 0xff00c8,
            backgroundColor: 0x07072a,
            size: window.innerWidth < 640 ? 1.5 : 1.2,
            points: window.innerWidth < 640 ? 12.0 : 18.0,
            maxDistance: window.innerWidth < 640 ? 18.0 : 25.0,
            spacing: window.innerWidth < 640 ? 18.0 : 20.0,
            showDots: true,
            showLines: true,
            brightness: 1.1,
            zoom: window.innerWidth < 640 ? 1.1 : 1.0,
            backgroundAlpha: 0.9,
            globeAlpha: 0.8,
            speed: 2.0,
          });
        }
      }
    };
    intervalId = setInterval(initializeVantaEffect, 100);
    initializeVantaEffect();
    const handleResize = () => {
      if (vantaEffectRef.current && vantaEffectRef.current.setOptions) {
        vantaEffectRef.current.setOptions({
          scale: window.innerWidth < 640 ? 1.2 : 1.0,
          scaleMobile: 1.3,
          size: window.innerWidth < 640 ? 1.5 : 1.2,
          points: window.innerWidth < 640 ? 12.0 : 18.0,
          maxDistance: window.innerWidth < 640 ? 18.0 : 25.0,
          spacing: window.innerWidth < 640 ? 18.0 : 20.0,
          zoom: window.innerWidth < 640 ? 1.1 : 1.0,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (vantaEffectRef.current && vantaEffectRef.current.destroy) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-screen h-screen z-0 bg-gradient-to-br from-[#07072a] via-[#1a1a40] to-[#00ffd0]"
      style={{
        transition: 'background 0.5s',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'none',
      }}
    />
  );
}