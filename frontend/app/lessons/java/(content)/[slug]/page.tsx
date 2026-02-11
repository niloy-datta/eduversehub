'use client';

import { javaLessons } from '../../data';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import CodePractice from '@/components/CodePractice';
import LessonNavigation from '@/components/LessonNavigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function JavaLessonPage({ params }: PageProps) {
  const { slug } = use(params);
  const lesson = javaLessons[slug as keyof typeof javaLessons];
  const [activeTab, setActiveTab] = useState('learn');

  if (!lesson) {
    return notFound();
  }

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="mb-6">
            {section.title && <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>}
            <p className="text-dark-300 leading-relaxed">{section.content}</p>
          </div>
        );
      case 'code':
        return (
          <div key={index} className="mb-6 bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-dark-800/50 border-b border-dark-800">
              <span className="text-xs font-mono text-dark-400">Example</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-dark-200">
              <code>{section.content}</code>
            </pre>
          </div>
        );
      case 'list':
        return (
          <div key={index} className="mb-6">
            {section.title && <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>}
            <ul className="list-disc pl-6 space-y-2 text-dark-300">
              {(section.content as string[]).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'note':
        return (
          <div key={index} className="mb-6 p-4 bg-primary-900/10 border-l-4 border-primary-500 rounded-r-lg">
            <p className="text-primary-200 text-sm">{section.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto p-6 md:p-12">
      {/* Lesson Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-white mb-2">{lesson.title}</h1>
        <p className="text-xl text-dark-400">{lesson.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-dark-800">
        <button
          onClick={() => setActiveTab('learn')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'learn' ? 'text-white' : 'text-dark-400 hover:text-dark-200'
          }`}
        >
          Learn
          {activeTab === 'learn' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></span>
          )}
        </button>
        {lesson.practiceCode && (
          <button
            onClick={() => setActiveTab('practice')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'practice' ? 'text-white' : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Code Practice
            {activeTab === 'practice' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></span>
            )}
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'learn' && (
        <div className="prose prose-invert max-w-none">
          {lesson.sections.map((section, index) => renderSection(section, index))}
          
          {lesson.practiceCode && (
            <div className="mt-8 p-6 bg-dark-900 rounded-xl border border-dark-800 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Ready to try it yourself?</h3>
              <p className="text-dark-400 mb-4">Practice writing this code in our interactive editor.</p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="btn-primary px-6 py-2 rounded-lg"
              >
                Start Coding
              </button>
            </div>
          )}
        </div>
      )}

      {/* Practice */}
      {activeTab === 'practice' && lesson.practiceCode && (
        <div className="animate-fade-in">
          <CodePractice 
            code={lesson.practiceCode} 
            language="java" 
            title={`Practice: ${lesson.title}`}
          />
        </div>
      )}

      {/* Navigation */}
      <LessonNavigation 
        prevLink={lesson.prevLesson ? `/lessons/java/${lesson.prevLesson}` : undefined}
        prevTitle={lesson.prevLesson ? javaLessons[lesson.prevLesson]?.title : undefined}
        nextLink={lesson.nextLesson ? `/lessons/java/${lesson.nextLesson}` : undefined}
        nextTitle={lesson.nextLesson ? javaLessons[lesson.nextLesson]?.title : undefined}
      />
    </div>
  );
}
