'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative w-10 h-10 rounded-lg glass text-dark-300 hover:text-white transition-all hover:scale-110 flex items-center justify-center group"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={theme === 'system' ? 'System theme' : theme === 'dark' ? 'Dark mode' : 'Light mode'}
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`w-5 h-5 absolute transition-all duration-300 ${
          resolvedTheme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`w-5 h-5 absolute transition-all duration-300 ${
          resolvedTheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* System indicator dot */}
      {theme === 'system' && (
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}
