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

export interface Section {
  type: 'text' | 'code' | 'note' | 'list' | 'image' | 'table';
  title?: string;
  content: string | string[] | any;
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

export const typescriptLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'Introduction to TypeScript',
    subtitle: 'JavaScript with Syntax for Types',
    sections: [
      { type: 'text', content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.' },
      { type: 'list', title: 'Why TypeScript?', content: [
        'Static typing helps catch errors during development.',
        'Better IDE support (autocompletion, navigation).',
        'Compiles to standard JavaScript.'
      ]},
    ],
    nextLesson: 'types'
  },
  'types': {
    id: 'types',
    title: 'Basic Types',
    subtitle: 'Annotations & Inference',
    sections: [
      { type: 'text', content: 'TypeScript allows you to add type annotations to variables and functions.' },
      { type: 'code', title: 'Examples', content: `let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];` }
    ],
    prevLesson: 'intro',
    nextLesson: 'interfaces'
  },
  'interfaces': {
    id: 'interfaces',
    title: 'Interfaces',
    subtitle: 'Defining Shapes',
    sections: [
      { type: 'text', content: 'Interfaces are a powerful way to define the structure of objects in TypeScript.' },
      { type: 'code', title: 'Interface Example', content: `interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0
};` }
    ],
    prevLesson: 'types',
    nextLesson: undefined
  }
};
