import React from 'react';
import backvideo from '../assets/events.mp4';

export default function Events() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={backvideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for Darkness and Blur */}
      <div className="fixed inset-0 bg-black/2 z-0"></div>
    </div>
  );
}