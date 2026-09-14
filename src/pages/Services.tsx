import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ServiceCard } from '../components/common/ServiceCard';
import { ServiceCategory } from '../types';
import { Phone, Calendar, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const { services, settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair Cuts' },
    { id: 'color', label: 'Hair Color & Balayage' },
    { id: 'styling', label: 'Styling & Blowouts' },
    { id: 'beauty', label: 'Hair Care & Treatments' },
    { id: 'special-occasions', label: 'Special Occasions' },
  ];

  const filteredServices = services
    .filter((s) => s.published)
    .filter((s) => (selectedCategory === 'all' ? true : s.category === selectedCategory));

  return (
    <div id="services-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Hair & Beauty Services in Delano, CA | Penelope Salon"
        description="Explore precision haircuts, balayage, highlights, blowouts, and restorative hair treatments at Penelope Salon in Delano, CA. View services and book online."
        canonicalPath="/services"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Delano Hair & Beauty Directory</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Salon Services
          </h1>

          <p className="text-[#6F6A64] text-base sm:text-lg leading-relaxed">
            From precision haircuts and lived-in balayage to special event styling, every service at Penelope Salon is personalized around your unique vision in a calm, welcoming setting.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  trackEvent('service_view', `Filter: ${cat.label}`);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wider rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#171717] text-[#F8F5EF] shadow-sm'
                    : 'bg-[#E8E1D7]/50 text-[#222222] hover:bg-[#E8E1D7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F8F5EF] rounded-lg border border-[#E8E1D7] max-w-md mx-auto p-8">
            <p className="font-serif text-xl font-bold text-[#171717] mb-2">
              Service details are being updated.
            </p>
            <p className="text-sm text-[#6F6A64] mb-6">
              Please call us directly for current availability and custom bookings.
            </p>
            <a
              href={`tel:${settings.phone}`}
              className="px-6 py-3 bg-[#171717] text-[#F8F5EF] rounded text-xs uppercase font-semibold tracking-wider inline-block"
            >
              Call {settings.displayPhone}
            </a>
          </div>
        )}

        {/* Pricing Policy Disclaimer */}
        <div className="mt-16 p-6 sm:p-8 rounded-xl bg-[#E8E1D7]/40 border border-[#E8E1D7] max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                Personalized Service & Transparent Estimates
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6A64] leading-relaxed">
                Because hair length, density, prior chemical history, and complex color placement vary with each client, we do not assume fixed one-size-fits-all prices. Call ahead or speak with your stylist for an accurate consultation.
              </p>
            </div>
            <a
              href={`tel:${settings.phone}`}
              className="px-5 py-2.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded shrink-0 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
              Call For Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
