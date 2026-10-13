import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import VantaGlobeBackground from '../components/VantaGlobeBackground';
import { supabase } from '../lib/supabase';

const allEventsData = [
  { id: 'code',      title: 'Code Raze',        feeNIT: '₹99',  feeOutside: '₹250',  team: false },
  { id: 'digital',   title: 'Digital Art',       feeNIT: '₹99',  feeOutside: '₹250',  team: false },
  { id: 'aerial',    title: 'Aerial Adrenaline', feeNIT: '₹0',   feeOutside: '₹500',  team: true  },
  { id: 'clash',     title: 'Clash of Wheels',   feeNIT: '₹199', feeOutside: '₹400',  team: true  },
  { id: 'bug',       title: 'Bug Hunt',          feeNIT: '₹99',  feeOutside: '₹250',  team: false },
  { id: 'hackathon', title: 'Hackathon',         feeNIT: '₹200', feeOutside: '₹600',  team: true  },
  { id: 'animation', title: 'Animation',         feeNIT: '₹99',  feeOutside: '₹300',  team: true  },
  { id: 'bgmi',      title: 'BGMI',              feeNIT: '₹500', feeOutside: '₹1000', team: true  },
  { id: 'mlbb',      title: 'MLBB',              feeNIT: '₹500', feeOutside: '₹1000', team: true  },
  { id: 'free',      title: 'Free Fire',         feeNIT: '₹500', feeOutside: '₹600',  team: true  },
  { id: 'modelling', title: '3D Modelling',      feeNIT: '₹99',  feeOutside: '₹300',  team: false },
  { id: 'tech',      title: 'Tech Crisis',       feeNIT: '₹99',  feeOutside: '₹300',  team: true  },
  { id: 'infinity',  title: 'Infinity Hunt',     feeNIT: '₹99',  feeOutside: '₹300',  team: false },
  { id: 'stock',     title: 'Stock Rise',        feeNIT: '₹99',  feeOutside: '₹199',  team: false },
];

const inputClass  = 'w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/30 Gluten';
const labelClass  = 'block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate';
const fieldsetClass = 'border border-cyan-700/50 p-6 rounded-lg space-y-5 shadow-inner shadow-cyan-900/40';
const legendClass = 'px-3 text-lg font-extrabold Graduate text-cyan-300 uppercase';

