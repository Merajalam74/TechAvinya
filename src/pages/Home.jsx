import React from 'react';
import homeVideo from '../assets/aboutvid.webm';
import backvideo from '../assets/events.mp4';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import NitMap from '../components/NitMap';

export default function Home() {
  return (
    <>
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-screen h-screen object-cover z-[-1] transform scale-110"
        src={homeVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay for Darkness without Blur */}
      <div className="fixed inset-0 bg-black/1 backdrop-blur-[3px] z-0"></div>

      <div className="relative w-full h-screen">
        {/* The video is contained within this div and will scroll with it */}
        <video
          className="absolute inset-0 w-screen h-screen object-cover z-[1]"
          src={backvideo}
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
    <AftermovieCard />
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
      <div className="md:w-1/2 p-4  rounded-lg"><Aboutus/></div>
    <div className="md:w-1/2 p-4  rounded-lg"> <NitMap/></div>

    </div>
    
    </>
  );
}