import React from 'react';
import { ReviewItem } from '../../types';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      id={`review-card-${review.id}`}
      className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative"
    >
      <div className="space-y-4">
        {/* Rating Stars & Badge */}
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
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6F6A64] bg-[#E8E1D7]/60 px-2 py-0.5 rounded">
            <CheckCircle className="w-3 h-3 text-[#C9A96A]" />
            {review.source}
          </span>
        </div>

        {/* Review Quote */}
        <div className="relative">
          <Quote className="w-6 h-6 text-[#C9A96A]/20 absolute -top-2 -left-1 pointer-events-none" />
          <p className="text-sm sm:text-base text-[#222222] font-normal leading-relaxed italic pl-3 border-l-2 border-[#C9A96A]/40">
            "{review.text}"
          </p>
        </div>
      </div>

      {/* Author & Stylist info */}
      <div className="pt-5 mt-4 border-t border-[#E8E1D7] flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#171717]">{review.author}</p>
          <p className="text-[11px] text-[#6F6A64]">{review.date}</p>
        </div>

        {review.stylistMentioned && (
          <span className="text-[11px] font-medium bg-[#171717] text-[#C9A96A] px-2.5 py-1 rounded">
            Stylist: {review.stylistMentioned}
          </span>
        )}
      </div>
    </div>
  );
};
