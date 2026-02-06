import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Tests Completed', value: '2M+' },
    { label: 'Countries', value: '150+' },
    { label: 'Languages', value: '10+' },
  ];

  const team = [
    { name: 'Sarah Chen', role: 'Founder & CEO', avatar: '👩‍💻', bio: 'Former Google engineer passionate about education' },
    { name: 'Marcus Johnson', role: 'CTO', avatar: '👨‍💻', bio: 'Ex-Meta engineer with 10+ years experience' },
    { name: 'Emily Rodriguez', role: 'Head of Design', avatar: '👩‍🎨', bio: 'Award-winning UX designer' },
    { name: 'David Kim', role: 'Lead Developer', avatar: '🧑‍💻', bio: 'Full-stack wizard and typing enthusiast' },
  ];

  const values = [
    { icon: '🎯', title: 'Excellence', description: 'We strive for the highest quality in everything we create' },
    { icon: '🤝', title: 'Community', description: 'Building a supportive global community of learners' },
    { icon: '🚀', title: 'Innovation', description: 'Constantly pushing boundaries with new features' },
    { icon: '💡', title: 'Accessibility', description: 'Making typing education available to everyone' },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-800/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'}}>
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                EduVerse Hub
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
              <Link href="/about" className="text-primary-400 font-medium">About</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            About <span className="gradient-text">EduVerse Hub</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-3xl mx-auto">
            We&apos;re on a mission to make typing education fun, engaging, and accessible to everyone around the world.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-dark-800/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Story</h2>
            <p className="text-dark-400 text-lg mb-6">
              EduVerse Hub was born in 2024 from a simple observation: typing is one of the most important skills in the digital age, yet most learning platforms are boring and outdated.
            </p>
            <p className="text-dark-400 text-lg mb-6">
              We set out to create something different—a platform that makes improving your typing skills as engaging as playing a game. With modern design, gamification elements, and a supportive community, we&apos;ve helped thousands of users transform their typing abilities.
            </p>
            <p className="text-dark-400 text-lg">
              Today, we&apos;re proud to serve learners from over 150 countries, from students just learning to type to professionals looking to boost their productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-900/50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-dark-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="glass rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 text-sm mb-2">{member.role}</p>
                <p className="text-dark-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-dark-400 mb-8">Join thousands of learners improving their typing skills every day.</p>
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-primary-400">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
