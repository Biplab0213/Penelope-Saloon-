import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useSalon } from '../../context/SalonContext';
import { Menu, X, Phone, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigateTo } = useNavigation();
  const { settings, trackEvent } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Delano, CA', path: '/salon-in-delano-ca' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigateTo(path);
  };

  const handleCallClick = () => {
    trackEvent('phone_click', 'Header Phone Click');
  };

  const handleBookClick = () => {
    trackEvent('appointment_start', 'Header Book Button');
    setIsMobileMenuOpen(false);
    navigateTo('/book');
  };

  return (
    <>
      {/* Top micro bar for quick announcement & phone */}
      <div id="top-announcement-bar" className="bg-[#171717] text-[#E8E1D7] text-xs py-1.5 px-4 hidden md:block border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-[#E8E1D7]/80">
              <MapPin className="w-3.5 h-3.5 text-[#C9A96A]" />
              {settings.address}, {settings.city}, CA {settings.zip}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#E8E1D7]/80">
              <Clock className="w-3.5 h-3.5 text-[#C9A96A]" />
              Walk-ins Welcome & Appointments
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              onClick={handleCallClick}
              className="flex items-center gap-1.5 font-medium text-[#C9A96A] hover:text-[#DFCA9B] transition-colors"
            >
              <Phone className="w-3 h-3" />
              Call {settings.displayPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-sticky-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5EF]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E8E1D7]'
            : 'bg-[#F8F5EF] py-4 md:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="text-left group focus:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl lg:text-3xl font-bold tracking-wider text-[#171717] uppercase leading-none group-hover:text-[#A98748] transition-colors">
                Penelope
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.28em] font-sans font-medium text-[#6F6A64] uppercase -mt-0.5 group-hover:text-[#171717] transition-colors">
                Salon • Delano, CA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#6F6A64] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-call-btn"
              href={`tel:${settings.phone}`}
              onClick={handleCallClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#171717] border border-[#171717]/30 hover:border-[#171717] rounded-md transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
              <span className="hidden md:inline">{settings.displayPhone}</span>
              <span className="md:hidden">Call</span>
            </a>

            <button
              id="header-book-cta"
              onClick={handleBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#171717] text-[#F8F5EF] hover:bg-[#2a2a2a] rounded-md shadow-sm transition-all duration-200 hover:shadow"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A96A]" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${settings.phone}`}
              onClick={handleCallClick}
              className="p-2 text-[#171717] hover:text-[#A98748] rounded-md border border-[#E8E1D7] bg-[#F8F5EF]"
              aria-label="Call Penelope Salon"
            >
              <Phone className="w-4 h-4 text-[#C9A96A]" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#171717] hover:text-[#A98748] rounded-md border border-[#E8E1D7] bg-[#F8F5EF]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-sm sm:hidden flex flex-col justify-start"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-[#F8F5EF] w-full max-h-[85vh] overflow-y-auto border-b border-[#E8E1D7] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D7]">
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#171717] uppercase">
                  Penelope Salon
                </span>
                <p className="text-xs text-[#6F6A64]">Delano, CA • 1031 Main St</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#6F6A64] hover:text-[#171717] rounded-md"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left py-3 px-3 rounded-md text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#E8E1D7] text-[#171717] font-semibold'
                        : 'text-[#222222] hover:bg-[#E8E1D7]/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#C9A96A]" />}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E1D7] space-y-3">
              <button
                onClick={handleBookClick}
                className="w-full py-3 px-4 bg-[#171717] text-[#F8F5EF] text-sm font-semibold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2 shadow"
              >
                <Calendar className="w-4 h-4 text-[#C9A96A]" />
                Book an Appointment
              </button>
              <a
                href={`tel:${settings.phone}`}
                onClick={handleCallClick}
                className="w-full py-3 px-4 border border-[#171717] text-[#171717] text-sm font-semibold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A96A]" />
                Call {settings.displayPhone}
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E1D7] text-xs text-[#6F6A64] space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96A]" />
                1031 Main St, Delano, CA 93215
              </p>
              <p className="text-[11px] text-[#6F6A64]">
                ★★★★★ 4.4 Google Rating • 69 Reviews
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
