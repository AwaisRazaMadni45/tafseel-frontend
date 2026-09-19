import { useLanguage } from '@/context/LanguageContext';
import type { Page } from '@/components/Navbar';
import { getFeaturedProducts, getReviews, getProducts } from '@/lib/api';
import type { ApiProduct, ApiReview } from '@/types/api';
import {
  ArrowRight, ArrowLeft, Sofa, Blinds, Layers,
  Award, Palette, Headphones, Truck, Star, Quote, Send, Loader2,
  X, ChevronLeft, ChevronRight, MessageCircle,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Featured products state
  const [featuredProducts, setFeaturedProducts] = useState<ApiProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Reviews state
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch featured products on mount
  useEffect(() => {
    getFeaturedProducts()
      .then((data) => {
        if (data.length === 0) {
          return getProducts().then((all) => all.slice(0, 6));
        }
        return data;
      })
      .then((data) => setFeaturedProducts(data))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  // Fetch reviews on mount
  useEffect(() => {
    getReviews()
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false));
  }, []);

  // Modal keyboard + scroll lock
  useEffect(() => {
    if (!selectedProduct) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, activeImageIndex]);

  const openModal = (product: ApiProduct) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    setActiveImageIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (!selectedProduct) return;
    setActiveImageIndex((i) => (i + 1) % selectedProduct.images.length);
  }, [selectedProduct]);

  const prevImage = useCallback(() => {
    if (!selectedProduct) return;
    setActiveImageIndex((i) => (i - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  }, [selectedProduct]);

  const categories = [
    {
      key: 'sofas', icon: Sofa, name: t.categories.sofas, desc: t.categories.sofasDesc,
      image: 'https://images.pexels.com/photos/8135275/pexels-photo-8135275.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      key: 'curtains', icon: Blinds, name: t.categories.curtains, desc: t.categories.curtainsDesc,
      image: 'https://images.pexels.com/photos/33839793/pexels-photo-33839793.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      key: 'majlis', icon: Layers, name: t.categories.majlis, desc: t.categories.majlisDesc,
      image: 'https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const features = [
    { icon: Award, title: t.whyChooseUs.quality, desc: t.whyChooseUs.qualityDesc },
    { icon: Palette, title: t.whyChooseUs.custom, desc: t.whyChooseUs.customDesc },
    { icon: Headphones, title: t.whyChooseUs.consultation, desc: t.whyChooseUs.consultationDesc },
    { icon: Truck, title: t.whyChooseUs.delivery, desc: t.whyChooseUs.deliveryDesc },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  // WhatsApp inquiry link for a product
  const whatsappLink = (product: ApiProduct) => {
    const phone = '966582913730';
    const msg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً، أنا مهتم بـ: ${product.name.ar}`
        : `Hello, I'm interested in: ${product.name.en}`
    );
    return `https://wa.me/${phone}?text=${msg}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury majlis interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-200 text-sm font-medium tracking-wide">{t.hero.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-cream-100/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button onClick={() => onNavigate('products')} className="btn-primary">
              {t.hero.cta}
              <Arrow className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('contact')} className="btn-outline text-white border-gold-400 hover:bg-gold-500">
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-50 to-transparent" />
      </section>

      {/* Categories */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="text-center mb-10">
            <div className="ornament-line mb-4">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">{t.categories.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800">{t.categories.subtitle}</h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* First category — full width */}
            <button onClick={() => onNavigate('products')} className="group relative rounded-2xl overflow-hidden shadow-lg card-hover text-start w-full">
              <div className="aspect-[16/7] overflow-hidden">
                <img src={categories[0].image} alt={categories[0].name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {(() => { const Icon = categories[0].icon; return <Icon className="w-6 h-6 text-gold-400 mb-2" />; })()}
                <h3 className="text-lg font-bold text-white mb-1">{categories[0].name}</h3>
                <p className="text-xs text-cream-100/80 mb-2 line-clamp-1">{categories[0].desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-gold-400 font-medium">{t.categories.explore}<Arrow className="w-3 h-3" /></span>
              </div>
            </button>

            {/* Remaining two side by side */}
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(1).map((cat) => (
                <button key={cat.key} onClick={() => onNavigate('products')} className="group relative rounded-2xl overflow-hidden shadow-lg card-hover text-start">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <cat.icon className="w-5 h-5 text-gold-400 mb-1.5" />
                    <h3 className="text-sm font-bold text-white mb-1">{cat.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-gold-400 font-medium">{t.categories.explore}<Arrow className="w-3 h-3" /></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products (Browse Collections) — comes BEFORE Why Choose Us ── */}
      <section className="section-padding bg-white">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <div className="ornament-line mb-3" style={{ justifyContent: 'start' }}>
                <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">{t.products.title}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800">{t.products.subtitle}</h2>
            </div>
            <button onClick={() => onNavigate('products')} className="btn-outline shrink-0">
              {t.hero.cta}
              <Arrow className="w-5 h-5" />
            </button>
          </div>

          {productsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <button
                  key={product._id}
                  onClick={() => openModal(product)}
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
                    <h3 className="font-semibold text-sm sm:text-base text-charcoal-800 mb-1 line-clamp-1">{product.name[lang]}</h3>
                    <p className="text-xs text-charcoal-500 line-clamp-2 mb-3">{product.description[lang]}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-600">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {t.products.enquire}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal-500 py-16">{t.products.noResults}</p>
          )}
        </div>
      </section>

      {/* ── Why Choose Us — comes AFTER Browse Collections ── */}
      <section className="section-padding bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container-lux">
          <div className="text-center mb-10">
            <div className="ornament-line mb-4">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">{t.whyChooseUs.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800">{t.whyChooseUs.subtitle}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="group bg-white rounded-2xl p-5 text-center shadow-md card-hover border border-cream-200">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center group-hover:from-gold-400 group-hover:to-gold-500 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-charcoal-800 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-charcoal-800 to-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="https://images.pexels.com/photos/37542593/pexels-photo-37542593.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-lux relative z-10">
          <div className="text-center mb-10">
            <div className="ornament-line mb-4">
              <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.testimonials.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.testimonials.subtitle}</h2>
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 card-hover">
                  <Quote className="w-7 h-7 text-gold-400/40 mb-3" />
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-cream-100/90 leading-relaxed mb-4 text-sm">"{review.text[lang]}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-base shrink-0">
                      {review.name[lang].charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{review.name[lang]}</p>
                      <p className="text-xs text-cream-300">{review.location[lang]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-cream-100/60 py-12">{t.testimonials.subtitle}</p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-gold-500 to-gold-600 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-gold-600/30 relative overflow-hidden">
            <div className="absolute top-0 end-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 start-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.newsletter.title}</h2>
              <p className="text-cream-50/90 mb-8">{t.newsletter.subtitle}</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.newsletter.placeholder} required className="flex-1 px-5 py-3.5 rounded-lg text-charcoal-700 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white" />
                <button type="submit" className="px-6 py-3.5 bg-charcoal-800 text-white font-medium rounded-lg hover:bg-charcoal-900 transition-colors duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  <Send className="w-4 h-4" />
                  {t.newsletter.button}
                </button>
              </form>
              {subscribed && <p className="mt-4 text-white font-medium animate-fade-in">{t.newsletter.success}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div
            className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image carousel */}
            <div className="relative bg-charcoal-900 aspect-[4/3] shrink-0">
              <img
                src={selectedProduct.images[activeImageIndex] || ''}
                alt={selectedProduct.name[lang]}
                className="w-full h-full object-cover"
              />

              {/* Close button */}
              <button onClick={closeModal} className="absolute top-3 end-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10" aria-label="Close">
                <X className="w-5 h-5" />
              </button>

              {/* Image navigation — only if multiple images */}
              {selectedProduct.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors" aria-label="Previous">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors" aria-label="Next">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {selectedProduct.images.map((_, i) => (
                      <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}

              {/* Image counter */}
              {selectedProduct.images.length > 1 && (
                <div className="absolute top-3 start-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {activeImageIndex + 1} / {selectedProduct.images.length}
                </div>
              )}
            </div>

            {/* Product details */}
            <div className="p-5 overflow-y-auto">
              {/* Category badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-gold-100 text-gold-700 rounded-full mb-3 capitalize">
                {selectedProduct.category}
              </span>

              <h2 className="text-xl font-bold text-charcoal-800 mb-2">{selectedProduct.name[lang]}</h2>
              <p className="text-sm text-charcoal-500 leading-relaxed mb-5">{selectedProduct.description[lang]}</p>

              {/* Inquire Now — WhatsApp */}
              <a
                href={whatsappLink(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-300 text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                {lang === 'ar' ? 'استفسر الآن عبر واتساب' : 'Inquire Now on WhatsApp'}
              </a>

              {/* View all products link */}
              <button
                onClick={() => { closeModal(); onNavigate('products'); }}
                className="mt-3 w-full py-3 border border-gold-300 text-gold-600 font-medium rounded-xl hover:bg-gold-50 transition-colors text-sm"
              >
                {lang === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
