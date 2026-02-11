'use client';

import Link from 'next/link';

interface LessonNavigationProps {
  prevLink?: string;
  prevTitle?: string;
  nextLink?: string;
  nextTitle?: string;
}

export default function LessonNavigation({ prevLink, prevTitle, nextLink, nextTitle }: LessonNavigationProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 py-8 border-t border-dark-800">
      {prevLink ? (
        <Link 
          href={prevLink}
          className="group flex flex-col items-start p-4 rounded-xl border border-dark-700 bg-dark-800/50 hover:bg-dark-800 hover:border-primary-500/50 transition-all w-full md:w-auto md:min-w-[200px]"
        >
          <span className="text-xs text-dark-400 group-hover:text-primary-400 mb-1 flex items-center gap-1">
            ← Previous Lesson
          </span>
          <span className="text-white font-medium group-hover:text-primary-300 transition-colors">
            {prevTitle || 'Previous'}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block w-[200px]"></div>
      )}

      {nextLink ? (
        <Link 
          href={nextLink}
          className="group flex flex-col items-end p-4 rounded-xl border border-dark-700 bg-dark-800/50 hover:bg-dark-800 hover:border-primary-500/50 transition-all w-full md:w-auto md:min-w-[200px] text-right"
        >
          <span className="text-xs text-dark-400 group-hover:text-primary-400 mb-1 flex items-center gap-1">
            Next Lesson →
          </span>
          <span className="text-white font-medium group-hover:text-primary-300 transition-colors">
            {nextTitle || 'Next'}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block w-[200px]"></div>
      )}
    </div>
  );
}
