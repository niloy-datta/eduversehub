export type Locale = 'en' | 'de' | 'hi' | 'es' | 'fr' | 'ja' | 'zh';

export const locales: Locale[] = ['en', 'de', 'hi', 'es', 'fr', 'ja', 'zh'];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  ja: '日本語',
  zh: '简体中文'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  de: '🇩🇪',
  hi: '🇮🇳',
  es: '🇪🇸',
  fr: '🇫🇷',
  ja: '🇯🇵',
  zh: '🇨🇳'
};
