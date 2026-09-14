import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { salonImages } from '../assets/images';
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  Star, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  Compass, 
  Car, 
  Scissors 
} from 'lucide-react';

export const SalonInDelano: React.FC = () => {
  const { settings, services, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const localFaqs = [
    {
      question: 'Where is Penelope Salon located in Delano, CA?',
      answer: 'Penelope Salon is situated at 1031 Main St, Delano, CA 93215 (Coordinates: 35.770239, -119.246060) in the heart of downtown Delano, between 10th and 11th Avenue. Look for our white exterior with black arched windows and brick walkway.'
    },
    {
      question: 'What hair services are available at Penelope Salon in Delano?',
      answer: 'Our Delano salon offers professional haircuts, custom balayage, dimensional foil highlights, root touch-ups, signature blowouts, deep scalp conditioning treatments, and special occasion updo styling.'
    },
    {
      question: 'Are walk-ins accepted or do I need an appointment?',
      answer: 'Walk-ins are warmly welcomed whenever chair and stylist availability permit. To guarantee your preferred appointment time with stylists such as Daisy, we recommend booking online or calling 661-372-7001 in advance.'
    },
    {
      question: 'What are Penelope Salon’s listed business hours in Delano?',
      answer: 'According to our official business listing, Penelope Salon is listed as Open 24 hours. Because specific stylist schedules and station availability may vary throughout the week, we encourage clients to call ahead or submit an appointment request.'
    },
    {
      question: 'Where can I park when visiting Penelope Salon?',
      answer: 'Convenient street parking is available directly along Main Street as well as adjacent cross streets right in front of the salon.'
    },
    {
      question: 'Does Penelope Salon serve surrounding areas near Delano?',
      answer: 'Yes! We proudly welcome clients from across Kern County and the southern Central Valley, including McFarland, Wasco, Richgrove, Earlimart, and Pixley.'
    }
  ];

  const handleBook = () => {
    trackEvent('appointment_start', 'Delano Landing Page Book CTA');
    navigateTo('/book');
  };

  const handleCall = () => {
    trackEvent('phone_click', 'Delano Landing Page Call CTA');
  };

  const handleDirections = () => {
    trackEvent('directions_click', 'Delano Landing Page Directions CTA');
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Salon in Delano, CA', path: '/salon-in-delano-ca' },
  ];

  return (
    <div id="salon-in-delano-page" className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title="Salon in Delano, CA | Penelope Salon"
        description="Looking for the best hair salon in Delano, CA? Penelope Salon at 1031 Main St offers haircuts, balayage, dimensional highlights, blowouts, and scalp care. Call or book today."
        canonicalPath="/salon-in-delano-ca"
        breadcrumbs={breadcrumbs}
        faqSchema={localFaqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-[#6F6A64]">
            <li>
              <button
                onClick={() => navigateTo('/')}
                className="hover:text-[#171717] transition-colors"
              >
                Home
              </button>
            </li>
            <li className="text-[#C9A96A] font-semibold">/</li>
            <li className="text-[#171717] font-semibold" aria-current="page">
              Salon in Delano, CA
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#C9A96A]" />
              <span>1031 Main St, Delano, CA 93215</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.15]">
              Salon in Delano, CA <br />
              <span className="italic font-normal text-[#171717]/85 text-3xl sm:text-4xl lg:text-5xl">
                Penelope Salon on Main Street
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed max-w-2xl">
              Welcome to Penelope Salon, your premier neighborhood beauty salon located at 1031 Main St in historic downtown Delano, California. Whether you are looking for a precision haircut, custom balayage, radiant highlights, or special occasion styling, our welcoming salon is dedicated to helping you feel beautiful and leave confident.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleBook}
                className="px-8 py-4 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-bold uppercase tracking-wider rounded-md shadow-md transition-all flex items-center gap-2.5 active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4 text-[#C9A96A]" />
                Request Delano Appointment
              </button>

              <a
                href={`tel:${settings.phone}`}
                onClick={handleCall}
                className="px-6 py-4 border border-[#171717] hover:bg-[#E8E1D7]/40 text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A96A]" />
                Call {settings.displayPhone}
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                target="_blank"
                rel="noreferrer"
                onClick={handleDirections}
                className="px-6 py-4 border border-[#D8D0C4] hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#C9A96A]" />
                Get Directions <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 border-t border-[#E8E1D7] flex flex-wrap items-center gap-6 text-xs text-[#6F6A64]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C9A96A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A96A]" />
                  ))}
                </div>
                <span className="font-bold text-sm text-[#171717]">4.4 Google Rating</span>
                <span>(69 Reviews)</span>
              </div>
              <div className="h-4 w-[1px] bg-[#D8D0C4]" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C9A96A]" />
                <span>Listed 24 Hours • Call to Confirm Availability</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E8E1D7] aspect-[4/3] relative bg-[#171717]">
              <img
                src={salonImages.storefront}
                alt="Penelope Salon storefront at 1031 Main St, Delano, CA 93215"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#171717]/85 backdrop-blur-sm text-[#F8F5EF] text-xs p-3 rounded-lg border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold">Penelope Salon — Delano, CA</p>
                  <p className="text-[#E8E1D7]/70 text-[11px]">1031 Main St (Lat: 35.770239, Lng: -119.246060)</p>
                </div>
                <Compass className="w-5 h-5 text-[#C9A96A] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Delano Residents Choose Penelope Salon */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              Local Experience & Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Why Choose Penelope Salon in Delano
            </h2>
            <p className="text-base text-[#6F6A64] leading-relaxed">
              We combine friendly Central Valley hospitality with attentive salon care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717]">
                Tranquil Salon Atmosphere
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Step inside our Main Street location featuring crystal lighting, comfortable styling chairs, and a calming wash lounge designed to make your appointment a true self-care escape.
              </p>
            </div>

            <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717]">
                Personalized Consultations
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Every appointment begins with an in-depth conversation about your hair texture, daily lifestyle, and inspiration photos so you achieve results you love.
              </p>
            </div>

            <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#C9A96A] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717]">
                Prime Main Street Location
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Centrally situated on Main St with ample street parking, close to downtown Delano shops and eateries. Easy access for Delano, McFarland, and Wasco residents.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Services Offered in Delano */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Our Specialty Services
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mt-1">
                Hair & Beauty Services in Delano
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C9A96A] transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl overflow-hidden flex flex-col hover:border-[#C9A96A]/60 transition-all hover:shadow-md group"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-[#171717]">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} at Penelope Salon in Delano, CA`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#171717]/80 backdrop-blur-sm text-[#F8F5EF] text-[11px] font-semibold px-2.5 py-1 rounded">
                    {service.durationDisplay}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-[#A98748] uppercase">
                      {service.categoryLabel}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#171717] mt-1 group-hover:text-[#A98748] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#6F6A64] mt-2 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D7] flex items-center justify-between">
                    <button
                      onClick={() => navigateTo(`/services/${service.slug}`)}
                      className="text-xs font-semibold text-[#171717] hover:text-[#A98748] flex items-center gap-1 underline underline-offset-4"
                    >
                      Service Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo(`/book?service=${service.id}`)}
                      className="px-3.5 py-1.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold rounded"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Location, Hours, Map & Surrounding Cities */}
        <section className="mb-20 bg-[#E8E1D7]/30 border border-[#E8E1D7] rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Location & Accessibility
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Visit Us on Main Street
              </h2>
              <p className="text-sm sm:text-base text-[#6F6A64] leading-relaxed">
                Penelope Salon is proud to serve Delano and surrounding communities throughout the southern Central Valley.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-[#F8F5EF] rounded-xl border border-[#E8E1D7]">
                  <MapPin className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[#171717]">Penelope Salon</p>
                    <p className="text-sm text-[#6F6A64]">{settings.address}</p>
                    <p className="text-sm text-[#6F6A64]">{settings.city}, {settings.state} {settings.zip}</p>
                    <p className="text-xs text-[#6F6A64] mt-1 font-mono">
                      Coordinates: 35.770239, -119.246060
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F8F5EF] rounded-xl border border-[#E8E1D7]">
                  <Clock className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[#171717]">Operating Hours</p>
                    <p className="text-sm font-semibold text-[#171717]">
                      Open 24 hours (Current Business Listing)
                    </p>
                    <p className="text-xs text-[#6F6A64] mt-0.5">
                      Stylist schedules vary. Please call ahead to confirm availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F8F5EF] rounded-xl border border-[#E8E1D7]">
                  <Car className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[#171717]">Service Areas & Parking</p>
                    <p className="text-xs text-[#6F6A64] leading-relaxed">
                      Convenient street parking available right in front. Welcoming clients from Delano, McFarland (6 mi), Wasco (17 mi), Richgrove (8 mi), Earlimart (7 mi), and Pixley.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleDirections}
                  className="px-6 py-3.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center gap-2 shadow"
                >
                  <MapPin className="w-4 h-4 text-[#C9A96A]" />
                  Open in Google Maps
                </a>

                <a
                  href={`tel:${settings.phone}`}
                  onClick={handleCall}
                  className="px-6 py-3.5 border border-[#171717] hover:bg-[#E8E1D7] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C9A96A]" />
                  Call 661-372-7001
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8E1D7] bg-[#E8E1D7] aspect-[16/10] sm:aspect-[16/9]">
                <iframe
                  title="Penelope Salon Delano CA Map"
                  src="https://maps.google.com/maps?q=1031+Main+St,+Delano,+CA+93215&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <p className="text-[11px] text-[#6F6A64] mt-2 text-right">
                Located at 1031 Main St, Delano, CA 93215 (Coordinates: 35.770239, -119.246060)
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Local FAQs */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Delano Salon Questions & Answers
            </h2>
            <p className="text-sm text-[#6F6A64]">
              Common questions from local Delano clients about our services, location, and bookings.
            </p>
          </div>

          <div className="space-y-4">
            {localFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E8E1D7] rounded-xl bg-[#F8F5EF] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#171717]"
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
        </section>

        {/* Section 6: Final CTA */}
        <section className="bg-[#171717] text-[#F8F5EF] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              Visit Us Today in Delano
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F5EF]">
              Book Your Appointment at Penelope Salon
            </h2>
            <p className="text-base text-[#E8E1D7]/80 leading-relaxed max-w-xl mx-auto">
              Ready for fresh hair, radiant color, or relaxing salon care? Stop by 1031 Main St in Delano or reserve your appointment online today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleBook}
                className="w-full sm:w-auto px-8 py-4 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all active:scale-[0.99]"
              >
                Book Delano Appointment
              </button>
              <a
                href={`tel:${settings.phone}`}
                onClick={handleCall}
                className="w-full sm:w-auto px-8 py-4 border border-[#E8E1D7]/30 hover:border-[#E8E1D7] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C9A96A]" />
                Call {settings.displayPhone}
              </a>
            </div>

            <p className="text-xs text-[#E8E1D7]/60 pt-4">
              1031 Main St, Delano, CA 93215 • 4.4★ Rating (69 Google Reviews)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
