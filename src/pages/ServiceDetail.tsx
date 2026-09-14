import React from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ServiceCard } from '../components/common/ServiceCard';
import { 
  ChevronRight, 
  Clock, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

interface ServiceDetailProps {
  slug?: string;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ slug }) => {
  const { services, getServiceBySlug, settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <h1 className="font-serif text-3xl font-bold text-[#171717] mb-3">
          Service Not Found
        </h1>
        <p className="text-sm text-[#6F6A64] mb-6 max-w-md">
          The requested service could not be located. View our complete services directory or call us directly.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigateTo('/services')}
            className="px-6 py-3 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded"
          >
            Back to Services
          </button>
          <a
            href={`tel:${settings.phone}`}
            className="px-6 py-3 border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded"
          >
            Call {settings.displayPhone}
          </a>
        </div>
      </div>
    );
  }

  const relatedServices = services
    .filter((s) => s.id !== service.id && s.published)
    .slice(0, 3);

  const handleBook = () => {
    trackEvent('appointment_start', `Service Detail: ${service.name}`);
    navigateTo(`/book?service=${encodeURIComponent(service.id)}`);
  };

  const handleCall = () => {
    trackEvent('phone_click', `Service Detail Call: ${service.name}`);
  };

  return (
    <div id="service-detail-page" className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title={service.seoTitle || `${service.name} in Delano, CA | Penelope Salon`}
        description={service.seoDescription || `${service.name} at Penelope Salon, 1031 Main St, Delano, CA. ${service.description} Request an appointment today.`}
        canonicalPath={`/services/${service.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        serviceSchema={{
          name: service.name,
          description: service.description,
          serviceType: service.categoryLabel,
          url: `/services/${service.slug}`,
          image: service.imageUrl,
          price: service.priceDisplay,
        }}
        faqSchema={
          service.faqs && service.faqs.length > 0
            ? service.faqs.map((f) => ({ question: f.q, answer: f.a }))
            : undefined
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F6A64] mb-8">
          <button
            onClick={() => navigateTo('/')}
            className="hover:text-[#171717] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A96A]" />
          <button
            onClick={() => navigateTo('/services')}
            className="hover:text-[#171717] transition-colors"
          >
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A96A]" />
          <span className="font-semibold text-[#171717] truncate">{service.name}</span>
        </nav>

        {/* Top Header & Large Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-[#E8E1D7] shadow-md aspect-[16/11] bg-[#171717] relative">
              <img
                src={service.imageUrl}
                alt={service.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-sm text-[#F8F5EF] text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
                {service.categoryLabel}
              </div>
            </div>
          </div>

          {/* Right Column: Title & Key Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Penelope Salon • Delano, CA
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] leading-tight">
                {service.name}
              </h1>
            </div>

            <p className="text-base text-[#6F6A64] leading-relaxed">
              {service.description}
            </p>

            {/* Duration & Price info */}
            <div className="p-5 rounded-lg bg-[#E8E1D7]/40 border border-[#E8E1D7] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6F6A64] uppercase tracking-wider">
                  Estimated Duration
                </span>
                <span className="text-sm font-bold text-[#171717] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C9A96A]" />
                  {service.durationDisplay}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#D8D0C4]/60">
                <span className="text-xs font-semibold text-[#6F6A64] uppercase tracking-wider">
                  Investment
                </span>
                <span className="text-sm font-bold text-[#171717]">
                  {service.priceDisplay}
                </span>
              </div>
              <p className="text-[11px] text-[#6F6A64] italic pt-1">
                Prices vary based on hair length, density, and custom technique. Call for a quick consultation.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBook}
                className="w-full py-4 px-6 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow transition-all active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4 text-[#C9A96A]" />
                Request Appointment for This Service
              </button>

              <a
                href={`tel:${settings.phone}`}
                onClick={handleCall}
                className="w-full py-3.5 px-6 border border-[#171717] hover:bg-[#E8E1D7]/50 text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#C9A96A]" />
                Call Salon: {settings.displayPhone}
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6F6A64]">
              <MapPin className="w-4 h-4 text-[#C9A96A]" />
              <span>1031 Main St, Delano, CA 93215 • Walk-ins & Appointments</span>
            </div>
          </div>
        </div>

        {/* Detailed What to Expect & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="p-7 rounded-xl bg-[#F8F5EF] border border-[#E8E1D7] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#171717]">
                Key Benefits
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#6F6A64]">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What to Expect */}
          {service.whatToExpect && (
            <div className="p-7 rounded-xl bg-[#F8F5EF] border border-[#E8E1D7] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#171717]">
                What to Expect
              </h2>
              <ul className="space-y-3">
                {service.whatToExpect.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#6F6A64]">
                    <Sparkles className="w-4 h-4 text-[#C9A96A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Preparation & Aftercare Tips */}
        {((service.preparationTips && service.preparationTips.length > 0) || (service.aftercareTips && service.aftercareTips.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {service.preparationTips && service.preparationTips.length > 0 && (
              <div className="p-7 rounded-xl bg-[#E8E1D7]/25 border border-[#E8E1D7] space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717]">
                  How to Prepare for Your Appointment
                </h3>
                <ul className="space-y-2.5">
                  {service.preparationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#6F6A64]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.aftercareTips && service.aftercareTips.length > 0 && (
              <div className="p-7 rounded-xl bg-[#E8E1D7]/25 border border-[#E8E1D7] space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717]">
                  At-Home Maintenance & Aftercare
                </h3>
                <ul className="space-y-2.5">
                  {service.aftercareTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#6F6A64]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-16 p-8 rounded-xl bg-[#E8E1D7]/30 border border-[#E8E1D7]">
            <h2 className="font-serif text-2xl font-bold text-[#171717] mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C9A96A]" />
              Frequently Asked Questions About {service.name}
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#F8F5EF] p-5 rounded-lg border border-[#E8E1D7]">
                  <p className="font-bold text-sm sm:text-base text-[#171717] mb-2">{faq.q}</p>
                  <p className="text-sm text-[#6F6A64] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local SEO Context & Delano Landing Page Internal Link */}
        <div className="mb-16 p-6 sm:p-8 rounded-xl border border-[#E8E1D7] bg-[#F8F5EF] text-sm text-[#6F6A64] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-serif text-lg font-bold text-[#171717]">
              Visit Penelope Salon in Downtown Delano, CA
            </p>
            <p className="text-xs sm:text-sm text-[#6F6A64]">
              Conveniently located at 1031 Main St, Delano, CA 93215. Welcoming clients from Delano, McFarland, Wasco, Richgrove, and Earlimart.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/salon-in-delano-ca')}
            className="shrink-0 px-4 py-2.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start sm:self-center"
          >
            Delano Salon Guide →
          </button>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="pt-8 border-t border-[#E8E1D7]">
            <h2 className="font-serif text-3xl font-bold text-[#171717] mb-8">
              Other Salon Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.id} service={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
