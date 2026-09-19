import { useEffect, useCallback, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { ApiProduct } from '@/types/api';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface ProductModalProps {
  product: ApiProduct;
  onClose: () => void;
  onViewAll?: () => void;
}

const WHATSAPP_NUMBER = '966582913730';

export function ProductModal({ product, onClose, onViewAll }: ProductModalProps) {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % product.images.length);
  }, [product.images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + product.images.length) % product.images.length);
  }, [product.images.length]);

  // Keyboard navigation + scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const whatsappHref = () => {
    const msg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً، أنا مهتم بـ: ${product.name.ar}`
        : `Hello, I'm interested in: ${product.name.en}`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const imageSrc = product.images?.[activeIndex] || '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal-900/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative bg-charcoal-900 shrink-0" style={{ aspectRatio: '4/3' }}>
          <img
            src={imageSrc}
            alt={product.name[lang]}
            className="w-full h-full object-cover"
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 end-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev / Next — only when multiple images */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="absolute top-3 start-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {activeIndex + 1} / {product.images.length}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-5 overflow-y-auto">
          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gold-100 text-gold-700 rounded-full mb-3 capitalize">
            {product.category}
          </span>

          <h2 className="text-xl font-bold text-charcoal-800 mb-2">
            {product.name[lang]}
          </h2>
          <p className="text-sm text-charcoal-500 leading-relaxed mb-5">
            {product.description[lang]}
          </p>

          {/* Inquire on WhatsApp */}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-300 text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            {lang === 'ar' ? 'استفسر الآن عبر واتساب' : 'Inquire Now on WhatsApp'}
          </a>

          {/* View all — optional */}
          {onViewAll && (
            <button
              onClick={() => { onClose(); onViewAll(); }}
              className="mt-3 w-full py-3 border border-gold-300 text-gold-600 font-medium rounded-xl hover:bg-gold-50 transition-colors text-sm"
            >
              {lang === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
