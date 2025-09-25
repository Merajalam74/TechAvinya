import React from 'react';
import aftermovieFrame from '../assets/videocard.png';

export default function AftermovieCard() {
  const youtubeId = "T0Hf_Q9SAG8"; // The video ID you're using

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}?` +
                          `autoplay=0` +
                          `&controls=1` +
                          `&loop=1` +
                          `&playlist=${youtubeId}` +
                          `&rel=0` +
                          `&showinfo=0` +
                          `&modestbranding=1` +
                          `&iv_load_policy=3` +
                          `&color=white`;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 Graduate text-cyan-400 neon-text">
        Aftermovie
      </h2>
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 rounded-2xl   glow-effect">
        {/* Responsive video container with more padding */}
        <div className="relative w-full overflow-hidden " style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-4 left-0 w-full h-11/12"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay;  gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* The Frame Image Overlay - now with pointer-events-none */}
        <img
          src={aftermovieFrame}
          alt="Aftermovie Frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        
      </div>
      
    </div>
  );
}