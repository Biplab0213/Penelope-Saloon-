import React from 'react';
import { Star, MapPin, Award, Navigation } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const TrustStrip: React.FC = () => {
  const { settings } = useSalon();

  return (
    <section id="trust-strip" className="bg-[#E8E1D7]/50 border-y border-[#E8E1D7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D8D0C4]/60">
          {/* Rating */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="w-11 h-11 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0 shadow-sm">
              <Star className="w-5 h-5 fill-[#C9A96A]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold text-[#171717]">
                  {settings.googleRating}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A96A]">
                  / 5.0
                </span>
              </div>
              <p className="text-xs text-[#6F6A64] font-medium">Google Rating</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#171717]">
                {settings.googleReviewCount}
              </span>
              <p className="text-xs text-[#6F6A64] font-medium">Customer Reviews</p>
            </div>
          </div>

          {/* Delano, CA */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-[#171717]">
                Delano, CA
              </span>
              <p className="text-xs text-[#6F6A64] font-medium">Trusted Local Salon</p>
            </div>
          </div>

          {/* 1031 Main St */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-11 h-11 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0 shadow-sm">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-[#171717]">
                1031 Main St
              </span>
              <p className="text-xs text-[#6F6A64] font-medium">Corner of Downtown</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
