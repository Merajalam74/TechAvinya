import React from 'react';
import { useParams, Link } from 'react-router-dom';
import comingsoon from '../assets/comingsoon.mp4';
const allEventsData = [
  {
      // NOTE: ID must be a string or converted to match useParams() output
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
    // ... all other events must have string IDs now ("3", "4", etc.)
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
  // Fix 1: eventId from URL is a string, so we must find a string ID in the data.
  const { eventId } = useParams(); 
  const event = allEventsData.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-anton text-red-500">404 - Event Not Found 😥</h1>
        <p className="mt-4"><Link to="/events" className="text-cyan-400 hover:underline">Go back to Events</Link></p>
      </div>
    );
  }

  return (
   <div className="relative w-full min-h-screen  text-white overflow-hidden">
         {/* Background Video and Overlay */}
         <video
           className="fixed inset-0 w-screen h-screen object-cover z-[-1] transform scale-100"
           src={comingsoon}
           autoPlay
           loop
           muted
           playsInline
         />
         
         {/* Overlay to ensure text readability */}
         <div className="fixed inset-0 z-0"></div>
    </div>
    // <div className="min-h-screen pt-32 pb-16 bg-gray-950 text-white">
    //   <div className="max-w-4xl mx-auto px-6">
        
    //     <Link to="/events" className="text-cyan-400 hover:underline mb-8 flex items-center">
    //       &larr; Back to All Events
    //     </Link>
        
    //     <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-4 font-anton">{event.title}</h1>
    //     <p className="text-3xl font-semibold text-teal-400 mb-8">{event.prize}</p>

    //     <img src={event.image} alt={event.title} className="w-full h-auto rounded-xl object-cover mb-8 shadow-2xl" />

    //     {/* Description */}
    //     <section className="mb-8">
    //       <h2 className="text-3xl font-bold mb-3">About the Competition</h2>
    //       <p className="text-lg text-gray-300">{event.description}</p>
    //     </section>

    //     {/* Rules */}
    //     <section className="mb-8">
    //       <h2 className="text-3xl font-bold mb-3">Specific Rules</h2>
    //       <ul className="list-disc list-inside text-lg text-gray-300 ml-4 space-y-2">
    //         {event.rules.map((rule, index) => (
    //           <li key={index}>{rule}</li>
    //         ))}
    //       </ul>
    //     </section>

    //     {/* General Rules */}
    //     <section>
    //       <h2 className="text-3xl font-bold mb-3">General Guidelines</h2>
    //       <p className="text-lg text-gray-300 border-l-4 border-cyan-400 pl-4 bg-gray-800/50 p-3 rounded-lg">
    //         {event.generalRules}
    //       </p>
    //       <div className="flex justify-center mt-8 space-x-4">
    //         <a 
    //           href={event.registerLink} 
    //           className="bg-red-700/60 hover:bg-red-600 transition-colors duration-300 py-3 px-6 text-center rounded-lg text-lg font-semibold uppercase tracking-widest border border-red-500"
    //         >
    //           Register Now
    //         </a>
    //       </div>
    //     </section>
        
    //   </div>
    // </div>
  );
}