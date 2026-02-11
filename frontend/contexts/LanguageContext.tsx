'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from '@/i18n/config';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem('language') as Locale;
    if (saved) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    // Load translations for current locale
    async function loadTranslations() {
      try {
        const messages = await import(`@/i18n/dictionaries/${locale}.json`);
        setTranslations(messages.default);
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to English
        const fallbackMessages = await import(`@/i18n/dictionaries/en.json`);
        setTranslations(fallbackMessages.default);
      }
    }
    loadTranslations();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('language', newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
