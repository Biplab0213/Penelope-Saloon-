import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessSettings,
  ServiceItem,
  ReviewItem,
  GalleryItem,
  FAQItem,
  AppointmentRequest,
  AppointmentStatus,
  AnalyticsEvent,
  AnalyticsEventType,
} from '../types';
import {
  initialBusinessSettings,
  initialServices,
  initialReviews,
  initialGallery,
  initialFAQs,
} from '../data/initialData';

interface SalonContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  services: ServiceItem[];
  getServiceBySlug: (slug: string) => ServiceItem | undefined;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  appointments: AppointmentRequest[];
  createAppointment: (request: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;
  analytics: AnalyticsEvent[];
  trackEvent: (type: AnalyticsEventType, details?: string) => void;
  isAdminAuthenticated: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  resetToDefaults: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

const STORAGE_PREFIX = 'penelope_salon_v3_';

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}settings`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialBusinessSettings;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}services`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialServices;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}reviews`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialReviews;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}gallery`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialGallery;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}faqs`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialFAQs;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}appointments`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'req-sample-01',
        fullName: 'Gabriela M.',
        phone: '661-555-0192',
        email: 'gabriela.m@example.com',
        preferredDate: '2026-09-18',
        preferredTime: '10:30 AM',
        serviceId: 'service-color-balayage',
        serviceName: 'Custom Hair Color & Balayage',
        message: 'Looking for a warm caramel balayage touch-up. I love Daisy’s work!',
        status: 'New',
        createdAt: new Date().toISOString(),
      }
    ];
  });

  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}analytics`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(`${STORAGE_PREFIX}admin_auth`) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}reviews`, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}faqs`, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}appointments`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}analytics`, JSON.stringify(analytics));
  }, [analytics]);

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug === slug);
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `service-${Date.now()}`,
    };
    setServices(prev => [newService, ...prev]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addFAQ = (faqData: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faqData,
      id: `faq-${Date.now()}`,
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const createAppointment = (requestData: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>): string => {
    const id = `req-${Date.now()}`;
    const newRequest: AppointmentRequest = {
      ...requestData,
      id,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [newRequest, ...prev]);
    trackEvent('appointment_submit', `${requestData.serviceName} by ${requestData.fullName}`);
    return id;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const trackEvent = (type: AnalyticsEventType, details?: string) => {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      details,
      timestamp: new Date().toISOString(),
    };
    setAnalytics(prev => [newEvent, ...prev.slice(0, 99)]); // keep last 100
  };

  const adminLogin = (pass: string): boolean => {
    // Default admin passcode: penelope or salon1031
    if (pass.trim() === 'penelope' || pass.trim() === 'salon1031' || pass.trim() === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(`${STORAGE_PREFIX}admin_auth`, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(`${STORAGE_PREFIX}admin_auth`);
  };

  const resetToDefaults = () => {
    setSettings(initialBusinessSettings);
    setServices(initialServices);
    setReviews(initialReviews);
    setGallery(initialGallery);
    setFaqs(initialFAQs);
    localStorage.removeItem(`${STORAGE_PREFIX}settings`);
    localStorage.removeItem(`${STORAGE_PREFIX}services`);
    localStorage.removeItem(`${STORAGE_PREFIX}reviews`);
    localStorage.removeItem(`${STORAGE_PREFIX}gallery`);
    localStorage.removeItem(`${STORAGE_PREFIX}faqs`);
  };

  return (
    <SalonContext.Provider
      value={{
        settings,
        updateSettings,
        services,
        getServiceBySlug,
        addService,
        updateService,
        deleteService,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        appointments,
        createAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        analytics,
        trackEvent,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        resetToDefaults,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
