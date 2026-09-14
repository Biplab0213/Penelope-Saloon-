import React from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ReviewCard } from '../components/common/ReviewCard';
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2, Heart } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { reviews, settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  return (
    <div id="reviews-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Penelope Salon Reviews | 4.4★ Rated Salon in Delano, CA"
        description="Read customer reviews for Penelope Salon at 1031 Main St, Delano, CA. 4.4-star rating across 69 Google reviews for haircuts, balayage, and styling."
        canonicalPath="/reviews"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Client Experiences & Testimonials</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Client Reviews
          </h1>

          <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed">
            Read verified feedback from clients who visit Penelope Salon on Main Street in Delano.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div className="bg-[#E8E1D7]/40 border border-[#E8E1D7] rounded-2xl p-6 sm:p-10 mb-14 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Rating Number & Stars */}
            <div className="md:col-span-5 text-center md:text-left space-y-2 md:border-r md:border-[#D8D0C4] md:pr-8">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-[#171717]">
                  {settings.googleRating}
                </span>
                <span className="text-sm font-semibold text-[#6F6A64]">
                  out of 5.0
                </span>
              </div>
              <div className="flex justify-center md:justify-start text-[#C9A96A] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A96A]" />
                ))}
              </div>
              <p className="text-xs text-[#6F6A64] font-medium pt-1">
                Based on {settings.googleReviewCount} authentic Google customer reviews
              </p>
            </div>

            {/* Highlights & Leave Review Button */}
            <div className="md:col-span-7 space-y-4">
              <ul className="space-y-2 text-xs sm:text-sm text-[#222222]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Relaxing, unhurried self-care environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Talented, friendly stylists with attentive service</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Immaculate salon decor, clean styling stations, and comfort</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={settings.googleReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('review_click', 'Reviews Page Leave Google Review')}
                  className="px-5 py-2.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md inline-flex items-center gap-2 shadow"
                >
                  <MessageSquarePlus className="w-4 h-4 text-[#C9A96A]" />
                  Leave a Google Review
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  onClick={() => {
                    trackEvent('appointment_start', 'Reviews Page Book CTA');
                    navigateTo('/book');
                  }}
                  className="px-5 py-2.5 border border-[#171717] hover:bg-[#E8E1D7] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md"
                >
                  Book Your Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-16 text-center text-xs text-[#6F6A64] max-w-xl mx-auto">
          <p>
            Client quotes are sourced faithfully from our verified Google Business Profile for Penelope Salon in Delano, CA.
          </p>
        </div>
      </div>
    </div>
  );
};
