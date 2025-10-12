import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// --- Countdown logic ---
const calculateTimeLeft = (targetDate) => {
  const diff = targetDate.getTime() - new Date().getTime();
  const dir = diff < 0 ? -1 : 1;
  const absDiff = Math.abs(diff);
  if (absDiff <= 0 && diff !== 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, direction: 0 };
  const seconds = Math.floor((absDiff / 1000) % 60) * dir;
  const minutes = Math.floor((absDiff / (1000 * 60)) % 60) * dir;
  const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24) * dir;
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24)) * dir;
  return { days, hours, minutes, seconds, direction: dir };
};

// --- Countdown Card ---
const CounterCard = ({ value, label, colors }) => {
  const displayValue = Math.abs(value).toString().padStart(2, "0");
  return (
    <div
      className="p-6 rounded-3xl border-2 shadow-md flex flex-col items-center justify-center"
      style={{
        borderImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}) 1`,
        background: "rgba(0,0,0,0.85)",
      }}
    >
      <p className="text-6xl font-extrabold text-white">{displayValue}</p>
      <p className="text-lg tracking-widest uppercase text-white font-semibold mt-2">{label}</p>
    </div>
  );
};

// --- Main Component ---
const TARGET_DATE = new Date("2025-10-31T00:00:00");

export default function ScheduleClean() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(TARGET_DATE));
  const [mounted, setMounted] = useState(false);

  const updateTime = useCallback(() => setTimeLeft(calculateTimeLeft(TARGET_DATE)), []);

  const scheduleData = [
    {
      day: "Day 1",
      date: "31st October 2025",
      events: [
        { time: "9:30am-11:30am", activity: "Code Raze", location: "Smart Lab" },
        { time: "9:00am-12:00pm", activity: "Digital Art", location: "VCH" },
        { time: "11:00am-2:00pm", activity: "Aerial Adrenaline", location: "Ground" },
        { time: "1:00pm-3:00pm", activity: "Circuit X", location: "Electric Lab" },
        { time: "2:00pm-4:00pm", activity: "Bug Hunt", location: "Smart Lab" },
        { time: "3:00pm-4:00pm", activity: "Animation", location: "BCR 1" },
        { time: "3:00pm-6:00pm", activity: "BGMI", location: "Classroom 1A" },
      ],
    },
    {
      day: "Day 2",
      date: "1st November 2025",
      events: [
        { time: "9:00am-11:30am", activity: "Free Fire", location: "Classroom 1A" },
        { time: "9:30am-12:00pm", activity: "3D Modelling", location: "Smart Lab" },
        { time: "10:30am-12:00pm", activity: "Clash of Wheels", location: "Ground" },
        { time: "1:00pm-6:00pm", activity: "Hackathon", location: "VCH" },
        { time: "1:30pm-3:30pm", activity: "Tech Crisis", location: "Director Hall" },
        { time: "2:00pm-4:30pm", activity: "MLBB", location: "Classroom 1B" },
        { time: "3:30pm-5:30pm", activity: "Infinity Hunt", location: "Classroom 1A" },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 10);
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  if (!mounted) return <p className="text-white text-xl font-mono animate-pulse">Initializing...</p>;

  const counterData = [
    { label: "Days", value: timeLeft.days, colors: ["#00ffff", "#ff00ff"] },
    { label: "Hours", value: timeLeft.hours, colors: ["#ff0080", "#8000ff"] },
    { label: "Minutes", value: timeLeft.minutes, colors: ["#00ff99", "#00ccff"] },
    { label: "Seconds", value: timeLeft.seconds, colors: ["#ffcc00", "#ff0066"] },
  ];

  // Random stars
  const stars = [...Array(150)].map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden pt-20 pb-20 text-white">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{ width: s.size, height: s.size, top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ x: ["0px", `${Math.random() * 50 - 25}px`, "0px"], y: ["0px", `${Math.random() * 50 - 25}px`, "0px"] }}
          transition={{ repeat: Infinity, duration: s.duration, repeatType: "mirror" }}
        />
      ))}

      <h1 className="text-6xl font-extrabold text-center mb-12 text-white">
        Tech Avinya'25 Begins In
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
        {counterData.map((c) => (
          <CounterCard key={c.label} label={c.label} value={c.value} colors={c.colors} />
        ))}
      </div>

      {scheduleData.map((dayData, idx) => (
        <div key={idx} className="max-w-5xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 uppercase text-center text-white">
            {dayData.day} - {dayData.date}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dayData.events.map((event, ei) => (
              <div
                key={ei}
                className="p-6 rounded-3xl border-2 shadow-md transform transition duration-300 hover:scale-105"
                style={{
                  borderImage: "linear-gradient(45deg,#ff00ff,#00ffff) 1",
                  background: "rgba(0,0,0,0.85)",
                }}
              >
                <p className="text-lg text-blue-400 mb-2">{event.time}</p>
                <p className="text-2xl font-bold text-pink-400 mb-2">{event.activity}</p>
                <p className="text-md text-lime-400">{event.location}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
