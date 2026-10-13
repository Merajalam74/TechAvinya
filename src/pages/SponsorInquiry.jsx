import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VantaWavesBackground from '../components/VantaWavesBackground';
import { supabase } from '../lib/supabase';
import { FaBuilding, FaEnvelope, FaPhone, FaGlobe, FaHandshake } from 'react-icons/fa';

const sponsorshipTiers = [
  { id: 'title',    label: 'Title Sponsor',    color: 'from-yellow-600 to-amber-500',   border: 'border-yellow-500',  badge: '👑' },
  { id: 'gold',     label: 'Gold Sponsor',     color: 'from-yellow-500 to-orange-400',  border: 'border-yellow-400',  badge: '🥇' },
  { id: 'silver',   label: 'Silver Sponsor',   color: 'from-gray-400 to-gray-300',      border: 'border-gray-300',    badge: '🥈' },
  { id: 'event',    label: 'Event Partner',    color: 'from-cyan-600 to-blue-500',      border: 'border-cyan-400',    badge: '🎯' },
  { id: 'media',    label: 'Media Partner',    color: 'from-purple-600 to-pink-500',    border: 'border-purple-400',  badge: '📸' },
  { id: 'printing', label: 'Printing Partner', color: 'from-green-600 to-teal-500',     border: 'border-green-400',   badge: '🖨️' },
  { id: 'other',    label: 'Other / Custom',   color: 'from-gray-600 to-gray-500',      border: 'border-gray-400',    badge: '✨' },
];

const inputClass = 'w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/30 Gluten';
const labelClass = 'block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate';
const fieldsetClass = 'border border-cyan-700/50 p-6 rounded-lg space-y-5 shadow-inner shadow-cyan-900/40';
const legendClass = 'px-3 text-lg font-extrabold Graduate text-cyan-300 uppercase';

export default function SponsorInquiry() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTier) { setMessage({ type: 'error', text: 'Please select a sponsorship tier.' }); return; }

    setIsSubmitting(true);
    setMessage(null);

    const fd = new FormData(e.target);

    try {
      const record = {
        company_name:   fd.get('companyName'),
        contact_person: fd.get('contactPerson'),
        email:          fd.get('email'),
        phone:          fd.get('phone'),
        website:        fd.get('website') || null,
        tier:           selectedTier,
        message:        fd.get('message') || null,
        status:         'New',
      };

      const { error: dbErr } = await supabase.from('sponsor_inquiries').insert([record]);
      if (dbErr) throw new Error(dbErr.message);

      setMessage({ type: 'success', text: "🎉 Thank you for your interest! Our team will reach out within 48 hours." });
      e.target.reset();
      setSelectedTier('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `Error: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 text-white flex flex-col items-center">
      <VantaWavesBackground />
      <div className="fixed inset-0 z-0" />

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-cyan-900/30 rounded-full border border-cyan-700/50">
              <FaHandshake className="text-cyan-400 text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-cyan-400 mb-3">
            Become a Sponsor
          </h1>
          <p className="text-gray-400 Gluten text-lg leading-relaxed">
            Partner with <span className="text-cyan-300 font-semibold">Tech Avinya @ NIT Nagaland</span> and empower the next generation of tech innovators.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[['500+', 'Students'], ['14', 'Events'], ['₹2L+', 'Prize Pool']].map(([val, label]) => (
            <div key={label} className="bg-gray-800/40 border border-cyan-800/40 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-cyan-400 Graduate">{val}</p>
              <p className="text-xs text-gray-400 Gluten mt-1">{label}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/60 p-8 md:p-10 rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-700/40 space-y-8"
        >
          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg font-semibold border text-center ${message.type === 'success' ? 'bg-green-600/40 border-green-400 text-green-200' : 'bg-red-600/40 border-red-400 text-red-200'}`}>
              {message.text}
            </div>
          )}

          {/* Sponsorship Tier */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Sponsorship Tier *</legend>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sponsorshipTiers.map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-3 rounded-lg border text-sm font-semibold transition-all duration-200 text-center
                    ${selectedTier === tier.id
                      ? `bg-gradient-to-br ${tier.color} ${tier.border} text-white shadow-lg scale-105`
                      : 'bg-gray-800/60 border-gray-600 text-gray-300 hover:border-cyan-600 hover:text-white'
                    }`}
                >
                  <span className="block text-xl mb-1">{tier.badge}</span>
                  {tier.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Company Details */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Company Details</legend>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}><FaBuilding className="inline mr-2" />Company / Organisation Name *</label>
                <input type="text" name="companyName" required className={inputClass} placeholder="E.g., TechCorp Pvt. Ltd." />
              </div>
              <div>
                <label className={labelClass}>Contact Person *</label>
                <input type="text" name="contactPerson" required className={inputClass} placeholder="E.g., Rahul Mehta" />
              </div>
              <div>
                <label className={labelClass}><FaEnvelope className="inline mr-2" />Business Email *</label>
                <input type="email" name="email" required className={inputClass} placeholder="contact@company.com" />
              </div>
              <div>
                <label className={labelClass}><FaPhone className="inline mr-2" />Phone *</label>
                <input type="tel" name="phone" required className={inputClass} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className={labelClass}><FaGlobe className="inline mr-2" />Website (optional)</label>
                <input type="url" name="website" className={inputClass} placeholder="https://yourcompany.com" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Message / Requirements (optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  className={inputClass + ' resize-none'}
                  placeholder="Tell us about your sponsorship goals, preferred branding opportunities, or any questions..."
                />
              </div>
            </div>
          </fieldset>

          {/* Contact info note */}
          <div className="bg-blue-900/20 border border-blue-700/40 rounded-lg p-4 text-sm text-gray-300 Gluten">
            📧 You can also directly reach us at{' '}
            <a href="mailto:techavi@nitnagaland.ac.in" className="text-cyan-400 hover:underline">
              techavi@nitnagaland.ac.in
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedTier}
            className="w-full py-3 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg transition-all duration-300
                       bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-500 text-white
                       hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50
                       active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/sponsors" className="text-gray-400 hover:text-white Gluten transition-colors">
            ← Back to Sponsors
          </Link>
        </div>
      </div>
    </div>
  );
}
