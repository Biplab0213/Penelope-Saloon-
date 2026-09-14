import React from 'react';
import { SalonProvider } from './context/SalonContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { Book } from './pages/Book';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

const MainContent: React.FC = () => {
  const { currentPath, serviceSlug } = useNavigation();

  const renderCurrentPage = () => {
    // If it's a dynamic service detail page /services/:slug
    if (serviceSlug) {
      return <ServiceDetail slug={serviceSlug} />;
    }

    switch (currentPath) {
      case '/':
        return <Home />;
      case '/services':
        return <Services />;
      case '/about':
        return <About />;
      case '/gallery':
        return <Gallery />;
      case '/reviews':
        return <Reviews />;
      case '/book':
        return <Book />;
      case '/faq':
        return <FAQ />;
      case '/contact':
        return <Contact />;
      case '/admin':
        return <Admin />;
      case '/privacy':
        return <PrivacyPolicy />;
      case '/terms':
        return <TermsOfService />;
      default:
        return <Home />;
    }
  };

  const isAdmin = currentPath === '/admin';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F5EF] text-[#171717] font-sans antialiased selection:bg-[#C9A96A]/30 selection:text-[#171717]">
      {/* Global Header (sticky) */}
      {!isAdmin && <Header />}

      {/* Main Page Area */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      {!isAdmin && <Footer />}

      {/* Mobile Bottom Sticky Bar & Floating Quick Actions */}
      {!isAdmin && <MobileStickyBar />}
    </div>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <NavigationProvider>
        <MainContent />
      </NavigationProvider>
    </SalonProvider>
  );
}
