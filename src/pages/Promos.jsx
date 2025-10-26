import React from 'react';

export default function Promos() {
  const promos = [
    // Add your event promos here. Example format below:
     { title: 'Tech Avinya 2025 Promo', instagramUrl: 'https://www.instagram.com/reel/DQJurHVAWUD/?igsh=bXVqdDJscmg2aTN1' },
    // { title: 'Hackathon', instagramUrl: 'https://www.instagram.com/reel/yyyy' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Event Promos</h1>
        <p className="text-gray-300 mb-10">Catch all Instagram promos for our events here.</p>

        {promos.length === 0 ? (
          <div className="text-gray-400">No promos added yet. Add entries in <code>src/pages/Promos.jsx</code>.</div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {promos.map((p, idx) => (
              <li key={idx} className="group rounded-lg border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{p.title}</h2>
                    <a
                      href={p.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 underline break-all"
                    >
                      {p.instagramUrl}
                    </a>
                  </div>
                  <a
                    href={p.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 inline-flex items-center justify-center rounded-md px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium"
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
