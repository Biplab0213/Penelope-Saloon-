import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useSalon } from '../../context/SalonContext';
import { Phone, Calendar } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { navigateTo, currentPath } = useNavigation();
  const { settings, trackEvent } = useSalon();

  // Don't show bottom bar if on the booking page itself to avoid redundant clutter
  const isBookingPage = currentPath === '/book';

  const handleCall = () => {
    trackEvent('phone_click', 'Mobile Sticky Bar');
  };

  const handleBook = () => {
    trackEvent('appointment_start', 'Mobile Sticky Bar');
    navigateTo('/book');
  };

  return (
    <>
      {/* Sticky Bottom Bar on mobile (sm:hidden) */}
      <div
        id="mobile-sticky-cta-bar"
        className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#171717]/95 backdrop-blur-md border-t border-[#2a2a2a] p-3 shadow-2xl safe-area-bottom"
      >
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            id="mobile-sticky-call-btn"
            href={`tel:${settings.phone}`}
            onClick={handleCall}
            className="flex-1 py-3 px-3 min-h-[44px] bg-[#2a2a2a] hover:bg-[#333333] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 border border-[#E8E1D7]/20 transition-all active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 text-[#C9A96A]" />
            Call Now
          </a>

          {!isBookingPage ? (
            <button
              id="mobile-sticky-book-btn"
              onClick={handleBook}
              className="flex-1 py-3 px-3 min-h-[44px] bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#171717]" />
              Book Appointment
            </button>
          ) : (
            <a
              id="mobile-sticky-directions-btn"
              href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('directions_click', 'Mobile Bar Directions')}
              className="flex-1 py-3 px-3 min-h-[44px] bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              Get Directions
            </a>
          )}
        </div>
      </div>
    </>
  );
};
