import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { AdminAuthProvider } from '@/admin/context/AdminAuthContext';
import AdminProtectedRoute from '@/admin/components/AdminProtectedRoute';

// Admin pages
import AdminLogin from '@/admin/pages/AdminLogin';
import AdminDashboard from '@/admin/pages/AdminDashboard';
import AdminProducts from '@/admin/pages/AdminProducts';
import AdminBulkAdd from '@/admin/pages/AdminBulkAdd';
import AdminGallery from '@/admin/pages/AdminGallery';
import AdminReviews from '@/admin/pages/AdminReviews';
import AdminOrders from '@/admin/pages/AdminOrders';
import AdminMessages from '@/admin/pages/AdminMessages';

// Customer site
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

// ── Customer site wrapper ──────────────────────────────────────────────────────
function CustomerSite() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  const navigate = useCallback((newPage: Page) => {
    if (newPage === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${newPage}`);
    }
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePop = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
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

// ── Root app with routing ──────────────────────────────────────────────────────
function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return isAdmin ? (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/products" element={<AdminProtectedRoute><AdminProducts /></AdminProtectedRoute>} />
        <Route path="/admin/products/bulk-add" element={<AdminProtectedRoute><AdminBulkAdd /></AdminProtectedRoute>} />
        <Route path="/admin/gallery" element={<AdminProtectedRoute><AdminGallery /></AdminProtectedRoute>} />
        <Route path="/admin/reviews" element={<AdminProtectedRoute><AdminReviews /></AdminProtectedRoute>} />
        <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
        <Route path="/admin/messages" element={<AdminProtectedRoute><AdminMessages /></AdminProtectedRoute>} />
      </Routes>
    </AdminAuthProvider>
  ) : (
    <LanguageProvider>
      <Routes>
        <Route path="/*" element={<CustomerSite />} />
      </Routes>
    </LanguageProvider>
  );
}

export default function App() {
  return <AppContent />;
}
