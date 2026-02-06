import Link from 'next/link';

export default function TermsPage() {
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
          </div>
        </div>
      </header>

      <main className="container-custom py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-white mb-8">
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p className="text-dark-400 mb-8">Last updated: February 7, 2026</p>

        <div className="space-y-8">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-dark-300">
              By accessing and using EduVerse Hub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">2. User Accounts</h2>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>You must be at least 13 years old to create an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must not share your account credentials with others</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">3. Acceptable Use</h2>
            <p className="text-dark-300 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to cheat or manipulate your typing scores</li>
              <li>Harass or abuse other users</li>
              <li>Attempt to access other users&apos; accounts</li>
              <li>Use automated tools or bots to interact with the service</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p className="text-dark-300">
              All content, features, and functionality on EduVerse Hub are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">5. Subscriptions and Payments</h2>
            <ul className="list-disc list-inside text-dark-400 space-y-2">
              <li>Pro subscriptions are billed monthly or annually</li>
              <li>Refunds are available within 7 days of purchase</li>
              <li>Prices may change with 30 days notice</li>
              <li>Free tier features may be limited at any time</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">6. Termination</h2>
            <p className="text-dark-300">
              We reserve the right to terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time through your account settings.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">7. Disclaimer</h2>
            <p className="text-dark-300">
              EduVerse Hub is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">8. Contact</h2>
            <p className="text-dark-300">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:legal@eduversehub.com" className="text-primary-400 hover:underline">
                legal@eduversehub.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-dark-800/50 py-6 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-primary-400">Terms</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
