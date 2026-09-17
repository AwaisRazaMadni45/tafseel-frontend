import { useLanguage } from '@/context/LanguageContext';
import type { Page } from '@/components/Navbar';
import { products, testimonials } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, ArrowLeft, Sofa, Blinds, Layers, Award, Palette, Headphones, Truck, Star, Quote, Send } from 'lucide-react';
import { useState } from 'react';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = products.slice(0, 6);

  const categories = [
    { key: 'sofas', icon: Sofa, name: t.categories.sofas, desc: t.categories.sofasDesc, image: 'https://images.pexels.com/photos/8135275/pexels-photo-8135275.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'curtains', icon: Blinds, name: t.categories.curtains, desc: t.categories.curtainsDesc, image: 'https://images.pexels.com/photos/33839793/pexels-photo-33839793.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'majlis', icon: Layers, name: t.categories.majlis, desc: t.categories.majlisDesc, image: 'https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&w=800' },
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
          <div className="text-center mb-14">
            <div className="ornament-line mb-4">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">{t.categories.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800">{t.categories.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => onNavigate('products')}
                className="group relative rounded-2xl overflow-hidden shadow-lg card-hover text-start"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <cat.icon className="w-8 h-8 text-gold-400 mb-3" />
                  <h3 className="text-xl font-bold text-white mb-1.5">{cat.name}</h3>
                  <p className="text-sm text-cream-100/80 mb-3 line-clamp-2">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gold-400 font-medium">
                    {t.categories.explore}
                    <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container-lux">
          <div className="text-center mb-14">
            <div className="ornament-line mb-4">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">{t.whyChooseUs.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800">{t.whyChooseUs.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-7 text-center shadow-md card-hover border border-cream-200"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center group-hover:from-gold-400 group-hover:to-gold-500 transition-all duration-500">
                  <feature.icon className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-semibold text-lg text-charcoal-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
          <div className="text-center mb-14">
            <div className="ornament-line mb-4">
              <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.testimonials.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.testimonials.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 card-hover">
                <Quote className="w-10 h-10 text-gold-400/40 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-cream-100/90 leading-relaxed mb-6 text-lg">"{testimonial.text[lang]}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[lang].charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name[lang]}</p>
                    <p className="text-sm text-cream-300">{testimonial.location[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  required
                  className="flex-1 px-5 py-3.5 rounded-lg text-charcoal-700 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button type="submit" className="px-6 py-3.5 bg-charcoal-800 text-white font-medium rounded-lg hover:bg-charcoal-900 transition-colors duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  <Send className="w-4 h-4" />
                  {t.newsletter.button}
                </button>
              </form>
              {subscribed && (
                <p className="mt-4 text-white font-medium animate-fade-in">{t.newsletter.success}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
