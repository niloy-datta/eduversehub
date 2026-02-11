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

export const reactLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'React Introduction',
    subtitle: 'Learn React Basics',
    sections: [
      { type: 'text', content: 'React is a JavaScript library for building user interfaces. It is maintained by Meta and a community of individual developers and companies.' }
    ],
    nextLesson: 'components'
  },
  'components': {
    id: 'components',
    title: 'React Components',
    subtitle: 'Functional Components',
    sections: [
      { type: 'text', content: 'Components are the building blocks of any React application. They are reusable, isolated pieces of code.' },
      { type: 'code', title: 'Example', content: `function Header() {
    return <h1>My App</h1>;
}` }
    ],
    prevLesson: 'intro',
    nextLesson: 'props'
  },
  'props': {
    id: 'props',
    title: 'Props (Properties)',
    subtitle: 'Passing Data',
    sections: [
      { type: 'text', content: 'Props allow you to pass data from a parent component to a child component.' },
      { type: 'code', title: 'Using Props', content: `const Welcome = (props) => <h1>Hello, {props.name}</h1>;` }
    ],
    prevLesson: 'components',
    nextLesson: 'state'
  },
  'state': {
    id: 'state',
    title: 'State & useState',
    subtitle: 'Component Memory',
    sections: [
      { type: 'text', content: 'State is an object that holds some information that may change over the lifetime of the component.' },
      { type: 'code', title: 'useState Hook', content: `const [count, setCount] = useState(0);` }
    ],
    prevLesson: 'props',
    nextLesson: 'conditional-rendering',
    practiceCode: `function Toggle() {
    const [isOn, setIsOn] = useState(false);
    return <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>;
}`
  },
  'conditional-rendering': {
    id: 'conditional-rendering',
    title: 'Conditional Rendering',
    subtitle: 'Ternaries & &&',
    sections: [
      { type: 'text', content: 'In React, you can render different components or elements based on certain conditions.' },
      { type: 'code', title: 'Example', content: `{isLoggedIn ? <LogoutButton /> : <LoginButton />}` }
    ],
    prevLesson: 'state',
    nextLesson: 'useEffect'
  },
  'useEffect': {
    id: 'useEffect',
    title: 'The useEffect Hook',
    subtitle: 'Side Effects',
    sections: [
      { type: 'text', content: 'The useEffect Hook allows you to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.' },
      { type: 'code', title: 'Usage', content: `useEffect(() => {
    // Perform side effect
}, [dependencies]);` }
    ],
    prevLesson: 'conditional-rendering',
    nextLesson: 'context'
  },
  'context': {
    id: 'context',
    title: 'Context API',
    subtitle: 'Global State',
    sections: [
      { type: 'text', content: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.' },
      { type: 'code', title: 'Create Context', content: `const MyContext = createContext();
<MyContext.Provider value={data}> ... </MyContext.Provider>` }
    ],
    prevLesson: 'useEffect',
    nextLesson: 'routing'
  },
  'routing': {
    id: 'routing',
    title: 'React Routing',
    subtitle: 'React Router',
    sections: [
      { type: 'text', content: 'Navigate between different pages of your application using React Router.' }
    ],
    prevLesson: 'context',
    nextLesson: undefined
  }
};
