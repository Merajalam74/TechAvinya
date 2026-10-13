import React, { useState, useEffect } from 'react';
import { FaSortDown, FaFilter, FaRedo, FaSignOutAlt, FaFilePdf, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import backvideo from '../assets/dashboard.jpg';
import { supabase } from '../lib/supabase';

const eventOptions = ['All Time', 'Code Raze', 'Hackathon', 'Aerial Adrenaline', 'Circuit X', 'Digital Art', 'Bug Hunt', 'Animation', 'BGMI', 'MLBB', 'Free Fire', '3D Modelling', 'Clash of Wheels', 'Tech Crisis', 'Infinity Hunt'];
const statusOptions = ['All', 'Pending', 'Accepted', 'Rejected'];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterEvent, setFilterEvent] = useState('All Time');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('latest');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    // --- Authentication Check (on component mount) ---
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login', { replace: true });
                return;
            }
            fetchRegistrationData();
        };
        checkSession();
    }, []);

    // --- Filtering and Sorting Effect ---
    useEffect(() => {
        applyFiltersAndSort(registrations);
    }, [filterEvent, filterStatus, sortBy, registrations]);

    const fetchRegistrationData = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: dbError } = await supabase
                .from('registrations')
                .select('*')
                .order('registration_time', { ascending: false });

            if (dbError) throw dbError;

            setRegistrations(data || []);
        } catch (err) {
            console.error('Failed to fetch registrations:', err);
            setError('Failed to load data. Check Supabase configuration.');
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = (data) => {
        let filtered = [...data];

        if (filterEvent !== 'All Time') {
            filtered = filtered.filter(item => item.event_title === filterEvent);
        }
        if (filterStatus !== 'All') {
            filtered = filtered.filter(item => item.status === filterStatus);
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.registration_time);
            const dateB = new Date(b.registration_time);
            if (sortBy === 'latest') return dateB - dateA;
            if (sortBy === 'oldest') return dateA - dateB;
            return 0;
        });

        setFilteredData(filtered);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        if (!window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) return;

        try {
            const { error: dbError } = await supabase
                .from('registrations')
                .update({ status: newStatus })
                .eq('id', id);

            if (dbError) throw dbError;

            // Refresh data after update
            await fetchRegistrationData();
            // Also update the preview modal if it's open for this item
            if (previewData && previewData.id === id) {
                setPreviewData(prev => ({ ...prev, status: newStatus }));
            }
        } catch (e) {
            alert(`Update Failed: ${e.message}`);
            console.error('Status update error:', e);
        }
    };

    const handlePreview = (item) => {
        setPreviewData(item);
        setIsImageZoomed(false);
    };

    const formatTimestamp = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleString();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleDownloadPDF = () => {
        if (filteredData.length === 0) {
            alert('No data to export.');
            return;
        }

        const doc = new jsPDF();
        const title = `Tech Avinya Registration Report: ${filterEvent}`;

        const headers = [['ID', 'Event', 'Leader', 'College', 'Registered At']];
        const data = filteredData.map(item => [
            item.id,
            item.event_title,
            item.leader_name,
            item.college,
            formatTimestamp(item.registration_time),
        ]);

        doc.setFontSize(16);
        doc.text(title, 14, 20);

        autoTable(doc, {
            startY: 25,
            head: headers,
            body: data,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, textColor: [50, 50, 50] },
            headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        doc.save(`${filterEvent.replace(' ', '_')}_registrations.pdf`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'text-green-500 bg-green-500/10 border-green-500';
            case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500';
            default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 text-white px-4 md:px-10 print:pt-0">
            <img
                className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
                src={backvideo}
                alt="Dashboard background"
            />

            <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto print:hidden">
                <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-anton tracking-wide">
                    Registration Dashboard
                </h1>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300">
                    <FaSignOutAlt />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </header>

            {/* Filter and Sort Bar */}
            <div className="bg-gray-800/50 p-4 rounded-xl shadow-lg border border-cyan-700/50 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 print:hidden">

                {/* Event Filter */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <FaFilter className="text-teal-400" />
                    <label className="text-gray-400 whitespace-nowrap text-sm">Filter by Event:</label>
                    <select
                        value={filterEvent}
                        onChange={(e) => setFilterEvent(e.target.value)}
                        className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40"
                    >
                        {eventOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <FaFilter className="text-teal-400" />
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40">
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>

                {/* Sort Option */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <FaSortDown className="text-teal-400" />
                    <label className="text-gray-400 whitespace-nowrap">Sort by Date:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 rounded-lg bg-gray-700/50 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40"
                    >
                        <option value="latest">Latest Registration</option>
                        <option value="oldest">Oldest Registration</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button onClick={fetchRegistrationData} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2 border border-cyan-400/50 p-2 rounded-lg">
                        <FaRedo />
                        <span className="text-sm">Refresh Data</span>
                    </button>
                    <button onClick={handleDownloadPDF} className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-2 border border-red-400/50 p-2 rounded-lg">
                        <FaFilePdf />
                        <span className="text-sm">Download PDF</span>
                    </button>
                </div>
            </div>

            {/* Registration Table */}
            <div className="bg-gray-800/60 rounded-lg shadow-2xl overflow-x-auto border border-blue-700/50 max-w-7xl mx-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-700/80 text-cyan-400 uppercase text-sm leading-normal font-bold">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Event</th>
                            <th className="py-3 px-6 text-left">Leader</th>
                            <th className="py-3 px-6 text-left">College</th>
                            <th className="py-3 px-6 text-center">Registered At</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center print:hidden">Actions</th>
                            <th className="py-3 px-4 text-center print:hidden">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                        {error ? (
                            <tr key="error-msg">
                                <td colSpan="8" className="py-6 text-center text-red-400 font-mono">
                                    Error: {error}
                                </td>
                            </tr>
                        ) : loading ? (
                            <tr key="loading-msg">
                                <td colSpan="8" className="py-6 text-center text-lg text-cyan-400 font-mono">
                                    Loading data from Supabase...
                                </td>
                            </tr>
                        ) : filteredData.length === 0 ? (
                            <tr key="no-data-row">
                                <td colSpan="8" className="py-6 text-center text-gray-500">No registrations found for the current filter.</td>
                            </tr>
                        ) : (
                            filteredData.map(item => (
                                <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/40">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold text-xs">{item.id}</td>
                                    <td className="py-3 px-6 text-left">{item.event_title}</td>
                                    <td className="py-3 px-6 text-left text-teal-400">{item.leader_name}</td>
                                    <td className="py-3 px-6 text-left">{item.college}</td>
                                    <td className="py-3 px-6 text-center text-xs font-mono">{formatTimestamp(item.registration_time)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`p-1 px-3 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions (Accept/Reject) */}
                                    <td className="py-3 px-4 text-center">
                                        {item.status === 'Pending' && (
                                            <div className="flex space-x-6 text-lg justify-center">
                                                <button onClick={() => handleStatusUpdate(item.id, 'Accepted')} className="text-green-500 hover:text-green-400"><FaCheck /></button>
                                                <button onClick={() => handleStatusUpdate(item.id, 'Rejected')} className="text-red-500 hover:text-red-400"><FaTimes /></button>
                                            </div>
                                        )}
                                    </td>

                                    {/* Details */}
                                    <td className="py-3 px-4 text-center">
                                        <button onClick={() => handlePreview(item)} className="text-cyan-400 hover:text-cyan-300"><FaEye /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-right max-w-7xl mx-auto">Total Entries: {registrations.length}</p>

            {/* Full Details Modal (Preview) */}
            {previewData && (
                <div className="absolute mt-18 inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-700/95 border border-cyan-700/50 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-cyan-400">{previewData.team_name}</h2>
                            <button onClick={() => setPreviewData(null)} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                        </div>

                        {/* Image Section */}
                        <div className="w-full border-b border-gray-700 pb-4">
                            <h3 className="text-lg font-bold text-gray-300 mb-2">Payment Screenshot</h3>
                            {previewData.image_url ? (
                                <img
                                    src={previewData.image_url}
                                    alt={`${previewData.team_name} payment`}
                                    onClick={() => setIsImageZoomed(true)}
                                    className="w-full h-auto max-h-48 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                                />
                            ) : (
                                <p className="text-gray-500 text-sm">No screenshot uploaded.</p>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="border-t border-gray-700 pt-4 space-y-2 text-left">
                            <p className="text-sm"><span className="font-semibold text-gray-400">Leader:</span> <span className="text-teal-400">{previewData.leader_name}</span></p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Registration ID:</span> {previewData.id}</p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">College:</span> {previewData.college}</p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Roll No (Leader):</span> {previewData.roll_number || 'N/A'}</p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Email:</span> {previewData.email}</p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Contact:</span> {previewData.phone}</p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Status:</span> <span className={`p-1 px-2 rounded-lg text-xs font-semibold ${getStatusColor(previewData.status)}`}>{previewData.status}</span></p>
                            <p className="text-sm"><span className="font-semibold text-gray-400">Time:</span> {formatTimestamp(previewData.registration_time)}</p>
                        </div>

                        {/* Team Members List */}
                        <div className="mt-4 border-t border-gray-700 pt-4">
                            <h3 className="text-lg font-bold text-gray-300 mb-2">Team Members:</h3>
                            <ul className="list-disc list-inside text-sm text-gray-400 ml-4 space-y-1">
                                {previewData.team_members && previewData.team_members.map((member, index) => (
                                    <li key={index}>
                                        <strong>{member.name || `Member ${index + 1}`}:</strong>
                                        {(member.rollNumber || member.inGameID) && (
                                            <span className="ml-2 text-gray-500">
                                                (
                                                {member.rollNumber && `Reg No: ${member.rollNumber}`}
                                                {member.inGameID && ` | ID: ${member.inGameID}`}
                                                )
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {previewData.status === 'Pending' && (
                            <div className="mt-6 border-t border-gray-700 pt-4 flex space-x-6 text-lg justify-center">
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-400 text-sm">Accept:</p>
                                    <button
                                        onClick={() => handleStatusUpdate(previewData.id, 'Accepted')}
                                        className="text-green-500 hover:text-green-400 p-2 rounded-full bg-green-900/30 transition-colors"
                                    >
                                        <FaCheck />
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-400 text-sm">Reject:</p>
                                    <button
                                        onClick={() => handleStatusUpdate(previewData.id, 'Rejected')}
                                        className="text-red-500 hover:text-red-400 p-2 rounded-full bg-red-900/30 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Full Screen Image Zoom Modal */}
            {isImageZoomed && (
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
                        src={previewData?.image_url}
                        alt="Zoomed payment screenshot"
                        className="max-w-[90vw] max-h-[90vh] object-contain cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}