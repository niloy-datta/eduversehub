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

export default function DsaJavaCoursePage() {
  const modules: Module[] = [
    {
      id: 1,
      title: 'Getting Started',
      duration: '1h',
      lessons: [
        { id: '1-1', title: 'Introduction to DSA', type: 'article', duration: '15 min', completed: false, locked: false, href: '/lessons/dsa-java/intro' },
        { id: '1-2', title: 'Logic Building', type: 'concept', duration: '20 min', completed: false, locked: false, href: '/lessons/dsa-java/logic-building' },
        { id: '1-3', title: 'Complexity Analysis', type: 'article', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/complexity' },
      ]
    },
    {
      id: 2,
      title: 'Basic Data Structures',
      duration: '2h',
      lessons: [
        { id: '2-1', title: 'Arrays', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/arrays' },
        { id: '2-2', title: 'Searching Algorithms', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/searching' },
        { id: '2-3', title: 'Sorting Algorithms', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/sorting' },
        { id: '2-4', title: 'Hashing', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/hashing' },
      ]
    },
    {
      id: 3,
      title: 'Advanced Array & Strings',
      duration: '1h 30m',
      lessons: [
        { id: '3-1', title: 'Two Pointer Technique', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/two-pointer' },
        { id: '3-2', title: 'Window Sliding', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/window-sliding' },
        { id: '3-3', title: 'Prefix Sum', type: 'code', duration: '20 min', completed: false, locked: false, href: '/lessons/dsa-java/prefix-sum' },
        { id: '3-4', title: 'Strings Deep Dive', type: 'article', duration: '20 min', completed: false, locked: false, href: '/lessons/dsa-java/string' },
      ]
    },
    {
      id: 4,
      title: 'Logic & Grid',
      duration: '1h',
      lessons: [
        { id: '4-1', title: 'Recursion', type: 'concept', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/recursion' },
        { id: '4-2', title: 'Matrix/Grid', type: 'code', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/matrix' },
      ]
    },
    {
      id: 5,
      title: 'Linear Data Structures',
      duration: '1h 40m',
      lessons: [
        { id: '5-1', title: 'Linked List', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/linked-lists' },
        { id: '5-2', title: 'Stack', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/stacks' },
        { id: '5-3', title: 'Queue', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/queues' },
        { id: '5-4', title: 'Deque', type: 'code', duration: '25 min', completed: false, locked: false, href: '/lessons/dsa-java/deque' },
      ]
    },
    {
      id: 6,
      title: 'Hierarchical',
      duration: '2h',
      lessons: [
        { id: '6-1', title: 'Binary Tree', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/tree' },
        { id: '6-1.5', title: 'Segment Tree', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/segment-tree' },        { id: '6-1.5', title: 'Binary Search Tree', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/binary-search-tree' },        { id: '6-2', title: 'Heap', type: 'code', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/heap' },
        { id: '6-3', title: 'Graph', type: 'code', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/graph' },
      ]
    },
    {
      id: 7,
      title: 'Paradigms',
      duration: '2h',
      lessons: [
        { id: '7-1', title: 'Greedy Algorithm', type: 'concept', duration: '40 min', completed: false, locked: false, href: '/lessons/dsa-java/greedy' },
        { id: '7-2', title: 'Dynamic Programming', type: 'code', duration: '45 min', completed: false, locked: false, href: '/lessons/dsa-java/dp' },
        { id: '7-3', title: 'Divide and Conquer', type: 'concept', duration: '35 min', completed: false, locked: false, href: '/lessons/dsa-java/divide-conquer' },
      ]
    },
    {
      id: 8,
      title: 'Advanced & More',
      duration: '1h',
      lessons: [
        { id: '8-1', title: 'Advanced DSA (Trie, SegTree)', type: 'article', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/advanced-dsa' },
        { id: '8-2', title: 'Other Algorithms', type: 'article', duration: '30 min', completed: false, locked: false, href: '/lessons/dsa-java/other-algos' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30">
      <Header />

      <main className="container-custom py-12">
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 aspect-video bg-linear-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 border border-pink-500/30">
              <span className="text-8xl">🧩</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Crack the Coding Interview
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                DSA with <span className="gradient-text from-pink-500 to-rose-600">Java</span>
              </h1>
              <p className="text-dark-300 text-lg mb-6 leading-relaxed">
                A complete roadmap from logic building to Dynamic Programming. Master every data structure and algorithm required for top-tier companies.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-8">
                <div className="flex items-center gap-2">
                  <span>⏱️ 50+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚 24+ Step Roadmap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚀 Beginner to Expert</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/lessons/dsa-java/intro" className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all text-center flex-1 md:flex-none">
                  Start Roadmap
                </Link>
                <button className="btn-outline px-8 py-3 rounded-xl flex-1 md:flex-none">
                  Download Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Course Roadmap</h2>
            
            {modules.map((module) => (
              <div key={module.id} className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden hover:border-dark-700 transition-colors">
                <div className="p-6 cursor-pointer flex justify-between items-center bg-dark-800/50">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Module {module.id}: {module.title}</h3>
                    <p className="text-sm text-dark-400">{module.lessons.length} Topics • {module.duration}</p>
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
            <div className="card-glass p-6 sticky top-24 border-primary-500/20 bg-primary-500/5">
              <h3 className="text-xl font-bold text-white mb-4">Complete Path</h3>
              <p className="text-sm text-dark-400 mb-6 leading-relaxed">
                Follow this 24-step roadmap to become a DSA expert. This sequence is optimized for building logic before moving to complex structures.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success-500/20 text-success-400 flex items-center justify-center text-xs">✓</div>
                  <span className="text-sm text-dark-200 italic">Foundation Built</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs">2</div>
                  <span className="text-sm text-white font-medium">Data Structure Master</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-800 text-dark-500 flex items-center justify-center text-xs">3</div>
                  <span className="text-sm text-dark-400">Algorithmic Excellence</span>
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
