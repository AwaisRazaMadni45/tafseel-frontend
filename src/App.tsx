import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

function getPageFromPath(pathname: string, search: string): Page {
  // /products, /about, /gallery, /contact → page name
  const seg = pathname.replace('/', '').split('/')[0] as Page;
  if (VALID_PAGES.includes(seg)) return seg;
  // legacy hash support
  const hash = search.replace('?', '').replace('#', '') as Page;
  if (VALID_PAGES.includes(hash)) return hash;
  return 'home';
}

// SEO: per-page <title> and meta description, bilingual (AR first, then EN) —
// helps search engines and the browser tab reflect what the visitor is on.
const PAGE_SEO: Record<Page, { title: string; description: string }> = {
  home: {
    title: 'تفصيل ستائر و مجالس فاخرة | Tafseel Curtains & Majlis',
    description: 'تفصيل وتركيب ستائر ومجالس وكنب فاخر بخامات مختارة وتنفيذ احترافي في الرياض.',
  },
  products: {
    title: 'المنتجات | ستائر، مجالس وكنب فاخر — Tafseel',
    description: 'تصفح تشكيلتنا من الستائر الفاخرة، المجالس العربية، والكنب المفصل حسب الطلب.',
  },
  about: {
    title: 'من نحن | Tafseel Curtains & Majlis',
    description: 'تعرف على قصتنا وحرفيتنا في تفصيل الستائر والمجالس الفاخرة في الرياض.',
  },
  gallery: {
    title: 'معرض الأعمال | Tafseel Curtains & Majlis',
    description: 'نماذج من أعمالنا المنجزة في تفصيل وتركيب الستائر والمجالس الفاخرة.',
  },
  contact: {
    title: 'تواصل معنا | Tafseel Curtains & Majlis',
    description: 'تواصل معنا عبر واتساب أو نموذج التواصل لطلب عرض سعر أو حجز معاينة.',
  },
};

// ── Customer site wrapper ──────────────────────────────────────────────────────
function CustomerSite() {
  const reactNavigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<Page>(() =>
    getPageFromPath(location.pathname, location.hash)
  );

  // Keep page state in sync with browser URL (back/forward buttons)
  useEffect(() => {
    const p = getPageFromPath(location.pathname, location.hash);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Update the browser tab title + meta description whenever the page changes
  useEffect(() => {
    const seo = PAGE_SEO[page];
    document.title = seo.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);
  }, [page]);

  // Navigate using React Router so browser history works properly
  const navigate = useCallback((newPage: Page) => {
    const path = newPage === 'home' ? '/' : `/${newPage}`;
    reactNavigate(path);
  }, [reactNavigate]);

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
        <Route path="/admin/login"              element={<AdminLogin />} />
        <Route path="/admin"                    element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/products"           element={<AdminProtectedRoute><AdminProducts /></AdminProtectedRoute>} />
        <Route path="/admin/products/bulk-add"  element={<AdminProtectedRoute><AdminBulkAdd /></AdminProtectedRoute>} />
        <Route path="/admin/gallery"            element={<AdminProtectedRoute><AdminGallery /></AdminProtectedRoute>} />
        <Route path="/admin/reviews"            element={<AdminProtectedRoute><AdminReviews /></AdminProtectedRoute>} />
        <Route path="/admin/orders"             element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
        <Route path="/admin/messages"           element={<AdminProtectedRoute><AdminMessages /></AdminProtectedRoute>} />
      </Routes>
    </AdminAuthProvider>
  ) : (
    <LanguageProvider>
      <Routes>
        <Route path="/"          element={<CustomerSite />} />
        <Route path="/products"  element={<CustomerSite />} />
        <Route path="/about"     element={<CustomerSite />} />
        <Route path="/gallery"   element={<CustomerSite />} />
        <Route path="/contact"   element={<CustomerSite />} />
        <Route path="/*"         element={<CustomerSite />} />
      </Routes>
    </LanguageProvider>
  );
}

export default function App() {
  return <AppContent />;
}
