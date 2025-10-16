import React from 'react';

export default function NitMap() {
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.478605175001!2d93.77168327523175!3d25.787779977335646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374607c5cdfdde91%3A0xf69a2518890fea22!2sNational%20Institute%20of%20Technology%20Nagaland!5e0!3m2!1sen!2sin!4v1758637874895!5m2!1sen!2sin";

  return (
    <div className="relative w-full py-20">
      <div className="max-w-7xl  flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking mb-8">
          Find Us
        </h2>
        {/* Responsive container for the iframe */}
        <div className="relative w-full h-[350px] md:h-[450px] md:w-3/4  rounded-lg overflow-hidden shadow-xl">
          <iframe
            src={googleMapsEmbedUrl}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}