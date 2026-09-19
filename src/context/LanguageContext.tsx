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

function getSavedLang(): Language {
  try {
    const saved = localStorage.getItem('tafseel_lang');
    if (saved === 'en' || saved === 'ar') return saved;
  } catch {
    // localStorage not available (SSR / private mode edge case)
  }
  return 'ar'; // default Arabic
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getSavedLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('tafseel_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.dir = dir;
  }, [lang, dir]);

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');

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
