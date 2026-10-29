import { useLanguage } from '@/context/LanguageContext';
import { Award, Heart, Sparkles, Users } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  // Qualitative value props — no unverified numbers (years/projects/clients).
  const values = [
    { icon: Award, label: t.about.values.detail },
    { icon: Heart, label: t.about.values.passion },
    { icon: Sparkles, label: t.about.values.materials },
    { icon: Users, label: t.about.values.personal },
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="ornament-line mb-4 justify-center">
              <span className="text-gold-600 text-sm font-medium tracking-widest uppercase">{t.about.storyTitle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 mb-8">{t.about.storyTitle}</h2>
            <div className="space-y-5 text-charcoal-600 leading-relaxed text-lg">
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
            </div>

            <div className="inline-flex items-center gap-3 mt-10 px-6 py-3 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg">
              <Award className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">{t.about.badgeText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-r from-charcoal-800 to-brown-800">
        <div className="container-lux px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center flex flex-col items-center gap-3">
                  <Icon className="w-8 h-8 text-gold-400" />
                  <p className="text-cream-200 text-sm sm:text-base">{item.label}</p>
                </div>
              );
            })}
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
