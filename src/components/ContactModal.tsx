import React, { useState } from 'react';
import { X, Mail, Phone, Send, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const isFr = language === 'FR';

  const t = {
    title: isFr ? 'Contacter Safarihoo' : 'Contact Safarihoo',
    subtitle: isFr
      ? 'Notre service conciergerie 24/7 est à votre disposition dans le monde entier.'
      : 'Our 24/7 travel concierge team is ready to assist you worldwide.',
    msgReceived: isFr ? 'Message Reçu !' : 'Message Received!',
    msgReceivedDesc: (mail: string) =>
      isFr
        ? `Un conseiller voyage Safarihoo répondra à ${mail || 'votre e-mail'} sous peu.`
        : `A Safarihoo travel specialist will respond to ${mail || 'your email'} shortly.`,
    emailLabel: isFr ? 'Adresse e-mail' : 'Email Address',
    emailPlaceholder: isFr ? 'vous@exemple.com' : 'you@example.com',
    messageLabel: isFr ? 'Message / Demandes' : 'Message / Inquiries',
    messagePlaceholder: isFr
      ? 'Comment pouvons-nous vous aider pour votre voyage ou réservation ?'
      : 'How can we assist with your journey or booking?',
    sendBtn: isFr ? 'Envoyer le message' : 'Send Message',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="contact-support-modal"
        className="w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">{t.title}</h3>
          <p className="text-xs text-white/70 mt-1">{t.subtitle}</p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3 bg-white/[0.05] rounded-2xl border border-white/10 my-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">{t.msgReceived}</h4>
            <p className="text-xs text-white/80">{t.msgReceivedDesc(email)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1.5">{t.emailLabel}</label>
              <input
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1.5">{t.messageLabel}</label>
              <textarea
                required
                rows={3}
                placeholder={t.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70 py-1">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-white/60" /> +1 (800) SAFARI-HOO</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-white/60" /> support@safarihoo.com</div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1b64f2] hover:bg-[#1654cc] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>{t.sendBtn}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

