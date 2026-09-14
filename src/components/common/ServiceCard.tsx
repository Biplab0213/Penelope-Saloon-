import React from 'react';
import { ServiceItem } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import { useSalon } from '../../context/SalonContext';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { navigateTo } = useNavigation();
  const { trackEvent } = useSalon();

  const handleCardClick = () => {
    trackEvent('service_view', service.name);
    navigateTo(`/services/${service.slug}`);
  };

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('appointment_start', `Service: ${service.name}`);
    navigateTo(`/book?service=${encodeURIComponent(service.id)}`);
  };

  return (
    <div
      id={`service-card-${service.slug}`}
      onClick={handleCardClick}
      className="group bg-[#F8F5EF] border border-[#E8E1D7] rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-[#C9A96A]/60 cursor-pointer"
    >
      <div>
        {/* Service Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E1D7]">
          <img
            src={service.imageUrl}
            alt={service.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-sm text-[#F8F5EF] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
            {service.categoryLabel}
          </div>
          {service.featured && (
            <div className="absolute top-3 right-3 bg-[#C9A96A] text-[#171717] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#A98748] transition-colors leading-snug mb-2">
            {service.name}
          </h3>
          <p className="text-sm text-[#6F6A64] line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>

          <div className="flex items-center justify-between text-xs text-[#6F6A64] pt-2 border-t border-[#E8E1D7]">
            <span className="font-medium text-[#171717] bg-[#E8E1D7]/50 px-2.5 py-1 rounded">
              {service.priceDisplay}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C9A96A]" />
              {service.durationDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
        <button
          onClick={handleBook}
          className="flex-1 py-2.5 px-3 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold tracking-wider uppercase rounded transition-colors text-center shadow-sm"
        >
          Request Appointment
        </button>
        <button
          onClick={handleCardClick}
          className="p-2.5 border border-[#E8E1D7] hover:border-[#171717] text-[#171717] rounded hover:bg-[#E8E1D7]/30 transition-colors"
          aria-label={`View details for ${service.name}`}
        >
          <ArrowRight className="w-4 h-4 text-[#C9A96A]" />
        </button>
      </div>
    </div>
  );
};
