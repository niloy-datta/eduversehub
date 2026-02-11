'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mysqlModules = [
  {
    title: '1. Fundamentals',
    lessons: [
      { id: '1-1', title: 'Introduction to MySQL', href: '/lessons/mysql/intro' },
      { id: '1-2', title: 'DBMS Architecture', href: '/lessons/mysql/dbms-architecture' },
      { id: '1-3', title: 'Common Queries', href: '/lessons/mysql/common-queries' },
    ]
  },
  {
    title: '2. Data Manipulation',
    lessons: [
      { id: '2-1', title: 'The SELECT Statement', href: '/lessons/mysql/select' },
      { id: '2-2', title: 'Filtering with WHERE', href: '/lessons/mysql/where' },
      { id: '2-3', title: 'INSERT & UPDATE', href: '/lessons/mysql/insert-update' },
    ]
  },
  {
    title: '3. Advanced Operations',
    lessons: [
      { id: '3-1', title: 'Table Operations (ALTER)', href: '/lessons/mysql/table-ops' },
      { id: '3-2', title: 'Aggregate Functions', href: '/lessons/mysql/aggregates' },
      { id: '3-3', title: 'Advanced Clauses', href: '/lessons/mysql/clauses' },
      { id: '3-4', title: 'SQL Joins', href: '/lessons/mysql/joins' },
    ]
  },
  {
    title: '4. Database Design',
    lessons: [
      { id: '4-1', title: 'Entity-Relationship Model', href: '/lessons/mysql/er-model' },
      { id: '4-2', title: 'Structural Constraints', href: '/lessons/mysql/structural-constraints' },
      { id: '4-3', title: 'ER to Relational Mapping', href: '/lessons/mysql/er-mapping' },
    ]
  },
  {
    title: '5. Theoretical Foundation & Design',
    lessons: [
      { id: '5-1', title: 'The Relational Model', href: '/lessons/mysql/relational-model' },
      { id: '5-2', title: "Codd's 12 Rules", href: '/lessons/mysql/codd-rules' },
      { id: '5-3', title: 'Database Keys', href: '/lessons/mysql/database-keys' },
      { id: '5-4', title: 'Relational Algebra', href: '/lessons/mysql/relational-algebra' },
      { id: '5-5', title: 'Schema Design Strategy', href: '/lessons/mysql/schema-strategy' },
    ]
  }
];

export default function MySqlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="MySQL Mastery" modules={mysqlModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
