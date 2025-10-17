import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Calendar, Users, Info, Phone, Camera, Heart, ChevronRight } from 'lucide-react';

const getSessionData = () => {
  const itemStr = sessionStorage.getItem('admin_session');
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem('admin_session');
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
    sessionStorage.removeItem('admin_session');
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent('authStatusChange'));
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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

          {/* Center nav (desktop) */}
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

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 z-50 lg:hidden transition-transform duration-300 ease-out shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <img src="/image/logo2.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              {baseNavItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                        }`}>
                        <item.icon size={20} className={isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'} />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight size={18} className={`transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-500 group-hover:translate-x-1'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700/50 space-y-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
                  onClick={() => setOpen(false)}
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30"
                onClick={() => setOpen(false)}
              >
                <User size={20} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}