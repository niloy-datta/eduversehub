'use client';

import { mysqlLessons, Section, TableContent, QuizQuestion, QuizOption } from '../../data';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import CodePractice from '@/components/CodePractice';
import LessonNavigation from '@/components/LessonNavigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MysqlLessonPage({ params }: PageProps) {
  const { slug } = use(params);
  const lesson = mysqlLessons[slug];
  const [activeTab, setActiveTab] = useState('learn');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!lesson) {
    return notFound();
  }

  const handleOptionSelect = (questionId: number, optionId: string) => {
    if (showResults) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    if (!lesson.quiz) return 0;
    let score = 0;
    lesson.quiz.forEach((q: QuizQuestion) => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="mb-6">
            {section.title && <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>}
            <p className="text-dark-300 leading-relaxed">{section.content as string}</p>
          </div>
        );
      case 'code':
        return (
          <div key={index} className="mb-6 bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-dark-800/50 border-b border-dark-800">
              <span className="text-xs font-mono text-dark-400">{section.title || 'Example'}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-dark-200">
              <code>{section.content as string}</code>
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
      case 'table':
          const table = section.content as TableContent;
          return (
            <div key={index} className="mb-6 overflow-x-auto">
              {section.title && <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>}
              <table className="w-full text-left border-collapse border border-dark-700 rounded-lg overflow-hidden">
                <thead className="bg-dark-800 text-dark-200">
                  <tr>
                    {table.headers.map((h: string, i: number) => (
                      <th key={i} className="p-3 border-b border-dark-700 font-bold text-sm tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-dark-900/50 text-dark-300 text-sm">
                  {table.rows.map((row: string[], i: number) => (
                    <tr key={i} className="hover:bg-dark-800/30 transition-colors">
                      {row.map((cell: string, j: number) => (
                        <td key={j} className="p-3 border-b border-dark-800/50 align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
      case 'note':
        return (
          <div key={index} className="mb-6 p-4 bg-primary-900/10 border-l-4 border-primary-500 rounded-r-lg">
            <p className="text-primary-200 text-sm">{section.content as string}</p>
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
      <div className="flex gap-4 mb-8 border-b border-dark-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('learn')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
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
            className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'practice' ? 'text-white' : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Code Practice
            {activeTab === 'practice' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></span>
            )}
          </button>
        )}
        {lesson.quiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'quiz' ? 'text-white' : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Quiz
            {activeTab === 'quiz' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></span>
            )}
          </button>
        )}
      </div>

      {/* Learn Tab */}
      {activeTab === 'learn' && (
        <div className="prose prose-invert max-w-none animate-fade-in">
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

      {/* Practice Tab */}
      {activeTab === 'practice' && lesson.practiceCode && (
        <div className="animate-fade-in">
          <CodePractice 
            code={lesson.practiceCode} 
            language="sql" 
            title={`Practice: ${lesson.title}`}
          />
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && lesson.quiz && (
        <div className="max-w-2xl mx-auto animate-fade-in space-y-8">
          {lesson.quiz.map((q: QuizQuestion, idx: number) => (
            <div key={q.id} className="bg-dark-900/50 p-6 rounded-2xl border border-dark-800">
              <h3 className="text-lg font-medium text-white mb-6">
                <span className="text-primary-500 font-bold mr-2">{idx + 1}.</span>
                {q.question}
              </h3>
              
              <div className="grid gap-3">
                {q.options.map((opt: QuizOption) => {
                  const isSelected = quizAnswers[q.id] === opt.id;
                  const isCorrect = q.correctAnswer === opt.id;
                  const showCorrect = showResults && isCorrect;
                  const showWrong = showResults && isSelected && !isCorrect;

                  let btnClass = "w-full text-left p-4 rounded-xl transition-all border border-dark-700 bg-dark-800 hover:bg-dark-700";
                  
                  if (showResults) {
                    if (isCorrect) btnClass = "w-full text-left p-4 rounded-xl border border-success-500 bg-success-500/10 text-success-200";
                    else if (isSelected && !isCorrect) btnClass = "w-full text-left p-4 rounded-xl border border-error-500 bg-error-500/10 text-error-200";
                    else btnClass = "w-full text-left p-4 rounded-xl border border-dark-700 bg-dark-800/50 opacity-50";
                  } else if (isSelected) {
                    btnClass = "w-full text-left p-4 rounded-xl border border-primary-500 bg-primary-500/10 text-primary-200 font-medium shadow-[0_0_15px_rgba(14,165,233,0.3)]";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(q.id, opt.id)}
                      disabled={showResults}
                      className={btnClass}
                    >
                      <span className="inline-block w-8 font-mono opacity-50 uppercase">{opt.id}</span>
                      {opt.text}
                      {showCorrect && <span className="float-right text-success-400">✓</span>}
                      {showWrong && <span className="float-right text-error-400">✗</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!showResults ? (
            <div className="text-center pt-4">
              <button 
                onClick={() => setShowResults(true)}
                disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                className="btn-primary px-10 py-4 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-lg shadow-primary-500/30"
              >
                Submit Answers
              </button>
            </div>
          ) : (
            <div className="p-8 bg-dark-800 rounded-2xl text-center border border-dark-700 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
              <div className="text-5xl font-bold gradient-text mb-4">
                {Math.round((calculateScore() / lesson.quiz.length) * 100)}%
              </div>
              <button 
                onClick={() => {
                  setShowResults(false);
                  setQuizAnswers({});
                  setActiveTab('learn');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-outline px-8 py-3 rounded-full"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <LessonNavigation 
        prevLink={lesson.prevLesson ? `/lessons/mysql/${lesson.prevLesson}` : undefined}
        prevTitle={lesson.prevLesson ? mysqlLessons[lesson.prevLesson]?.title : undefined}
        nextLink={lesson.nextLesson ? `/lessons/mysql/${lesson.nextLesson}` : undefined}
        nextTitle={lesson.nextLesson ? mysqlLessons[lesson.nextLesson]?.title : undefined}
      />
    </div>
  );
}
