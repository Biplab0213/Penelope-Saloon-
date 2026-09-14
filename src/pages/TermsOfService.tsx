import React from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  const { settings } = useSalon();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHead
        title="Terms of Service | Penelope Salon Delano"
        description="Terms and service policies for Penelope Salon in Delano, CA."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C9A96A] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mb-6">
          Terms of Service & Salon Policies
        </h1>
        <p className="text-xs text-[#6F6A64] mb-8">Last Updated: January 2026</p>

        <div className="prose text-sm text-[#6F6A64] space-y-6 leading-relaxed">
          <p>
            Welcome to the official website of Penelope Salon. By accessing or using this website, you agree to comply with and be bound by the following terms and guidelines.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            1. Appointment Requests & Confirmations
          </h2>
          <p>
            Online appointment submissions through this website represent appointment requests, not guaranteed bookings. Appointments are officially confirmed once our salon staff contacts you via telephone or text message to verify chair availability with your designated stylist.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            2. Services & Pricing Consultations
          </h2>
          <p>
            Service prices and durations displayed on this website are estimates. Final investment is determined upon in-person consultation with your stylist based on individual hair length, thickness, color history, and specific technique requirements.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            3. Cancellations & Rescheduling
          </h2>
          <p>
            We appreciate at least 24 hours advance notice if you need to reschedule or cancel your appointment so our stylists may accommodate other clients on our waitlist.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            4. Salon Questions
          </h2>
          <p>
            For any questions regarding these terms, please contact Penelope Salon directly at {settings.displayPhone}.
          </p>
        </div>
      </div>
    </div>
  );
};
