import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useSalon } from '../../context/SalonContext';
import { Phone, MapPin, Clock, Star, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { settings, trackEvent } = useSalon();

  const handleCall = () => {
    trackEvent('phone_click', 'Footer Phone Click');
  };

  const handleDirections = () => {
    trackEvent('directions_click', 'Footer Directions Click');
  };

  return (
    <footer id="main-footer" className="bg-[#171717] text-[#E8E1D7] pt-16 pb-24 md:pb-12 border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#2a2a2a]">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-wider text-[#F8F5EF] uppercase">
                Penelope
              </span>
              <p className="text-xs tracking-[0.25em] text-[#C9A96A] uppercase font-sans font-medium">
                Salon • Delano, CA
              </p>
            </div>
            <p className="text-sm text-[#E8E1D7]/80 leading-relaxed max-w-sm">
              Beauty, style, and self-care in Delano, California. Step in for a relaxing salon experience and leave feeling confident and refreshed.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex text-[#C9A96A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A96A]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#F8F5EF]">
                4.4 Rating
              </span>
              <span className="text-xs text-[#E8E1D7]/60">
                (69 Google Reviews)
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F8F5EF] tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services & Pricing', path: '/services' },
                { label: 'About the Salon', path: '/about' },
                { label: 'Client Gallery', path: '/gallery' },
                { label: 'Verified Reviews', path: '/reviews' },
                { label: 'Frequently Asked Questions', path: '/faq' },
                { label: 'Contact & Location', path: '/contact' },
                { label: 'Request an Appointment', path: '/book' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigateTo(item.path)}
                    className="text-[#E8E1D7]/75 hover:text-[#C9A96A] transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#F8F5EF] tracking-wide mb-4">
              Visit & Contact
            </h4>
            <div className="space-y-3 text-sm text-[#E8E1D7]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A96A] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#F8F5EF]">{settings.address}</p>
                  <p>{settings.city}, {settings.state} {settings.zip}</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDirections}
                    className="inline-flex items-center gap-1 text-xs text-[#C9A96A] hover:underline mt-1 font-medium"
                  >
                    Get Directions <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-4 h-4 text-[#C9A96A] shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  onClick={handleCall}
                  className="font-medium text-[#F8F5EF] hover:text-[#C9A96A] transition-colors"
                >
                  {settings.displayPhone}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#C9A96A] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#F8F5EF]">Hours of Service</p>
                  <p className="text-xs text-[#E8E1D7]/70">
                    Open 24 hours according to current business listing.
                  </p>
                  <p className="text-[11px] text-[#C9A96A] mt-0.5 italic">
                    Please call ahead to confirm stylist availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Book CTA & Local Trust */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#F8F5EF] tracking-wide mb-4">
              Book Your Visit
            </h4>
            <p className="text-sm text-[#E8E1D7]/80 leading-relaxed">
              Experience attentive hair care, vibrant color, and relaxing personal service right here in Delano.
            </p>
            <button
              id="footer-book-btn"
              onClick={() => {
                trackEvent('appointment_start', 'Footer CTA');
                navigateTo('/book');
              }}
              className="w-full py-3 px-4 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors shadow"
            >
              Book an Appointment
            </button>
            <a
              id="footer-call-btn"
              href={`tel:${settings.phone}`}
              onClick={handleCall}
              className="w-full py-2.5 px-4 border border-[#E8E1D7]/30 hover:border-[#E8E1D7] text-[#F8F5EF] font-medium text-xs tracking-wider uppercase rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
              Call Now: {settings.displayPhone}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E1D7]/60 gap-4">
          <p>© {new Date().getFullYear()} Penelope Salon. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-[#E8E1D7] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('/terms')}
              className="hover:text-[#E8E1D7] transition-colors"
            >
              Terms of Service
            </button>
            <button
              id="footer-admin-link"
              onClick={() => navigateTo('/admin')}
              className="hover:text-[#C9A96A] transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
