'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed?: boolean;
  locked: boolean;
  href?: string;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export default function MySqlCoursePage() {
  const modules: Module[] = [
    {
      id: 1,
      title: 'Getting Started',
      duration: '1h',
      lessons: [
        { id: '1-1', title: 'Introduction to MySQL', type: 'article', duration: '15 min', completed: false, locked: false, href: '/lessons/mysql/intro' },
        { id: '1-2', title: 'DBMS Architecture (Tier 1/2/3)', type: 'article', duration: '20 min', completed: false, locked: false, href: '/lessons/mysql/dbms-architecture' },
        { id: '1-3', title: 'Common Queries & Syntax', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/mysql/common-queries' },
      ]
    },
    {
      id: 2,
      title: 'Querying Data',
      duration: '1h 30m',
      lessons: [
        { id: '2-1', title: 'The SELECT Statement', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/select' },
        { id: '2-2', title: 'Filtering with WHERE', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/where' },
        { id: '2-3', title: 'INSERT & UPDATE', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/insert-update' },
      ]
    },
    {
      id: 3,
      title: 'Advanced Database Ops',
      duration: '2h',
      lessons: [
        { id: '3-1', title: 'Table Structure (ALTER/DROP)', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/table-ops' },
        { id: '3-2', title: 'Aggregate Functions (MIN/MAX)', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/aggregates' },
        { id: '3-3', title: 'Clauses (LIMIT/BETWEEN)', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/clauses' },
        { id: '3-4', title: 'Mastering SQL Joins', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/joins' },
      ]
    },
    {
      id: 4,
      title: 'Database Design (ER Modeling)',
      duration: '2h',
      lessons: [
        { id: '4-1', title: 'ER Model Fundamentals', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/mysql/er-model' },
        { id: '4-2', title: 'Structural Constraints', type: 'article', duration: '40 min', completed: false, locked: false, href: '/lessons/mysql/structural-constraints' },
        { id: '4-3', title: 'ER-to-Relational Mapping', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/mysql/er-mapping' },
      ]
    },
    {
      id: 5,
      title: 'Theory & Design Strategies',
      duration: '2h 30m',
      lessons: [
        { id: '5-1', title: 'The Relational Model', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/relational-model' },
        { id: '5-2', title: "Codd's Rules", type: 'article', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/codd-rules' },
        { id: '5-3', title: 'Database Keys Explained', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/database-keys' },
        { id: '5-4', title: 'Relational Algebra Basis', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/relational-algebra' },
        { id: '5-5', title: 'Schema Design Strategies', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/mysql/schema-strategy' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30">
      <Header />

      <main className="container-custom py-12">
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 aspect-video bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/30">
              <span className="text-8xl">🐬</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                The World&apos;s Most Popular Open Source DB
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                MySQL <span className="gradient-text from-blue-400 to-cyan-400">Mastery</span>
              </h1>
              <p className="text-dark-300 text-lg mb-6 leading-relaxed">
                From basic SELECT queries to complex JOINs and database architecture. Learn how to manage data for high-performance applications.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-8">
                <div className="flex items-center gap-2">
                  <span>⏱️ 15+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚 35+ Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚀 Beginner Friendly</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/lessons/mysql/intro" className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all text-center flex-1 md:flex-none">
                  Start Learning
                </Link>
                <button className="btn-outline px-8 py-3 rounded-xl flex-1 md:flex-none">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Course Syllabus</h2>
            
            {modules.map((module) => (
              <div key={module.id} className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden hover:border-dark-700 transition-colors">
                <div className="p-6 cursor-pointer flex justify-between items-center bg-dark-800/50">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Module {module.id}: {module.title}</h3>
                    <p className="text-sm text-dark-400">{module.lessons.length} Lessons • {module.duration}</p>
                  </div>
                  <span className="text-dark-400 text-xl">⌄</span>
                </div>
                
                <div className="divide-y divide-dark-800">
                  {module.lessons.map((lesson) => (
                    <Link 
                      href={lesson.locked ? '#' : (lesson.href || '#')} 
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 hover:bg-dark-800/30 transition-colors ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${lesson.completed ? 'bg-success-500/20 text-success-400' : 'bg-dark-800 text-dark-400'}`}>
                          {lesson.type === 'concept' && '💡'}
                          {lesson.type === 'article' && '📄'}
                          {lesson.type === 'code' && '💻'}
                        </div>
                        <div>
                          <p className={`font-medium ${lesson.completed ? 'text-success-400 line-through' : 'text-dark-200'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-dark-500">{lesson.type} • {lesson.duration}</p>
                        </div>
                      </div>
                      
                      <div>
                        {lesson.locked ? (
                          <span className="text-dark-600 text-lg">🔒</span>
                        ) : (
                          <span className="w-8 h-8 rounded-full border border-dark-600 flex items-center justify-center text-dark-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all">
                            ▶
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="card-glass p-6 sticky top-24 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
              <div className="w-full h-3 bg-dark-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-blue-500 w-[8%]"></div>
              </div>
              <p className="text-sm text-dark-400 mb-6">1/25 Lessons Completed (8%)</p>
              
              <div className="space-y-4 pt-4 border-t border-dark-800">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">SQL</div>
                  <span className="text-sm text-dark-200">RDBMS Concepts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                  <span className="text-sm text-dark-200">Table Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
