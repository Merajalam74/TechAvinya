import React from 'react';
import schedule from '../assets/schedule.mp4';
export default function Schedule() {
  const scheduleData = [
    { day: "Day 1", date: "31th October 2025", events: [
      { time: "9:30am-11:30am", activity: "Code Raze", location: "Smart Lab" },
      { time: "9:00am-12:00pm", activity: "Digital Art", location: "VCH" },
      { time: "11:00am-2:00pm", activity: "Aerial Adrenaline", location: "Ground" },
      { time: "1:00pm-3:00pm", activity: "Circuit X", location: "Electric Lab" },
      { time: "2:00pm-4:00pm", activity: "Bug Hunt", location: "Smart Lab" },
      { time: "3:00pm-4:00pm", activity: "Animation", location: "BCR 1" },
      { time: "3:00pm-6:00pm", activity: "BGMI", location: "Classroom 1A" },
    ]},
    { day: "Day 2", date: "1st November 2025", events: [
      { time: "9:00am-11:30am", activity: "Free Fire", location: "Classroom 1A" },
      { time: "9:30am-12:00pm", activity: "3D Modelling", location: "Smart Lab" },
      { time: "10:30am-12:00pm", activity: "Clash of Wheels", location: "Ground" },
      { time: "1:00pm-6:00pm", activity: "Hackathon", location: "VCH" },
      { time: "1:30pm-3:30pm", activity: "Tech Crisis", location: "Director Hall" },
      { time: "2:00pm-4:30pm", activity: "MLBB", location: "Classroom 1B" },
      { time: "3:30pm-5:30pm", activity: "Infinity Hunt", location: "Classroom 1A" },
    ]},
  ];

  return (
    <div className="relative w-full min-h-screen  text-white font-mono font-vt323 py-20">
      <video
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={schedule}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0"></div>
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-red-200 uppercase tracking-wide mt-8">
        Tech Avinya 2025 Schedule
      </h1>

      {/* Schedule Days */}
      {scheduleData.map((dayData, index) => (
        <div key={index} className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
            {dayData.day} - {dayData.date}
          </h2>

          {/* Events for the day */}
          <div className="border-t border-b border-gray-700">
            {dayData.events.map((event, eventIndex) => (
              <div 
                key={eventIndex} 
                className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b border-gray-800 last:border-b-0"
              >
                <span className="text-lg md:text-xl w-full md:w-1/4  mb-2 md:mb-0">
                  {event.time}
                </span>
                <span className="text-xl md:text-2xl font-semibold w-full md:w-1/2 mb-2 md:mb-0">
                  {event.activity}
                </span>
                <span className="text-lg md:text-xl w-full md:w-1/4 text-right ">
                  {event.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}