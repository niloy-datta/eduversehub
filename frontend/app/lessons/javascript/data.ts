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

export const javascriptLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'JavaScript Intro',
    subtitle: 'Language of the Web',
    sections: [
      { type: 'text', content: 'JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and much more.' }
    ],
    nextLesson: 'variables'
  },
  'variables': {
    id: 'variables',
    title: 'JS Variables',
    subtitle: 'var, let, const',
    sections: [
      { type: 'text', content: 'In JavaScript, we use var, let, and const to declare variables. let and const are block-scoped and preferred over var.' },
      { type: 'code', title: 'Examples', content: `let count = 10;
const name = "EduVerse";` }
    ],
    prevLesson: 'intro',
    nextLesson: 'functions'
  },
  'functions': {
    id: 'functions',
    title: 'Functions',
    subtitle: 'Reusable Logic',
    sections: [
      { type: 'text', content: 'Functions are one of the fundamental building blocks in JavaScript.' },
      { type: 'code', title: 'Arrow Function', content: `const greet = (name) => \`Hello \${name}!\`;` }
    ],
    prevLesson: 'variables',
    nextLesson: 'objects',
    practiceCode: `const square = (x) => x * x;
console.log(square(5));`
  },
  'objects': {
    id: 'objects',
    title: 'JS Objects',
    subtitle: 'Key-Value Pairs',
    sections: [
      { type: 'text', content: 'Objects in JavaScript are collections of related data and/or functionality.' },
      { type: 'code', title: 'Object Literal', content: `const user = {
    name: "John",
    age: 30,
    greet() { console.log(this.name); }
};` }
    ],
    prevLesson: 'functions',
    nextLesson: 'dom'
  },
  'dom': {
    id: 'dom',
    title: 'DOM Manipulation',
    subtitle: 'Selecting and Changing',
    sections: [
      { type: 'text', content: 'The Document Object Model (DOM) is a programming interface for web documents.' },
      { type: 'list', title: 'Selectors', content: [
        'document.getElementById()',
        'document.querySelector()',
        'document.querySelectorAll()'
      ]},
      { type: 'code', title: 'Changing Text', content: `const el = document.getElementById("title");
el.innerText = "New Title";` }
    ],
    prevLesson: 'objects',
    nextLesson: 'events'
  },
  'events': {
    id: 'events',
    title: 'Event Handling',
    subtitle: 'Interactivity',
    sections: [
      { type: 'text', content: 'Events are things that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events.' },
      { type: 'code', title: 'Click Listener', content: `btn.addEventListener("click", () => {
    alert("Button Clicked!");
});` }
    ],
    prevLesson: 'dom',
    nextLesson: 'async'
  },
  'async': {
    id: 'async',
    title: 'Async JS',
    subtitle: 'Promises & Async/Await',
    sections: [
      { type: 'text', content: 'Asynchronous JavaScript allows you to perform long-running tasks without blocking the main browser thread.' },
      { type: 'code', title: 'Fetch Example', content: `const getData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};` }
    ],
    prevLesson: 'events',
    nextLesson: undefined
  }
};
