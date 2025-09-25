// src/components/MobileMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaWhatsapp ,FaGithub} from 'react-icons/fa';

export default function MobileMenu({ open, setOpen, navItems }) {
  const closeMenu = () => setOpen(false);

  return (
    <div className={`fixed top-0 right-0 w-1/2 h-screen backdrop-blur UnifontEX bg-black/10 text-white shadow-xl transform transition-transform duration-500 ease-in-out md:hidden z-40 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 h-full flex flex-col items-end justify-between text-right">
        {/* Header with Close Button and Logo */}
        <div className="flex justify-between items-center w-full mb-10">
          <Link to="/" onClick={closeMenu}>
            <img src='/image/logo2.png' alt="Logo" className="h-16 w-auto" />
          </Link>
          <button onClick={closeMenu} className="text-white text-3xl focus:outline-none">&times;</button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto w-full mt-10">
          <ul className="space-y-4 text-lg uppercase font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link to={item.path} onClick={closeMenu} className="flex items-center justify-end py-3 px-5 rounded-md transition-all duration-300 group hover:bg-teal-700 hover:bg-opacity-10">
                  <div className="relative overflow-hidden text-right">
                    <span className="block transition-transform duration-300 transform group-hover:-translate-y-full">{item.name}</span>
                    <span className="absolute top-full right-0 block transition-transform duration-300 transform group-hover:-translate-y-full group-hover:text-cyan-300">{item.name}</span>
                  </div>
                  {item.hasSub && (<span className="mr-2 transform rotate-90 text-sm">▶</span>)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="mt-auto w-full">
          <p className="text-center text-gray-400 text-xs mb-4 uppercase tracking-widest">Follow Us</p>
          <div className="flex justify-end space-x-3">
            <a href="https://www.instagram.com/techavinya_/" aria-label="Instagram" className="text-gray-300 hover:text-cyan-400"><FaInstagram className="text-xl" /></a>
            <a href="https://www.facebook.com/Nitnagaland0/" aria-label="Facebook" className="text-gray-300 hover:text-cyan-400"><FaFacebookF className="text-xl" /></a>
            <a href="https://www.linkedin.com/company/director-nit-nagaland/posts/?feedView=all" aria-label="LinkedIn" className="text-gray-300 hover:text-cyan-400"><FaLinkedinIn className="text-xl" /></a>
            <a href="https://www.youtube.com/@NITNagalandOfficial" aria-label="YouTube" className="text-gray-300 hover:text-cyan-400"><FaYoutube className="text-xl" /></a>
            <a href="https://github.com/Coding-Club-NIT-Nagaland" aria-label="WhatsApp" className="text-gray-300 hover:text-cyan-400"><FaGithub className="text-xl" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}