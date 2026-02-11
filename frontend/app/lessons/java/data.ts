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
  type: 'text' | 'code' | 'note' | 'list' | 'image';
  title?: string;
  content: string | string[];
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

export const javaLessonsData: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'Java Introduction',
    subtitle: 'What is Java?',
    sections: [
      { type: 'text', content: 'Java is a popular programming language, created in 1995. It is owned by Oracle, and more than 3 billion devices run Java.' },
      { type: 'list', title: 'It is used for:', content: [
        'Mobile applications (specifically Android)',
        'Desktop applications',
        'Web applications',
        'Web servers and application servers',
        'Games',
        'Database connection',
      ]},
      { type: 'text', title: 'Why Use Java?', content: 'Java works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc.). It is one of the most popular programming languages in the world. It is easy to learn and simple to use. It is open-source and free. It is secure, fast and powerful. It has huge community support (tens of millions of developers). Java is an object oriented language which gives a clear structure to programs and allows code to be reused, lowering development costs.' },
    ],
    nextLesson: 'get-started'
  },
  'get-started': {
    id: 'get-started',
    title: 'Java Getting Started',
    subtitle: 'Installation',
    sections: [
      { type: 'text', content: 'To start coding in Java on your own machine, you first need to install the Java Development Kit (JDK). This guide provides detailed steps for Windows, Linux, and macOS.' },
      { type: 'note', content: 'While local installation is great for professional development, remember that this interactive course provides a built-in environment to run Java code directly in your browser!' },
      {
        type: 'text',
        title: 'Download and Install Java on Windows',
        content: 'Follow these steps to install Java on Windows 7, 8, 10, or 11.'
      },
      {
        type: 'list',
        title: 'Installation Steps',
        content: [
          'Visit the official Oracle website and click "Download Java".',
          'Select the "Windows" tab and download the "x64 Installer" .exe file.',
          'Once downloaded, run the installer and follow the on-screen instructions in the installation wizard.',
        ]
      },
      {
        type: 'list',
        title: 'Set Environment Variables',
        content: [
          'After installation, navigate to `C:\\Program Files\\Java\\jdk-xx` (where `xx` is your version) and copy the path to the `bin` folder.',
          'Search for "Environment Variables" in the Windows search bar and open it.',
          'Click on "Environment Variables...", select the "Path" variable under "System variables", and click "Edit".',
          'Click "New", paste the copied path to the `bin` folder, and click OK on all windows to save.',
        ]
      },
      { type: 'text', title: 'Verify Installation', content: 'Open a new Command Prompt and type the following command to check if Java was installed correctly:' },
      { type: 'code', content: 'java --version' },
      { type: 'text', title: 'Download and Install Java on Linux (Ubuntu)', content: 'Here’s how to set up Java on a Linux system.' },
      { type: 'list', content: [
          'Download the `.tar.gz` file for Linux (x64 or ARM64) from the Oracle website.',
          'Open a terminal and extract the file: `tar -xvzf jdk-xx_linux-x64_bin.tar.gz`',
          'Move the extracted folder: `sudo mv jdk-xx /opt/`',
          'Open your shell configuration file (e.g., `nano ~/.bashrc`) and add these lines at the end:\n`export JAVA_HOME=/opt/jdk-xx`\n`export PATH=$JAVA_HOME/bin:$PATH`',
          'Apply the changes: `source ~/.bashrc`',
          'Verify the installation with `java --version`.'
      ]},
      { type: 'text', title: 'Download and Install Java on macOS', content: 'Follow these steps for macOS.' },
      { type: 'list', content: [
          'Download the `.dmg` file for macOS from the Oracle website.',
          'Open the downloaded `.dmg` file and run the installer package (`.pkg`). Follow the on-screen instructions.',
          'Verify the installation by opening the Terminal and running `java --version`.'
      ]},
    ],
    prevLesson: 'intro',
    nextLesson: 'jdk-jre-jvm'
  },
  'jdk-jre-jvm': {
    id: 'jdk-jre-jvm',
    title: 'JDK, JRE, and JVM Explained',
    subtitle: 'Understanding the Java Platform',
    sections: [
      { type: 'text', content: 'To understand how Java works, it\'s essential to know about its three core components: the JDK, JRE, and JVM. They work together to allow you to develop and run Java applications.' },
      { type: 'text', title: 'JDK (Java Development Kit)', content: 'The JDK is a software development kit used to build Java applications. It contains everything you need to write, compile, and debug Java code. When you installed Java in the previous step, you installed the JDK.' },
      { type: 'list', title: 'Key Components of JDK:', content: [
          'JRE (Java Runtime Environment)',
          'Development Tools (like `javac` the compiler, `java` the launcher, and `jdb` the debugger).',
        ]
      },
      { type: 'text', title: 'JRE (Java Runtime Environment)', content: 'The JRE provides the environment to run existing Java programs. It is intended for end-users who only need to execute applications, not develop them.' },
      { type: 'list', title: 'Key Components of JRE:', content: [
          'JVM (Java Virtual Machine)',
          'Java Class Libraries (the core code your program can use).',
        ]
      },
      { type: 'text', title: 'JVM (Java Virtual Machine)', content: 'The JVM is the core execution engine of Java. It is an abstract machine that converts compiled Java bytecode into machine-specific instructions that your computer can execute. This is what makes Java "platform-independent".' },
      { type: 'note', content: 'While your Java bytecode can run on any machine with a JVM, the JVM itself is platform-dependent. There are different JVM implementations for Windows, Linux, and macOS.' },
      { type: 'text', title: 'Summary: JDK vs JRE vs JVM', content: 'Here is a simple breakdown:' },
      { type: 'list', content: [
          '**JDK (Develop):** JRE + Development Tools. You need this to write and compile code.',
          '**JRE (Run):** JVM + Libraries. You need this to run Java programs.',
          '**JVM (Execute):** The "engine" that runs the compiled code.',
        ]
      },
    ],
    prevLesson: 'get-started',
    nextLesson: 'syntax'
  },
  'syntax': {
    id: 'syntax',
    title: 'Java Syntax',
    subtitle: 'Methods and Classes',
    sections: [
      { type: 'text', content: 'In Java, every line of code that runs must be inside a class. In our example, we named the class Main. A class should always start with an uppercase first letter.' },
      { type: 'text', content: 'Java is case-sensitive: "MyClass" and "myclass" has different meaning.' },
      { type: 'text', title: 'The main() Method', content: 'The main() method is required and you will see it in every Java program:' },
      { type: 'code', content: `public static void main(String[] args)` },
      { type: 'text', content: 'Any code inside the main() method will be executed. Don\'t worry about the keywords public, static, and void for now. We will learn them later.' },
      { type: 'text', title: 'System.out.println()', content: 'Inside the main() method, we can use the println() method to print a line of text to the screen:' },
      { type: 'code', content: `System.out.println("Hello World");` },
    ],
    practiceCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
    prevLesson: 'jdk-jre-jvm',
    nextLesson: 'output'
  },
  'output': {
    id: 'output',
    title: 'Java Output',
    subtitle: 'Print Text',
    sections: [
      { type: 'text', content: 'You can use the println() method to output values or print text in Java:' },
      { type: 'code', content: `System.out.println("Hello World!");` },
      { type: 'text', content: 'You can add as many println() methods as you want. Note that it will add a new line for each method:' },
      { type: 'code', content: `System.out.println("Hello World!");\nSystem.out.println("I am learning Java.");\nSystem.out.println("It is awesome!");` },
      { type: 'text', title: 'The print() Method', content: 'There is also a print() method, which is similar to println(). The only difference is that it does not insert a new line at the end of the output:' },
      { type: 'code', content: `System.out.print("Hello World! ");\nSystem.out.print("I will print on the same line.");` },
    ],
    practiceCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    System.out.println("I am learning Java.");
    System.out.print("This line ");
    System.out.print("continues here.");
  }
}`,
    prevLesson: 'syntax',
    nextLesson: 'comments'
  },
  'comments': {
    id: 'comments',
    title: 'Java Comments',
    subtitle: 'Single-line and Multi-line',
    sections: [
      { type: 'text', content: 'Comments can be used to explain Java code, and to make it more readable. It can also be used to prevent execution when testing alternative code.' },
      { type: 'text', title: 'Single-line Comments', content: 'Single-line comments start with two forward slashes (//).' },
      { type: 'code', content: `// This is a comment\nSystem.out.println("Hello World");` },
      { type: 'text', title: 'Multi-line Comments', content: 'Multi-line comments start with /* and ends with */.' },
      { type: 'code', content: `/* The code below will print the words Hello World
to the screen, and it is amazing */
System.out.println("Hello World");` },
    ],
    prevLesson: 'output',
    nextLesson: 'variables'
  },
  'variables': {
    id: 'variables',
    title: 'Java Variables',
    subtitle: 'Storing Data',
    sections: [
      { type: 'text', content: 'In Java, variables are containers used to store data in memory. A variable has three components: a data type, a name, and a value.' },
      { type: 'text', title: 'Declaring and Initializing Variables', content: 'To create a variable, you must specify its data type and give it a unique name. You can also assign it a value at the same time (initialization).' },
      { type: 'code', content: `// Syntax: dataType variableName = value;

// Integer variable
int age = 25;

// String variable
String name = "EduVerse";

// Double variable
double salary = 50000.50;

System.out.println("Name: " + name);` },
      { type: 'text', title: 'Rules for Naming Variables', content: 'Choosing a good variable name is important for code readability. Java has a few rules you must follow:' },
      { type: 'list', content: [
          '**Start with a Letter, $, or _**: Variable names must begin with a letter (a–z, A–Z), a dollar sign ($), or an underscore (_).',
          '**No Keywords**: Reserved Java keywords (e.g., `int`, `class`, `if`) cannot be used as variable names.',
          '**Case-Sensitive**: `age` and `Age` are treated as two different variables.',
          '**Subsequent Characters**: After the first character, you can use letters, digits (0–9), $, or _.',
          '**No Spaces**: Variable names cannot contain spaces.',
          '**Follow Naming Conventions**: It is a common convention to use `camelCase` for variable names in Java (e.g., `totalMarks`).',
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "Which of the following is true about variable names in Java?",
        options: [
          { id: 'a', text: 'Variable names can start with a number' },
          { id: 'b', text: 'Variable names can contain special characters like @ or #' },
          { id: 'c', text: 'Variable names are case-sensitive' },
          { id: 'd', text: 'Variable names can be a Java keyword' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: "What is the correct way to declare a constant variable in Java?",
        options: [
          { id: 'a', text: 'final int MAX = 100;' },
          { id: 'b', text: 'const int MAX = 100;' },
          { id: 'c', text: 'int const MAX = 100;' },
          { id: 'd', text: 'MAX = 100;' },
        ],
        correctAnswer: 'a'
      },
      {
        id: 3,
        question: "What will be the output of this Java program? `public class Demo { public static void main(String[] args) { int x = 10; { int x = 20; System.out.println(x); } } }`",
        options: [
          { id: 'a', text: '20' },
          { id: 'b', text: '10' },
          { id: 'c', text: 'Compilation Error' },
          { id: 'd', text: 'Runtime Error' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 4,
        question: "Which keyword is used to declare an integer variable in Java?",
        options: [
          { id: 'a', text: 'define' },
          { id: 'b', text: 'let' },
          { id: 'c', text: 'int' },
          { id: 'd', text: 'declare' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 5,
        question: "Which of the following is a valid integer literal?",
        options: [
          { id: 'a', text: '12.5' },
          { id: 'b', text: '0x1A' },
          { id: 'c', text: '"100"' },
          { id: 'd', text: 'true' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 6,
        question: "Which of these performs explicit type casting?",
        options: [
          { id: 'a', text: 'int z = (int) 5.9;' },
          { id: 'b', text: 'double y = 3;' },
          { id: 'c', text: 'int x = 5.0;' },
          { id: 'd', text: 'float f = 5;' },
        ],
        correctAnswer: 'a'
      },
      {
        id: 7,
        question: "What is the default value of an uninitialized `int` instance variable in a class?",
        options: [
          { id: 'a', text: '0' },
          { id: 'b', text: 'null' },
          { id: 'c', text: 'A garbage value' },
          { id: 'd', text: '1' },
        ],
        correctAnswer: 'a'
      }
    ],
    practiceCode: `public class Main {
  public static void main(String[] args) {
    String name = "John";
    System.out.println(name);
    
    int myNum = 15;
    System.out.println(myNum);
    
    int myNum2;
    myNum2 = 20;
    System.out.println(myNum2);
  }
}`,
    prevLesson: 'comments',
    nextLesson: 'datatypes'
  },
  'datatypes': {
    id: 'datatypes',
    title: 'Java Data Types',
    subtitle: 'Primitive vs Non-Primitive',
    sections: [
      { type: 'text', content: 'As explained in the previous chapter, a variable in Java must be a specified data type:' },
      { type: 'code', content: `int myNum = 5;               // Integer (whole number)
float myFloatNum = 5.99f;    // Floating point number
char myLetter = 'D';         // Character
boolean myBool = true;       // Boolean
String myText = "Hello";     // String` },
      { type: 'text', content: 'Data types are divided into two groups:' },
      { type: 'list', content: [
        'Primitive data types - includes byte, short, int, long, float, double, boolean and char',
        'Non-primitive data types - such as String, Arrays and Classes',
      ]},
    ],
    practiceCode: `public class Main {
  public static void main(String[] args) {
    int myNum = 5;
    float myFloatNum = 5.99f;
    char myLetter = 'D';
    boolean myBool = true;
    String myText = "Hello";
    
    System.out.println(myNum);
    System.out.println(myFloatNum);
    System.out.println(myLetter);
    System.out.println(myBool);
    System.out.println(myText);
  }
}`,
    prevLesson: 'variables',
    nextLesson: 'wrapper-classes'
  },
  'wrapper-classes': {
    id: 'wrapper-classes',
    title: 'Java Wrapper Classes',
    subtitle: 'Using Primitives as Objects',
    sections: [
      { type: 'text', content: 'In Java, wrapper classes allow primitive data types (like `int`, `char`, `double`) to be represented as objects. This enables primitives to be used in object-oriented features such as collections (e.g., `ArrayList`) and other APIs that require objects.' },
      { type: 'list', title: 'Why are Wrapper Classes needed?', content: [
          'Java collections (like `ArrayList`, `HashMap`) can only store objects, not primitives.',
          'Wrapper objects allow primitives to be used in object-oriented features like methods and serialization.',
          'Objects can have a `null` value, while primitives cannot.',
          'Wrapper classes provide useful utility methods (e.g., `parseInt()`, `toString()`).',
        ]
      },
      { type: 'text', title: 'Autoboxing and Unboxing', content: 'Java provides automatic conversion between primitives and their corresponding wrapper objects.' },
      { type: 'text', title: 'Autoboxing (Primitive → Object)', content: 'Autoboxing is the automatic conversion of a primitive type to its wrapper object. This happens implicitly when you assign a primitive to a wrapper type variable or add it to a collection.' },
      { type: 'code', content: `// Autoboxing: primitive int is automatically converted to an Integer object
int primitiveInt = 10;
Integer wrapperInt = primitiveInt;

ArrayList<Integer> list = new ArrayList<>();
// Autoboxing happens here too
list.add(25);` },
      { type: 'text', title: 'Unboxing (Object → Primitive)', content: 'Unboxing is the reverse process: automatically converting a wrapper object back into its corresponding primitive type.' },
      { type: 'code', content: `// Unboxing: Integer object is automatically converted to a primitive int
Integer wrapperInt = Integer.valueOf(50);
int primitiveInt = wrapperInt;` },
      { type: 'list', title: 'Primitive Types and Their Wrapper Classes', content: [
          'byte → Byte',
          'short → Short',
          'int → Integer',
          'long → Long',
          'float → Float',
          'double → Double',
          'char → Character',
          'boolean → Boolean',
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What is the purpose of wrapper classes in Java?",
        options: [
          { id: 'a', text: 'To convert primitive types into objects.' },
          { id: 'b', text: 'To define a method for primitive types.' },
          { id: 'c', text: 'To store collections of objects.' },
          { id: 'd', text: 'To define a constructor for primitive types.' },
        ],
        correctAnswer: 'a'
      },
      {
        id: 2,
        question: "Which of the following is true about primitive data types and wrapper classes in Java?",
        options: [
          { id: 'a', text: 'Wrapper classes store data more efficiently than primitives' },
          { id: 'b', text: 'Primitives can be used in collections' },
          { id: 'c', text: 'Wrapper classes are objects that wrap primitive types' },
          { id: 'd', text: 'Primitives can be directly cast to String' },
        ],
        correctAnswer: 'c'
      }
    ],
    practiceCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> myNumbers = new ArrayList<Integer>();
    myNumbers.add(10); // Autoboxing: int to Integer
    myNumbers.add(20);

    int firstNum = myNumbers.get(0); // Unboxing: Integer to int
    System.out.println("First number from list: " + firstNum);
  }
}`,
    prevLesson: 'datatypes',
    nextLesson: 'keywords'
  },
  'keywords': {
    id: 'keywords',
    title: 'Java Keywords',
    subtitle: 'Reserved Words in Java',
    sections: [
      { type: 'text', content: 'In Java, keywords are reserved words that have predefined meanings. They are used by the compiler to understand the structure of the code. These words cannot be used as identifiers for variable names, method names, or class names.' },
      { type: 'note', title: 'Important Points', content: 'Keywords are case-sensitive (e.g., `if` is a keyword, but `IF` is not). The words `const` and `goto` are reserved but not currently used. `true`, `false`, and `null` are technically literals, not keywords, but they also cannot be used as identifiers.' },
      { type: 'list', title: 'Data Type Keywords', content: [
          '`boolean`: Defines a variable that holds true or false.',
          '`char`: Defines a 16-bit Unicode character.',
          '`int`: Defines a 32-bit signed integer.',
          '`double`: Defines a 64-bit floating-point number.',
          '`void`: Specifies that a method does not return any value.',
        ]
      },
      { type: 'list', title: 'Control Flow Keywords', content: [
          '`if`, `else`: Executes code based on a condition.',
          '`for`, `while`, `do`: Used for creating loops.',
          '`switch`, `case`, `default`: Selects one block of code among many.',
          '`break`, `continue`: Used to control loop execution.',
          '`return`: Exits from a method.',
        ]
      },
      { type: 'list', title: 'Object-Oriented Keywords', content: [
          '`class`, `interface`: Declares a class or an interface.',
          '`new`: Creates new objects.',
          '`extends`, `implements`: Used for inheritance.',
          '`this`, `super`: Refers to the current or parent object.',
          '`final`, `static`, `abstract`: Modifiers for classes, methods, and variables.',
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "Which of the following is NOT a Java keyword?",
        options: [
          { id: 'a', text: 'volatile' },
          { id: 'b', text: 'goto' },
          { id: 'c', text: 'const' },
          { id: 'd', text: 'true' },
        ],
        correctAnswer: 'd'
      },
      {
        id: 2,
        question: "What will happen if you use a Java keyword as a variable name?",
        options: [
          { id: 'a', text: 'The program runs normally' },
          { id: 'b', text: 'The compiler automatically renames it' },
          { id: 'c', text: 'A compilation error occurs' },
          { id: 'd', text: 'It becomes a string value' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 3,
        question: "Which keyword is used to manually throw an exception?",
        options: [
          { id: 'a', text: 'throws' },
          { id: 'b', text: 'catch' },
          { id: 'c', text: 'throw' },
          { id: 'd', text: 'finally' },
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'wrapper-classes',
    nextLesson: 'java-basics-quiz'
  },
  'java-basics-quiz': {
    id: 'java-basics-quiz',
    title: 'Java Basics Quiz',
    subtitle: 'Test Your Foundational Knowledge',
    sections: [
      { type: 'text', content: 'Test your understanding of the basic concepts of Java, including its features, syntax, and the Java platform components.' }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the correct way to declare a Java main method?",
        options: [
          { id: 'a', text: 'public static void Main(String[] args)' },
          { id: 'b', text: 'public void main(String args)' },
          { id: 'c', text: 'public static void main(String[] args)' },
          { id: 'd', text: 'private static void main(String args[])' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: "Which of the following is NOT a feature of Java?",
        options: [
          { id: 'a', text: 'Platform independence' },
          { id: 'b', text: 'Object-oriented' },
          { id: 'c', text: 'Dynamically typed language' },
          { id: 'd', text: 'Robust' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 3,
        question: "Which component is responsible for converting bytecode to machine code?",
        options: [
          { id: 'a', text: 'Java Compiler' },
          { id: 'b', text: 'JDK' },
          { id: 'c', text: 'JVM' },
          { id: 'd', text: 'JRE' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 4,
        question: "Java code is compiled into which intermediate form?",
        options: [
          { id: 'a', text: 'Assembly' },
          { id: 'b', text: 'Bytecode' },
          { id: 'c', text: 'Binary' },
          { id: 'd', text: 'Machine code' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 5,
        question: "Which Java feature ensures code written once can run anywhere?",
        options: [
          { id: 'a', text: 'Platform independence' },
          { id: 'b', text: 'Multithreading' },
          { id: 'c', text: 'Security' },
          { id: 'd', text: 'Performance' },
        ],
        correctAnswer: 'a'
      }
    ],
    prevLesson: 'keywords',
    nextLesson: 'operators'
  },
   'operators': {
    id: 'operators',
    title: 'Java Operators',
    subtitle: 'Performing Operations',
    sections: [
      { type: 'text', content: 'Java operators are special symbols that perform operations on variables or values. They are essential for manipulating data.' },
      { type: 'text', title: '1. Arithmetic Operators', content: 'Used to perform simple arithmetic operations.' },
      { type: 'list', content: [
          '`+` (Addition)',
          '`-` (Subtraction)',
          '`*` (Multiplication)',
          '`/` (Division)',
          '`%` (Modulus - returns the remainder)',
        ]
      },
      { type: 'text', title: '2. Unary Operators', content: 'These operators need only one operand. They are used to increment, decrement, or negate a value.' },
      { type: 'list', content: [
          '`++` (Increment): Increases the value by 1. `a++` is post-increment, `++a` is pre-increment.',
          '`--` (Decrement): Decreases the value by 1. `a--` is post-decrement, `--a` is pre-decrement.',
          '`!` (Logical NOT): Inverts a boolean value.',
        ]
      },
      { type: 'text', title: '3. Assignment Operators', content: 'Assigns a value to a variable. Compound assignment operators (`+=`, `-=`, `*=`, `/=`) perform an operation and an assignment in one step.' },
      { type: 'code', content: `int n = 10;
n += 5; // Equivalent to n = n + 5;
System.out.println(n); // Prints 15` },
      { type: 'text', title: '4. Relational Operators', content: 'Used to check for relations like equality, greater than, and less than. They always return a boolean result (`true` or `false`).' },
      { type: 'list', content: [
          '`==` (Equal to)',
          '`!=` (Not equal to)',
          '`>` (Greater than)',
          '`<` (Less than)',
          '`>=` (Greater than or equal to)',
          '`<=` (Less than or equal to)',
        ]
      },
      { type: 'text', title: '5. Logical Operators', content: 'Used to perform "logical AND" (`&&`) and "logical OR" (`||`) operations. They are often used with relational operators.' },
      { type: 'text', title: '6. Ternary Operator', content: 'A shorthand version of an `if-else` statement. It has three operands.' },
      { type: 'code', content: `// Syntax: condition ? value_if_true : value_if_false;
int a = 10, b = 20;
int min = (a < b) ? a : b; // min will be 10` },
    ],
    quiz: [
      {
        id: 1,
        question: "What is the output of `System.out.println(10 / 3);`?",
        options: [
          { id: 'a', text: '3.33' },
          { id: 'b', text: '3.0' },
          { id: 'c', text: '3' },
          { id: 'd', text: 'Compilation Error' },
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: "What is the output of `int a = 5; System.out.println(a++ + ++a);`?",
        options: [
          { id: 'a', text: '11' },
          { id: 'b', text: '12' },
          { id: 'c', text: '10' },
          { id: 'd', text: '13' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 3,
        question: "What is the result of `true && false || true && true`?",
        options: [
          { id: 'a', text: 'true' },
          { id: 'b', text: 'false' },
          { id: 'c', text: 'Compilation Error' },
          { id: 'd', text: 'Runtime Error' },
        ],
        correctAnswer: 'a'
      },
      {
        id: 4,
        question: "Which operator has the highest precedence in Java?",
        options: [
          { id: 'a', text: '++ (Postfix Increment)' },
          { id: 'b', text: '&& (Logical AND)' },
          { id: 'c', text: '* (Multiplication)' },
          { id: 'd', text: '= (Assignment)' },
        ],
        correctAnswer: 'a'
      },
    ],
    practiceCode: "public class Main {\n  public static void main(String[] args) {\n    int a = 10, b = 3;\n    System.out.println(\"a + b = \" + (a + b));\n    System.out.println(\"a > b is \" + (a > b));\n    \n    // Ternary operator\n    String result = (a > 5) ? \"a is greater than 5\" : \"a is not greater than 5\";\n    System.out.println(result);\n  }\n}",
    prevLesson: 'java-basics-quiz',
    nextLesson: 'strings'
  },
  'strings': {
      id: 'strings',
      title: 'Java Strings',
      subtitle: 'Working with Text',
      sections: [
        { type: 'text', content: 'Strings are used for storing text. A String variable contains a collection of characters surrounded by double quotes:' },
        { type: 'code', content: "String greeting = \"Hello\";" },
        { type: 'text', title: 'String Length', content: 'A String in Java is actually an object, which contain methods involving certain text operations. For example, the length of a string can be found with the length() method:' },
        { type: 'code', content: "String txt = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\";\nSystem.out.println(\"The length of the txt string is: \" + txt.length());" },
        { type: 'text', title: 'More Methods', content: 'There are many string methods available, for example toUpperCase() and toLowerCase():' },
        { type: 'code', content: "String txt = \"Hello World\";\nSystem.out.println(txt.toUpperCase());   // Outputs \"HELLO WORLD\"\nSystem.out.println(txt.toLowerCase());   // Outputs \"hello world\"" },
      ],
      practiceCode: "public class Main {\n    public static void main(String[] args) {\n      String txt = \"Hello World\";\n      System.out.println(txt.toUpperCase());\n      System.out.println(txt.toLowerCase());\n      System.out.println(\"Length: \" + txt.length());\n      \n      String firstName = \"John \";\n      String lastName = \"Doe\";\n      System.out.println(firstName.concat(lastName));\n    }\n  }",
      prevLesson: 'operators',
      nextLesson: 'classes-objects'
    },
  'classes-objects': {
      id: 'classes-objects',
      title: 'Java OOP: Classes and Objects',
      subtitle: 'The Building Blocks of Object-Oriented Programming',
      sections: [
        { type: 'text', title: 'What is Object-Oriented Programming (OOP)?', content: 'Object-Oriented Programming is a programming paradigm based on the concept of "objects", which can contain data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).' },
        { type: 'text', title: 'Classes and Objects', content: 'In Java, a class is a blueprint for creating objects. An object is an instance of a class. Think of a class as a cookie cutter, and the cookies you make with it are the objects.' },
        { type: 'text', content: 'A class can have attributes (variables) and methods (functions).' },
        { type: 'code', content: "// A simple class named 'Car'\npublic class Car {\n  // Attribute\n  int modelYear;\n\n  // Method\n  public void honk() {\n    System.out.println(\"Tuut, tuut!\");\n  }\n}" },
        { type: 'text', title: 'Creating an Object', content: 'To create an object of a class, you use the `new` keyword.' },
        { type: 'code', content: "Car myCar = new Car(); // Create an object of the Car class" },
      ],
      practiceCode: "public class Main {\n  // Class attribute\n  int x = 5;\n\n  public static void main(String[] args) {\n    // Create an object of the Main class\n    Main myObj = new Main(); \n    \n    // Access the attribute 'x' using the object\n    System.out.println(myObj.x);\n  }\n}",
      prevLesson: 'strings',
      nextLesson: 'constructors'
    },
  'constructors': {
      id: 'constructors',
      title: 'Java Constructors',
      subtitle: 'Initializing Objects',
      sections: [
        { type: 'text', content: 'A constructor in Java is a special method that is used to initialize objects. The constructor is called when an object of a class is created.' },
        { type: 'note', content: 'A constructor must have the exact same name as the class and it cannot have a return type (like `void`).' },
        { type: 'code', title: 'Creating a Constructor', content: "public class Main {\n  int x;  // Create a class attribute\n\n  // Create a class constructor for the Main class\n  public Main() {\n    x = 5;  // Set the initial value for the class attribute x\n  }\n}" },
        { type: 'text', title: 'Constructor Parameters', content: 'Constructors can also take parameters, which are used to initialize attributes.' },
        { type: 'code', title: 'Example with Parameters', content: "public class Car {\n  int modelYear;\n  String modelName;\n\n  public Car(int year, String name) {\n    modelYear = year;\n    modelName = name;\n  }\n}" },
      ],
      quiz: [
        {
          id: 1,
          question: "What is the primary purpose of a constructor in Java?",
          options: [
            { id: 'a', text: 'To return a value from the class' },
            { id: 'b', text: 'To initialize the state of a new object' },
            { id: 'c', text: 'To destroy an object when it is no longer needed' },
          ],
          correctAnswer: 'b'
        },
        {
          id: 2,
          question: "Which of the following is a valid rule for a constructor?",
          options: [
            { id: 'a', text: 'It must have a `void` return type.' },
            { id: 'b', text: 'It can have any name.' },
            { id: 'c', text: 'It must have the same name as the class.' },
          ],
          correctAnswer: 'c'
        }
      ],
      practiceCode: "public class Main {\n  int modelYear;\n  String modelName;\n\n  // Constructor with parameters\n  public Main(int year, String name) {\n    modelYear = year;\n    modelName = name;\n  }\n\n  public static void main(String[] args) {\n    Main myCar = new Main(1969, \"Mustang\");\n    System.out.println(\"My car is a \" + myCar.modelYear + \" \" + myCar.modelName);\n  }\n}",
      prevLesson: 'classes-objects',
      nextLesson: undefined // Next could be 'inheritance'
    }
};

export const javaLessons: LessonContent[] = Object.values(javaLessonsData);
