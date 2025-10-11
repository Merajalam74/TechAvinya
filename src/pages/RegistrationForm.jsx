import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import backvideo from '../assets/form.WEBP';
// --- MINIMAL DATA STRUCTURE FOR FORM CONTEXT ---
const allEventsData = [
  { id: "code", title: "Code Raze" },
  { id: "digital", title: "Digital Art" },
  { id: "aerial", title: "Aerial Adrenaline" },
  { id: "circuit", title: "Circuit X" },
  { id: "bug", title: "Bug Hunt" },
  { id: "animation", title: "Animation" },
  { id: "bgmi", title: "BGMI" },
  { id: "mlbb", title: "MLBB" },
  { id: "free", title: "Free Fire" },
  { id: "modelling", title: "3D Modelling" },
  { id: "clash", title: "Clash of Wheels" },
  { id: "hackathon", title: "Hackathon" },
  { id: "tech", title: "Tech Crisis" },
  { id: "infinity", title: "Infinity Hunt" },
];
const API_URL = 'https://tech-avinya-backend.onrender.com' || 'http://localhost:8080';

export default function RegistrationForm() {
  const { eventId } = useParams();
  const event = allEventsData.find(e => e.id === eventId);
  const eventTitle = event ? event.title : 'Selected Event';
  
  // State for form fields (Initialize leader name and team members)
  const [formData, setFormData] = useState({
    leaderName: '',
    email: '',
    phone: '',
    rollNumber: '',
    teamName: '',
    college: '',
    // Note: Image upload and team members are handled separately/dynamically
  });
  const [teamMembers, setTeamMembers] = useState(['', '']); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null); // {type: 'success'/'error', text: '...'}

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formElement = e.target;
    const data = new FormData(formElement);

    // 2. Append custom fields (like event ID, which isn't a form field)
    data.append('eventId', eventId);
    data.append('eventTitle', eventTitle);
    
    // 3. Manually append team members array as JSON string (or individually)
    // We send only non-empty member names
    const cleanMembers = teamMembers.filter(name => name.trim() !== '');
    data.append('teamMembers', JSON.stringify(cleanMembers));
    const API_ENDPOINT = '/api/register';
    try {
      const response = await fetch(API_URL + API_ENDPOINT, { // <--- TARGET API ENDPOINT
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: result.message || 'Registration successful!...' });  
            formElement.reset(); 
            setTeamMembers(['', '']);
            setTimeout(() => {
                navigate('/events'); 
            }, 2000); 
      } else {
        setSubmitMessage({ type: 'error', text: result.message || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitMessage({ type: 'error', text: 'Could not connect to the server. Check your network.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // --- Styling for reusable inputs ---
  const inputClass = "w-full p-3 rounded-lg bg-gray-800/80 Gluten border border-gray-700 text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30";
  const labelClass = "block text-sm font-medium Graduate text-cyan-400 mb-2 tracking-wider uppercase";
  const fieldsetClass = "border border-cyan-700/50 p-6 rounded-lg space-y-6 shadow-inner shadow-cyan-900/40";
  const legendClass = "px-3 text-lg font-extrabold Graduate text-cyan-300 font-anton uppercase";

  return (
    <div className="relative min-h-screen pt-32 pb-16  text-white flex flex-col items-center">
      <img
              className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
                src={backvideo}
                        />                      
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 "></div>
      
      <div className="relative z-10 max-w-3xl w-full mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-cyan-400 mb-2 font-anton text-center">
          Register for {eventTitle}
        </h1>
        <p className="text-lg text-gray-400 mb-8 text-center Gluten">Secure your spot in the competition.</p>

        {/* --- Registration Form Card (Modern Design) --- */}
        <form onSubmit={handleSubmit} className="bg-gray-900/60 p-8 md:p-12 rounded-xl shadow-2xl shadow-cyan-500/30 border border-blue-700/50 space-y-10">
          
          {submitMessage && (
            <div className={`p-4 rounded-lg font-semibold ${submitMessage.type === 'success' ? 'bg-green-600/50 border-green-400' : 'bg-red-600/50 border-red-400'} border text-center`}>
              {submitMessage.text}
            </div>
          )}

          {/* Group 1: Team & College Info */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Team Information</legend>
            
            <div>
              <label htmlFor="teamName" className={labelClass}>Team Name</label>
              <input type="text" id="teamName" name="teamName" required className={inputClass} placeholder="E.g., Cyber Knights" onChange={handleInputChange} />
            </div>

            <div>
              <label htmlFor="college" className={labelClass}>College/University</label>
              <input type="text" id="college" name="college" required className={inputClass} placeholder="E.g., NIT Nagaland" onChange={handleInputChange} />
            </div>
          </fieldset>

          {/* Group 2: Leader's Contact Info */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Leader's Contact Details</legend>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="leaderName" className={labelClass}>Full Name</label>
                  <input type="text" id="leaderName" name="leaderName" required className={inputClass} placeholder="E.g., Alex Johnson" onChange={handleInputChange} />
              </div>

              <div>
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input type="email" id="email" name="email" required className={inputClass} placeholder="E.g., leader@example.com" onChange={handleInputChange} />
              </div>

              <div>
                  <label htmlFor="phone" className={labelClass}>Phone / WhatsApp Number</label>
                  <input type="tel" id="phone" name="phone" required className={inputClass} placeholder="E.g., +91 98765 43210" onChange={handleInputChange} />
              </div>

              <div>
                  <label htmlFor="rollNumber" className={labelClass}>Team Leader Roll Number</label>
                  <input type="text" id="rollNumber" name="rollNumber" required className={inputClass} placeholder="E.g., B20CS1001" onChange={handleInputChange} />
              </div>
            </div>

            {/* Image Upload Input (Kept separate as it requires specialized handling for FormData) */}
            <div>
                <label htmlFor="imageUpload" className={labelClass}>Team Logo (Optional)</label>
                <input 
                  type="file" 
                  id="imageUpload" 
                  name="imageUpload" 
                  accept="image/*"
                  className="w-full p-3 rounded-lg Gluten bg-gray-800/80 border border-gray-700 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-colors"
                />
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
                  className="flex-grow p-3 rounded-lg Gluten bg-gray-800/80 border border-gray-700 focus:border-cyan-500 text-white placeholder-gray-500"
                  placeholder={index === 0 ? "Member 1 Name" : `Member ${index + 1} Name`}
                  required={index === 0}
                />
              </div>
            ))}
            
            {teamMembers.length < 4 && (
                <button 
                  type="button" 
                  onClick={handleAddMember} 
                  className="mt-2 text-cyan-400 Gluten hover:text-cyan-300 transition-colors duration-300 text-sm flex items-center border border-cyan-500/30 p-2 rounded-lg"
                >
                  + Add Another Member
                </button>
            )}
          </fieldset>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 text-lg font-semibold uppercase Graduate tracking-widest rounded-lg transition-all duration-300
                         bg-red-700/70 border border-red-500 text-white hover:bg-red-600 hover:shadow-2xl hover:shadow-red-500/50 active:scale-95 disabled:bg-gray-600 disabled:border-gray-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </form>
        
        {/* Back Button */}
        <div className="mt-8 text-center">
            <Link to={`/events/${eventId}`} className="text-gray-200 Gluten hover:text-white transition-colors duration-300">
                &larr; Cancel and Go Back to Event Details
            </Link>
        </div>
        
      </div>
    </div>
  );
}