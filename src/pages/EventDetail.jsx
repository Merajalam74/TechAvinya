import React from 'react';
import { useParams, Link } from 'react-router-dom';
import eventdetail from '../assets/eventdetail.mp4'; 

// IMPORTANT: Ensure all 'id' values in your event data are strings!
const allEventsData = [
  {
      id: "1", 
      title: "Code Raze",
      prize: "₹ 20,000/-",
      image: "/event/coding.jpg", 
      registerLink: "#", 
      description: "The ultimate coding challenge, Code Raze tests your problem-solving skills and technical ingenuity over a marathon session. Compete for massive prizes and recognition from industry leaders.",
      rules: ["Teams of 2-4 members.", "Code must be original.", "Judging criteria focuses on innovation and functionality.", "Submissions must be made on Devpost."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "2",
      title: "Digital Art",
      prize: "₹ 20,000/-",
      image: "/event/art.jpg",
      registerLink: "#", 
      description: "Unleash your creativity and skill in digital design. This competition challenges artists to transform ideas into stunning visual realities using modern digital tools.",
      rules: ["Submissions must be high-resolution.", "Originality is judged heavily.", "Theme announced one week prior."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "3",
      title: "Aerial Adrenaline",
      prize: "₹ 20,000",
      image: "/event/drone.jpg",
      registerLink: "#", 
      description: "A high-speed drone racing challenge that pushes the limits of piloting skills and custom drone engineering. Navigate complex courses against the clock.",
      rules: ["Drones must meet specified weight limits.", "Pilot must pass safety inspection.", "No FPV goggles allowed (line-of-sight only).", "All teams must complete a minimum of 3 laps."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "4",
      title: "Circuit X",
      prize: "₹ 20,000/-",
      image: "/event/circuit.jpg",
      registerLink: "#", 
      description: "Design and build the most efficient and innovative electronic circuits. Test your knowledge of components and troubleshooting in a competitive environment.",
      rules: ["Must use provided component kit.", "Final circuit must be tested by judges.", "Design simplicity is a factor in judging.", "Maximum time limit of 4 hours."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "5",
      title: "Bug Hunt",
      prize: "₹ 20,000/-",
      image: "/event/bughunt.jpg",
      registerLink: "#", 
      description: "A cybersecurity challenge where participants race to find and exploit vulnerabilities in a mock web application. Speed and exploit novelty determine the winner.",
      rules: ["No denial-of-service attacks allowed.", "All findings must be reported in detail.", "Scoring based on severity of bug found.", "Teams must sign an NDA."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "6",
      title: "Animation",
      prize: "₹ 20,000/-",
      image: "/event/animation.webp", 
      registerLink: "#", 
      description: "Create a short animated film on a given theme. This event judges creativity, storytelling, and technical proficiency in animation software.",
      rules: ["Film must be under 3 minutes.", "Must use original artwork.", "Software choice is free.", "All submissions are final."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "7",
      title: "BGMI",
      prize: "₹ 20,000/-",
      image: "/event/bgmi.jpg",
      registerLink: "#", 
      description: "Battlegrounds Mobile India tournament. Standard competitive gaming rules apply. Compete for ultimate supremacy and cash prizes.",
      rules: ["Standard BGMI competitive rules.", "Cheating is grounds for instant ban.", "Teams must have a designated leader.", "All matches are best of 3."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "8",
      title: "MLBB",
      prize: "₹ 20,000",
      image: "/event/mlbb.jpg",
      registerLink: "#", 
      description: "Mobile Legends: Bang Bang competition. Team strategy and execution will be tested in a series of intense arena battles.",
      rules: ["Standard MLBB competitive rules.", "Drafting phase is mandatory.", "No player substitutions after the first match.", "Minimum rank requirement applies."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "9",
      title: "Free Fire",
      prize: "₹ 20,000/-",
      image: "/event/freefire.jpg",
      registerLink: "#", 
      description: "Garena Free Fire tournament. Survival skills, quick reflexes, and teamwork are essential to secure the top spot.",
      rules: ["Standard Free Fire competitive rules.", "All decisions by the admin are final.", "Must use personal accounts.", "VPN usage is prohibited."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "10",
      title: "3D Modelling",
      prize: "₹ 20,000/-",
      image: "/event/3dmodelling.jpg",
      registerLink: "#", 
      description: "A design challenge focused on 3D digital art and modeling. Participants create models based on a specific theme.",
      rules: ["Final submission must be in a standard 3D file format.", "Theme is announced on Day 1.", "Software choice is free.", "Models must be textured."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "11",
      title: "Clash of Wheels",
      prize: "₹ 20,000/-",
      image: "/event/clashofwheels.jpg", 
      registerLink: "#", 
      description: "The ultimate robotics event: build and battle remote-controlled combat vehicles. Strategy and durable design are key to victory.",
      rules: ["Bot dimensions must not exceed X size.", "Bots must be powered by battery only.", "Structural modifications are allowed during the tournament.", "Safety gear must be worn."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "12",
      title: "Hackathon",
      prize: "₹ 20,000/-",
      image: "/event/hackathon.jpg",
      registerLink: "#", 
      description: "A general-purpose hackathon focused on solving community and regional problems using technology. Teams develop a prototype solution.",
      rules: ["Project must be original.", "Final presentation is mandatory.", "Team sizes are limited to 4 members.", "Project code must be open source."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "13",
      title: "Tech Crisis",
      prize: "₹ 20,000",
      image: "/event/techcrisis.jpg",
      registerLink: "#", 
      description: "A crisis management simulation where teams use technology and quick thinking to resolve simulated emergencies.",
      rules: ["Teams must use the provided communication channels.", "All solutions must be documented.", "No external internet research is allowed after the start.", "Judging based on efficiency and teamwork."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "14",
      title: "Infinity Hunt",
      prize: "₹ 20,000/-",
      image: "/event/infinityhunt.avif",
      registerLink: "#", 
      description: "An innovative treasure hunt that combines physical clues with online puzzles. Requires both technical skills and physical endurance.",
      rules: ["All clues must be solved sequentially.", "Teams must use the designated tracking app.", "No splitting teams allowed.", "Time penalties apply for incorrect answers."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
];

export default function EventDetail() {
  const { eventId } = useParams(); 
  const event = allEventsData.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-500 font-anton animate-pulse">404 - Event Not Found 😥</h1>
        <p className="mt-4 text-xl"><Link to="/events" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors duration-300">Go back to Events</Link></p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-16 text-white overflow-hidden">
      {/* Background Video (Fixed and Scaled) */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-[-2] transform scale-100"
        src={eventdetail} // Using your provided video
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Dynamic Overlay for readability and depth */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#1a1a3a]/50 to-[#0a0a2a]/50"></div>
      
      {/* Main Content Container - Elevated above background */}
      <div className="relative z-10 max-w-4xl mx-auto px-6   rounded-lg p-8  border border-cyan-700/30">
        
        <Link 
          to="/events" 
          className="text-cyan-400 Gluten hover:text-cyan-200 hover:underline mb-8 flex items-center transition-colors duration-300 text-lg font-mono"
        >
          <svg className="w-5 h-5 mr-2 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to All Events
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-extrabold Graduate mb-4 font-['Press_Start_2P'] 
                       text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                       text-shadow-neon-cyan">
          {event.title}
        </h1>
        <p className="text-3xl font-semibold Graduate text-teal-400 mb-8 font-mono text-shadow-sm-teal">
          {event.prize}
        </p>

        {/* Image Display Area (Constrained and Centered) */}
        <div className="mx-auto w-full md:w-3/4 lg:w-1/2 mb-8">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-auto rounded-xl object-cover shadow-2xl shadow-blue-500/20 border border-blue-700/50" 
            />
        </div>

        {/* Description */}
        <section className="mb-8 p-4  rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">About the Competition</h2>
          <p className="text-lg text-gray-200 font-light leading-relaxed Gluten">{event.description}</p>
        </section>

        {/* Rules */}
        <section className="mb-8 p-4 rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">Specific Rules</h2>
          <ul className="list-disc list-inside text-lg text-gray-200 ml-4 space-y-2">
            {event.rules.map((rule, index) => (
              <li key={index} className="flex items-start before:content-['\2022'] before:text-cyan-400 before:mr-2 Gluten">{rule}</li>
            ))}
          </ul>
        </section>

        {/* General Rules */}
        <section className="p-4  rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">General Guidelines</h2>
          <p className="text-lg text-gray-200 border-l-4 Gluten border-cyan-500 pl-4  p-3 rounded-lg font-light leading-relaxed">
            {event.generalRules}
          </p>
          <div className="flex justify-center mt-8">
            <Link 
              to={`/register/${event.id}`}
              className="relative group py-3 px-8 Graduate text-lg font-semibold uppercase tracking-widest rounded-lg overflow-hidden
                         bg-gradient-to-br from-red-800/60 to-pink-800/60 border border-red-600 text-red-300 backdrop-blur-sm
                         transition-all duration-500 ease-in-out
                         hover:from-red-600/70 hover:to-pink-600/70 hover:text-white hover:border-red-400
                         hover:shadow-lg hover:shadow-red-500/40
                         active:scale-95 active:shadow-sm"
            >
              Register Now
            </Link>
          </div>
        </section>
        
      </div>
    </div>
  );
}