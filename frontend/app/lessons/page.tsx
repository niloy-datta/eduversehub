'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  progress: number;
  isLocked: boolean;
  exercises: number;
}

const lessons: Lesson[] = [
  // Beginner
  { id: '1', title: 'Home Row Keys', description: 'Master the foundation of touch typing with ASDF and JKL;', category: 'beginner', duration: '10 min', progress: 100, isLocked: false, exercises: 8 },
  { id: '2', title: 'Top Row Keys', description: 'Learn QWERTY and other top row characters', category: 'beginner', duration: '12 min', progress: 75, isLocked: false, exercises: 10 },
  { id: '3', title: 'Bottom Row Keys', description: 'Practice ZXCVBNM and bottom row typing', category: 'beginner', duration: '10 min', progress: 30, isLocked: false, exercises: 8 },
  { id: '4', title: 'Number Keys', description: 'Type numbers 0-9 with speed and accuracy', category: 'beginner', duration: '15 min', progress: 0, isLocked: false, exercises: 12 },
  // Intermediate
  { id: '5', title: 'Capital Letters', description: 'Master shift key usage for capitalization', category: 'intermediate', duration: '12 min', progress: 0, isLocked: true, exercises: 10 },
  { id: '6', title: 'Punctuation Marks', description: 'Learn common punctuation and symbols', category: 'intermediate', duration: '15 min', progress: 0, isLocked: true, exercises: 14 },
  { id: '7', title: 'Common Words', description: 'Practice the 100 most common English words', category: 'intermediate', duration: '20 min', progress: 0, isLocked: true, exercises: 16 },
  { id: '8', title: 'Short Sentences', description: 'Type complete sentences with proper grammar', category: 'intermediate', duration: '18 min', progress: 0, isLocked: true, exercises: 12 },
  // Advanced
  { id: '9', title: 'Speed Building', description: 'Push your WPM to the next level', category: 'advanced', duration: '25 min', progress: 0, isLocked: true, exercises: 20 },
  { id: '10', title: 'Special Characters', description: 'Master @#$%^&*() and other symbols', category: 'advanced', duration: '20 min', progress: 0, isLocked: true, exercises: 16 },
  { id: '11', title: 'Code Syntax', description: 'Practice typing programming syntax', category: 'advanced', duration: '30 min', progress: 0, isLocked: true, exercises: 24 },
  { id: '12', title: 'Pro Challenge', description: 'Ultimate typing challenge for experts', category: 'advanced', duration: '35 min', progress: 0, isLocked: true, exercises: 30 },
];

type Category = 'all' | 'beginner' | 'intermediate' | 'advanced';

export default function LessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(l => l.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner': return 'text-success-400 bg-success-500/10 border-success-500/20';
      case 'intermediate': return 'text-warning-400 bg-warning-500/10 border-warning-500/20';
      case 'advanced': return 'text-error-400 bg-error-500/10 border-error-500/20';
      default: return 'text-dark-400 bg-dark-500/10 border-dark-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '⚡';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-800/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'}}>
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                EduVerse Hub
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/code-typing" className="text-dark-400 hover:text-white transition-colors">Code</Link>
              <Link href="/lessons" className="text-primary-400 font-medium">Lessons</Link>
              <Link href="/leaderboard" className="text-dark-400 hover:text-white transition-colors">Leaderboard</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Typing <span className="gradient-text">Lessons</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Master touch typing with our structured curriculum. Progress from beginner to expert at your own pace.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-1">12</div>
            <div className="text-dark-400 text-sm">Total Lessons</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-success-400 mb-1">2</div>
            <div className="text-dark-400 text-sm">Completed</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-warning-400 mb-1">2</div>
            <div className="text-dark-400 text-sm">In Progress</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-secondary-400 mb-1">17%</div>
            <div className="text-dark-400 text-sm">Overall Progress</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 glass rounded-2xl p-2">
            {(['all', 'beginner', 'intermediate', 'advanced'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
                style={selectedCategory === cat ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
              >
                {cat === 'all' ? '📚 All' : `${getCategoryIcon(cat)} ${cat}`}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`glass rounded-2xl p-6 transition-all ${
                lesson.isLocked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:scale-[1.02] cursor-pointer'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-lg border capitalize ${getCategoryColor(lesson.category)}`}>
                  {getCategoryIcon(lesson.category)} {lesson.category}
                </span>
                {lesson.isLocked ? (
                  <svg className="w-5 h-5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : lesson.progress === 100 ? (
                  <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : null}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-2">{lesson.title}</h3>
              <p className="text-dark-400 text-sm mb-4">{lesson.description}</p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {lesson.exercises} exercises
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-dark-500">Progress</span>
                  <span className="text-dark-400">{lesson.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={lesson.isLocked}
                className={`w-full py-2 rounded-xl font-medium transition-all ${
                  lesson.isLocked
                    ? 'bg-dark-800 text-dark-500 cursor-not-allowed'
                    : lesson.progress === 100
                    ? 'bg-success-500/20 text-success-400 hover:bg-success-500/30'
                    : lesson.progress > 0
                    ? 'btn-primary'
                    : 'bg-dark-700 text-white hover:bg-dark-600'
                }`}
              >
                {lesson.isLocked 
                  ? 'Locked' 
                  : lesson.progress === 100 
                  ? 'Review' 
                  : lesson.progress > 0 
                  ? 'Continue' 
                  : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
