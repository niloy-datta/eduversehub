export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface TableContent {
  headers: string[];
  rows: string[][];
}

export interface Section {
  type: 'text' | 'code' | 'note' | 'list' | 'image' | 'table';
  title?: string;
  content: string | string[] | TableContent;
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
  practiceCode?: string;
  quiz?: QuizQuestion[];
  prevLesson?: string;
  nextLesson?: string;
}

export const postgresqlLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'PostgreSQL Intro',
    subtitle: 'Advanced Relational DB',
    sections: [
      { type: 'text', content: 'PostgreSQL is a powerful, open-source object-relational database system.' }
    ],
    nextLesson: 'types'
  },
  'types': {
    id: 'types',
    title: 'Advanced Data Types',
    subtitle: 'Beyond Strings & Numbers',
    sections: [
      { type: 'text', content: 'PostgreSQL supports sophisticated data types like Arrays, JSONB, and Range types.' },
      { type: 'code', title: 'JSONB Example', content: `CREATE TABLE books (
    id serial PRIMARY KEY,
    data jsonb
);` }
    ],
    prevLesson: 'intro',
    nextLesson: 'window-functions'
  },
  'window-functions': {
    id: 'window-functions',
    title: 'Window Functions',
    subtitle: 'Analytical SQL',
    sections: [
      { type: 'text', content: 'Window functions perform a calculation across a set of table rows that are somehow related to the current row.' },
      { type: 'code', title: 'OVER Clause', content: `SELECT name, salary, 
AVG(salary) OVER(PARTITION BY department) 
FROM employees;` }
    ],
    prevLesson: 'types',
    nextLesson: 'performance'
  },
  'performance': {
    id: 'performance',
    title: 'Performance & Indexing',
    subtitle: 'EXPLAIN ANALYZE',
    sections: [
      { type: 'text', content: 'Use the EXPLAIN command to see how the PostgreSQL planner will execute your query.' }
    ],
    prevLesson: 'window-functions',
    nextLesson: undefined
  }
};
