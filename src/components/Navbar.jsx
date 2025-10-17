import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Calendar, Users, Info, Phone, Camera, Heart } from 'lucide-react';

const getSessionData = () => {
  const itemStr = localStorage.getItem('admin_session');
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('admin_session');
    return null;
  }
  return item.value;
};

const baseNavItems = [
  { name: "HOME", path: "/", icon: Home, hasSub: false },
  { name: "SCHEDULE", path: "/schedule", icon: Calendar, hasSub: false },
  { name: "EVENTS", path: "/events", icon: Users, hasSub: false },
  { name: "ABOUT", path: "/about", icon: Info, hasSub: false },
  { name: "CONTACT", path: "/contact", icon: Phone, hasSub: false },
  { name: "GALLERY", path: "/gallery", icon: Camera, hasSub: false },
  { name: "SPONSORS", path: "/sponsors", icon: Heart, hasSub: false },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const checkAuth = useCallback(() => {
    const session = getSessionData();
    setIsLoggedIn(!!session);
  }, []);

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    window.addEventListener('authStatusChange', checkAuth);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('authStatusChange', checkAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkAuth]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent('authStatusChange'));
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <nav className={`fixed w-full z-50 backdrop-blur-md bg-black/80 border-b transition-all duration-300 ease-in-out h-16 ${scrolled ? 'border-white/30 shadow-xl' : 'border-white/20'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center w-full h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/image/logo2.png"
                alt="Econ Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center nav (desktop) - scrollable if items overflow */}
          <div className="hidden lg:flex items-center mx-2 sm:mx-4 lg:mx-8 flex-1 min-w-0 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 overflow-x-auto whitespace-nowrap">
              {baseNavItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative px-3 py-2 rounded-lg transition-all duration-300 flex-shrink-0
                      ${isActive
                        ? 'bg-gradient-to-r from-cyan-600/40 to-blue-700/40 shadow-lg shadow-cyan-400/20 scale-105'
                        : 'hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 hover:shadow-lg hover:shadow-teal-500/20'}
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon size={16} className={`transition-colors ${isActive ? 'text-cyan-300 drop-shadow-glow' : 'text-white group-hover:text-cyan-300'}`} />
                      <span className={`font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-cyan-300 drop-shadow-glow' : 'text-white group-hover:text-cyan-300'}`}>{item.name}</span>
                    </div>
                    <div className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 -translate-x-1/2
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="hidden lg:flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 transform hover:scale-105"
                >
                  <User size={18} />
                  <span>DASHBOARD</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center space-x-2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
                >
                  <LogOut size={18} />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
              >
                <User size={18} />
                <span>ADMIN LOGIN</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
              {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu: sits below navbar, scrollable */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-black/95 z-40 lg:hidden overflow-y-auto">
          <div className="flex flex-col items-center justify-start p-6 space-y-6">
            {baseNavItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 transform
                    ${isActive
                      ? 'bg-gradient-to-r from-cyan-600/40 to-blue-700/40 text-cyan-300 scale-105 shadow-cyan-400/20 shadow-lg'
                      : 'bg-white/5 hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 text-white hover:scale-105'}
                  `}
                  onClick={() => setOpen(false)}
                >
                  <item.icon size={24} className={isActive ? 'text-cyan-300 drop-shadow-glow' : 'text-cyan-400'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {isLoggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-medium transition-all duration-300 transform hover:scale-105"
                  onClick={() => setOpen(false)}
                >
                  <User size={24} />
                  <span>DASHBOARD</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex items-center space-x-3 px-8 py-4 rounded-xl bg-red-600 text-white text-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut size={24} />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-medium transition-all duration-300 transform hover:scale-105"
                onClick={() => setOpen(false)}
              >
                <User size={24} />
                <span>ADMIN LOGIN</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}