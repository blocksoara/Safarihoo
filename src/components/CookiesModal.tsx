import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookiesModal: React.FC<CookiesModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isFr = language === 'FR';

  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // always true
    analytics: true,
    functional: true,
    advertising: false,
  });
  const [saved, setSaved] = useState(false);

  const t = {
    title: isFr ? 'Gestion des Cookies & Préférences' : 'Cookie Policy & Preferences',
    subtitle: isFr ? 'Gérez la façon dont nous stockons les données sur votre appareil' : 'Manage how we store & read data on your device',
    description: isFr
      ? 'Nous utilisons des cookies et technologies similaires pour assurer le bon fonctionnement de notre comparateur, mémoriser votre devise/langue préférée et analyser le trafic pour optimiser la découverte de billets d’avion et d’hôtels.'
      : 'We use cookies and similar browser storage technologies to ensure our meta-search engine functions smoothly, remember your preferred currency/language, and analyze traffic to improve flight & hotel discoveries.',
    cat1Title: isFr ? 'Strictement Nécessaires' : 'Strictly Necessary',
    cat1Badge: isFr ? 'Toujours Actif' : 'Always Active',
    cat1Desc: isFr
      ? 'Indispensables à la sécurité du site, à la redirection vers les compagnies aériennes et à la navigation.'
      : 'Essential for website security, routing handoffs to airlines, and core navigation.',
    cat2Title: isFr ? 'Analytique & Performance' : 'Analytics & Performance',
    cat2Desc: isFr
      ? 'Nous aident à mesurer les temps de réponse de recherche, les liaisons aériennes populaires et à corriger les erreurs.'
      : 'Helps us understand search response times, popular airport routes, and error rates.',
    cat3Title: isFr ? 'Fonctionnels & Préférences' : 'Functional & Preferences',
    cat3Desc: isFr
      ? 'Mémorisent vos recherches d’itinéraires récentes, dates préférées et états d’affichage.'
      : 'Remembers your recent flight queries, preferred dates, and interface state.',
    cat4Title: isFr ? 'Offres Ciblées & Partenaires' : 'Targeted Offers & Partners',
    cat4Desc: isFr
      ? 'Permettent à nos partenaires voyagistes vérifiés de vous proposer des promotions d’hôtels et de vols saisonniers pertinents.'
      : 'Allows our verified travel partners to show relevant seasonal flight and hotel promotions.',
    saveBtn: isFr ? 'Enregistrer mes Choix' : 'Save Custom Settings',
    acceptAllBtn: isFr ? 'Tout Accepter' : 'Accept All Cookies',
    savedTitle: isFr ? 'Préférences Enregistrées' : 'Preferences Saved',
    savedDesc: isFr
      ? 'Vos choix en matière de cookies ont été enregistrés et appliqués pour votre navigation.'
      : 'Your cookie choices have been recorded and applied to your current browsing session.',
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('safarihoo_cookie_consent');
      if (stored) {
        setCookieSettings(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('safarihoo_cookie_consent', JSON.stringify(cookieSettings));
    } catch {
      // ignore
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      functional: true,
      advertising: true,
    };
    setCookieSettings(allEnabled);
    try {
      localStorage.setItem('safarihoo_cookie_consent', JSON.stringify(allEnabled));
    } catch {
      // ignore
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          title="Close cookie settings"
        >
          <X className="w-4 h-4" />
        </button>

        {saved ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">{t.savedTitle}</h3>
            <p className="text-xs sm:text-sm text-white/70">
              {t.savedDesc}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white leading-tight">{t.title}</h2>
                <span className="text-xs text-white/50">{t.subtitle}</span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-5">
              {t.description}
            </p>

            {/* Cookie Categories */}
            <div className="space-y-3 mb-6">
              {/* Category 1: Necessary */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{t.cat1Title}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/60 font-semibold uppercase">
                      {t.cat1Badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {t.cat1Desc}
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white">{t.cat2Title}</span>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {t.cat2Desc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.analytics}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, analytics: e.target.checked })}
                  className="w-5 h-5 rounded accent-[#1b64f2] cursor-pointer"
                />
              </div>

              {/* Category 3: Functional */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white">{t.cat3Title}</span>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {t.cat3Desc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.functional}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, functional: e.target.checked })}
                  className="w-5 h-5 rounded accent-[#1b64f2] cursor-pointer"
                />
              </div>

              {/* Category 4: Advertising */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white">{t.cat4Title}</span>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {t.cat4Desc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.advertising}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, advertising: e.target.checked })}
                  className="w-5 h-5 rounded accent-[#1b64f2] cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.saveBtn}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1b64f2] hover:bg-[#1654cc] text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
              >
                {t.acceptAllBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
