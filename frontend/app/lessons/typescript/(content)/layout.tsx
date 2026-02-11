'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const typescriptModules = [
  {
    title: 'Fundamentals',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/typescript/intro' },
      { id: '1-2', title: 'Basic Types', href: '/lessons/typescript/types' },
      { id: '1-3', title: 'Interfaces', href: '/lessons/typescript/interfaces' },
    ]
  },
  {
    title: 'Advanced Types',
    lessons: [
      { id: '2-1', title: 'Generics', href: '#' },
      { id: '2-2', title: 'Utility Types', href: '#' },
    ]
  }
];

export default function TypeScriptLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="TypeScript" modules={typescriptModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
