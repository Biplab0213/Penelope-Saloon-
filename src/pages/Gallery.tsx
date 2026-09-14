import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { Lightbox } from '../components/common/Lightbox';
import { GalleryItem } from '../types';
import { Sparkles, Eye, Camera, Calendar } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery, settings, trackEvent } = useSalon();
  const { navigateTo } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'salon', label: 'Storefront & Exterior' },
    { id: 'interior', label: 'Salon Interior' },
    { id: 'styling', label: 'Styling Stations' },
    { id: 'results', label: 'Hair Results & Color' },
    { id: 'treatment', label: 'Treatments & Care' },
  ];

  const filteredItems = gallery.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleOpenLightbox = (item: GalleryItem) => {
    trackEvent('gallery_view', item.title);
    setActiveLightboxItem(item);
  };

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <div id="gallery-page" className="min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Penelope Salon Gallery | Hair & Beauty Photos Delano, CA"
        description="Explore the Penelope Salon photo gallery featuring our 1031 Main St Delano storefront, styling workstations, balayage, and haircuts."
        canonicalPath="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Salon Photography & Inspiration</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            Salon Gallery
          </h1>

          <p className="text-base sm:text-lg text-[#6F6A64] leading-relaxed">
            Take a look inside Penelope Salon at 1031 Main St in Delano. Explore our welcoming atmosphere, styling workstations, and client hair work.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

        {/* Editorial Masonry Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group relative rounded-xl overflow-hidden bg-[#E8E1D7] border border-[#E8E1D7] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-xs text-[#C9A96A] mb-1 font-semibold uppercase tracking-wider">
                    <span>{item.category}</span>
                    <span className="flex items-center gap-1 text-[#F8F5EF] bg-[#171717]/60 px-2 py-0.5 rounded">
                      <Eye className="w-3.5 h-3.5 text-[#C9A96A]" /> View
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F8F5EF]">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#E8E1D7]/80 mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F8F5EF] rounded-xl border border-[#E8E1D7] max-w-md mx-auto p-8">
            <Camera className="w-10 h-10 text-[#C9A96A] mx-auto mb-3" />
            <p className="font-serif text-xl font-bold text-[#171717] mb-2">
              Gallery coming soon.
            </p>
            <p className="text-xs text-[#6F6A64]">
              We are actively capturing new photos of client styles and salon updates.
            </p>
          </div>
        )}

        {/* Gallery CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-[#E8E1D7]/40 border border-[#E8E1D7] max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Inspired By What You See?
          </h2>
          <p className="text-sm text-[#6F6A64] max-w-xl mx-auto">
            Book an appointment today with Penelope Salon and let our team create your ideal look.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                trackEvent('appointment_start', 'Gallery Bottom CTA');
                navigateTo('/book');
              }}
              className="px-6 py-3 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md shadow"
            >
              Book an Appointment
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="px-6 py-3 border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#E8E1D7]"
            >
              Call {settings.displayPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activeLightboxItem && (
        <Lightbox
          item={activeLightboxItem}
          items={filteredItems}
          onClose={() => setActiveLightboxItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};
