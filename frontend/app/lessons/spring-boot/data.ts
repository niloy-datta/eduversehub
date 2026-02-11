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

export const springBootLessons: Record<string, LessonContent> = {
  'intro': {
    id: 'intro',
    title: 'Introduction to Spring Boot',
    subtitle: 'Getting Started',
    sections: [
      { type: 'text', content: 'Spring Boot is an open-source Java-based framework used to create a micro Service. It is developed by Pivotal Team and is used to build stand-alone and production ready spring applications.' },
      { type: 'text', content: 'It provides a good platform for Java developers to develop a stand-alone and production-grade spring application that you can just run. You can get started with minimum configurations without the need for an entire Spring configuration setup.' },
      { type: 'list', title: 'Key Features', content: [
        'Create stand-alone Spring applications',
        'Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)',
        'Provide opinionated \'starter\' dependencies to simplify your build configuration',
        'Automatically configure Spring and 3rd party libraries whenever possible',
        'Provide production-ready features such as metrics, health checks, and externalized configuration',
        'Absolutely no code generation and no requirement for XML configuration'
      ]},
    ],
    practiceCode: `package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
    @GetMapping("/")
    public String hello() {
      return "Hello Spring Boot!";
    }
}`,
    quiz: [
      {
        id: 1,
        question: "What is the primary goal of Spring Boot?",
        options: [
          { id: "a", text: "To replace Java" },
          { id: "b", text: "To simplify Spring application development" },
          { id: "c", text: "To create database tables" },
          { id: "d", text: "To manage frontend assets" }
        ],
        correctAnswer: "b"
      }
    ],
    nextLesson: 'difference'
  },
  'difference': {
    id: 'difference',
    title: 'Spring vs Spring Boot',
    subtitle: 'Understanding the Differences',
    sections: [
      { type: 'text', title: 'Spring Framework', content: 'Spring is an open-source lightweight framework that allows Java developers to build simple, reliable, and scalable enterprise applications. Spring Boot is built on top of the conventional Spring framework.' },
      { type: 'table', title: 'Difference between Spring and Spring Boot', content: {
        headers: ['Feature', 'Spring', 'Spring Boot'],
        rows: [
          ['Goal', 'Loose coupling of objects', 'Rapid application development'],
          ['Server', 'Need external server', 'Embedded server provided'],
          ['Config', 'Manual XML/Java config', 'Auto-configuration']
        ]
      }}
    ],
    prevLesson: 'intro',
    nextLesson: 'ioc'
  },
  'ioc': {
    id: 'ioc',
    title: 'IoC & Dependency Injection',
    subtitle: 'Core Spring Concepts',
    sections: [
      { type: 'text', content: 'Inversion of Control (IoC) is a process in which an object defines its dependencies without creating them. The Spring container is responsible for instantiating and assembling the beans.' },
      { type: 'list', title: 'DI Types', content: [
        'Constructor Injection: Required dependencies.',
        'Setter Injection: Optional dependencies.',
        'Field Injection: Uses reflection (not recommended for production).'
      ]},
      { type: 'code', title: 'Example Constructor Injection', content: `@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}` }
    ],
    prevLesson: 'difference',
    nextLesson: 'jpa'
  },
  'jpa': {
    id: 'jpa',
    title: 'Spring Data JPA',
    subtitle: 'Database Access',
    sections: [
      { type: 'text', content: 'Spring Data JPA makes it easy to easily implement JPA-based repositories. This module deals with enhanced support for JPA-based data access layers.' },
      { type: 'code', title: 'Repository Interface', content: `public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLastName(String lastName);
}` },
      { type: 'note', content: 'You just need to define the interface, Spring provides the implementation at runtime!' }
    ],
    prevLesson: 'ioc',
    nextLesson: 'rest-controller'
  },
  'rest-controller': {
    id: 'rest-controller',
    title: 'Building REST APIs',
    subtitle: 'Spring Web',
    sections: [
      { type: 'text', content: 'The @RestController annotation is used to build RESTful web services. It combines @Controller and @ResponseBody.' },
      { type: 'code', title: 'Controller Example', content: `@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<User> getAll() { ... }
    
    @PostMapping
    public User create(@RequestBody User user) { ... }
}` }
    ],
    prevLesson: 'jpa',
    nextLesson: 'security-intro'
  },
  'security-intro': {
    id: 'security-intro',
    title: 'Spring Security Intro',
    subtitle: 'Protecting your App',
    sections: [
      { type: 'text', content: 'Spring Security is a powerful and highly customizable authentication and access-control framework. It is the de-facto standard for securing Spring-based applications.' },
      { type: 'list', title: 'Core Concepts', content: [
        'Authentication: Who are you?',
        'Authorization: What are you allowed to do?',
        'CSRF Protection: Protecting against cross-site request forgery.'
      ]}
    ],
    prevLesson: 'rest-controller',
    nextLesson: 'properties'
  },
  'properties': {
    id: 'properties',
    title: 'External Configuration',
    subtitle: 'application.properties',
    sections: [
      { type: 'text', content: 'Spring Boot uses application.properties or application.yml for configuration.' },
      { type: 'code', title: 'Example Config', content: `server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/db` }
    ],
    prevLesson: 'security-intro',
    nextLesson: 'actuator'
  },
  'actuator': {
    id: 'actuator',
    title: 'Spring Boot Actuator',
    subtitle: 'Monitoring',
    sections: [
      { type: 'text', content: 'Actuator endpoints let you monitor and interact with your application.' },
      { type: 'list', title: 'Key Endpoints', content: [
        '/health - Shows app health info.',
        '/metrics - Shows metrics (memory, cpu).',
        '/env - Shows environment properties.'
      ]}
    ],
    prevLesson: 'properties',
    nextLesson: undefined
  }
};
