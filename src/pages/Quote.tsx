import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, Phone, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '966582913730';

export function Quote() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    neighborhood: '',
    name: '',
    service: 'curtains',
    details: '',
  });

  const serviceLabels: Record<string, string> = {
    sofas: t.quote.serviceSofas,
    curtains: t.quote.serviceCurtains,
    majlis: t.quote.serviceMajlis,
    other: t.quote.serviceOther,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `*${t.quote.formTitle}*`,
      `${t.quote.neighborhood}: ${form.neighborhood}`,
      `${t.quote.name}: ${form.name}`,
      `${t.quote.service}: ${serviceLabels[form.service]}`,
      `${t.quote.details}: ${form.details}`,
    ];
    const message = lines.join('\n');
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const infoCards = [
    {
      label: t.quote.whatsappCard,
      value: '+966 58 291 3730',
      icon: MessageCircle,
      iconColor: 'text-green-600',
    },
    {
      label: t.quote.directCard,
      value: '+966 57 842 5416',
      icon: Phone,
      iconColor: 'text-gold-600',
    },
    {
      label: t.quote.areaCard,
      value: t.quote.areaValue,
      icon: MapPin,
      iconColor: 'text-gold-600',
    },
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-800 via-charcoal-800 to-brown-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/majlis.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-lux px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="ornament-line mb-4">
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.quote.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.quote.heading}</h1>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">{t.quote.description}</p>
        </div>
      </section>

      {/* Quote content */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-cream-200">
              <h2 className="text-2xl font-bold text-charcoal-800 mb-1">{t.quote.formTitle}</h2>
              <p className="text-sm text-charcoal-500 mb-6">{t.quote.formSubtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.quote.neighborhood}</label>
                    <input
                      type="text"
                      value={form.neighborhood}
                      onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                      placeholder={t.quote.neighborhoodPlaceholder}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.quote.name}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.quote.namePlaceholder}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.quote.service}</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="input-field"
                  >
                    <option value="curtains">{t.quote.serviceCurtains}</option>
                    <option value="sofas">{t.quote.serviceSofas}</option>
                    <option value="majlis">{t.quote.serviceMajlis}</option>
                    <option value="other">{t.quote.serviceOther}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.quote.details}</label>
                  <textarea
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder={t.quote.detailsPlaceholder}
                    required
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.quote.send}
                </button>
              </form>
            </div>

            {/* Info cards */}
            <div className="flex flex-col justify-center gap-4">
              {infoCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-cream-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-charcoal-500">{card.label}</p>
                      <p className="text-lg font-bold text-charcoal-800 mt-0.5" dir="ltr">{card.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center shrink-0">
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
