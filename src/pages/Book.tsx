import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { 
  Calendar, 
  Clock, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  MapPin, 
  ArrowLeft 
} from 'lucide-react';

export const Book: React.FC = () => {
  const { services, settings, createAppointment, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();

  // Parse any preselected service from URL query param
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [agreedToContact, setAgreedToContact] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setSelectedServiceId(serviceParam);
    } else if (services.length > 0) {
      setSelectedServiceId(services[0].id);
    }
  }, [services]);

  // Available time slots for selection
  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
  ];

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Please provide your full name.';
    if (!phone.trim()) {
      errors.phone = 'Please provide a contact phone number.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!preferredDate) errors.preferredDate = 'Please select a preferred date.';
    if (!preferredTime) errors.preferredTime = 'Please select a preferred time slot.';
    if (!selectedServiceId) errors.service = 'Please select a service.';
    if (!agreedToContact) {
      errors.agreedToContact = 'Please confirm agreement to be contacted.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chosenService = services.find((s) => s.id === selectedServiceId);
    const serviceName = chosenService ? chosenService.name : 'General Consultation';

    const reqId = createAppointment({
      fullName,
      phone,
      email: email.trim() || undefined,
      preferredDate,
      preferredTime,
      serviceId: selectedServiceId,
      serviceName,
      message: message.trim() || undefined,
    });

    setSubmittedRequestId(reqId);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="book-appointment-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Book an Appointment | Penelope Salon Delano, CA"
        description="Request an appointment at Penelope Salon, 1031 Main St, Delano, CA. Select your preferred haircut, color, or treatment service date and time."
        canonicalPath="/book"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Book Appointment', path: '/book' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Appointment Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Request an Appointment
          </h1>

          <p className="text-base text-[#6F6A64] leading-relaxed">
            Fill out your desired date and service below. Our salon team will get in touch with you promptly to confirm stylist availability.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-sm text-[#171717] font-medium">
            <span>Prefer to call?</span>
            <a
              href={`tel:${settings.phone}`}
              onClick={() => trackEvent('phone_click', 'Booking Page Top Link')}
              className="text-[#171717] font-bold underline hover:text-[#A98748] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
              {settings.displayPhone}
            </a>
          </div>
        </div>

        {/* Confirmation State */}
        {isSubmitted ? (
          <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-8 sm:p-12 text-center shadow-lg space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-[#171717] text-[#C9A96A] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-8 h-8 text-[#C9A96A]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#171717]">
                Thank you! Your appointment request has been received.
              </h2>
              <p className="text-base text-[#6F6A64] max-w-lg mx-auto">
                Penelope Salon will contact you at <span className="font-semibold text-[#171717]">{phone}</span> to confirm availability.
              </p>
            </div>

            <div className="p-5 bg-[#E8E1D7]/50 rounded-xl max-w-md mx-auto text-left text-xs sm:text-sm text-[#222222] space-y-2 border border-[#E8E1D7]">
              <p>
                <span className="font-semibold text-[#6F6A64]">Requested Service:</span>{' '}
                {services.find((s) => s.id === selectedServiceId)?.name}
              </p>
              <p>
                <span className="font-semibold text-[#6F6A64]">Preferred Date & Time:</span>{' '}
                {preferredDate} at {preferredTime}
              </p>
              <p>
                <span className="font-semibold text-[#6F6A64]">Client:</span> {fullName}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E1D7] flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-3 border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#E8E1D7]"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="px-6 py-3 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#2a2a2a]"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl p-6 sm:p-10 shadow-sm">
            {/* Notice banner: Request vs guaranteed booking */}
            <div className="mb-8 p-4 rounded-lg bg-[#E8E1D7]/50 border border-[#E8E1D7] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
              <div className="text-xs text-[#6F6A64] leading-relaxed">
                <span className="font-bold text-[#171717]">Appointment Request Notice:</span> Submitting this form requests an appointment slot. Our staff will review chair availability and call or message you to confirm.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Full Name <span className="text-[#A98748]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Phone Number <span className="text-[#A98748]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="661-372-7001"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Service <span className="text-[#A98748]">*</span>
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  >
                    <option value="">Select a service...</option>
                    {services
                      .filter((s) => s.published)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.categoryLabel})
                        </option>
                      ))}
                    <option value="custom">Other / Consultation</option>
                  </select>
                  {formErrors.service && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.service}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Preferred Date <span className="text-[#A98748]">*</span>
                  </label>
                  <input
                    type="date"
                    min={minDateString}
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  />
                  {formErrors.preferredDate && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Preferred Time <span className="text-[#A98748]">*</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent"
                  >
                    <option value="">Choose a time slot...</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {formErrors.preferredTime && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Message / Notes / Stylist request */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                  Message / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention hair length, current color, specific goals, or preferred stylist (e.g. Daisy)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] bg-white text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]/60 focus:border-transparent resize-none"
                />
              </div>

              {/* Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToContact}
                    onChange={(e) => setAgreedToContact(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#D8D0C4] text-[#171717] focus:ring-[#C9A96A]"
                  />
                  <span className="text-xs text-[#6F6A64]">
                    I agree that Penelope Salon may contact me regarding my appointment request via phone or SMS text message.
                  </span>
                </label>
                {formErrors.agreedToContact && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.agreedToContact}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-sm font-semibold uppercase tracking-wider rounded-md shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C9A96A]" />
                  Request Appointment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
