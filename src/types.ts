export interface BusinessSettings {
  id: string;
  businessName: string;
  phone: string;
  displayPhone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hoursNote: string;
  hours: {
    day: string;
    hours: string;
  }[];
  googleRating: number;
  googleReviewCount: number;
  googleProfileUrl: string;
  googleReviewUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  primaryKeyword: string;
  customStorefrontUrl?: string;
  customInteriorUrl?: string;
  customWashLoungeUrl?: string;
}

export type ServiceCategory = 'hair' | 'color' | 'styling' | 'beauty' | 'special-occasions';

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  priceDisplay: string; // e.g. "Contact for pricing" or "Starting at $45"
  durationMinutes?: number;
  durationDisplay: string; // e.g. "45-60 mins"
  imageUrl: string;
  featured: boolean;
  published: boolean;
  whatToExpect?: string[];
  idealFor?: string[];
  faqs?: { q: string; a: string }[];
  isEditablePlaceholder?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google' | 'Verified Client';
  stylistMentioned?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'salon' | 'hair' | 'styling' | 'interior' | 'results' | 'treatment';
  altText: string;
  featured?: boolean;
  caption?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  published: boolean;
}

export type AppointmentStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  serviceId: string;
  serviceName: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export type AnalyticsEventType = 
  | 'phone_click'
  | 'appointment_start'
  | 'appointment_submit'
  | 'directions_click'
  | 'service_view'
  | 'gallery_view'
  | 'review_click';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  details?: string;
  timestamp: string;
}
