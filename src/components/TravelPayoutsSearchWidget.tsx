import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const TravelPayoutsSearchWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsLoaded(false);
    container.innerHTML = '';

    const script = document.createElement('script');
    const locale = language === 'FR' ? 'fr' : 'en';
    script.src = `https://tpemd.com/content?currency=usd&trs=429016&shmarker=569298&show_hotels=false&powered_by=false&locale=${locale}&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=&color_icons=%230D0D0Eff&dark=%23262626&light=%23FFFFFFFf&secondary=%23FFFFFFFf&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=true&plain=true&promo_id=7879&campaign_id=100`;
    script.async = true;
    script.charset = 'utf-8';

    script.onload = () => {
      setIsLoaded(true);
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    };

    script.onerror = () => {
      setIsLoaded(true);
    };

    container.appendChild(script);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
      window.dispatchEvent(new Event('resize'));
    }, 1500);

    return () => {
      clearTimeout(fallbackTimer);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [language]);

  return (
    <div 
      id="travelpayouts-search-container" 
      className="w-full my-4 min-h-[64px] relative z-20 overflow-visible"
    >
      <div 
        ref={containerRef} 
        className={`w-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`} 
      />
    </div>
  );
};

