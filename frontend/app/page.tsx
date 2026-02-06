import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>
                <span className="text-2xl font-bold text-white">E</span>
              </div>
              <span className="text-2xl font-display font-bold gradient-text">EduVerse Hub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="btn-ghost">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="py-20 md:py-32 text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-dark-300">Join 10,000+ learners worldwide</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 max-w-4xl mx-auto">
                Master{' '}
                <span className="gradient-text">Typing</span>
                {' '}& {' '}
                <span className="gradient-text">Programming</span>
                {' '}in One Place
              </h1>
              
              <p className="text-xl md:text-2xl text-dark-300 mb-10 max-w-3xl mx-auto">
                From beginner to pro. Learn typing, code typing, programming, and ace your exams with our gamified learning platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/typing" className="btn-primary text-lg px-8 py-4">
                  Start Typing Test
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/code-typing" className="btn-outline text-lg px-8 py-4">
                  Try Code Typing
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Active Users', value: '10K+' },
                  { label: 'Tests Completed', value: '100K+' },
                  { label: 'Lessons', value: '500+' },
                  { label: 'Avg WPM Gain', value: '+40' },
                ].map((stat, index) => (
                  <div key={index} className="card-glass p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-dark-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              A complete learning ecosystem designed to take you from beginner to job-ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⌨️',
                title: 'Typing Practice',
                description: 'Progressive typing tests with real-time WPM, accuracy tracking, and error analysis',
                color: 'primary',
              },
              {
                icon: '💻',
                title: 'Code Typing',
                description: 'Type real code in C, C++, Python, Java, JavaScript with syntax highlighting',
                color: 'secondary',
              },
              {
                icon: '📚',
                title: 'Programming Lessons',
                description: 'Structured learning path from basics to advanced with hands-on examples',
                color: 'accent',
              },
              {
                icon: '📝',
                title: 'Quizzes & Exams',
                description: 'SSC, HSC, BSc MCQs and programming quizzes with detailed analytics',
                color: 'primary',
              },
              {
                icon: '🎓',
                title: 'Certificates',
                description: 'Earn shareable certificates to showcase your achievements',
                color: 'secondary',
              },
              {
                icon: '🏆',
                title: 'Leaderboards',
                description: 'Compete globally and in Bangladesh. Track your progress with streaks',
                color: 'accent',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-hover p-8 group"
              >
                <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Follow our proven path to mastery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Start Typing', description: 'Begin with basic typing tests to build speed and accuracy' },
              { step: '02', title: 'Code Typing', description: 'Progress to typing real code snippets in your favorite language' },
              { step: '03', title: 'Learn Programming', description: 'Unlock lessons and master programming concepts' },
              { step: '04', title: 'Get Certified', description: 'Earn certificates and showcase your skills' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-950">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">
            Join thousands of learners improving their typing and programming skills every day
          </p>
          <Link href="/register" className="btn-primary text-lg px-10 py-5 inline-flex items-center">
            Get Started for Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>
                  <span className="text-lg font-bold text-white">E</span>
                </div>
                <span className="text-xl font-display font-bold text-white">EduVerse Hub</span>
              </div>
              <p className="text-dark-400 text-sm">
                Master typing and programming with our comprehensive learning platform.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li><Link href="/typing" className="hover:text-primary-400">Typing Tests</Link></li>
                <li><Link href="/code-typing" className="hover:text-primary-400">Code Typing</Link></li>
                <li><Link href="/lessons" className="hover:text-primary-400">Lessons</Link></li>
                <li><Link href="/quizzes" className="hover:text-primary-400">Quizzes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li><Link href="/dashboard" className="hover:text-primary-400">Dashboard</Link></li>
                <li><Link href="/leaderboard" className="hover:text-primary-400">Leaderboard</Link></li>
                <li><Link href="/certificates" className="hover:text-primary-400">Certificates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li><Link href="/about" className="hover:text-primary-400">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary-400">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-primary-400">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary-400">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-800 pt-8 text-center text-dark-500 text-sm">
            <p>&copy; 2026 EduVerse Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
