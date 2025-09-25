// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/", hasSub: false },
    { name: "SCHEDULE", path: "/schedule", hasSub: false },
    { name: "EVENTS", path: "/events", hasSub: false },
    { name: "ABOUT", path: "/about", hasSub: false },
    { name: "CONTACT", path: "/contact", hasSub: false },
    { name: "GALLERY", path: "/gallery", hasSub: false },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50  backdrop-blur UnifontEX bg-black/10 border-b border-white/20 shadow-lg md:flex transition-transform duration-500 ease-in-out h-16 ${open ? 'hidden' : 'flex'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
          {/* Logo */}
          <div className="flex items-stretch">
            <Link to="/">
              <img
                src='/image/logo2.png'
                alt="Econ Logo"
                className="h-15 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 text-white font-medium uppercase text-lg tracking-wider">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="relative group py-3 px-5 rounded-md transition-all duration-300 hover:bg-teal-700 hover:bg-opacity-10"
              >
                <div className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 transform group-hover:-translate-y-full">{item.name}</span>
                  <span className="absolute top-full left-0 block transition-transform duration-300 transform group-hover:-translate-y-full group-hover:text-cyan-300">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Icon */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white z-50 absolute right-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu open={open} setOpen={setOpen} navItems={navItems} />
    </>
  );
}