'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/typing', label: 'Typing' },
    { href: '/code-typing', label: 'Code' },
    { href: '/race', label: 'Race' },
    { href: '/lessons', label: 'Lessons' },
    { href: '/vocabulary', label: 'Vocabulary' },
    { href: '/quiz', label: 'Quiz' },
  ];

  return (
    <header className="border-b border-dark-800/50 sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'}}>
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
              EduVerse Hub
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary-400 bg-primary-500/10' 
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-dark-400 hover:text-white transition-colors hidden md:block">
              Dashboard
            </Link>
            <div className="w-px h-6 bg-dark-700 hidden md:block" />
            <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
