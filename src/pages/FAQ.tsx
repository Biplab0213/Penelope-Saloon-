import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ChevronDown, Search, Phone, Calendar, Sparkles, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { faqs, settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIds, setOpenFaqIds] = useState<{ [key: string]: boolean }>({
    [faqs[0]?.id || '']: true,
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Appointments' },
    { id: 'location', label: 'Location & Parking' },
    { id: 'services', label: 'Services & Pricing' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div id="faq-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Penelope Salon FAQ | Delano Beauty Salon"
        description="Frequently asked questions about Penelope Salon in Delano, CA, including appointments, walk-ins, location, and services."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Answers to Common Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Frequently Asked Questions
          </h1>

          <p className="text-base text-[#6F6A64] leading-relaxed">
            Everything you need to know about visiting Penelope Salon on Main Street in Delano.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 text-[#6F6A64] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions (e.g. walk-ins, parking, pricing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#D8D0C4] bg-[#F8F5EF] text-sm text-[#171717] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider rounded-full transition-all ${
                  isSelected
                    ? 'bg-[#171717] text-[#F8F5EF]'
                    : 'bg-[#E8E1D7]/50 text-[#222222] hover:bg-[#E8E1D7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 mb-16">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openFaqIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="border border-[#E8E1D7] rounded-xl bg-[#F8F5EF] overflow-hidden transition-all hover:border-[#C9A96A]/60"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-[#171717]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A96A] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-[#6F6A64] leading-relaxed border-t border-[#E8E1D7]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#F8F5EF] rounded-xl border border-[#E8E1D7] p-6 mb-16">
            <p className="font-serif text-lg font-bold text-[#171717] mb-1">
              No matching questions found
            </p>
            <p className="text-xs text-[#6F6A64]">
              Try searching with another keyword or call our front desk directly.
            </p>
          </div>
        )}

        {/* Still Have Questions CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#171717] text-[#F8F5EF] text-center space-y-4 shadow-md">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Still Have Questions?
          </h2>
          <p className="text-sm text-[#E8E1D7]/80 max-w-md mx-auto">
            We are always happy to answer your questions regarding hair services, consultations, or scheduling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${settings.phone}`}
              onClick={() => trackEvent('phone_click', 'FAQ Bottom CTA')}
              className="px-6 py-3 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#171717]" />
              Call {settings.displayPhone}
            </a>

            <button
              onClick={() => navigateTo('/book')}
              className="px-6 py-3 border border-[#E8E1D7]/40 hover:border-[#E8E1D7] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#C9A96A]" />
              Request Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
