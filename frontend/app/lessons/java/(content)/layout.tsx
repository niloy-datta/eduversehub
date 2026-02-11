'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const javaModules = [
  {
    title: 'Java Tutorial',
    lessons: [
      { id: 'intro', title: 'Java Intro', href: '/lessons/java/intro' },
      { id: 'get-started', title: 'Getting Started', href: '/lessons/java/get-started' },
      { id: 'syntax', title: 'Java Syntax', href: '/lessons/java/syntax' },
      { id: 'output', title: 'Java Output', href: '/lessons/java/output' },
      { id: 'comments', title: 'Java Comments', href: '/lessons/java/comments' },
      { id: 'variables', title: 'Java Variables', href: '/lessons/java/variables' },
      { id: 'datatypes', title: 'Java Data Types', href: '/lessons/java/datatypes' },
      { id: 'operators', title: 'Java Operators', href: '/lessons/java/operators' },
      { id: 'strings', title: 'Java Strings', href: '/lessons/java/strings' },
    ]
  },
  {
    title: 'Java Methods',
    lessons: [
      { id: 'methods', title: 'Java Methods', href: '/lessons/java/methods' },
      { id: 'method-params', title: 'Method Parameters', href: '/lessons/java/method-params' },
      { id: 'method-overloading', title: 'Method Overloading', href: '/lessons/java/method-overloading' },
      { id: 'scope', title: 'Java Scope', href: '/lessons/java/scope' },
      { id: 'recursion', title: 'Java Recursion', href: '/lessons/java/recursion' },
    ]
  },
  {
    title: 'Java Classes',
    lessons: [
      { id: 'oop', title: 'Java OOP', href: '/lessons/java/oop' },
      { id: 'classes', title: 'Java Classes/Objects', href: '/lessons/java/classes' },
      { id: 'class-attributes', title: 'Class Attributes', href: '/lessons/java/class-attributes' },
      { id: 'class-methods', title: 'Class Methods', href: '/lessons/java/class-methods' },
      { id: 'constructors', title: 'Constructors', href: '/lessons/java/constructors' },
    ]
  }
];

export default function JavaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="Java Tutorial" modules={javaModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
