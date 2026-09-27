import React, { useState } from 'react';
import { Mail, X, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isFr = language === 'FR';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState<{
    flightDeals: boolean;
    hotelPromos: boolean;
    airhelpTips: boolean;
  }>({
    flightDeals: true,
    hotelPromos: true,
    airhelpTips: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const t = {
    title: isFr ? 'Lettre d’Information Safarihoo' : 'Safarihoo Travel Insider',
    subtitle: isFr
      ? 'Recevez jusqu’à -60% sur des vols secrets, erreurs de prix et escapades exclusives directement dans votre boîte de réception.'
      : 'Get up to 60% off secret airfares, error fares, and curated weekend getaways directly in your inbox.',
    nameLabel: isFr ? 'Votre prénom (Optionnel)' : 'Your First Name (Optional)',
    namePlaceholder: isFr ? 'ex. Sarah' : 'e.g. Sarah',
    emailLabel: isFr ? 'Adresse e-mail' : 'Email Address',
    emailPlaceholder: isFr ? 'sarah@exemple.com' : 'sarah@example.com',
    prefHeader: isFr ? 'Vos préférences de bons plans' : 'Select Deal Preferences',
    prefFlights: isFr ? 'Vols pas chers' : 'Cheap Flights',
    prefHotels: isFr ? 'Promos Hôtels' : 'Hotel Promos',
    prefAirhelp: isFr ? 'Alertes AirHelp' : 'AirHelp Alerts',
    noSpam: isFr
      ? 'Zéro spam. Désabonnement en 1 clic à tout moment. Consultez notre Politique de Confidentialité.'
      : 'No spam ever. 1-click unsubscribe at any time. Read our Privacy Policy.',
    submitBtn: isFr ? 'S’abonner aux Bons Plans' : 'Subscribe to Deals',
    successTitle: isFr ? 'Vous êtes sur la liste VIP !' : 'You’re on the VIP List!',
    successDesc: (mail: string) =>
      isFr
        ? `Votre adresse ${mail} a bien été enregistrée. Vous recevrez désormais nos ventes flash de billets d'avion, codes promo secrets d'hôtels et guides de voyage exclusifs.`
        : `We’ve registered ${mail}. You’ll now receive handpicked flight flash sales, secret hotel promo codes, and exclusive travel guides.`,
    closeBtn: isFr ? 'Fermer & Explorer les Offres' : 'Close & Explore Deals',
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      // Save locally
      const existing = JSON.parse(localStorage.getItem('safarihoo_subscribers') || '[]');
      existing.push({ email, name, preferences, date: new Date().toISOString() });
      localStorage.setItem('safarihoo_subscribers', JSON.stringify(existing));
    } catch {
      // fallback
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow background accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#1b64f2]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          title="Close newsletter popup"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">{t.successTitle}</h3>
            <p className="text-sm text-white/70 max-w-sm mx-auto">
              {t.successDesc(email)}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#1b64f2] hover:bg-[#1654cc] text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1b64f2]/20 text-[#498bf7] mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xs mx-auto">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1b64f2] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  {t.emailLabel} <span className="text-[#498bf7]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1b64f2] transition-all"
                />
              </div>

              {/* Preferences Checkboxes */}
              <div className="pt-1 pb-1">
                <span className="block text-[11px] font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                  {t.prefHeader}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/10 cursor-pointer hover:bg-white/[0.08]">
                    <input
                      type="checkbox"
                      checked={preferences.flightDeals}
                      onChange={(e) => setPreferences({ ...preferences, flightDeals: e.target.checked })}
                      className="rounded accent-[#1b64f2]"
                    />
                    <span className="text-white/80 text-[11px]">{t.prefFlights}</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/10 cursor-pointer hover:bg-white/[0.08]">
                    <input
                      type="checkbox"
                      checked={preferences.hotelPromos}
                      onChange={(e) => setPreferences({ ...preferences, hotelPromos: e.target.checked })}
                      className="rounded accent-[#1b64f2]"
                    />
                    <span className="text-white/80 text-[11px]">{t.prefHotels}</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/10 cursor-pointer hover:bg-white/[0.08]">
                    <input
                      type="checkbox"
                      checked={preferences.airhelpTips}
                      onChange={(e) => setPreferences({ ...preferences, airhelpTips: e.target.checked })}
                      className="rounded accent-[#1b64f2]"
                    />
                    <span className="text-white/80 text-[11px]">{t.prefAirhelp}</span>
                  </label>
                </div>
              </div>

              <div className="text-[10px] text-white/50 leading-relaxed text-center">
                {t.noSpam}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#1b64f2] hover:bg-[#1654cc] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
              >
                <span>{t.submitBtn}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
