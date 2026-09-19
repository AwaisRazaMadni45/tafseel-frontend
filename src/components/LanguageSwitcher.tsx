import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-1 border border-gold-200 shadow-sm">
      <Globe className="w-3.5 h-3.5 text-gold-500 ms-1 shrink-0" />
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 ${
          lang === 'en'
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow'
            : 'text-charcoal-500 hover:text-gold-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 ${
          lang === 'ar'
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow'
            : 'text-charcoal-500 hover:text-gold-600'
        }`}
      >
        عربية
      </button>
    </div>
  );
}
