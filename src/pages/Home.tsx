import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useSalon } from '../context/SalonContext';
import { salonImages } from '../assets/images';
import { SEOHead } from '../components/common/SEOHead';
import { TrustStrip } from '../components/common/TrustStrip';
import { ServiceCard } from '../components/common/ServiceCard';
import { TestimonialsCarousel } from '../components/common/TestimonialsCarousel';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Star, 
  ArrowRight, 
  Heart, 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { settings, services, reviews, gallery, faqs, trackEvent } = useSalon();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const featuredServices = services.filter((s) => s.published).slice(0, 4);
  const previewGallery = gallery.slice(0, 4);
  const previewFaqs = faqs.slice(0, 5);

  const handleBook = () => {
    trackEvent('appointment_start', 'Hero Book CTA');
    navigateTo('/book');
  };

  const handleCall = () => {
    trackEvent('phone_click', 'Hero Call CTA');
  };

  const handleDirections = () => {
    trackEvent('directions_click', 'Home Location Section');
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div id="home-page" className="min-h-screen">
      <SEOHead
        title="Penelope Salon | Beauty Salon in Delano, CA"
        description="Penelope Salon is a local beauty salon in Delano, CA at 1031 Main St. Explore salon services, read customer reviews, view photos, and request an appointment."
      />

      {/* 2. HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden pt-6 pb-14 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
                <span>BEAUTY • STYLE • SELF-CARE</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.12]">
                Feel Beautiful. <br />
                <span className="italic font-normal text-[#171717]/90">
                  Leave Confident.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed max-w-xl">
                Personalized beauty and hair care in the heart of Delano, California. Step in for a relaxing salon experience and leave feeling your best.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  id="hero-book-cta-primary"
                  onClick={handleBook}
                  className="px-8 py-4 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-sm font-semibold tracking-wider uppercase rounded-md shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2.5 active:scale-[0.99]"
                >
                  <Calendar className="w-4 h-4 text-[#C9A96A]" />
                  Book an Appointment
                </button>

                <a
                  id="hero-call-cta-secondary"
                  href={`tel:${settings.phone}`}
                  onClick={handleCall}
                  className="px-6 py-4 border border-[#171717]/30 hover:border-[#171717] text-[#171717] hover:bg-[#E8E1D7]/40 text-sm font-semibold tracking-wider uppercase rounded-md transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C9A96A]" />
                  Call {settings.displayPhone}
                </a>
              </div>

              {/* Trust Row */}
              <div className="pt-4 border-t border-[#E8E1D7] flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#C9A96A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A96A]" />
                    ))}
                  </div>
                  <span className="font-serif text-lg font-bold text-[#171717]">
                    {settings.googleRating}
                  </span>
                  <span className="text-xs text-[#6F6A64]">
                    Google Rating
                  </span>
                </div>

                <div className="h-4 w-[1px] bg-[#D8D0C4] hidden sm:block" />

                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#171717]">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A]" />
                  <span>{settings.googleReviewCount} Verified Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Side: Large Premium Salon Imagery with Real Reference */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-2xl border border-[#C9A96A]/30 -z-10 translate-x-2 translate-y-2 hidden sm:block" />

                {/* Main hero image: Real Storefront & Entrance */}
                <div className="rounded-xl overflow-hidden shadow-xl border border-[#E8E1D7] bg-[#171717] relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5]">
                  <img
                    src={salonImages.storefront}
                    alt="Penelope Salon storefront at 1031 Main St Delano CA"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid location tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#171717]/85 backdrop-blur-md border border-[#E8E1D7]/20 text-[#F8F5EF] flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#C9A96A] font-medium">
                        Downtown Delano Location
                      </p>
                      <p className="font-serif text-base font-bold text-[#F8F5EF]">
                        1031 Main Street
                      </p>
                      <p className="text-[11px] text-[#E8E1D7]/80">
                        Arched Windows • Walk-ins & Appointments
                      </p>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleDirections}
                      className="p-2.5 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] rounded-md transition-colors"
                      aria-label="Get directions to Penelope Salon"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Floating mini review card */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 max-w-xs bg-[#F8F5EF] p-4 rounded-lg shadow-lg border border-[#E8E1D7] items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-[#C9A96A]" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#171717]">"A calm, relaxing self-care experience"</p>
                    <p className="text-[#6F6A64] text-[11px]">— Verified Google Review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <TrustStrip />

      {/* 4. SERVICES PREVIEW */}
      <section id="services-preview" className="py-16 sm:py-20 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Carefully Crafted Hair & Beauty
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Beauty Services, Personalized For You
              </h2>
              <p className="text-[#6F6A64] text-base leading-relaxed">
                Whether you're refreshing your everyday look or preparing for something special, Penelope Salon is designed around a comfortable, personal experience.
              </p>
            </div>

            <button
              onClick={() => {
                trackEvent('service_view', 'View All Services Clicked');
                navigateTo('/services');
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#171717] hover:text-[#A98748] transition-colors pb-1 border-b-2 border-[#171717] hover:border-[#A98748] w-fit"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10 p-4 rounded-lg bg-[#E8E1D7]/40 border border-[#E8E1D7] text-center max-w-2xl mx-auto">
            <p className="text-xs text-[#6F6A64]">
              <span className="font-semibold text-[#171717]">Personalized Consultations:</span> Hair thickness, length, and custom coloring requirements vary per guest. Contact our stylists for customized estimates.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE PENELOPE SALON */}
      <section id="why-choose-us" className="py-16 sm:py-20 bg-[#E8E1D7]/30 border-y border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              The Penelope Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              A Salon Experience That Feels Personal
            </h2>
            <p className="text-sm sm:text-base text-[#6F6A64]">
              We believe a trip to the salon should be enjoyable, restorative, and tailored to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F8F5EF] p-7 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A]/60 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717] uppercase tracking-wider mb-2">
                Personal Attention
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Your appointment should feel personal, comfortable, and unrushed. We listen carefully to what you want to achieve.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8F5EF] p-7 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A]/60 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717] uppercase tracking-wider mb-2">
                Relaxing Atmosphere
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                A calm environment designed to make your salon visit enjoyable, featuring comfortable chairs and peaceful decor.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8F5EF] p-7 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A]/60 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717] uppercase tracking-wider mb-2">
                Professional Service
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Thoughtful service focused on helping you feel confident in your look, using professional hair care and color tools.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F8F5EF] p-7 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A]/60 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717] uppercase tracking-wider mb-2">
                Local & Convenient
              </h3>
              <p className="text-sm text-[#6F6A64] leading-relaxed">
                Conveniently located on Main Street in Delano with easy street parking, brick sidewalks, and walk-in accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SALON EXPERIENCE / INTERIOR SHOWCASE */}
      <section id="salon-atmosphere" className="py-16 sm:py-20 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-[#E8E1D7] shadow-sm aspect-[4/3]">
                  <img
                    src={salonImages.interior}
                    alt="Spacious modern interior of Penelope Salon with chandeliers"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-[#E8E1D7] shadow-sm aspect-[3/4]">
                  <img
                    src={salonImages.balayage}
                    alt="Rich caramel dimensional balayage hair work"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-lg overflow-hidden border border-[#E8E1D7] shadow-sm aspect-[3/4]">
                  <img
                    src={salonImages.highlights}
                    alt="Delicate blonde highlights and styling"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-[#E8E1D7] shadow-sm aspect-[4/3]">
                  <img
                    src={salonImages.washLounge}
                    alt="Serene shampoo basin wash lounge"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Description & Ambience */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                The Salon Atmosphere
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] leading-tight">
                Designed for Comfort, Styled with Care
              </h2>
              <p className="text-base text-[#6F6A64] leading-relaxed">
                Step off Main Street into an open, welcoming studio space illuminated by crystal chandeliers, comfortable styling stations, and relaxing shampoo sinks. Every detail is curated to give you an unhurried, peaceful experience where you can unwind.
              </p>

              <ul className="space-y-3 text-sm text-[#222222]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Bright, illuminated mirror styling stations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Comfortable reclining shampoo wash basins</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Clean, welcoming environment with modern decor</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <span>Downtown Delano setting with storefront arched windows</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="px-6 py-3 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  View Photo Gallery
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="px-6 py-3 border border-[#171717]/40 hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Learn About Our Salon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS & TESTIMONIALS SLIDER */}
      <section id="customer-reviews" className="py-16 sm:py-20 bg-[#E8E1D7]/20 border-t border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsCarousel
            reviews={reviews}
            googleRating={settings.googleRating}
            googleReviewCount={settings.googleReviewCount}
            googleReviewUrl={settings.googleReviewUrl}
            onNavigateToReviews={() => {
              trackEvent('review_click', 'Read More Reviews');
              navigateTo('/reviews');
            }}
            onTrackEvent={trackEvent}
          />
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section id="gallery-preview" className="py-16 sm:py-20 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Visual Inspiration
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Inside Penelope Salon
              </h2>
            </div>
            <button
              onClick={() => {
                trackEvent('gallery_view', 'Home Gallery Explore Link');
                navigateTo('/gallery');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717] hover:text-[#A98748] transition-colors pb-0.5 border-b border-[#171717]"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  trackEvent('gallery_view', item.title);
                  navigateTo('/gallery');
                }}
                className="group relative rounded-lg overflow-hidden bg-[#E8E1D7] aspect-[4/5] cursor-pointer shadow-sm border border-[#E8E1D7]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-xs text-[#F8F5EF] font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION + MAP */}
      <section id="location-map" className="py-16 sm:py-20 bg-[#E8E1D7]/30 border-t border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Location Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
                Easy To Find in Delano
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                Visit Our Main Street Salon
              </h2>
              <p className="text-[#6F6A64] text-base leading-relaxed">
                Located on the corner of Main Street in Delano, California. Easily recognizable by our white facade, black-framed arched glass windows, and classic brick walkway.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-[#F8F5EF] rounded-lg border border-[#E8E1D7]">
                  <MapPin className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#171717]">{settings.address}</p>
                    <p className="text-sm text-[#6F6A64]">
                      {settings.city}, {settings.state} {settings.zip}, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F8F5EF] rounded-lg border border-[#E8E1D7]">
                  <Phone className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#6F6A64] font-medium">Direct Line</p>
                    <a
                      href={`tel:${settings.phone}`}
                      onClick={handleCall}
                      className="font-bold text-base text-[#171717] hover:text-[#A98748] transition-colors"
                    >
                      {settings.displayPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleDirections}
                  className="px-6 py-3.5 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center gap-2 shadow transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C9A96A]" />
                  Get Directions
                </a>

                <a
                  href={`tel:${settings.phone}`}
                  onClick={handleCall}
                  className="px-6 py-3.5 border border-[#171717] hover:bg-[#E8E1D7] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C9A96A]" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Map Embed Section */}
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden shadow-lg border border-[#E8E1D7] bg-[#E8E1D7] aspect-[16/10] sm:aspect-[16/9] relative">
                {/* Embed Google Maps without exposing secret API keys */}
                <iframe
                  title="Penelope Salon 1031 Main St Delano CA Location Map"
                  src="https://maps.google.com/maps?q=1031+Main+St,+Delano,+CA+93215&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <p className="text-[11px] text-[#6F6A64] mt-2 text-right">
                1031 Main St, Delano, CA 93215 • Convenient street parking available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ PREVIEW */}
      <section id="faq-preview" className="py-16 sm:py-20 bg-[#F8F5EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
              Helpful Information
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#6F6A64]">
              Quick answers about our appointments, location, and salon services.
            </p>
          </div>

          <div className="space-y-4">
            {previewFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#E8E1D7] rounded-lg bg-[#F8F5EF] overflow-hidden transition-colors hover:border-[#C9A96A]/60"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-[#171717]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A96A] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-[#6F6A64] leading-relaxed border-t border-[#E8E1D7]/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigateTo('/faq')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717] hover:text-[#A98748] border-b border-[#171717] pb-0.5 transition-colors"
            >
              <span>View All Questions & Answers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section id="final-cta" className="py-20 sm:py-24 bg-[#171717] text-[#F8F5EF] relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#C9A96A]/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A96A]">
            Book Your Delano Appointment
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#F8F5EF]">
            Ready for Your Next Look?
          </h2>
          <p className="text-base sm:text-lg text-[#E8E1D7]/80 max-w-2xl mx-auto leading-relaxed">
            Book your appointment with Penelope Salon in Delano. Whether it's a cut, color refresh, or special occasion styling, our team is excited to welcome you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="final-book-btn"
              onClick={handleBook}
              className="w-full sm:w-auto px-8 py-4 bg-[#C9A96A] hover:bg-[#DFCA9B] text-[#171717] text-sm font-bold uppercase tracking-wider rounded-md shadow-lg transition-all active:scale-[0.99]"
            >
              Book an Appointment
            </button>

            <a
              id="final-call-btn"
              href={`tel:${settings.phone}`}
              onClick={handleCall}
              className="w-full sm:w-auto px-8 py-4 border border-[#E8E1D7]/30 hover:border-[#E8E1D7] text-[#F8F5EF] text-sm font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C9A96A]" />
              Call {settings.displayPhone}
            </a>
          </div>

          <p className="text-xs text-[#E8E1D7]/60 pt-4">
            1031 Main St, Delano, CA 93215 • ★★★★★ 4.4 Google Rating (69 Reviews)
          </p>
        </div>
      </section>
    </div>
  );
};
