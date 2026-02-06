import Link from 'next/link';

export default function PrivacyPage() {
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
              <span className="text-xl font-display font-bold text-white">EduVerse Hub</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-dark-400 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-dark-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-dark-400 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-white mb-8">
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p className="text-dark-400 mb-8">Last updated: February 7, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-dark-300 mb-4">We collect information you provide directly:</p>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information (username, avatar)</li>
              <li>Typing test results and statistics</li>
              <li>Quiz scores and learning progress</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-dark-300 mb-4">We use collected data to:</p>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>Provide and improve our services</li>
              <li>Track your learning progress</li>
              <li>Display personalized statistics and recommendations</li>
              <li>Send important updates about your account</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="text-dark-300">
              We implement industry-standard security measures to protect your data. Your password is encrypted and stored securely. We never share your personal information with third parties without your consent.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">4. Cookies</h2>
            <p className="text-dark-300">
              We use cookies to maintain your session, remember your preferences, and improve your experience. You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="text-dark-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">6. Contact Us</h2>
            <p className="text-dark-300">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@eduversehub.com" className="text-primary-400 hover:underline">
                privacy@eduversehub.com
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="text-primary-400">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
