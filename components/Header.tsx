import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Instagram, Facebook, Crown } from 'lucide-react';
import { NAV_ITEMS } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// TikTok Icon Component since it's not always available in standard libraries
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// X (Twitter) Icon Component
const XIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCart, cartCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const headerClass = `sticky top-0 left-0 w-full z-40 transition-all duration-300 border-b-2 ${isScrolled
    ? 'bg-kimezu-bg/95 border-kimezu-pink backdrop-blur-md shadow-sm py-2 md:py-3'
    : 'bg-kimezu-bg border-kimezu-pink py-3 md:py-5'
    }`;

  const textColorClass = 'text-kimezu-title';

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-4 md:px-12 relative">
          <nav className="flex justify-between items-center h-12 md:h-14">

            {/* Mobile/Tablet Menu Button - Left (Visible until Large screens) */}
            <div className="flex lg:hidden w-1/3">
              <button
                className={`p-1 hover:text-kimezu-primary transition-colors ${textColorClass}`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Desktop Nav - Left (Only visible on Large screens) */}
            <div className="hidden lg:flex w-1/3 justify-start space-x-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative text-xs font-bold uppercase tracking-[0.15em] ${textColorClass} transition-colors`}
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-kimezu-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Logo - Center Absolute */}
            <div className="flex-grow md:flex-grow-0 w-1/3 md:w-auto flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="inline-block group text-center">
                <div className="flex flex-col items-center">
                  <span className={`font-serif text-2xl md:text-4xl font-bold tracking-widest text-kimezu-title transition-colors duration-300 group-hover:text-kimezu-primary`}>
                    KIMEZU
                  </span>
                  <span className="w-full h-[1px] bg-kimezu-title/20 mt-1 mb-1 scale-x-50 group-hover:scale-x-100 transition-transform duration-500"></span>
                  <span className={`text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-kimezu-text`}>
                    Creaciones
                  </span>
                </div>
              </Link>
            </div>

            {/* Icons - Right */}
            <div className="flex items-center justify-end w-1/3 space-x-4 md:space-x-6">

              {/* Admin Button (Only for Admin) */}
              {user?.email === 'kaieke37@gmail.com' && (
                <Link
                  to="/admin"
                  className={`hidden md:block hover:text-kimezu-primary transition-colors ${textColorClass}`}
                  title="Panel de Administrador"
                >
                  <Crown size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={1.2} />
                </Link>
              )}

              <button
                onClick={() => setIsSearchOpen(true)}
                className={`hover:text-kimezu-primary transition-colors ${textColorClass}`}
              >
                <Search size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={1.2} />
              </button>
              <Link to="/login" className={`hidden md:block hover:text-kimezu-primary transition-colors ${textColorClass}`}>
                <User size={22} strokeWidth={1.2} />
              </Link>
              <button
                onClick={openCart}
                className={`relative hover:text-kimezu-primary transition-colors ${textColorClass} group`}
              >
                <ShoppingBag size={20} className="md:w-[22px] md:h-[22px] group-hover:fill-kimezu-bg/0 transition-all" strokeWidth={1.2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-kimezu-green text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-fade-in shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Screen Search Overlay */}
      <div
        className={`fixed inset-0 bg-kimezu-bg/95 backdrop-blur-sm z-[60] flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className="w-full max-w-3xl px-6 relative animate-fade-in-up"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute -top-16 right-4 md:-right-8 text-kimezu-text hover:text-kimezu-primary transition-colors p-2"
          >
            <X size={32} strokeWidth={1} />
            <span className="sr-only">Cerrar</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué aroma buscas hoy?"
              className="w-full bg-transparent border-b border-kimezu-title/20 py-6 pr-12 text-2xl md:text-4xl font-serif text-kimezu-title focus:border-kimezu-primary focus:outline-none placeholder-kimezu-title/20 transition-all text-center"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-kimezu-title/50 hover:text-kimezu-primary transition-colors p-2"
            >
              <Search size={28} />
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-kimezu-text text-xs uppercase tracking-[0.2em] font-bold">Sugerencias</p>
            <div className="flex justify-center gap-4 text-sm text-kimezu-title/70">
              <button onClick={() => { setSearchQuery('Lavanda'); if (searchInputRef.current) searchInputRef.current.focus(); }} className="hover:text-kimezu-primary underline decoration-transparent hover:decoration-kimezu-primary transition-all">Lavanda</button>
              <button onClick={() => { setSearchQuery('Velas'); if (searchInputRef.current) searchInputRef.current.focus(); }} className="hover:text-kimezu-primary underline decoration-transparent hover:decoration-kimezu-primary transition-all">Velas</button>
              <button onClick={() => { setSearchQuery('Regalo'); if (searchInputRef.current) searchInputRef.current.focus(); }} className="hover:text-kimezu-primary underline decoration-transparent hover:decoration-kimezu-primary transition-all">Regalos</button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-kimezu-bg z-50 flex flex-col transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-kimezu-card/50">
          <span className="font-serif text-2xl font-bold tracking-widest text-kimezu-title">MENÚ</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-kimezu-title hover:text-kimezu-primary hover:rotate-90 transition-all duration-300">
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow space-y-6 p-8">
          {user?.email === 'kaieke37@gmail.com' && (
            <Link
              to="/admin"
              className="text-kimezu-primary font-bold uppercase tracking-widest text-sm mb-4 border border-kimezu-primary px-4 py-2 hover:bg-kimezu-primary hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Crown size={16} className="inline mr-2" /> Panel Admin
            </Link>
          )}

          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-serif text-3xl text-kimezu-title hover:text-kimezu-primary hover:italic transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-12 h-1px bg-kimezu-card my-4"></div>
          <Link
            to="/login"
            className="text-sm font-bold uppercase tracking-widest text-kimezu-text hover:text-kimezu-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Iniciar Sesión / Registro
          </Link>
        </div>

        <div className="p-8 text-center bg-kimezu-card/20">
          <p className="text-xs text-kimezu-text uppercase tracking-widest mb-4">Síguenos</p>
          <div className="flex justify-center space-x-8 text-kimezu-title">
            <a href="https://www.instagram.com/kimezucreaciones" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary hover:scale-110 transition-all">
              <Instagram size={28} />
            </a>
            <a href="https://www.facebook.com/creacioneskimezu" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary hover:scale-110 transition-all">
              <Facebook size={28} />
            </a>
            <a href="https://www.tiktok.com/@kimezucreaciones" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary hover:scale-110 transition-all">
              <TikTokIcon size={28} />
            </a>
            <a href="https://x.com/kimezucreacion" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary hover:scale-110 transition-all">
              <XIcon size={26} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};