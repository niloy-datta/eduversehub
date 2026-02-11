'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { locales, localeNames, localeFlags, Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-dark-300 hover:text-white transition-colors"
        aria-label="Select language"
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="hidden sm:inline text-sm font-medium">{localeNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl border border-dark-700 overflow-hidden z-50 animate-fade-in-down">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                locale === loc
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-dark-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{localeFlags[loc]}</span>
              <span className="text-sm font-medium">{localeNames[loc]}</span>
              {locale === loc && (
                <svg className="w-4 h-4 ml-auto text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
