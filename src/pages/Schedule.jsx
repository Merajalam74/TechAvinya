import React, { useState, useEffect, useCallback } from 'react'; // <-- Imported useCallback
import schedule from '../assets/schedule.webm';

// --- Utility Function: Calculates time difference ---
const calculateTimeLeft = (targetDate) => {
    const difference = targetDate.getTime() - new Date().getTime();
    const direction = difference < 0 ? -1 : 1;
    const absDifference = Math.abs(difference);

    if (absDifference <= 0 && difference !== 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, direction: 0 };
    }

    const seconds = Math.floor((absDifference / 1000) % 60) * direction;
    const minutes = Math.floor((absDifference / (1000 * 60)) % 60) * direction;
    const hours = Math.floor((absDifference / (1000 * 60 * 60)) % 24) * direction;
    const days = Math.floor(absDifference / (1000 * 60 * 60 * 24)) * direction;

    return { days, hours, minutes, seconds, direction };
};

// --- Countdown Display Component ---
const CounterCard = ({ value, label }) => {
    // Determine color based on value sign
    const isNegative = value < 0;
    const textColor = isNegative ? 'text-red-400' : 'text-lime-400';
    const borderColor = isNegative ? 'border-red-600/50' : 'border-lime-600/50';

    const displayValue = Math.abs(value).toString().padStart(2, '0');

    return (
        <div className={`p-4 md:p-6 rounded-xl border-2 ${borderColor} bg-gray-900/50 shadow-2xl shadow-lime-500/10 transition-all duration-300 ease-in-out`}>
            <p className={`text-4xl md:text-5xl font-extrabold ${textColor} font-mono mb-2 leading-none tracking-tight transition-transform duration-500 ease-out font-vt323`}
                style={{ textShadow: `0 0 10px ${isNegative ? '#f87171' : '#a3e635'}` }}
            >
                {/* Format value to always show sign if non-zero */}
                {value < 0 && "-"}
                {displayValue}
            </p>
            <p className="text-0.8xl md:text-xl text-gray-100 tracking-widest font-extrabold font-sans uppercase font-vt323">
                {label}
            </p>
        </div>
    );
};

// --- Main Countdown Component ---
const TARGET_DATE = new Date('2025-10-31T00:00:00'); // <-- Target date for the countdown

export default function Schedule() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(TARGET_DATE));
    const [isMounted, setIsMounted] = useState(false);
    
    // --- FIX: Define updateTime using useCallback ---
    const updateTime = useCallback(() => {
        setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, []);

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
    
    // --- FIX: useEffect Dependency Array includes updateTime ---
    useEffect(() => {
        const initialDelay = setTimeout(() => setIsMounted(true), 10);
        
        // Start the interval only after mounting
        const timer = setInterval(updateTime, 1000);
        
        return () => {
            clearTimeout(initialDelay);
            clearInterval(timer);
        };
    }, [updateTime]); // <-- updateTime is now a stable dependency

    // Render nothing or a placeholder until mounted
    if (!isMounted) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-lime-400 text-xl font-mono">Initializing countdown...</p>
            </div>
        );
    }
    
    // Extract values for rendering
    const counterData = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds },
    ];

    return (
        <div className="relative w-full min-h-screen pt-20 pb-20 text-white font-vt323">
            <video
                className="fixed inset-0 w-screen h-screen object-cover z-[-1] transform scale-108"
                src={schedule}
                autoPlay
                loop
                muted
                playsInline
            />
            
            {/* Overlay to ensure text readability */}
            <div className="fixed inset-0 z-0 "></div> {/* Added background color for readability */}
            
            <div className="relative z-10 flex flex-col mt-8 items-center">
                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold uppercase 
                        text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 
                        text-shadow-neon-cyan title-rocking mb-8">
                    Tech Avinya'25 BEGINS IN
                </h1>
                
                {/* Countdown Grid (Responsive) */}
                <div className="grid grid-cols-4 gap-3 md:grid-cols-4 md:gap-3 max-w-lg ">
                    {counterData.map(({ label, value }) => (
                        <CounterCard key={label} label={label} value={value} />
                    ))}
                </div>

                {/* Note about negative time if event is past */}
                {timeLeft.direction === -1 && (
                    <p className="mt-8 text-lg text-red-500 font-mono text-center">
                        (Note: Time shown is in the past. Tech Avinya'25 has already begun.)
                    </p>
                )}
            </div>

            {/* Schedule Days */}
      {scheduleData.map((dayData, index) => (
        <div key={index} className="max-w-4xl mt-12 mx-auto mb-16 px-4 ">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
            {dayData.day} - {dayData.date}
          </h2>

          {/* Events for the day */}
          <div className="border-t border-b p-8 border-gray-700 bg-gradient-to-br from-[#1a1a3a]/35 to-[#0a0a2a]/35">
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