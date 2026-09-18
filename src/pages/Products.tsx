import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/api';
import type { ApiProduct, Category } from '@/types/api';
import { Sofa, Blinds, Layers, LayoutGrid, Loader2, AlertCircle } from 'lucide-react';

type Filter = 'all' | Category;

export function Products() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const category = filter === 'all' ? undefined : filter;
    getProducts(category)
      .then((data) => setProducts(data))
      .catch((err: Error) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [filter]);

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

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-charcoal-600 text-lg">{error}</p>
              <button
                onClick={() => setFilter(filter)}
                className="mt-2 px-5 py-2 rounded-full border border-gold-400 text-gold-600 hover:bg-gold-50 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && (
            products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-charcoal-500 text-lg py-20">{t.products.noResults}</p>
            )
          )}
        </div>
      </section>
    </div>
  );
}
