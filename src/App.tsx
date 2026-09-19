import { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar, type Page } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { About } from '@/pages/About';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';

const VALID_PAGES: Page[] = ['home', 'products', 'about', 'gallery', 'contact'];

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '') as Page;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

function AppContent() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  // Sync URL hash when page changes
  const navigate = useCallback((newPage: Page) => {
    if (newPage === 'home') {
      window.history.pushState(null, '', window.location.pathname); // no hash for home
    } else {
      window.history.pushState(null, '', `#${newPage}`);
    }
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':     return <Home onNavigate={navigate} />;
      case 'products': return <Products />;
      case 'about':    return <About />;
      case 'gallery':  return <Gallery />;
      case 'contact':  return <Contact />;
      default:         return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar currentPage={page} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