export default function Enroll() {
  const { eventId } = useParams();
  const navigate    = useNavigate();

  const [selectedEvent,  setSelectedEvent]  = useState(eventId ? allEventsData.find(e => e.id === eventId) : null);
  const [college,        setCollege]        = useState('Other College/University');
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [message,        setMessage]        = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);

  const handleEventSelect = (e) =>
    setSelectedEvent(allEventsData.find(ev => ev.id === e.target.value) || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) { setMessage({ type: 'error', text: 'Please select an event.' }); return; }

    setIsSubmitting(true);
    setMessage(null);

    const fd = new FormData(e.target);

    try {
      // ── 1. Upload screenshot (optional) ──────────────────────────────
      let imageUrl = null;
      if (screenshotFile && screenshotFile.size > 0) {
        const ext  = screenshotFile.name.split('.').pop();
        const path = `enrollments/${Date.now()}_${selectedEvent.id}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from('registrations')
          .upload(path, screenshotFile, { cacheControl: '3600', upsert: false });

        if (uploadErr) {
          // Non-fatal: warn but continue
          console.warn('Screenshot upload failed:', uploadErr.message);
        } else {
          const { data: urlData } = supabase.storage.from('registrations').getPublicUrl(path);
          imageUrl = urlData.publicUrl;
        }
      }

      // ── 2. Build record ───────────────────────────────────────────────
      const record = {
        event_id:    selectedEvent.id,
        event_title: selectedEvent.title,
        full_name:   fd.get('fullName'),
        email:       fd.get('email'),
        phone:       fd.get('phone'),
        college,
        roll_number: fd.get('rollNumber') || null,
        team_name:   fd.get('teamName')   || null,
        note:        fd.get('note')       || null,
        image_url:   imageUrl,
        status:      'Pending',
      };

      console.log('[Enroll] Inserting:', record);

      // ── 3. Insert into Supabase ───────────────────────────────────────
      const { error: dbErr } = await supabase.from('enrollments').insert([record]);

      if (dbErr) {
        console.error('[Enroll] DB error:', dbErr);
        throw new Error(dbErr.message);
      }

      setMessage({ type: 'success', text: '🎉 Enrollment submitted successfully! We will contact you soon.' });
      e.target.reset();
      setScreenshotFile(null);
      setCollege('Other College/University');
      if (!eventId) setSelectedEvent(null);

      setTimeout(() => navigate('/events'), 5000);

    } catch (err) {
      console.error('[Enroll] Error:', err);
      setMessage({ type: 'error', text: `Submission failed: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 text-white flex flex-col items-center">
      <VantaGlobeBackground />
      <div className="fixed inset-0 z-0" />

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-cyan-400 mb-3">
            Event Enrollment
          </h1>
          <p className="text-gray-400 Gluten text-lg">
            Fill in your details to enroll for a Tech Avinya event.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/60 p-8 md:p-10 rounded-xl shadow-2xl shadow-cyan-500/20 border border-blue-700/50 space-y-8"
        >
          {/* Message banner */}
          {message && (
            <div className={`p-4 rounded-lg font-semibold border text-center ${
              message.type === 'success'
                ? 'bg-green-600/40 border-green-400 text-green-200'
                : 'bg-red-600/40 border-red-400 text-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* ── Event Selection ── */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Select Event</legend>
            <div>
              <label className={labelClass}>Event *</label>
              <select
                required
                defaultValue={eventId || ''}
                onChange={handleEventSelect}
                className={inputClass + ' cursor-pointer'}
              >
                <option value="" disabled>-- Choose an event --</option>
                {allEventsData.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
            </div>

            {selectedEvent && (
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-cyan-900/40 border border-cyan-700 text-cyan-300">
                  {selectedEvent.team ? '👥 Team Event' : '🧑 Individual Event'}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-lime-900/40 border border-lime-700 text-lime-300">
                  NITN: {selectedEvent.feeNIT} &nbsp;|&nbsp; Others: {selectedEvent.feeOutside}
                </span>
              </div>
            )}
          </fieldset>

          {/* ── Personal Details ── */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Your Details</legend>
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" name="fullName" required className={inputClass} placeholder="E.g., Anuj Sharma" />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" required className={inputClass} placeholder="you@example.com" />
              </div>

              <div>
                <label className={labelClass}>Phone / WhatsApp *</label>
                <input type="tel" name="phone" required className={inputClass} placeholder="+91 98765 43210" />
              </div>

              {/* Affiliation */}
              <div>
                <label className={labelClass}>Affiliation *</label>
                <div className="flex gap-6 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio" name="affiliation" value="NIT Nagaland"
                      checked={college === 'NIT Nagaland'}
                      onChange={() => setCollege('NIT Nagaland')}
                      className="h-4 w-4 text-cyan-500"
                    />
                    <span className="text-sm text-white">NIT Nagaland</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio" name="affiliation" value="Other College/University"
                      checked={college === 'Other College/University'}
                      onChange={() => setCollege('Other College/University')}
                      className="h-4 w-4 text-cyan-500"
                    />
                    <span className="text-sm text-white">Other</span>
                  </label>
                </div>
              </div>

              {college === 'NIT Nagaland' && (
                <div className="md:col-span-2">
                  <label className={labelClass}>Registration / Roll Number *</label>
                  <input type="text" name="rollNumber" required className={inputClass} placeholder="E.g., B20CS1001" />
                </div>
              )}

              {selectedEvent?.team && (
                <div className="md:col-span-2">
                  <label className={labelClass}>Team Name</label>
                  <input type="text" name="teamName" className={inputClass} placeholder="E.g., Cyber Knights" />
                </div>
              )}

              <div className="md:col-span-2">
                <label className={labelClass}>Additional Note <span className="text-gray-500 normal-case">(optional)</span></label>
                <textarea name="note" rows={3} className={inputClass + ' resize-none'} placeholder="Any queries or special requirements..." />
              </div>
            </div>
          </fieldset>

          {/* ── Payment ── */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Payment</legend>
            <p className="text-sm text-gray-400 Gluten">Scan the QR code and upload the screenshot as proof of payment.</p>
            <div className="flex flex-col items-center gap-3">
              <img src="/qr.jpg" alt="UPI QR Code" className="w-36 h-36 rounded-lg border border-cyan-500/50 shadow-lg" />
              <a href="/qr.jpg" download className="text-xs text-cyan-400 hover:text-cyan-300">⬇ Download QR</a>
            </div>
            <div>
              <label className={labelClass}>Payment Screenshot <span className="text-gray-500 normal-case">(optional but recommended)</span></label>
              <input
                type="file"
                name="screenshot"
                accept="image/*"
                onChange={(e) => setScreenshotFile(e.target.files[0] || null)}
                className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                           file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400
                           hover:file:bg-cyan-500/30 transition-colors"
              />
            </div>
          </fieldset>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedEvent}
            className="w-full py-3 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg
                       bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-500 text-white
                       hover:from-cyan-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/50
                       active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/events" className="text-gray-400 hover:text-white Gluten transition-colors">
            ← Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}
