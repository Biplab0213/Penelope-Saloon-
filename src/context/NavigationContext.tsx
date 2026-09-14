import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  slug?: string;
}

interface NavigationContextType {
  currentPath: string;
  currentSlug?: string;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [currentSlug, setCurrentSlug] = useState<string | undefined>(() => {
    const pathname = window.location.pathname || '/';
    if (pathname.startsWith('/services/')) {
      return pathname.replace('/services/', '');
    }
    return undefined;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path.startsWith('/services/')) {
        setCurrentSlug(path.replace('/services/', ''));
      } else {
        setCurrentSlug(undefined);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (path.startsWith('/services/')) {
      setCurrentSlug(path.replace('/services/', ''));
    } else {
      setCurrentSlug(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPath, currentSlug, navigateTo }}>
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
