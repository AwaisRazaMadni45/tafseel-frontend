import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-cream-100 rounded-full p-1 border border-gold-200">
      <Globe className="w-4 h-4 text-gold-500 ms-1.5" />
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          lang === 'en'
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
            : 'text-charcoal-500 hover:text-gold-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          lang === 'ar'
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
            : 'text-charcoal-500 hover:text-gold-600'
        }`}
      >
        العربية
      </button>
    </div>
  );
}
