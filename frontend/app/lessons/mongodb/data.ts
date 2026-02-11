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

export const mongodbLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'MongoDB Intro',
    subtitle: 'NoSQL Basics',
    sections: [
      { type: 'text', content: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program.' }
    ],
    nextLesson: 'crud'
  },
  'crud': {
    id: 'crud',
    title: 'CRUD Operations',
    subtitle: 'Create, Read, Update, Delete',
    sections: [
      { type: 'text', content: 'In MongoDB, you use methods like insertOne, find, updateOne, and deleteOne.' },
      { type: 'code', title: 'Example', content: `db.users.insertOne({ name: "Ali", age: 25 });
db.users.find({ age: { $gt: 20 } });` }
    ],
    prevLesson: 'intro',
    nextLesson: 'schema-design',
    practiceCode: `db.users.find({ age: { $gt: 18 } }).sort({ name: 1 });`
  },
  'schema-design': {
    id: 'schema-design',
    title: 'Schema Design',
    subtitle: 'Embedding vs Referencing',
    sections: [
      { type: 'text', content: 'Even though MongoDB is schema-less, you still need to design your data model for performance.' },
      { type: 'list', title: 'Two Main Strategies', content: [
        'Embedding: Store related data in a single document (Faster reads).',
        'Referencing: Store data in separate collections and use IDs (Better for large data).'
      ]}
    ],
    prevLesson: 'crud',
    nextLesson: 'aggregation'
  },
  'aggregation': {
    id: 'aggregation',
    title: 'Aggregation Pipeline',
    subtitle: 'Processing Data',
    sections: [
      { type: 'text', content: 'Aggregation operations process data records and return computed results.' },
      { type: 'code', title: 'Match & Group', content: `db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
]);` }
    ],
    prevLesson: 'schema-design',
    nextLesson: 'indexing'
  },
  'indexing': {
    id: 'indexing',
    title: 'Indexing in MongoDB',
    subtitle: 'Query Efficiency',
    sections: [
      { type: 'text', content: 'Indexes support the efficient execution of queries in MongoDB.' }
    ],
    prevLesson: 'aggregation',
    nextLesson: undefined
  }
};
