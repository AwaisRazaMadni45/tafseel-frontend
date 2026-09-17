import { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar, type Page } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { About } from '@/pages/About';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';

function AppContent() {
  const [page, setPage] = useState<Page>('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onNavigate={setPage} />;
      case 'products':
        return <Products />;
      case 'about':
        return <About />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setPage} />
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
