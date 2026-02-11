'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  href: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  courseTitle: string;
  modules: Module[];
}

export default function CourseSidebar({ courseTitle, modules }: CourseSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-50 btn-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-dark-900 border-r border-dark-800 transform transition-transform duration-300 ease-in-out overflow-y-auto custom-scrollbar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:h-[calc(100vh-64px)] md:sticky md:top-16
      `}>
        <div className="p-4 border-b border-dark-800">
          <h2 className="text-xl font-bold text-white truncate">{courseTitle}</h2>
        </div>

        <nav className="p-2 space-y-6">
          {modules.map((module, idx) => (
            <div key={idx}>
              <h3 className="px-2 text-xs font-bold text-dark-400 uppercase tracking-wider mb-2 mt-4">
                {module.title}
              </h3>
              <div className="space-y-0.5">
                {module.lessons.map((lesson) => {
                  const isActive = pathname === lesson.href;
                  return (
                    <Link
                      key={lesson.id}
                      href={lesson.href}
                      className={`
                        block px-3 py-2 rounded-lg text-sm transition-colors
                        ${isActive 
                          ? 'bg-primary-500/10 text-primary-400 font-medium border-l-2 border-primary-500 rounded-l-none' 
                          : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {lesson.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
