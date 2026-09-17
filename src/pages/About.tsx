import { useLanguage } from '@/context/LanguageContext';
import { Award, Heart, Sparkles } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  const stats = [
    { value: t.about.stats.years, label: t.about.stats.yearsLabel },
    { value: t.about.stats.projects, label: t.about.stats.projectsLabel },
    { value: t.about.stats.clients, label: t.about.stats.clientsLabel },
    { value: t.about.stats.fabrics, label: t.about.stats.fabricsLabel },
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-800 via-charcoal-800 to-brown-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.pexels.com/photos/33590155/pexels-photo-33590155.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-lux px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="ornament-line mb-4">
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.about.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.about.title}</h1>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8135273/pexels-photo-8135273.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Craftsmanship"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -end-6 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-6 shadow-xl hidden sm:block">
                <Award className="w-10 h-10 text-white mb-2" />
                <p className="text-white font-bold text-lg">{t.about.stats.years}</p>
                <p className="text-cream-50/80 text-sm">{t.about.stats.yearsLabel}</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-charcoal-800 mb-6">{t.about.storyTitle}</h2>
              <div className="space-y-4 text-charcoal-600 leading-relaxed">
                <p>{t.about.storyP1}</p>
                <p>{t.about.storyP2}</p>
                <p>{t.about.storyP3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-charcoal-800 to-brown-800">
        <div className="container-lux px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-gradient-gold mb-2">{stat.value}</p>
                <p className="text-cream-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Craftsmanship */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md card-hover border border-cream-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-4">{t.about.missionTitle}</h3>
              <p className="text-charcoal-600 leading-relaxed">{t.about.missionText}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md card-hover border border-cream-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-800 mb-4">{t.about.craftTitle}</h3>
              <p className="text-charcoal-600 leading-relaxed">{t.about.craftText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
