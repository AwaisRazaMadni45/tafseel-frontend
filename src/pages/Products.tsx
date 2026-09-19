import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductModal } from '@/components/ProductModal';
import { getProducts } from '@/lib/api';
import type { ApiProduct, Category } from '@/types/api';
import { Sofa, Blinds, Layers, LayoutGrid, Loader2, AlertCircle } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

type Filter = 'all' | Category;

export function Products() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0); // fixed retry trigger
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const category = filter === 'all' ? undefined : filter;
    getProducts(category)
      .then((data) => setProducts(data))
      .catch((err: Error) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [filter, retryCount]); // retryCount forces re-fetch

  const filters: { key: Filter; label: string; icon: typeof Sofa }[] = [
    { key: 'all', label: t.products.all, icon: LayoutGrid },
    { key: 'sofas', label: t.products.sofas, icon: Sofa },
    { key: 'curtains', label: t.products.curtains, icon: Blinds },
    { key: 'majlis', label: t.products.majlis, icon: Layers },
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-800 via-charcoal-800 to-brown-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-lux px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="ornament-line mb-4">
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.products.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.products.title}</h1>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">{t.products.subtitle}</p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          {/* Filter buttons */}
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

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
            </div>
          )}

          {/* Error — fixed retry */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-charcoal-600 text-lg">{error}</p>
              <button
                onClick={() => setRetryCount((c) => c + 1)}
                className="mt-2 px-5 py-2 rounded-full border border-gold-400 text-gold-600 hover:bg-gold-50 transition-colors text-sm font-medium"
              >
                {lang === 'ar' ? 'حاول مجدداً' : 'Try Again'}
              </button>
            </div>
          )}

          {/* Product grid — cards open modal on click */}
          {!loading && !error && (
            products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                {products.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => setSelectedProduct(product)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover text-start border border-cream-100"
                  >
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={product.images?.[0] || ''}
                        alt={product.name[lang]}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base text-charcoal-800 mb-1 line-clamp-1">
                        {product.name[lang]}
                      </h3>
                      <p className="text-xs text-charcoal-500 line-clamp-2 mb-3">
                        {product.description[lang]}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-600">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {t.products.enquire}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-charcoal-500 text-lg py-20">{t.products.noResults}</p>
            )
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
