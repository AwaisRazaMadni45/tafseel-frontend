import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { submitContact } from '@/lib/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSending(false);
    }
  };

  const phoneNumber = '966501234567';
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsapp.message)}`;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-800 via-charcoal-800 to-brown-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/8082311/pexels-photo-8082311.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-lux px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="ornament-line mb-4">
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">{t.contact.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.contact.title}</h1>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-cream-50">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-cream-200">
              <h2 className="text-2xl font-bold text-charcoal-800 mb-6">{t.contact.formTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.contact.name}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.contact.phone}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">{t.contact.message}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    required
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.send}
                    </>
                  )}
                </button>

                {/* Success message */}
                {sent && (
                  <div className="flex items-center gap-2 text-green-600 font-medium animate-fade-in">
                    <CheckCircle className="w-5 h-5" />
                    {t.contact.success}
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-500 font-medium animate-fade-in">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-cream-200">
                <h2 className="text-2xl font-bold text-charcoal-800 mb-6">{t.contact.infoTitle}</h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">{t.contact.address}</p>
                      <p className="text-sm text-charcoal-500">{t.contact.addressValue}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">{t.contact.phoneLabel}</p>
                      <p className="text-sm text-charcoal-500" dir="ltr">+966 50 123 4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">{t.contact.email}</p>
                      <p className="text-sm text-charcoal-500">info@tafseel.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">{t.contact.hours}</p>
                      <p className="text-sm text-charcoal-500 whitespace-pre-line">{t.contact.hoursValue}</p>
                    </div>
                  </li>
                </ul>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.contact.whatsapp}
                </a>
              </div>

              {/* Map embed */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cream-200">
                <iframe
                  title="Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=46.6753%2C24.7136%2C46.7253%2C24.7636&layer=mapnik&marker=24.7386%2C46.7003"
                  className="w-full h-64 border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
