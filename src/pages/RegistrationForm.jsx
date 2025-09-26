import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import about from '../assets/about.mp4';
// --- MINIMAL DATA STRUCTURE FOR FORM CONTEXT ---
const allEventsData = [
  { id: "1", title: "Code Raze" },
  { id: "2", title: "Digital Art" },
  { id: "3", title: "Aerial Adrenaline" },
  { id: "4", title: "Circuit X" },
  { id: "5", title: "Bug Hunt" },
  { id: "6", title: "Animation" },
  { id: "7", title: "BGMI" },
  { id: "8", title: "MLBB" },
  { id: "9", title: "Free Fire" },
  { id: "10", title: "3D Modelling" },
  { id: "11", title: "Clash of Wheels" },
  { id: "12", title: "Hackathon" },
  { id: "13", title: "Tech Crisis" },
  { id: "14", title: "Infinity Hunt" },
];

export default function RegistrationForm() {
  const { eventId } = useParams();
  
  const event = allEventsData.find(e => e.id === eventId);
  const eventTitle = event ? event.title : 'Selected Event';
  const [teamMembers, setTeamMembers] = useState(['', '']); 

  const handleAddMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, '']);
    }
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...teamMembers];
    newMembers[index] = value;
    setTeamMembers(newMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration submitted for ${eventTitle}! (Prototype only)`);
    // Add real form submission logic here
  };
  
  // --- Styling for reusable inputs ---
  const inputClass = "w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30";
  const labelClass = "block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase";
  const fieldsetClass = "border border-cyan-700/50 p-6 Graduate rounded-lg space-y-6 shadow-inner shadow-cyan-900/40";
  const legendClass = "px-3 text-lg font-extrabold text-cyan-300 font-anton uppercase";

  return (
    <div className="relative min-h-screen pt-32 pb-16  text-white flex flex-col items-center">
      
      <video
              className="fixed inset-0 w-screen h-screen object-cover z-[-1] transform scale-135"
              src={about}
              autoPlay
              loop
              muted
              playsInline
            />
            
            {/* Overlay to ensure text readability */}
            <div className="fixed inset-0 z-0 "></div>
      
      <div className="relative z-10 max-w-3xl w-full mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-cyan-400 mb-2 font-anton text-center">
          Register for {eventTitle}
        </h1>
        <p className="text-lg text-gray-400 mb-8 Gluten text-center">Secure your spot in the competition.</p>

        {/* --- Registration Form Card (Modern Design) --- */}
        <form onSubmit={handleSubmit} className="bg-gray-800/40 p-8 md:p-12 rounded-xl shadow-2xl shadow-cyan-500/30 border border-blue-700/50 space-y-10">
          
          {/* Group 1: Team & College Info */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Team Information</legend>
            
            {/* Team Name Input */}
            <div>
              <label htmlFor="teamName" className={labelClass}>Team Name</label>
              <input type="text" id="teamName" required className={inputClass} placeholder="E.g., Cyber Knights" />
            </div>

            {/* College Input */}
            <div>
              <label htmlFor="college" className={labelClass}>College/University</label>
              <input type="text" id="college" required className={inputClass} placeholder="E.g., NIT Nagaland" />
            </div>

            {/* Roll Number Input */}
            <div>
              <label htmlFor="rollNumber" className={labelClass}>Team Leader Roll Number</label>
              <input type="text" id="rollNumber" required className={inputClass} placeholder="E.g., B20CS1001" />
            </div>
          </fieldset>

          {/* Group 2: Leader's Contact Info */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Leader's Contact Details</legend>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* Leader Name Input */}
                <div>
                    <label htmlFor="leaderName" className={labelClass}>Full Name</label>
                    <input type="text" id="leaderName" required className={inputClass} placeholder="E.g., Alex Johnson" />
                </div>
                
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input type="email" id="email" required className={inputClass} placeholder="E.g., leader@example.com" />
                </div>

                {/* Phone Input */}
                <div>
                    <label htmlFor="phone" className={labelClass}>Phone / WhatsApp Number</label>
                    <input type="tel" id="phone" required className={inputClass} placeholder="E.g., +91 98765 43210" />
                </div>

                {/* Image Upload Input */}
                <div>
                    <label htmlFor="imageUpload" className={labelClass}>Team Logo (Optional)</label>
                    <input 
                      type="file" 
                      id="imageUpload" 
                      accept="image/*"
                      className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-colors"
                    />
                </div>
            </div>
          </fieldset>


          {/* Group 3: Team Members */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Team Members ({teamMembers.length} of 4)</legend>
            
            {teamMembers.map((member, index) => (
              <div key={index} className="flex space-x-3 items-center">
                <input 
                  type="text" 
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="flex-grow p-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-cyan-500 text-white placeholder-gray-500"
                  placeholder={index === 0 ? "Member 1 Name" : `Member ${index + 1} Name`}
                  required={index === 0}
                />
              </div>
            ))}
            
            {teamMembers.length < 4 && (
                <button 
                  type="button" 
                  onClick={handleAddMember} 
                  className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm flex items-center border border-cyan-500/30 p-2 rounded-lg"
                >
                  + Add Another Member
                </button>
            )}
          </fieldset>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="p-4 py-3 text-lg font-semibold Graduate uppercase tracking-widest rounded-lg transition-all duration-300
                         bg-red-700/70 border border-red-500 text-white hover:bg-red-600 hover:shadow-2xl hover:shadow-red-500/50 active:scale-95"
            >
              Submit Registration
            </button>
          </div>
        </form>
        
        {/* Back Button */}
        <div className="mt-8 text-center">
            <Link to={`/events/${eventId}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                &larr; Cancel and Go Back to Event Details
            </Link>
        </div>
        
      </div>
    </div>
  );
}