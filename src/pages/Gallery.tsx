import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { galleryImages, type Category } from '@/data/products';
import { X, ChevronLeft, ChevronRight, LayoutGrid, Sofa, Blinds, Layers } from 'lucide-react';

type Filter = 'all' | Category;

export function Gallery() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { key: Filter; label: string; icon: typeof Sofa }[] = [
    { key: 'all', label: t.gallery.all, icon: LayoutGrid },
    { key: 'sofas', label: t.gallery.sofas, icon: Sofa },
    { key: 'curtains', label: t.gallery.curtains, icon: Blinds },
    { key: 'majlis', label: t.gallery.majlis, icon: Layers },
  ];

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  }, [filtered.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-800 via-charcoal-800 to-brown-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.pexels.com/photos/34936237/pexels-photo-34936237.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-lux px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="ornament-line mb-4">
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.gallery.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.gallery.title}</h1>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">{t.gallery.subtitle}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-600/30 scale-105'
                    : 'bg-white text-charcoal-600 border border-cream-300 hover:border-gold-400 hover:text-gold-600'
                }`}
              >
                <f.icon className="w-5 h-5" />
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-xl shadow-md card-hover ${
                  index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={img.image}
                  alt={img.caption[lang]}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    index % 5 === 0 ? 'h-full min-h-[300px]' : 'h-48 sm:h-56'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-white font-medium text-sm">{img.caption[lang]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay animate-fade-in" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 end-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute start-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute end-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].caption[lang]}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
            <p className="text-center text-cream-100 mt-4 text-lg">{filtered[lightboxIndex].caption[lang]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
