import React, { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Move to top"
      className={`fixed bottom-5 right-5 z-[120] rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-500 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 p-3 md:p-3.5 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-300`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 3a1 1 0 01.707.293l6 6a1 1 0 01-1.414 1.414L13 6.414V20a1 1 0 11-2 0V6.414L6.707 10.707A1 1 0 115.293 9.293l6-6A1 1 0 0112 3z" clipRule="evenodd" />
      </svg>
    </button>
  );
}
