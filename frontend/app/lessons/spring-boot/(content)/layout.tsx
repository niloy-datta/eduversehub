'use client';

import CourseSidebar from '@/components/CourseSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const springBootModules = [
  {
    title: 'Fundamentals',
    lessons: [
      { id: '1-1', title: 'Introduction', href: '/lessons/spring-boot/intro' },
      { id: '1-2', title: 'Spring vs Spring Boot', href: '/lessons/spring-boot/difference' },
    ]
  },
  {
    title: 'Core Concepts',
    lessons: [
      { id: '2-1', title: 'IoC & DI', href: '/lessons/spring-boot/ioc' },
      { id: '2-2', title: 'Spring Data JPA', href: '/lessons/spring-boot/jpa' },
      { id: '2-3', title: 'REST APIs', href: '/lessons/spring-boot/rest-controller' },
    ]
  },
  {
    title: 'Advanced Features',
    lessons: [
      { id: '3-1', title: 'Spring Security', href: '/lessons/spring-boot/security-intro' },
      { id: '3-2', title: 'Configuration', href: '/lessons/spring-boot/properties' },
      { id: '3-3', title: 'Actuator', href: '/lessons/spring-boot/actuator' },
    ]
  }
];

export default function SpringBootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 font-sans selection:bg-primary-500/30 flex flex-col">
      <Header />
      
      <div className="flex flex-1 relative">
        <CourseSidebar courseTitle="Spring Boot" modules={springBootModules} />
        
        <main className="flex-1 w-full md:w-[calc(100vw-256px)] min-h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
