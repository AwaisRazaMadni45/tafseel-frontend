import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Language, type Translation } from '@/data/translations';

interface LanguageContextValue {
  lang: Language;
  t: Translation;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.dir = dir;
  }, [lang, dir]);

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
