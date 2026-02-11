'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const javascriptModules = [
  {
    title: 'Fundamentals',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/javascript/intro' },
      { id: '1-2', title: 'Variables', href: '/lessons/javascript/variables' },
      { id: '1-3', title: 'Functions', href: '/lessons/javascript/functions' },
    ]
  },
  {
    title: 'Intermediate',
    lessons: [
      { id: '2-1', title: 'Objects', href: '/lessons/javascript/objects' },
      { id: '2-2', title: 'DOM Manipulation', href: '/lessons/javascript/dom' },
      { id: '2-3', title: 'Event Handling', href: '/lessons/javascript/events' },
    ]
  },
  {
    title: 'Advanced',
    lessons: [
      { id: '3-1', title: 'Async JavaScript', href: '/lessons/javascript/async' },
    ]
  }
];

export default function JavascriptLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="JavaScript" modules={javascriptModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
