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

export default function JavaCoursePage() {
  const modules: Module[] = [
    {
      id: 1,
      title: 'Introduction to Java',
      duration: '45 min',
      lessons: [
        { id: '1-1', title: 'What is Java?', type: 'video', duration: '5 min', completed: false, locked: false, href: '/lessons/java/intro' },
        { id: '1-2', title: 'Getting Started', type: 'article', duration: '10 min', completed: false, locked: false, href: '/lessons/java/get-started' },
        { id: '1-3', title: 'Java Syntax', type: 'code', duration: '15 min', completed: false, locked: false, href: '/lessons/java/syntax' },
      ]
    },
    {
      id: 2,
      title: 'Java Basics',
      duration: '1h 30m',
      lessons: [
        { id: '2-1', title: 'Output & Comments', type: 'concept', duration: '15 min', locked: false, href: '/lessons/java/output' },
        { id: '2-2', title: 'Variables & Data Types', type: 'code', duration: '30 min', locked: false, href: '/lessons/java/variables' },
        { id: '2-3', title: 'Operators', type: 'code', duration: '20 min', locked: false, href: '/lessons/java/operators' },
        { id: '2-4', title: 'Strings', type: 'concept', duration: '15 min', locked: false, href: '/lessons/java/strings' },
      ]
    },
    {
      id: 3,
      title: 'Control Flow',
      duration: '2h',
      lessons: [
        { id: '3-1', title: 'Booleans & If/Else', type: 'code', duration: '45 min', locked: true },
        { id: '3-2', title: 'Switch Statements', type: 'code', duration: '30 min', locked: true },
        { id: '3-3', title: 'Loops (While/For)', type: 'code', duration: '45 min', locked: true },
      ]
    },
    {
      id: 4,
      title: 'Object-Oriented Programming',
      duration: '5h',
      lessons: [
        { id: '4-1', title: 'Classes & Objects', type: 'concept', duration: '1 hr', locked: true },
        { id: '4-2', title: 'Methods', type: 'code', duration: '1 hr', locked: true },
        { id: '4-3', title: 'Constructors', type: 'code', duration: '45 min', locked: true },
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
            <div className="w-full md:w-1/3 aspect-video bg-linear-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-500/30">
              <span className="text-8xl">☕</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Bestseller Course
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Java Masterclass: <span className="gradient-text from-orange-400 to-red-600">Zero to Hero</span>
              </h1>
              <p className="text-dark-300 text-lg mb-6 leading-relaxed">
                Complete Java programming guide. From variables and loops to OOP, Collections, and Streams. Build a solid foundation for enterprise development.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-8">
                <div className="flex items-center gap-2">
                  <span>⏱️ 40+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚 50+ Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👨‍💻 Beginner to Advanced</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏆 Certificate of Completion</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/lessons/java/intro" className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all text-center flex-1 md:flex-none">
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
              <p className="text-sm text-dark-400 mb-6">1/50 Lessons Completed (2%)</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-dark-300">
                  <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                  <span>Certificate upon completion</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                  <span>Access on mobile and TV</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                  <span>Full lifetime access</span>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-primary-900/50 to-secondary-900/50 p-6 rounded-2xl border border-primary-500/20">
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-dark-300 text-sm mb-4">Join our community Discord server to get help from mentors and peers.</p>
              <button className="btn-outline w-full py-2 text-sm">Join Discord</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
