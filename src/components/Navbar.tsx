import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export type Page = 'home' | 'products' | 'about' | 'gallery' | 'contact';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'products', label: t.nav.products },
    { key: 'about', label: t.nav.about },
    { key: 'gallery', label: t.nav.gallery },
    { key: 'contact', label: t.nav.contact },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-lg shadow-charcoal-900/5 py-2'
            : 'bg-transparent py-3'
        }`}
      >
        <nav className="container-lux px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex flex-col items-start gap-0 shrink-0 max-w-[45%] sm:max-w-none"
          >
            <span className={`font-arabic text-lg sm:text-2xl font-bold leading-tight ${scrolled ? 'text-gold-600' : 'text-white drop-shadow-lg'}`}>
              تفصيل ستائر و مجالس
            </span>
            <span className={`text-[10px] sm:text-xs font-medium tracking-wide ${scrolled ? 'text-charcoal-500' : 'text-cream-100 drop-shadow'}`}>
              Tafseel Curtains & Majlis
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`nav-link text-base ${
                  currentPage === item.key
                    ? 'text-gold-600 after:w-full'
                    : scrolled
                    ? 'text-charcoal-600'
                    : 'text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side — language switcher + hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileOpen
                ? <X className="w-6 h-6 text-charcoal-700" />
                : <Menu className={`w-6 h-6 ${scrolled ? 'text-charcoal-700' : 'text-white'}`} />
              }
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-72 bg-cream-50 shadow-2xl pt-24 px-6 flex flex-col gap-2 animate-slide-in`}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`text-start px-4 py-3.5 rounded-lg text-lg font-medium transition-all duration-300 ${
                  currentPage === item.key
                    ? 'bg-gold-100 text-gold-700'
                    : 'text-charcoal-600 hover:bg-cream-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
