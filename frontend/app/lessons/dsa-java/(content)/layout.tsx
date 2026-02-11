'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const dsaJavaModules = [
  {
    title: '1. Getting Started',
    lessons: [
      { id: '1-1', title: 'Introduction to DSA', href: '/lessons/dsa-java/intro' },
      { id: '1-2', title: 'Logic Building', href: '/lessons/dsa-java/logic-building' },
      { id: '1-3', title: 'Complexity Analysis', href: '/lessons/dsa-java/complexity' },
    ]
  },
  {
    title: '2. Basic Data Structures',
    lessons: [
      { id: '2-1', title: 'Arrays', href: '/lessons/dsa-java/arrays' },
      { id: '2-2', title: 'Searching Algorithms', href: '/lessons/dsa-java/searching' },
      { id: '2-3', title: 'Sorting Algorithms', href: '/lessons/dsa-java/sorting' },
      { id: '2-4', title: 'Hashing', href: '/lessons/dsa-java/hashing' },
    ]
  },
  {
    title: '3. Array Techniques & Strings',
    lessons: [
      { id: '3-1', title: 'Two Pointer', href: '/lessons/dsa-java/two-pointer' },
      { id: '3-2', title: 'Window Sliding', href: '/lessons/dsa-java/window-sliding' },
      { id: '3-3', title: 'Prefix Sum', href: '/lessons/dsa-java/prefix-sum' },
      { id: '3-4', title: 'Strings', href: '/lessons/dsa-java/string' },
    ]
  },
  {
    title: '4. Logic & Grid',
    lessons: [
      { id: '4-1', title: 'Recursion', href: '/lessons/dsa-java/recursion' },
      { id: '4-2', title: 'Matrix/Grid', href: '/lessons/dsa-java/matrix' },
    ]
  },
  {
    title: '5. Linear Data Structures',
    lessons: [
      { id: '5-1', title: 'Linked List', href: '/lessons/dsa-java/linked-lists' },
      { id: '5-2', title: 'Stack', href: '/lessons/dsa-java/stacks' },
      { id: '5-3', title: 'Queue', href: '/lessons/dsa-java/queues' },
      { id: '5-4', title: 'Deque', href: '/lessons/dsa-java/deque' },
    ]
  },
  {
    title: '6. Hierarchical Data Structures',
    lessons: [
      { id: '6-1', title: 'Tree', href: '/lessons/dsa-java/tree' },
      { id: '6-2', title: 'Heap', href: '/lessons/dsa-java/heap' },
      { id: '6-3', title: 'Graph', href: '/lessons/dsa-java/graph' },
    ]
  },
  {
    title: '7. Algorithmic Paradigms',
    lessons: [
      { id: '7-1', title: 'Greedy Algorithm', href: '/lessons/dsa-java/greedy' },
      { id: '7-2', title: 'Dynamic Programming', href: '/lessons/dsa-java/dp' },
      { id: '7-3', title: 'Divide and Conquer', href: '/lessons/dsa-java/divide-conquer' },
    ]
  },
  {
    title: '8. Advanced Topics',
    lessons: [
      { id: '8-1', title: 'Advanced DSA', href: '/lessons/dsa-java/advanced-dsa' },
      { id: '8-2', title: 'Other Algorithms', href: '/lessons/dsa-java/other-algos' },
    ]
  }
];

export default function DsaJavaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="DSA with Java" modules={dsaJavaModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
