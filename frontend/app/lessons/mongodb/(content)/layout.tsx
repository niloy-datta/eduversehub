'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mongodbModules = [
  {
    title: 'Getting Started',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/mongodb/intro' },
      { id: '1-2', title: 'CRUD Operations', href: '/lessons/mongodb/crud' },
    ]
  },
  {
    title: 'Data Modeling',
    lessons: [
      { id: '2-1', title: 'Schema Design', href: '/lessons/mongodb/schema-design' },
    ]
  },
  {
    title: 'Advanced Topics',
    lessons: [
      { id: '3-1', title: 'Aggregation', href: '/lessons/mongodb/aggregation' },
      { id: '3-2', title: 'Indexing', href: '/lessons/mongodb/indexing' },
    ]
  }
];

export default function MongodbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="MongoDB" modules={mongodbModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
