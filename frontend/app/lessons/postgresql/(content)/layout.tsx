'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const postgresqlModules = [
  {
    title: 'Advanced Relational',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/postgresql/intro' },
      { id: '1-2', title: 'Advanced Data Types', href: '/lessons/postgresql/types' },
    ]
  },
  {
    title: 'Performance & Scale',
    lessons: [
      { id: '2-1', title: 'Window Functions', href: '/lessons/postgresql/window-functions' },
      { id: '2-2', title: 'Performance & Indexing', href: '/lessons/postgresql/performance' },
    ]
  }
];

export default function PostgresqlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="PostgreSQL" modules={postgresqlModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
