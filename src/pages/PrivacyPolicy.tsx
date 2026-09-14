import React from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { settings } = useSalon();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHead
        title="Privacy Policy | Penelope Salon Delano"
        description="Privacy policy and data handling disclosures for Penelope Salon in Delano, CA."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C9A96A] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#6F6A64] mb-8">Last Updated: January 2026</p>

        <div className="prose text-sm text-[#6F6A64] space-y-6 leading-relaxed">
          <p>
            Penelope Salon, located at {settings.address}, {settings.city}, {settings.state} {settings.zip} ("we," "our," or "us"), respects your privacy and is committed to protecting personal information provided through our website.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            1. Information We Collect
          </h2>
          <p>
            When you request an appointment, submit an inquiry, or contact us through this website, we may collect information including your name, telephone number, email address, service preferences, and any notes or messages you provide.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            2. How We Use Your Information
          </h2>
          <p>
            We use your contact information solely to coordinate salon appointment availability, respond to client inquiries, provide requested beauty consultations, and communicate updates regarding your visit. We do not sell or lease your personal information to third-party marketers.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            3. Communication & Consent
          </h2>
          <p>
            By submitting an appointment request with your phone number, you consent to receive telephone calls or SMS messages from our salon staff regarding the scheduling and confirmation of your requested service.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#171717] pt-4">
            4. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to modify your information, please contact us at {settings.displayPhone} or visit us in person at {settings.address}, {settings.city}, {settings.state} {settings.zip}.
          </p>
        </div>
      </div>
    </div>
  );
};
