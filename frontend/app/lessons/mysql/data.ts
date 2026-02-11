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

export const mysqlLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'Introduction to MySQL',
    subtitle: 'RDBMS Fundamentals',
    sections: [
      { type: 'text', content: 'MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL). It is fast, reliable, and widely used for web applications like Facebook and Twitter.' },
      { type: 'list', title: 'Advantages of MySQL', content: [
        'High performance and scalability.',
        'Easy to use and maintain.',
        'Strong security and data encryption.',
        'Cross-platform compatibility.'
      ]},
      { type: 'note', content: 'MySQL uses the InnoDB storage engine by default, which supports transactions and foreign keys.' }
    ],
    nextLesson: 'dbms-architecture'
  },
  'dbms-architecture': {
    id: 'dbms-architecture',
    title: 'DBMS Architecture',
    subtitle: '1-Tier, 2-Tier, and 3-Tier',
    sections: [
      { type: 'text', content: 'Architecture defines how users interact with the database. The choice depends on the scale and complexity of the application.' },
      { type: 'table', title: 'Architecture Comparison', content: {
        headers: ['Type', 'Description', 'Use Case'],
        rows: [
          ['1-Tier', 'Database and UI on same machine', 'Personal apps (Excel)'],
          ['2-Tier', 'Client communicates directly with Server', 'Small school systems'],
          ['3-Tier', 'Intermediate Application Server exists', 'Large Web Apps (Amazon)']
        ]
      }},
      { type: 'note', content: 'Most modern web applications use 3-Tier architecture for security and scalability.' }
    ],
    prevLesson: 'intro',
    nextLesson: 'common-queries'
  },
  'common-queries': {
    id: 'common-queries',
    title: 'Common MySQL Queries',
    subtitle: 'System & Exploration',
    sections: [
      { type: 'text', content: 'Before managing data, you need to explore the server and database structures.' },
      { type: 'list', title: 'Essential Commands', content: [
        'SHOW DATABASES; - List all databases.',
        'USE db_name; - Select a database.',
        'SHOW TABLES; - List tables in selected DB.',
        'DESCRIBE table_name; - Show columns and types.',
        'SELECT NOW(); - Show current date and time.'
      ]},
      { type: 'code', title: 'Evaluating Expressions', content: 'SELECT 2 + 4; -- returns 6\nSELECT CURDATE();' }
    ],
    prevLesson: 'dbms-architecture',
    nextLesson: 'select'
  },
  'select': {
    id: 'select',
    title: 'The SELECT Statement',
    subtitle: 'Retrieving Data',
    sections: [
      { type: 'text', content: 'The SELECT statement is used to fetch data from a database table. You can select specific columns or use * for all columns.' },
      { type: 'code', title: 'Example', content: `SELECT column1, column2 FROM table_name;
SELECT * FROM employees;` }
    ],
    prevLesson: 'common-queries',
    nextLesson: 'where',
    practiceCode: `SELECT * FROM employees WHERE department = 'Engineering';`
  },
  'where': {
    id: 'where',
    title: 'Filtering with WHERE',
    subtitle: 'Conditional Retrieval',
    sections: [
      { type: 'text', content: 'The WHERE clause is used to filter records that fulfill a specified condition.' },
      { type: 'code', title: 'Example', content: `SELECT * FROM employees WHERE age > 30;` },
      { type: 'list', title: 'Operators', content: [
        '=, <>, !=, <, >, <=, >=',
        'BETWEEN - Search within a range.',
        'LIKE - Search for a pattern (e.g. name LIKE "A%").',
        'IN - Specify multiple possible values.'
      ]}
    ],
    prevLesson: 'select',
    nextLesson: 'insert-update'
  },
  'insert-update': {
    id: 'insert-update',
    title: 'INSERT & UPDATE',
    subtitle: 'Modifying Data',
    sections: [
      { type: 'text', content: 'INSERT is used to add new rows, while UPDATE modifies existing rows based on a condition.' },
      { type: 'code', title: 'Insert Example', content: `INSERT INTO users (name, email) VALUES ('John', 'john@example.com');` },
      { type: 'code', title: 'Update Example', content: `UPDATE users SET status = 'active' WHERE id = 1;` },
      { type: 'note', content: 'Always use a WHERE clause with UPDATE to avoid updating all rows in a table!' }
    ],
    prevLesson: 'where',
    nextLesson: 'table-ops'
  },
  'table-ops': {
    id: 'table-ops',
    title: 'Table Operations',
    subtitle: 'ALTER, RENAME, & DROP',
    sections: [
      { type: 'text', content: 'DDL (Data Definition Language) commands allow you to modify the structure of tables.' },
      { type: 'list', title: 'Structural Commands', content: [
        'ALTER TABLE ... ADD - Add new column.',
        'ALTER TABLE ... DROP - Delete a column.',
        'RENAME TABLE old TO new - Rename table.',
        'DROP TABLE table_name - Delete table permanently.'
      ]},
      { type: 'code', title: 'Example', content: `ALTER TABLE employees ADD salary INT;
DROP TABLE testing_data;` }
    ],
    prevLesson: 'insert-update',
    nextLesson: 'aggregates'
  },
  'aggregates': {
    id: 'aggregates',
    title: 'Aggregate Functions',
    subtitle: 'Summarizing Data',
    sections: [
      { type: 'text', content: 'Aggregate functions perform calculations on multiple rows and return a single value.' },
      { type: 'list', title: 'Common Functions', content: [
        'COUNT(*) - Returns total number of rows.',
        'MAX(col) - Returns maximum value.',
        'MIN(col) - Returns minimum value.',
        'AVG(col) - Returns average value.',
        'SUM(col) - Returns total sum.'
      ]},
      { type: 'code', title: 'Example', content: `SELECT COUNT(*) FROM orders WHERE status = 'shipped';
SELECT MAX(price) FROM products;` }
    ],
    prevLesson: 'table-ops',
    nextLesson: 'clauses'
  },
  'clauses': {
    id: 'clauses',
    title: 'Advanced Clauses',
    subtitle: 'Control & Limits',
    sections: [
      { type: 'text', content: 'MySQL provides several keywords to control the output size and handle uniqueness.' },
      { type: 'list', title: 'Usage', content: [
        'LIMIT N - Restrict result set to N rows.',
        'LIMIT offset, count - Pagination support.',
        'DISTINCT - Fetch unique values, avoiding duplicates.',
        'BETWEEN L AND U - Check if value lies in range.'
      ]},
      { type: 'code', title: 'Example', content: `SELECT DISTINCT profile FROM employees;
SELECT * FROM users LIMIT 10, 5; -- Skip 10, show next 5` }
    ],
    prevLesson: 'aggregates',
    nextLesson: 'joins'
  },
  'joins': {
    id: 'joins',
    title: 'SQL Joins',
    subtitle: 'Connecting Tables',
    sections: [
      { type: 'text', content: 'Joins combine rows from two or more tables based on a related column.' },
      { type: 'list', title: 'Types of Joins', content: [
        'INNER JOIN - Matching records in both tables.',
        'LEFT JOIN - All from left table + matches from right.',
        'RIGHT JOIN - All from right table + matches from left.'
      ]},
      { type: 'code', title: 'Example', content: `SELECT e.name, d.name 
FROM students s 
JOIN departments d ON s.dept_id = d.id;` }
    ],
    prevLesson: 'clauses',
    nextLesson: 'er-model'
  },
  'er-model': {
    id: 'er-model',
    title: 'Entity-Relationship Model',
    subtitle: 'Conceptual Design',
    sections: [
      { type: 'text', content: 'The ER Model represents the logical structure of a database through entities, attributes, and relationships. It is the first step in translating real-world requirements into a storage structure.' },
      { type: 'list', title: 'Core Components', content: [
        'Entity: An object stored as data (e.g., Student, Course).',
        'Attribute: Properties describing an entity (e.g., StudentID, Name).',
        'Relationship: Connections between entities (e.g., Student enrolls in Course).'
      ]},
      { type: 'list', title: 'Specialized Entities & Attributes', content: [
        'Strong Entity: Has a unique key attribute (Primary Key).',
        'Weak Entity: Depends on a strong entity for identification (e.g., Dependents of an Employee).',
        'Composite Attribute: Address (Street, City, State).',
        'Multivalued Attribute: Phone Numbers (one person can have many).',
        'Derived Attribute: Age (calculated from DOB).'
      ]}
    ],
    prevLesson: 'joins',
    nextLesson: 'structural-constraints'
  },
  'structural-constraints': {
    id: 'structural-constraints',
    title: 'Structural Constraints',
    subtitle: 'Cardinality & Participation',
    sections: [
      { type: 'text', content: 'Structural constraints define how entities participate in relationships. They ensure the database reflects real-world business rules.' },
      { type: 'table', title: 'Cardinality Ratios', content: {
        headers: ['Type', 'Symbol', 'Description'],
        rows: [
          ['One-to-One', '1:1', 'One person has one passport.'],
          ['One-to-Many', '1:N', 'One department has many employees.'],
          ['Many-to-Many', 'M:N', 'Many students take many courses.']
        ]
      }},
      { type: 'list', title: 'Participation Constraints', content: [
        'Total Participation: Every entity must participate in the relationship (Double line).',
        'Partial Participation: Some entities may not participate (Single line).'
      ]},
      { type: 'note', content: 'The (min, max) notation provides a precise way to represent these constraints.' }
    ],
    prevLesson: 'er-model',
    nextLesson: 'relational-model'
  },
  'relational-model': {
    id: 'relational-model',
    title: 'The Relational Model',
    subtitle: 'Tables & Terminologies',
    sections: [
      { type: 'text', content: 'Invented by E.F. Codd, the relational model organizes data into two-dimensional tables called relations.' },
      { type: 'list', title: 'Basic Terms', content: [
        'Attribute: A column representing a property.',
        'Tuple: A row representing a single record.',
        'Domain: The set of allowable values for an attribute.',
        'Degree (Arity): Total number of attributes in a table.',
        'Cardinality: Total number of rows/tuples in a table.'
      ]},
      { type: 'note', content: 'Two NULL values in a relation are considered different from each other.' }
    ],
    prevLesson: 'structural-constraints',
    nextLesson: 'codd-rules'
  },
  'codd-rules': {
    id: 'codd-rules',
    title: "Codd's 12 Rules",
    subtitle: 'Defining an RDBMS',
    sections: [
      { type: 'text', content: 'These 12 rules (0 to 12) determine if a DBMS system is truly a Relational Database Management System (RDBMS).' },
      { type: 'list', title: 'Key Rules', content: [
        'Rule 0: Foundation Rule - Manage DB through relational capabilities.',
        'Rule 1: Information Rule - All data must be values in cells.',
        'Rule 2: Guaranteed Access - Primary keys must uniquely identify cells.',
        'Rule 3: Systematic Treatment of NULLs - Distinguish between zero/blank and missing data.',
        'Rule 8: Physical Data Independence - Changing disks/files doesn\'t affect logic.',
        'Rule 9: Logical Data Independence - Merging tables doesn\'t break apps.'
      ]}
    ],
    prevLesson: 'relational-model',
    nextLesson: 'database-keys'
  },
  'database-keys': {
    id: 'database-keys',
    title: 'Database Keys',
    subtitle: 'Ensuring Integrity',
    sections: [
      { type: 'text', content: 'Keys are fundamental for uniquely identifying records and creating relationships between tables.' },
      { type: 'list', title: 'Types of Keys', content: [
        'Super Key: Set of attributes that uniquely identifies a row.',
        'Candidate Key: A minimal super key (no redundant columns).',
        'Primary Key: The one candidate key chosen as the main unique identifier.',
        'Alternate Key: Candidate keys not chosen as the primary key.',
        'Foreign Key: Links a column in one table to the primary key of another.',
        'Composite Key: A key made of two or more columns.'
      ]}
    ],
    prevLesson: 'codd-rules',
    nextLesson: 'relational-algebra'
  },
  'relational-algebra': {
    id: 'relational-algebra',
    title: 'Relational Algebra',
    subtitle: 'Mathematical Basis of SQL',
    sections: [
      { type: 'text', content: 'Relational Algebra is a procedural query language. It consists of a set of operators that take one or two relations as input and produce a new relation as output.' },
      { type: 'text', title: '1. Selection (σ)', content: 'The selection operator (sigma) filters rows that satisfy a specific condition. Examples: σ salary > 50000 (Employees).' },
      { type: 'text', title: '2. Projection (π)', content: 'The projection operator (pi) displays specific columns. Example: π name, email (Users).' },
      { 
        type: 'text', 
        title: '3. Set Operations (Union, Intersection, Minus)', 
        content: 'These operators combine rows from different relations. To be compatible, relations must have the same number of columns with matching data types.' 
      },
      { 
        type: 'table', 
        title: 'Table: BANGLA (Students)', 
        content: {
          headers: ['Name', 'Roll'],
          rows: [['Anis', '01'], ['Rahim', '02'], ['Karim', '05']]
        }
      },
      { 
        type: 'table', 
        title: 'Table: HINDI (Students)', 
        content: {
          headers: ['Name', 'Roll'],
          rows: [['Amit', '03'], ['Rahim', '02'], ['Sanjay', '07']]
        }
      },
      { 
        type: 'table', 
        title: 'Table: FRENCH (Students)', 
        content: {
          headers: ['Name', 'Roll'],
          rows: [['Luc', '10'], ['Marie', '11'], ['Amit', '03']]
        }
      },
      {
        type: 'list',
        title: 'Applying Operators',
        content: [
          'BANGLA ∪ HINDI: All students from both Bangla and Hindi courses (Unique: Anis, Rahim, Karim, Amit, Sanjay).',
          'BANGLA ∩ HINDI: Common students (Rahim).',
          'HINDI ∩ FRENCH: Common students (Amit).',
          'BANGLA ─ HINDI: Students only in Bangla (Anis, Karim).',
          'GERMAN ∪ SPANISH: Similarly combines students from German and Spanish tracks.'
        ]
      },
      { type: 'note', content: 'Relational Algebra is the formal language that tells the DBMS HOW to execute a query, while SQL tells it WHAT is needed.' }
    ],
    prevLesson: 'database-keys',
    nextLesson: 'er-mapping'
  },
  'er-mapping': {
    id: 'er-mapping',
    title: 'ER to Relational Mapping',
    subtitle: 'From Diagram to Tables',
    sections: [
      { type: 'text', content: 'Transforming an ER diagram into a relational schema is the core of physical database design. The number of tables created depends on cardinality and participation constraints.' },
      { type: 'table', title: 'Mapping Strategies', content: {
        headers: ['Relationship Case', 'Tables Required', 'Method'],
        rows: [
          ['1:1 (Total Participation)', '1 Table', 'Merge both entities and relationship into a single table.'],
          ['1:1 (Partial Participation)', '2 Tables', 'One table for each entity; link using a foreign key.'],
          ['1:N / N:1', '2 Tables', 'Merge the "Many" side with the relationship.'],
          ['M:N (Many-to-Many)', '3 Tables', 'Two for entities, one bridge table for the relationship.'],
          ['Weak Entity', '2 Tables', 'Merge weak entity with its identifying relationship.']
        ]
      }},
      { type: 'note', content: 'In 1:1 relationships, if even one side has total participation, you can usually reduce the schema to a single table.' }
    ],
    prevLesson: 'relational-algebra',
    nextLesson: 'schema-strategy'
  },
  'schema-strategy': {
    id: 'schema-strategy',
    title: 'Schema Design Strategies',
    subtitle: 'Architecture Approaches',
    sections: [
      { type: 'text', content: 'Effective schema design ensures scalability. It involves choosing a design direction and applying consistent constraints.' },
      { type: 'list', title: 'Design Directions', content: [
        'Top-Down: Start with high-level abstractions and refine into attributes.',
        'Bottom-Up: Start with attributes and group them into entities.',
        'Inside-Out: Start with core concepts and expand outward.',
        'Mixed: Partition requirements and use both approaches.'
      ]},
      { type: 'list', title: 'Data Integrity Constraints', content: [
        'Primary Key: Guaranteed uniqueness.',
        'Foreign Key: Referential integrity between tables.',
        'Check Constraint: Validates values (e.g., Age > 18).',
        'Not Null: Ensures mandatory fields are filled.'
      ]},
      { type: 'table', title: 'Scaling Techniques', content: {
        headers: ['Technique', 'Description'],
        rows: [
          ['Normalization', 'Reduces redundancy to save space and integrity.'],
          ['Denormalization', 'Adds redundancy to speed up heavy read queries.'],
          ['Horizontal Partitioning', 'Splits tables by rows (Sharding).'],
          ['Vertical Partitioning', 'Splits tables by columns.']
        ]
      }}
    ],
    prevLesson: 'er-mapping',
    nextLesson: undefined
  }
};
