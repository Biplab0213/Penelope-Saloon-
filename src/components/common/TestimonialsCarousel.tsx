import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ReviewItem } from '../../types';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle, 
  Play, 
  Pause, 
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface TestimonialsCarouselProps {
  reviews: ReviewItem[];
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewUrl?: string;
  onNavigateToReviews?: () => void;
  onTrackEvent?: (category: string, action: string) => void;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  reviews,
  googleRating = 4.5,
  googleReviewCount = 73,
  googleReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
  onNavigateToReviews,
  onTrackEvent,
}) => {
  // Filter top-rated reviews (rating >= 4.5 or 5 stars), fallback to all sorted by rating
  const topRatedReviews = useMemo(() => {
    const filtered = reviews.filter((r) => r.rating >= 4.5);
    const list = filtered.length >= 3 ? filtered : reviews;
    return [...list].sort((a, b) => b.rating - a.rating);
  }, [reviews]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Measure visible cards based on container/viewport width
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const totalReviews = topRatedReviews.length;
  const maxIndex = Math.max(0, totalReviews - visibleCards);

  // Clamp index if resized
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    onTrackEvent?.('carousel_interaction', 'Testimonials Next Click');
  }, [maxIndex, onTrackEvent]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    onTrackEvent?.('carousel_interaction', 'Testimonials Prev Click');
  }, [maxIndex, onTrackEvent]);

  const goToSlide = (idx: number) => {
    const target = Math.min(Math.max(0, idx), maxIndex);
    setCurrentIndex(target);
    onTrackEvent?.('carousel_interaction', `Testimonials Jump to Slide ${target + 1}`);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered || totalReviews <= visibleCards) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, maxIndex, totalReviews, visibleCards]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation when carousel container is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <div 
      id="testimonials-slider-component"
      className="space-y-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Top-Rated Customer Testimonials Slider"
    >
      {/* Carousel Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E1D7] text-[#171717] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Top-Rated Customer Testimonials</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
            What Our Clients Say
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center text-[#C9A96A] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C9A96A]" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#171717]">
              {googleRating} Google Rating
            </span>
            <span className="text-xs text-[#6F6A64]">
              • Based on {googleReviewCount}+ authentic client reviews
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D5A27] bg-[#E8F0E6] px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Verified Local Salon
            </span>
          </div>
        </div>

        {/* Action buttons & Slider Navigation */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          {/* Slider Controls */}
          <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-lg border border-[#E8E1D7] shadow-xs">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
              className="w-8 h-8 rounded flex items-center justify-center text-[#6F6A64] hover:text-[#171717] hover:bg-[#E8E1D7]/50 transition-colors"
              title={isAutoPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
            >
              {isAutoPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            <div className="h-4 w-px bg-[#D8D0C4]" />

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded flex items-center justify-center text-[#171717] hover:bg-[#E8E1D7] transition-colors active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-medium text-[#6F6A64] px-1 select-none">
              {String(currentIndex + 1).padStart(2, '0')}/
              {String(totalReviews).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded flex items-center justify-center text-[#171717] hover:bg-[#E8E1D7] transition-colors active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {onNavigateToReviews && (
            <button
              type="button"
              onClick={onNavigateToReviews}
              className="px-4 py-2 bg-[#171717] hover:bg-[#2a2a2a] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
            >
              View All
            </button>
          )}

          {googleReviewUrl && (
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => onTrackEvent?.('review_click', 'Leave Google Review External')}
              className="px-3.5 py-2 border border-[#171717] hover:bg-[#E8E1D7] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <span>Write Review</span>
              <ExternalLink className="w-3 h-3 text-[#C9A96A]" />
            </a>
          )}
        </div>
      </div>

      {/* Carousel Track Container */}
      <div 
        className="overflow-hidden relative rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out py-1"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {topRatedReviews.map((review, idx) => (
            <div
              key={review.id}
              className="flex-shrink-0 px-2 sm:px-3 flex flex-col"
              style={{ width: `${100 / visibleCards}%` }}
              aria-hidden={idx < currentIndex || idx >= currentIndex + visibleCards}
            >
              <div 
                id={`carousel-card-${review.id}`}
                className="bg-[#F8F5EF] border border-[#E8E1D7] hover:border-[#C9A96A]/60 rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Source Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C9A96A]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? 'fill-[#C9A96A] text-[#C9A96A]'
                              : 'text-[#D8D0C4]'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-[#171717] ml-1">
                        {review.rating}.0
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6F6A64] bg-[#E8E1D7]/70 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3 text-[#C9A96A]" />
                      {review.source}
                    </span>
                  </div>

                  {/* Quote content */}
                  <div className="relative pt-1">
                    <Quote className="w-7 h-7 text-[#C9A96A]/20 absolute -top-2 -left-1 pointer-events-none group-hover:text-[#C9A96A]/40 transition-colors" />
                    <p className="text-sm sm:text-base text-[#222222] font-normal leading-relaxed italic pl-3 border-l-2 border-[#C9A96A]/50 line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>
                </div>

                {/* Author & Stylist Footer */}
                <div className="pt-5 mt-5 border-t border-[#E8E1D7] flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#171717]">{review.author}</p>
                    <p className="text-[11px] text-[#6F6A64]">{review.date}</p>
                  </div>

                  {review.stylistMentioned ? (
                    <span className="text-[11px] font-medium bg-[#171717] text-[#C9A96A] px-2.5 py-1 rounded whitespace-nowrap">
                      Stylist: {review.stylistMentioned}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-[#6F6A64] bg-[#E8E1D7]/50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Verified Client
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Dots / Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => goToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === dotIdx
                  ? 'w-7 bg-[#C9A96A]'
                  : 'w-2 bg-[#D8D0C4] hover:bg-[#6F6A64]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-[#6F6A64]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9A96A] animate-pulse" />
          <span>Swipe or use arrows to explore recent client testimonials</span>
        </div>
      </div>
    </div>
  );
};
