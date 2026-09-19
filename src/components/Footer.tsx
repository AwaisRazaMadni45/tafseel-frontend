import { useLanguage } from '@/context/LanguageContext';
import type { Page } from '@/components/Navbar';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'products', label: t.nav.products },
    { key: 'about', label: t.nav.about },
    { key: 'gallery', label: t.nav.gallery },
    { key: 'contact', label: t.nav.contact },
  ];

  const categories = [
    { label: t.categories.sofas, page: 'products' as Page },
    { label: t.categories.curtains, page: 'products' as Page },
    { label: t.categories.majlis, page: 'products' as Page },
  ];

  return (
    <footer className="bg-charcoal-800 text-cream-100 pt-16 pb-8">
      <div className="container-lux px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-arabic text-2xl font-bold text-gold-400">تفصيل ستائر و مجالس</span>
              <p className="text-sm text-cream-300 mt-1">Tafseel Curtains & Majlis</p>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">{t.footer.aboutText}</p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal-600 flex items-center justify-center hover:bg-gold-500 transition-colors duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal-600 flex items-center justify-center hover:bg-gold-500 transition-colors duration-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal-600 flex items-center justify-center hover:bg-gold-500 transition-colors duration-300" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-400 font-semibold text-lg mb-5">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => { onNavigate(item.key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-sm text-cream-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gold-400 font-semibold text-lg mb-5">{t.footer.categories}</h3>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li key={i}>
                  <button
                    onClick={() => { onNavigate(cat.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-sm text-cream-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-semibold text-lg mb-5">{t.footer.contactInfo}</h3>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>{t.contact.addressValue}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span dir="ltr">+966 58 291 3730</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>junaidmajeed505@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="whitespace-pre-line text-xs">{t.contact.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-600 pt-6 text-center">
          <p className="text-sm text-cream-300">
            <span className="font-arabic">تفصيل ستائر و مجالس</span> — Tafseel Curtains & Majlis &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
