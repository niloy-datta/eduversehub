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

export default function TypeScriptCoursePage() {
  const modules: Module[] = [
    {
      id: 1,
      title: 'Fundamentals',
      duration: '1h',
      lessons: [
        { id: '1-1', title: 'Introduction', type: 'article', duration: '15 min', completed: false, locked: false, href: '/lessons/typescript/intro' },
        { id: '1-2', title: 'Basic Types', type: 'code', duration: '20 min', completed: false, locked: false, href: '/lessons/typescript/types' },
        { id: '1-3', title: 'Interfaces', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/typescript/interfaces' },
      ]
    },
    {
      id: 2,
      title: 'Advanced Types',
      duration: '1h 30m',
      lessons: [
        { id: '2-1', title: 'Generics', type: 'code', duration: '45 min', locked: true },
        { id: '2-2', title: 'Utility Types', type: 'code', duration: '45 min', locked: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30">
      <Header />

      <main className="container-custom py-12">
        {/* Course Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 aspect-video bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/30">
              <span className="text-8xl">TS</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Scalable JavaScript
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                TypeScript: <span className="gradient-text from-blue-500 to-indigo-600">Type Safety</span>
              </h1>
              <p className="text-dark-300 text-lg mb-6 leading-relaxed">
                Supercharge your JavaScript development with static types. Learn how to catch errors early and write more maintainable code.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-8">
                <div className="flex items-center gap-2">
                  <span>⏱️ 15+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚 30+ Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚀 Intermediate</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/lessons/typescript/intro" className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all text-center flex-1 md:flex-none">
                  Start Learning
                </Link>
                <button className="btn-outline px-8 py-3 rounded-xl flex-1 md:flex-none">
                  View Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Syllabus */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
            
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
                          {lesson.type === 'video' && '🎥'}
                          {lesson.type === 'article' && '📄'}
                          {lesson.type === 'code' && '💻'}
                          {lesson.type === 'guide' && '📖'}
                          {lesson.type === 'concept' && '💡'}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-glass p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
              <div className="w-full h-3 bg-dark-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-success-500 w-[5%]"></div>
              </div>
              <p className="text-sm text-dark-400 mb-6">1/30 Lessons Completed (2%)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
