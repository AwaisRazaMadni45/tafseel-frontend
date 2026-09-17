import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const { t } = useLanguage();
  const phoneNumber = '966501234567';
  const message = encodeURIComponent(t.whatsapp.message);
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      className="fixed bottom-6 end-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-600/40 hover:bg-green-600 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="absolute bottom-full mb-2 end-0 whitespace-nowrap text-sm bg-charcoal-800 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {t.whatsapp.label}
        </span>
      </div>
    </a>
  );
}
