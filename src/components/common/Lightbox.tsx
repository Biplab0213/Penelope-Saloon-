import React, { useEffect } from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <div
      id="gallery-lightbox"
      className="fixed inset-0 z-50 bg-[#171717]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#F8F5EF] hover:text-[#C9A96A] p-2 rounded-full bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] transition-all z-10"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 text-[#F8F5EF] hover:text-[#C9A96A] p-2 sm:p-3 rounded-full bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image container */}
      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg overflow-hidden max-h-[75vh] shadow-2xl bg-[#171717]">
          <img
            src={item.imageUrl}
            alt={item.altText}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-full object-contain mx-auto"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-3 text-center px-4">
          <p className="text-base font-medium text-[#F8F5EF]">{item.title}</p>
          {item.caption && (
            <p className="text-xs text-[#E8E1D7]/80 mt-0.5">{item.caption}</p>
          )}
          <p className="text-[11px] text-[#C9A96A] mt-1">
            {currentIndex + 1} of {items.length}
          </p>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 text-[#F8F5EF] hover:text-[#C9A96A] p-2 sm:p-3 rounded-full bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] transition-all z-10"
        aria-label="Next image"
      >
        <ChevronLeft className="w-6 h-6 rotate-180" />
      </button>
    </div>
  );
};
