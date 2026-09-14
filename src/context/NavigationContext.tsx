import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  slug?: string;
}

interface NavigationContextType {
  currentPath: string;
  currentSlug?: string;
  serviceSlug?: string;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const normalizePath = (raw: string): string => {
  const p = raw.split('?')[0].split('#')[0] || '/';
  if (p.length > 1 && p.endsWith('/')) {
    return p.slice(0, -1);
  }
  return p;
};

const getSlugFromPath = (path: string): string | undefined => {
  const clean = normalizePath(path);
  if (clean.startsWith('/services/')) {
    const slug = clean.replace('/services/', '').split('/')[0];
    return slug || undefined;
  }
  return undefined;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizePath(window.location.pathname || '/');
  });

  const [currentSlug, setCurrentSlug] = useState<string | undefined>(() => {
    return getSlugFromPath(window.location.pathname || '/');
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname || '/');
      setCurrentPath(path);
      setCurrentSlug(getSlugFromPath(path));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const normalized = normalizePath(path);
    if (normalized === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(normalized);
    setCurrentSlug(getSlugFromPath(normalized));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPath, currentSlug, serviceSlug: currentSlug, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
