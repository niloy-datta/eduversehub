'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const reactModules = [
  {
    title: 'Fundamentals',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/react/intro' },
      { id: '1-2', title: 'Components', href: '/lessons/react/components' },
      { id: '1-3', title: 'Props', href: '/lessons/react/props' },
    ]
  },
  {
    title: 'Hooks & State',
    lessons: [
      { id: '2-1', title: 'State & useState', href: '/lessons/react/state' },
      { id: '2-2', title: 'Conditional Rendering', href: '/lessons/react/conditional-rendering' },
      { id: '2-3', title: 'The useEffect Hook', href: '/lessons/react/useEffect' },
    ]
  },
  {
    title: 'Advanced React',
    lessons: [
      { id: '3-1', title: 'Context API', href: '/lessons/react/context' },
      { id: '3-2', title: 'React Routing', href: '/lessons/react/routing' },
    ]
  }
];

export default function ReactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="React" modules={reactModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
