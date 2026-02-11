'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LessonCategory {
  id: string;
  title: string;
  titleBn: string;
  icon: string;
  color: string;
  lessons: {
    id: number;
    title: string;
    titleBn: string;
    description: string;
    screens: number;
    completed?: boolean;
    locked?: boolean;
    href?: string;
  }[];
}

const categories: LessonCategory[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    titleBn: 'শুরু',
    icon: '🌱',
    color: 'from-green-400 to-emerald-600',
    lessons: [
      { id: 1, title: 'Home Row - J, F, and Space', titleBn: 'হোম রো - J, F এবং স্পেস', description: 'Learn the foundation keys', screens: 11, completed: true },
      { id: 2, title: 'Home Row - D and K', titleBn: 'হোম রো - D এবং K', description: 'Add more home row keys', screens: 8, completed: true },
      { id: 3, title: 'Home Row - S and L', titleBn: 'হোম রো - S এবং L', description: 'Practice with ring fingers', screens: 10, completed: false },
      { id: 4, title: 'Home Row - A and ;', titleBn: 'হোম রো - A এবং ;', description: 'Complete home row mastery', screens: 9, locked: true },
      { id: 5, title: 'Home Row Review', titleBn: 'হোম রো রিভিউ', description: 'Full home row practice', screens: 15, locked: true },
    ],
  },
  {
    id: 'top-row',
    title: 'Top Row',
    titleBn: 'টপ রো',
    icon: '⬆️',
    color: 'from-blue-400 to-indigo-600',
    lessons: [
      { id: 6, title: 'Top Row - E and I', titleBn: 'টপ রো - E এবং I', description: 'Reach up to E and I', screens: 10, locked: true },
      { id: 7, title: 'Top Row - R and U', titleBn: 'টপ রো - R এবং U', description: 'Index finger stretches', screens: 10, locked: true },
      { id: 8, title: 'Top Row - W and O', titleBn: 'টপ রো - W এবং O', description: 'Ring finger training', screens: 10, locked: true },
      { id: 9, title: 'Top Row - Q and P', titleBn: 'টপ রো - Q এবং P', description: 'Pinky precision', screens: 10, locked: true },
      { id: 10, title: 'Top Row - T and Y', titleBn: 'টপ রো - T এবং Y', description: 'Center reach keys', screens: 10, locked: true },
    ],
  },
  {
    id: 'bottom-row',
    title: 'Bottom Row',
    titleBn: 'বটম রো',
    icon: '⬇️',
    color: 'from-orange-400 to-red-600',
    lessons: [
      { id: 11, title: 'Bottom Row - V and M', titleBn: 'বটম রো - V এবং M', description: 'Index finger down', screens: 10, locked: true },
      { id: 12, title: 'Bottom Row - C and ,', titleBn: 'বটম রো - C এবং ,', description: 'Middle finger stretch', screens: 10, locked: true },
      { id: 13, title: 'Bottom Row - X and .', titleBn: 'বটম রো - X এবং .', description: 'Ring finger reach', screens: 10, locked: true },
      { id: 14, title: 'Bottom Row - Z and /', titleBn: 'বটম রো - Z এবং /', description: 'Pinky practice', screens: 10, locked: true },
      { id: 15, title: 'Bottom Row - B and N', titleBn: 'বটম রো - B এবং N', description: 'Center bottom keys', screens: 10, locked: true },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    titleBn: 'অ্যাডভান্সড',
    icon: '🚀',
    color: 'from-purple-400 to-pink-600',
    lessons: [
      { id: 16, title: 'Numbers Row', titleBn: 'নম্বর রো', description: 'Master the number keys', screens: 15, locked: true },
      { id: 17, title: 'Shift Key Mastery', titleBn: 'শিফট কী', description: 'Capital letters and symbols', screens: 12, locked: true },
      { id: 18, title: 'Punctuation', titleBn: 'যতিচিহ্ন', description: 'Periods, commas, and more', screens: 12, locked: true },
      { id: 19, title: 'Speed Building', titleBn: 'স্পিড বিল্ডিং', description: 'Increase your WPM', screens: 20, locked: true },
      { id: 20, title: 'Full Keyboard Test', titleBn: 'সম্পূর্ণ কীবোর্ড', description: 'Ultimate typing challenge', screens: 25, locked: true },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    titleBn: 'প্রোগ্রামিং',
    icon: '💻',
    color: 'from-blue-500 to-indigo-700',
    lessons: [
      { 
        id: 100, 
        title: 'Java Masterclass: Zero to Hero', 
        titleBn: 'জাভা মাস্টারক্লাস', 
        description: 'Complete Java programming guide from scratch.', 
        screens: 50, 
        href: '/lessons/java',
        completed: false
      },
      { 
        id: 101, 
        title: 'Spring Boot: Enterprise Ready', 
        titleBn: 'স্প্রিং বুট ফ্রেমওয়ার্ক', 
        description: 'Build production-ready applications with Spring Boot.', 
        screens: 40, 
        href: '/lessons/spring-boot',
        completed: false
      },
      { 
        id: 102, 
        title: 'JavaScript: The Web Language', 
        titleBn: 'জাভাস্ক্রিপ্ট', 
        description: 'Master the language of the web.', 
        screens: 30, 
        href: '/lessons/javascript',
        completed: false
      },
      { 
        id: 103, 
        title: 'React: Modern UI', 
        titleBn: 'রিয়্যাক্ট', 
        description: 'Build interactive UIs with React.', 
        screens: 25, 
        href: '/lessons/react',
        completed: false
      },
      { 
        id: 104, 
        title: 'TypeScript: Typed JS', 
        titleBn: 'টাইপস্ক্রিপ্ট', 
        description: 'Scale your JavaScript with types.', 
        screens: 20, 
        href: '/lessons/typescript',
        completed: false
      },
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures',
    titleBn: 'ডেটা স্ট্রাকচার',
    icon: '🧩',
    color: 'from-pink-500 to-rose-600',
    lessons: [
      { 
        id: 201, 
        title: 'DSA with Java', 
        titleBn: 'জাভা ডিএসএ', 
        description: 'Master algorithms and data structures using Java.', 
        screens: 60, 
        href: '/lessons/dsa-java',
        completed: false
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    titleBn: 'ডেটাবেস',
    icon: '🗄️',
    color: 'from-amber-400 to-orange-600',
    lessons: [
      { 
        id: 301, 
        title: 'MySQL: Relational DB', 
        titleBn: 'মাইএসকিউএল', 
        description: 'Learn SQL and relational database design.', 
        screens: 25, 
        href: '/lessons/mysql',
        completed: false
      },
      { 
        id: 302, 
        title: 'PostgreSQL: Advanced SQL', 
        titleBn: 'পোস্টগ্রেএসকিউএল', 
        description: 'Advanced relational database features.', 
        screens: 25, 
        href: '/lessons/postgresql',
        completed: false
      },
      { 
        id: 303, 
        title: 'MongoDB: NoSQL', 
        titleBn: 'মঙ্গোডিবি', 
        description: 'Modern document-based NoSQL database.', 
        screens: 25, 
        href: '/lessons/mongodb',
        completed: false
      },
    ],
  },
];

export default function LessonsPage() {
  const [activeCategory, setActiveCategory] = useState('beginner');

  const totalCompleted = categories.reduce((acc, cat) => 
    acc + cat.lessons.filter(l => l.completed).length, 0
  );
  const totalLessons = categories.reduce((acc, cat) => acc + cat.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold text-gray-800">EduVerse Hub</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-gray-600 hover:text-sky-600 transition-colors">Typing Test</Link>
              <Link href="/lessons" className="text-sky-600 font-medium">Lessons</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-sky-600 transition-colors">Dashboard</Link>
              <Link href="/login" className="px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Typing <span className="text-sky-500">Lessons</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            সঠিক টাইপিং শিখুন ধাপে ধাপে। প্রতিটি লেসন আপনাকে সঠিক আঙ্গুল ব্যবহার শেখাবে।
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-bold text-sky-600">{totalCompleted}/{totalLessons} Lessons</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all"
              style={{ width: `${(totalCompleted / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        {categories.filter(c => c.id === activeCategory).map((category) => (
          <div key={category.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={lesson.locked ? '#' : (lesson.href || '/lessons/practice')}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg transition-all ${
                  lesson.locked 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Lesson Number */}
                <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {index + 1}
                </div>

                {/* Status Badge */}
                {lesson.completed && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
                {lesson.locked && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    🔒
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{lesson.titleBn}</p>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{lesson.screens} screens</span>
                    {!lesson.locked && !lesson.completed && (
                      <span className="text-sky-500 font-medium text-sm group-hover:underline">
                        Start →
                      </span>
                    )}
                    {lesson.completed && (
                      <span className="text-green-500 font-medium text-sm">
                        Review →
                      </span>
                    )}
                  </div>

                  {/* Progress bar for in-progress lessons */}
                  {!lesson.locked && !lesson.completed && (
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-400 rounded-full" style={{ width: '30%' }} />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ))}

        {/* Tips */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            💡 Quick Tips for Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Start with Home Row</h3>
              <p className="text-gray-600 text-sm">ASDF JKL; are your anchor keys. Always return your fingers here.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="text-3xl mb-3">👀</div>
              <h3 className="font-bold text-gray-800 mb-2">Don&apos;t Look Down</h3>
              <p className="text-gray-600 text-sm">Keep your eyes on the screen. Trust your muscle memory.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="text-3xl mb-3">🏃</div>
              <h3 className="font-bold text-gray-800 mb-2">Accuracy First</h3>
              <p className="text-gray-600 text-sm">Speed comes naturally. Focus on typing correctly first.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-gray-700">About</Link>
              <Link href="/contact" className="hover:text-gray-700">Contact</Link>
              <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
