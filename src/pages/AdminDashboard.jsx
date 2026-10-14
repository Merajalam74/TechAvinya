import React, { useState, useEffect } from 'react';
import {
  FaSortDown,
  FaFilter,
  FaRedo,
  FaSignOutAlt,
  FaFilePdf,
  FaCheck,
  FaTimes,
  FaEye,
  FaUserGraduate,
  FaHandshake,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaClock
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import backvideo from '../assets/dashboard.jpg';
import { supabase } from '../lib/supabase';

const eventOptions = [
  'All Time',
  'Code Raze',
  'Hackathon',
  'Aerial Adrenaline',
  'Digital Art',
  'Bug Hunt',
  'Animation',
  'BGMI',
  'MLBB',
  'Free Fire',
  '3D Modelling',
  'Clash of Wheels',
  'Tech Crisis',
  'Infinity Hunt',
  'Stock Rise'
];

const statusOptions = ['All', 'Pending', 'Accepted', 'Rejected'];
const sponsorStatusOptions = ['All', 'New', 'Contacted', 'Approved', 'Rejected'];

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Active Tab: 'enrollments' or 'sponsors'
  const [activeTab, setActiveTab] = useState('enrollments');

  // --- Enrollments State ---
  const [registrations, setRegistrations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterEvent, setFilterEvent] = useState('All Time');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // --- Sponsors State ---
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [sponsorStatusFilter, setSponsorStatusFilter] = useState('All');
  const [sponsorTierFilter, setSponsorTierFilter] = useState('All');
  const [loadingSponsors, setLoadingSponsors] = useState(false);
  const [sponsorError, setSponsorError] = useState(null);
  const [previewSponsor, setPreviewSponsor] = useState(null);

  // --- Auth & Initial Data Fetch ---
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login', { replace: true });
        return;
      }
      fetchRegistrationData();
      fetchSponsorData();
    };
    checkSession();
  }, []);

  // --- Filter and Sort Effects ---
  useEffect(() => {
    applyEnrollmentFilters(registrations);
  }, [filterEvent, filterStatus, sortBy, registrations]);

  useEffect(() => {
    applySponsorFilters(sponsors);
  }, [sponsorStatusFilter, sponsorTierFilter, sponsors]);

  // ─── FETCH ENROLLMENTS ──────────────────────────────────────────────
  const fetchRegistrationData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch from 'enrollments' table (new page)
      const { data: enrollData, error: enrollErr } = await supabase
        .from('enrollments')
        .select('*')
        .order('created_at', { ascending: false });

      // 2. Fetch from 'registrations' table (legacy page)
      const { data: regData } = await supabase
        .from('registrations')
        .select('*')
        .order('registration_time', { ascending: false });

      // Normalize records so both schemas work cleanly
      const normalizedEnrollments = (enrollData || []).map(item => ({
        id: item.id,
        table: 'enrollments',
        event_title: item.event_title || item.event_id,
        leader_name: item.full_name || 'N/A',
        college: item.college || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        roll_number: item.roll_number || 'N/A',
        team_name: item.team_name || 'Individual',
        status: item.status || 'Pending',
        image_url: item.image_url,
        registration_time: item.created_at,
        note: item.note
      }));

      const normalizedRegistrations = (regData || []).map(item => ({
        id: item.id,
        table: 'registrations',
        event_title: item.event_title || item.event_id,
        leader_name: item.leader_name || 'N/A',
        college: item.college || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        roll_number: item.roll_number || 'N/A',
        team_name: item.team_name || 'Individual',
        team_members: item.team_members || [],
        status: item.status || 'Pending',
        image_url: item.image_url,
        registration_time: item.registration_time,
        note: null
      }));

      // Combine both sources
      const combined = [...normalizedEnrollments, ...normalizedRegistrations];
      setRegistrations(combined);
    } catch (err) {
      console.error('Failed to fetch enrollments:', err);
      setError('Failed to load registrations. Check Supabase connection.');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const applyEnrollmentFilters = (data) => {
    let filtered = [...data];

    if (filterEvent !== 'All Time') {
      filtered = filtered.filter(item => item.event_title?.toLowerCase() === filterEvent.toLowerCase());
    }
    if (filterStatus !== 'All') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.registration_time || 0);
      const dateB = new Date(b.registration_time || 0);
      if (sortBy === 'latest') return dateB - dateA;
      if (sortBy === 'oldest') return dateA - dateB;
      return 0;
    });

    setFilteredData(filtered);
  };

  const handleEnrollmentStatusUpdate = async (item, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this enrollment as "${newStatus}"?`)) return;

    try {
      const tableName = item.table || 'enrollments';
      const { error: dbError } = await supabase
        .from(tableName)
        .update({ status: newStatus })
        .eq('id', item.id);

      if (dbError) throw dbError;

      await fetchRegistrationData();
      if (previewData && previewData.id === item.id) {
        setPreviewData(prev => ({ ...prev, status: newStatus }));
      }
    } catch (e) {
      alert(`Update Failed: ${e.message}`);
      console.error('Status update error:', e);
    }
  };

  // ─── FETCH SPONSOR INQUIRIES ─────────────────────────────────────────
  const fetchSponsorData = async () => {
    setLoadingSponsors(true);
    setSponsorError(null);

    try {
      const { data, error: sErr } = await supabase
        .from('sponsor_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (sErr) throw sErr;
      setSponsors(data || []);
    } catch (err) {
      console.error('Failed to fetch sponsors:', err);
      setSponsorError('Failed to load sponsor inquiries.');
      setSponsors([]);
    } finally {
      setLoadingSponsors(false);
    }
  };

  const applySponsorFilters = (data) => {
    let filtered = [...data];

    if (sponsorStatusFilter !== 'All') {
      filtered = filtered.filter(s => s.status === sponsorStatusFilter);
    }

    if (sponsorTierFilter !== 'All') {
      filtered = filtered.filter(s => s.tier?.toLowerCase() === sponsorTierFilter.toLowerCase());
    }

    setFilteredSponsors(filtered);
  };

  const handleSponsorStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Mark sponsor request as "${newStatus}"?`)) return;

    try {
      const { error: dbError } = await supabase
        .from('sponsor_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (dbError) throw dbError;

      await fetchSponsorData();
      if (previewSponsor && previewSponsor.id === id) {
        setPreviewSponsor(prev => ({ ...prev, status: newStatus }));
      }
    } catch (e) {
      alert(`Update Failed: ${e.message}`);
      console.error('Sponsor status error:', e);
    }
  };

  // ─── HELPERS & LOGOUT ────────────────────────────────────────────────
  const formatTimestamp = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Approved':
        return 'text-green-400 bg-green-500/10 border-green-500';
      case 'Rejected':
        return 'text-red-400 bg-red-500/10 border-red-500';
      case 'Contacted':
        return 'text-blue-400 bg-blue-500/10 border-blue-500';
      case 'New':
        return 'text-purple-400 bg-purple-500/10 border-purple-500';
      default:
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500';
    }
  };

  const getTierBadge = (tier) => {
    const t = (tier || '').toLowerCase();
    switch (t) {
      case 'title':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500">👑 Title</span>;
      case 'gold':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500">🥇 Gold</span>;
      case 'silver':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-400/20 text-slate-300 border border-slate-400">🥈 Silver</span>;
      case 'event':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500">🎯 Event Partner</span>;
      case 'media':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500">📸 Media</span>;
      case 'printing':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500">🖨️ Printing</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-600/30 text-gray-300 border border-gray-500">✨ {tier || 'General'}</span>;
    }
  };

  // ─── PDF EXPORTS ─────────────────────────────────────────────────────
  const handleDownloadEnrollmentsPDF = () => {
    if (filteredData.length === 0) {
      alert('No enrollments to export.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Tech Avinya Enrollment Report (${filterEvent})`, 14, 20);

    const headers = [['Event', 'Participant', 'College', 'Phone', 'Status', 'Registered At']];
    const data = filteredData.map(item => [
      item.event_title,
      item.leader_name,
      item.college,
      item.phone,
      item.status,
      formatTimestamp(item.registration_time)
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: data,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [6, 182, 212] }
    });

    doc.save(`Enrollments_${filterEvent.replace(/\s+/g, '_')}.pdf`);
  };

  const handleDownloadSponsorsPDF = () => {
    if (filteredSponsors.length === 0) {
      alert('No sponsor inquiries to export.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Tech Avinya Sponsor Inquiries Report', 14, 20);

    const headers = [['Company', 'Contact', 'Email', 'Phone', 'Tier', 'Status', 'Date']];
    const data = filteredSponsors.map(s => [
      s.company_name,
      s.contact_person,
      s.email,
      s.phone,
      s.tier,
      s.status,
      formatTimestamp(s.created_at)
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: data,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [147, 51, 234] }
    });

    doc.save('TechAvinya_Sponsor_Inquiries.pdf');
  };

  // Count new sponsor inquiries
  const newSponsorsCount = sponsors.filter(s => s.status === 'New').length;

  return (
    <div className="min-h-screen pt-24 pb-16 text-white px-4 md:px-10 print:pt-0">
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={backvideo}
        alt="Dashboard background"
      />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 max-w-7xl mx-auto print:hidden">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-anton tracking-wide">
            Admin Management Console
          </h1>
          <p className="text-sm text-gray-400 mt-1 Gluten">
            Monitor real-time event enrollments and sponsor partnership requests
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors bg-red-950/40 border border-red-800/60 px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </header>

      {/* ─── TAB NAVIGATION ────────────────────────────────────────── */}
      <div className="flex border-b border-cyan-800/50 max-w-7xl mx-auto mb-8 print:hidden">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`flex items-center gap-2.5 px-6 py-3 font-semibold text-sm transition-all duration-300 border-b-2 ${
            activeTab === 'enrollments'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-900/20'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
        >
          <FaUserGraduate className="text-lg" />
          <span>Student Enrollments</span>
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            {registrations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sponsors')}
          className={`flex items-center gap-2.5 px-6 py-3 font-semibold text-sm transition-all duration-300 border-b-2 ${
            activeTab === 'sponsors'
              ? 'border-purple-400 text-purple-300 bg-purple-900/20'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
        >
          <FaHandshake className="text-lg" />
          <span>Sponsor Requests</span>
          {newSponsorsCount > 0 ? (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white font-bold animate-pulse">
              {newSponsorsCount} New
            </span>
          ) : (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              {sponsors.length}
            </span>
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 1: STUDENT ENROLLMENTS ─────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'enrollments' && (
        <>
          {/* Controls Bar */}
          <div className="bg-gray-800/60 p-4 rounded-xl shadow-lg border border-cyan-700/50 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 print:hidden backdrop-blur-md">
            {/* Filter by Event */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <FaFilter className="text-cyan-400" />
              <label className="text-gray-400 whitespace-nowrap text-sm">Event:</label>
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-44 text-white"
              >
                {eventOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <FaFilter className="text-cyan-400" />
              <label className="text-gray-400 whitespace-nowrap text-sm">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-36 text-white"
              >
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <FaSortDown className="text-cyan-400" />
              <label className="text-gray-400 whitespace-nowrap text-sm">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-44 text-white"
              >
                <option value="latest">Latest Registration</option>
                <option value="oldest">Oldest Registration</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 w-full md:w-auto justify-end">
              <button
                onClick={fetchRegistrationData}
                className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 border border-cyan-400/50 p-2 px-3 rounded-lg bg-cyan-950/30"
              >
                <FaRedo />
                <span className="text-sm">Refresh</span>
              </button>
              <button
                onClick={handleDownloadEnrollmentsPDF}
                className="text-red-400 hover:text-red-300 flex items-center space-x-2 border border-red-400/50 p-2 px-3 rounded-lg bg-red-950/30"
              >
                <FaFilePdf />
                <span className="text-sm">PDF Export</span>
              </button>
            </div>
          </div>

          {/* Enrollments Table */}
          <div className="bg-gray-800/60 rounded-xl shadow-2xl overflow-x-auto border border-cyan-800/50 max-w-7xl mx-auto backdrop-blur-md">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-700/80 text-cyan-300 uppercase text-xs tracking-wider leading-normal font-bold">
                  <th className="py-3 px-5 text-left">Event</th>
                  <th className="py-3 px-5 text-left">Student Name</th>
                  <th className="py-3 px-5 text-left">College / Roll</th>
                  <th className="py-3 px-5 text-left">Contact</th>
                  <th className="py-3 px-5 text-center">Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center print:hidden">Decision</th>
                  <th className="py-3 px-4 text-center print:hidden">View</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-sm divide-y divide-gray-700/40">
                {error ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-red-400 font-mono">
                      Error: {error}
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-cyan-400 font-mono animate-pulse">
                      Loading enrollments from Supabase...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      No enrollments found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredData.map(item => (
                    <tr key={item.id} className="hover:bg-gray-700/40 transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">
                        {item.event_title}
                        {item.team_name && item.team_name !== 'Individual' && (
                          <span className="block text-xs text-gray-400">Team: {item.team_name}</span>
                        )}
                      </td>
                      <td className="py-3 px-5 text-teal-300 font-medium">{item.leader_name}</td>
                      <td className="py-3 px-5">
                        <div>{item.college}</div>
                        {item.roll_number && item.roll_number !== 'N/A' && (
                          <div className="text-xs text-gray-400 font-mono">Reg: {item.roll_number}</div>
                        )}
                      </td>
                      <td className="py-3 px-5 text-xs font-mono">
                        <div>{item.phone}</div>
                        <div className="text-gray-400 truncate max-w-[160px]">{item.email}</div>
                      </td>
                      <td className="py-3 px-5 text-center text-xs font-mono text-gray-400">
                        {formatTimestamp(item.registration_time)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Decision buttons */}
                      <td className="py-3 px-4 text-center print:hidden">
                        {item.status === 'Pending' ? (
                          <div className="flex space-x-3 justify-center text-base">
                            <button
                              title="Accept Enrollment"
                              onClick={() => handleEnrollmentStatusUpdate(item, 'Accepted')}
                              className="text-green-400 hover:text-green-300 p-1.5 rounded-full hover:bg-green-950/40"
                            >
                              <FaCheck />
                            </button>
                            <button
                              title="Reject Enrollment"
                              onClick={() => handleEnrollmentStatusUpdate(item, 'Rejected')}
                              className="text-red-400 hover:text-red-300 p-1.5 rounded-full hover:bg-red-950/40"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">—</span>
                        )}
                      </td>

                      {/* Detail preview */}
                      <td className="py-3 px-4 text-center print:hidden">
                        <button
                          onClick={() => { setPreviewData(item); setIsImageZoomed(false); }}
                          className="text-cyan-400 hover:text-cyan-200 p-1.5 rounded-full hover:bg-cyan-950/40 text-base"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400 text-right max-w-7xl mx-auto">
            Total Enrollments: {registrations.length}
          </p>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 2: SPONSOR REQUESTS ─────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'sponsors' && (
        <>
          {/* Controls Bar */}
          <div className="bg-gray-800/60 p-4 rounded-xl shadow-lg border border-purple-700/50 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 print:hidden backdrop-blur-md">
            {/* Filter by Status */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <FaFilter className="text-purple-400" />
              <label className="text-gray-400 whitespace-nowrap text-sm">Status:</label>
              <select
                value={sponsorStatusFilter}
                onChange={(e) => setSponsorStatusFilter(e.target.value)}
                className="p-2 rounded-lg bg-gray-700/80 border border-purple-500/50 text-sm focus:ring-purple-500 w-full md:w-40 text-white"
              >
                {sponsorStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Filter by Tier */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <FaFilter className="text-purple-400" />
              <label className="text-gray-400 whitespace-nowrap text-sm">Tier:</label>
              <select
                value={sponsorTierFilter}
                onChange={(e) => setSponsorTierFilter(e.target.value)}
                className="p-2 rounded-lg bg-gray-700/80 border border-purple-500/50 text-sm focus:ring-purple-500 w-full md:w-44 text-white"
              >
                <option value="All">All Tiers</option>
                <option value="title">Title Sponsor</option>
                <option value="gold">Gold Sponsor</option>
                <option value="silver">Silver Sponsor</option>
                <option value="event">Event Partner</option>
                <option value="media">Media Partner</option>
                <option value="printing">Printing Partner</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 w-full md:w-auto justify-end">
              <button
                onClick={fetchSponsorData}
                className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 border border-purple-400/50 p-2 px-3 rounded-lg bg-purple-950/30"
              >
                <FaRedo />
                <span className="text-sm">Refresh</span>
              </button>
              <button
                onClick={handleDownloadSponsorsPDF}
                className="text-red-400 hover:text-red-300 flex items-center space-x-2 border border-red-400/50 p-2 px-3 rounded-lg bg-red-950/30"
              >
                <FaFilePdf />
                <span className="text-sm">PDF Export</span>
              </button>
            </div>
          </div>

          {/* Sponsors Table */}
          <div className="bg-gray-800/60 rounded-xl shadow-2xl overflow-x-auto border border-purple-800/50 max-w-7xl mx-auto backdrop-blur-md">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-700/80 text-purple-300 uppercase text-xs tracking-wider leading-normal font-bold">
                  <th className="py-3 px-5 text-left">Company / Organisation</th>
                  <th className="py-3 px-5 text-left">Contact Person</th>
                  <th className="py-3 px-5 text-left">Contact Info</th>
                  <th className="py-3 px-5 text-center">Tier</th>
                  <th className="py-3 px-5 text-center">Submitted At</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center print:hidden">Update Status</th>
                  <th className="py-3 px-4 text-center print:hidden">Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-sm divide-y divide-gray-700/40">
                {sponsorError ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-red-400 font-mono">
                      Error: {sponsorError}
                    </td>
                  </tr>
                ) : loadingSponsors ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-purple-400 font-mono animate-pulse">
                      Loading sponsor inquiries from Supabase...
                    </td>
                  </tr>
                ) : filteredSponsors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      No sponsor inquiries found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredSponsors.map(sponsor => (
                    <tr key={sponsor.id} className="hover:bg-gray-700/40 transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-purple-400 text-sm flex-shrink-0" />
                          <span>{sponsor.company_name}</span>
                        </div>
                        {sponsor.website && (
                          <a
                            href={sponsor.website.startsWith('http') ? sponsor.website : `https://${sponsor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <FaGlobe className="text-[10px]" /> {sponsor.website}
                          </a>
                        )}
                      </td>

                      <td className="py-3 px-5 text-amber-300 font-medium">
                        {sponsor.contact_person}
                      </td>

                      <td className="py-3 px-5 text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-gray-200">
                          <FaPhone className="text-emerald-400 text-[10px]" />
                          <a href={`tel:${sponsor.phone}`} className="hover:underline">{sponsor.phone}</a>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                          <FaEnvelope className="text-cyan-400 text-[10px]" />
                          <a href={`mailto:${sponsor.email}`} className="hover:underline truncate max-w-[160px]">
                            {sponsor.email}
                          </a>
                        </div>
                      </td>

                      <td className="py-3 px-5 text-center">
                        {getTierBadge(sponsor.tier)}
                      </td>

                      <td className="py-3 px-5 text-center text-xs font-mono text-gray-400">
                        {formatTimestamp(sponsor.created_at)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(sponsor.status)}`}>
                          {sponsor.status}
                        </span>
                      </td>

                      {/* Quick Status actions */}
                      <td className="py-3 px-4 text-center print:hidden">
                        <select
                          value={sponsor.status}
                          onChange={(e) => handleSponsorStatusUpdate(sponsor.id, e.target.value)}
                          className="bg-gray-700 text-xs text-white rounded p-1 border border-gray-600 focus:outline-none focus:border-purple-400"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* View details */}
                      <td className="py-3 px-4 text-center print:hidden">
                        <button
                          onClick={() => setPreviewSponsor(sponsor)}
                          className="text-purple-400 hover:text-purple-200 p-1.5 rounded-full hover:bg-purple-950/40 text-base"
                          title="View Full Message"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400 text-right max-w-7xl mx-auto">
            Total Sponsor Requests: {sponsors.length}
          </p>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL: ENROLLMENT DETAIL PREVIEW ───────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-800 border border-cyan-700/60 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-gray-700 pb-3">
              <div>
                <h2 className="text-2xl font-bold text-cyan-400">{previewData.event_title}</h2>
                <p className="text-xs text-gray-400 mt-1">Applicant: {previewData.leader_name}</p>
              </div>
              <button
                onClick={() => setPreviewData(null)}
                className="text-gray-400 hover:text-white text-3xl font-light"
              >
                &times;
              </button>
            </div>

            {/* Payment Screenshot */}
            {previewData.image_url ? (
              <div className="border border-gray-700/80 rounded-xl overflow-hidden p-2 bg-gray-900/50">
                <p className="text-xs text-gray-400 font-semibold mb-1">Payment Proof (Click to zoom):</p>
                <img
                  src={previewData.image_url}
                  alt="Payment Screenshot"
                  onClick={() => setIsImageZoomed(true)}
                  className="w-full max-h-52 object-contain rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                />
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic p-3 bg-gray-900/40 rounded-lg">No payment screenshot attached.</p>
            )}

            {/* Applicant details */}
            <div className="space-y-2 text-sm text-gray-300 bg-gray-900/40 p-4 rounded-xl border border-gray-700/40">
              <p><span className="text-gray-400 font-semibold">Affiliation:</span> {previewData.college}</p>
              {previewData.roll_number && (
                <p><span className="text-gray-400 font-semibold">Roll Number:</span> {previewData.roll_number}</p>
              )}
              {previewData.team_name && (
                <p><span className="text-gray-400 font-semibold">Team Name:</span> {previewData.team_name}</p>
              )}
              <p><span className="text-gray-400 font-semibold">Email:</span> <a href={`mailto:${previewData.email}`} className="text-cyan-400 hover:underline">{previewData.email}</a></p>
              <p><span className="text-gray-400 font-semibold">Phone:</span> <a href={`tel:${previewData.phone}`} className="text-cyan-400 hover:underline">{previewData.phone}</a></p>
              {previewData.note && (
                <p className="mt-2 pt-2 border-t border-gray-800"><span className="text-gray-400 font-semibold">Note:</span> {previewData.note}</p>
              )}
              <p><span className="text-gray-400 font-semibold">Submitted:</span> {formatTimestamp(previewData.registration_time)}</p>
            </div>

            {/* Modal decision buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleEnrollmentStatusUpdate(previewData, 'Accepted')}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleEnrollmentStatusUpdate(previewData, 'Rejected')}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL: SPONSOR INQUIRY DETAIL PREVIEW ──────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {previewSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-800 border border-purple-700/60 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-gray-700 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-purple-400 text-lg" />
                  <h2 className="text-2xl font-bold text-white">{previewSponsor.company_name}</h2>
                </div>
                <div className="mt-1">{getTierBadge(previewSponsor.tier)}</div>
              </div>
              <button
                onClick={() => setPreviewSponsor(null)}
                className="text-gray-400 hover:text-white text-3xl font-light"
              >
                &times;
              </button>
            </div>

            {/* Representative Details */}
            <div className="space-y-2 text-sm text-gray-300 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
              <p><span className="text-gray-400 font-semibold">Contact Person:</span> {previewSponsor.contact_person}</p>
              <p>
                <span className="text-gray-400 font-semibold">Email:</span>{' '}
                <a href={`mailto:${previewSponsor.email}`} className="text-cyan-400 hover:underline">
                  {previewSponsor.email}
                </a>
              </p>
              <p>
                <span className="text-gray-400 font-semibold">Phone:</span>{' '}
                <a href={`tel:${previewSponsor.phone}`} className="text-cyan-400 hover:underline">
                  {previewSponsor.phone}
                </a>
              </p>
              {previewSponsor.website && (
                <p>
                  <span className="text-gray-400 font-semibold">Website:</span>{' '}
                  <a
                    href={previewSponsor.website.startsWith('http') ? previewSponsor.website : `https://${previewSponsor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {previewSponsor.website}
                  </a>
                </p>
              )}
              <p><span className="text-gray-400 font-semibold">Date Received:</span> {formatTimestamp(previewSponsor.created_at)}</p>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">Message / Requirements:</h3>
              <div className="p-3 bg-gray-900/70 border border-gray-700/60 rounded-xl text-sm text-gray-200 leading-relaxed max-h-48 overflow-y-auto">
                {previewSponsor.message || <span className="text-gray-500 italic">No specific message provided.</span>}
              </div>
            </div>

            {/* Status Selector & Direct Action */}
            <div className="pt-2 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">Status:</span>
                <select
                  value={previewSponsor.status}
                  onChange={(e) => handleSponsorStatusUpdate(previewSponsor.id, e.target.value)}
                  className="bg-gray-700 text-xs text-white rounded-lg p-2 border border-gray-600 focus:outline-none focus:border-purple-400"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${previewSponsor.email}?subject=Tech%20Avinya%20Sponsorship%20Inquiry%20-%20NIT%20Nagaland`}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <FaEnvelope /> Email Sponsor
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── FULL SCREEN ZOOM MODAL ─────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {isImageZoomed && previewData?.image_url && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 cursor-zoom-out"
          onClick={() => setIsImageZoomed(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsImageZoomed(false); }}
            className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer z-[70]"
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <img
            src={previewData.image_url}
            alt="Zoomed payment screenshot"
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}