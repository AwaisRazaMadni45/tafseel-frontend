import { useLanguage } from '@/context/LanguageContext';
import type { ApiProduct } from '@/types/api';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: ApiProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const phoneNumber = '966582913730';
  const message = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً، أنا مهتم بـ: ${product.name.ar}`
      : `Hello, I'm interested in: ${product.name.en}`
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  // Backend stores images as an array — use first image, fallback to placeholder
  const imageSrc = product.images?.[0] || 'https://images.pexels.com/photos/8135275/pexels-photo-8135275.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={imageSrc}
          alt={product.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-charcoal-800 mb-1.5">{product.name[lang]}</h3>
        <p className="text-sm text-charcoal-500 leading-relaxed mb-4 line-clamp-2">{product.description[lang]}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {t.products.enquire}
        </a>
      </div>
    </div>
  );
}
