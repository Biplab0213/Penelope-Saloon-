import React from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { salonImages } from '../assets/images';
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Star,
  CheckCircle2
} from 'lucide-react';

export const About: React.FC = () => {
  const { settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  const handleBook = () => {
    trackEvent('appointment_start', 'About Page CTA');
    navigateTo('/book');
  };

  const handleCall = () => {
    trackEvent('phone_click', 'About Page Call');
  };

  const handleDirections = () => {
    trackEvent('directions_click', 'About Page Directions');
  };

  return (
    <div id="about-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="About Penelope Salon | Hair & Beauty Salon in Delano, CA"
        description="Learn more about Penelope Salon, a premier hair and beauty salon located at 1031 Main St in downtown Delano, CA. Meet our team and discover our approach."
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Delano, California • 1031 Main St</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Welcome to Penelope Salon
          </h1>

          <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed">
            Located at 1031 Main St in Delano, California, Penelope Salon is a local beauty destination focused on creating a comfortable and enjoyable salon experience.
          </p>
        </div>

        {/* Real Storefront & Interior Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E8E1D7] bg-[#171717] aspect-[4/3] relative">
              <img
                src={salonImages.storefront}
                alt="Penelope Salon exterior on Main Street in Delano CA"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#171717]/80 backdrop-blur-sm text-[#F8F5EF] text-xs px-3 py-1.5 rounded">
                Storefront at 1031 Main Street
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              A Space Built Around Personal Care
            </h2>
            <p className="text-[#6F6A64] leading-relaxed">
              We know that finding the right salon is about more than just a quick cut. It’s about trust, personal attention, and walking out feeling revitalized.
            </p>
            <p className="text-[#6F6A64] leading-relaxed">
              From our spacious styling area under warm chandeliers to our comfortable wash basins, we’ve created a calm haven where you can take a moment for yourself while receiving thoughtful hair care.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#E8E1D7]/40 rounded-lg border border-[#E8E1D7]">
                <p className="font-serif text-2xl font-bold text-[#171717]">4.4★</p>
                <p className="text-xs text-[#6F6A64] font-medium">Google Rating</p>
              </div>
              <div className="p-4 bg-[#E8E1D7]/40 rounded-lg border border-[#E8E1D7]">
                <p className="font-serif text-2xl font-bold text-[#171717]">69</p>
                <p className="text-xs text-[#6F6A64] font-medium">Customer Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Experience Section */}
        <div className="py-12 border-t border-[#E8E1D7] mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              The Client Experience
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#171717]">
              What You Can Expect When You Walk In
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5EF] p-6 rounded-lg border border-[#E8E1D7] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                Warm & Welcoming
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Whether it is your first time visiting or you are a regular client, you’ll receive a warm, friendly greeting and unhurried attention.
              </p>
            </div>

            <div className="bg-[#F8F5EF] p-6 rounded-lg border border-[#E8E1D7] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                Tailored Consultations
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                We take time to look at your inspiration photos, discuss your hair type, and explain what steps will achieve your desired result.
              </p>
            </div>

            <div className="bg-[#F8F5EF] p-6 rounded-lg border border-[#E8E1D7] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                Clean & Tidy Environment
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                As our clients frequently highlight in reviews, our styling stations, wash lounges, and facilities are kept clean and organized.
              </p>
            </div>
          </div>
        </div>

        {/* Interior Imagery Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          <div className="rounded-xl overflow-hidden border border-[#E8E1D7] aspect-[16/10] bg-[#171717]">
            <img
              src={salonImages.interior}
              alt="Penelope Salon interior with chandeliers and styling chairs"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-[#E8E1D7] aspect-[16/10] bg-[#171717]">
            <img
              src={salonImages.washLounge}
              alt="Comfortable wash basin area at Penelope Salon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Location & Neighborhood Section */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#E8E1D7]/40 border border-[#E8E1D7] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Downtown Delano
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#171717]">
                Proudly Serving the Delano Community
              </h2>
              <p className="text-sm sm:text-base text-[#6F6A64] leading-relaxed">
                Penelope Salon is situated right in the center of Delano at 1031 Main Street. We take pride in serving local families, professionals, students, and visitors across the Central Valley. Walk in or call ahead to book your visit.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                target="_blank"
                rel="noreferrer"
                onClick={handleDirections}
                className="py-3 px-5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#C9A96A]" />
                Get Directions
              </a>

              <a
                href={`tel:${settings.phone}`}
                onClick={handleCall}
                className="py-3 px-5 border border-[#171717] hover:bg-[#E8E1D7] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A96A]" />
                Call {settings.displayPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center bg-[#171717] text-[#F8F5EF] p-10 sm:p-14 rounded-2xl space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Experience Penelope Salon for Yourself
          </h2>
          <p className="text-[#E8E1D7]/80 max-w-xl mx-auto text-sm sm:text-base">
            Ready for your next look? Send us an appointment request or give us a call today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleBook}
              className="px-8 py-3.5 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
            >
              Request an Appointment
            </button>
            <a
              href={`tel:${settings.phone}`}
              onClick={handleCall}
              className="px-6 py-3.5 border border-[#E8E1D7]/40 hover:border-[#E8E1D7] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C9A96A]" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
