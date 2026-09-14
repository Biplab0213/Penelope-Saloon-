import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowUpRight, 
  Calendar, 
  Sparkles, 
  Info 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, submitInquiry, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!phone.trim()) errs.phone = 'Please provide your phone number.';
    if (!message.trim()) errs.message = 'Please provide a message or inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitInquiry({
      name,
      phone,
      email: email.trim() || undefined,
      message,
    });

    setIsSubmitted(true);
  };

  const handleCall = () => {
    trackEvent('phone_click', 'Contact Page Call');
  };

  const handleDirections = () => {
    trackEvent('directions_click', 'Contact Page Directions');
  };

  return (
    <div id="contact-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Contact Penelope Salon | Hair & Beauty Salon in Delano, CA"
        description="Contact Penelope Salon at 1031 Main St, Delano, CA 93215. Call 661-372-7001, get directions, or send an inquiry for haircuts, color, and salon services."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Get in Touch with Penelope Salon</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Contact & Location
          </h1>

          <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed">
            Have a question about styling, availability, or consultations? Stop by our salon on Main Street or reach out below.
          </p>
        </div>

        {/* 2-Column Split: Info/Map & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Info & Map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#171717]">
                Salon Information
              </h2>

              <div className="space-y-5 text-sm text-[#222222]">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#171717]">Penelope Salon</p>
                    <p className="text-[#6F6A64]">{settings.address}</p>
                    <p className="text-[#6F6A64]">{settings.city}, {settings.state} {settings.zip}</p>
                    <p className="text-xs text-[#6F6A64] font-mono mt-1">Coordinates: 35.770239, -119.246060</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2.5">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=1031+Main+St,+Delano,+CA+93215"
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleDirections}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#171717] hover:text-[#A98748] underline"
                      >
                        Get Directions via Google Maps <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <span className="text-[#D8D0C4]">•</span>
                      <button
                        onClick={() => navigateTo('/salon-in-delano-ca')}
                        className="text-xs font-semibold text-[#171717] hover:text-[#A98748] underline"
                      >
                        Delano Salon Page →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 pt-3 border-t border-[#E8E1D7]">
                  <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#171717]">Telephone Inquiries</p>
                    <a
                      href={`tel:${settings.phone}`}
                      onClick={handleCall}
                      className="font-serif text-xl font-bold text-[#171717] hover:text-[#A98748] transition-colors"
                    >
                      {settings.displayPhone}
                    </a>
                    <p className="text-xs text-[#6F6A64] mt-0.5">
                      Call for instant questions or quick appointment scheduling.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 pt-3 border-t border-[#E8E1D7]">
                  <div className="w-10 h-10 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#171717]">Hours of Service</p>
                    <p className="text-sm font-semibold text-[#171717]">
                      Open 24 hours according to current business listing
                    </p>
                    <p className="text-xs text-[#6F6A64] mt-1 leading-relaxed">
                      Stylist schedules and station availability may vary. We recommend calling in advance or submitting an inquiry before arriving.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-[#E8E1D7] shadow-sm bg-[#E8E1D7] aspect-[16/9]">
              <iframe
                title="Penelope Salon Map"
                src="https://maps.google.com/maps?q=1031+Main+St,+Delano,+CA+93215&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-10 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#171717] mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-[#6F6A64] mb-6">
                Fill out the form below and we will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#171717]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-[#6F6A64] max-w-sm mx-auto">
                    Thank you for reaching out to Penelope Salon. We will respond to you at {phone} as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded mt-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Your Name <span className="text-[#A98748]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-sm text-[#171717] focus:ring-2 focus:ring-[#C9A96A]/60 focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Phone Number <span className="text-[#A98748]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="661-372-7001"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-sm text-[#171717] focus:ring-2 focus:ring-[#C9A96A]/60 focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-sm text-[#171717] focus:ring-2 focus:ring-[#C9A96A]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      How Can We Help? <span className="text-[#A98748]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about the service you are looking for or your questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-sm text-[#171717] focus:ring-2 focus:ring-[#C9A96A]/60 focus:outline-none resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C9A96A]" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
