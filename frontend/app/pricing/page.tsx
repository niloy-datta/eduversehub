'use client';

import { useState } from 'react';
import Link from 'next/link';

type BillingPeriod = 'monthly' | 'yearly';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Unlimited typing tests',
        'Basic statistics',
        'Beginner lessons',
        'Leaderboard access',
        'Community support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For serious typists',
      price: { monthly: 9, yearly: 7 },
      features: [
        'Everything in Free',
        'Advanced analytics',
        'All lessons unlocked',
        'Custom themes',
        'Ad-free experience',
        'Priority support',
        'Export data',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Team',
      description: 'For organizations',
      price: { monthly: 19, yearly: 15 },
      features: [
        'Everything in Pro',
        'Team dashboard',
        'Admin controls',
        'SSO integration',
        'Custom branding',
        'API access',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const testimonials = [
    { name: 'Alex M.', role: 'Software Developer', quote: 'EduVerse Hub helped me go from 60 to 120 WPM in just 3 months!', avatar: '👨‍💻' },
    { name: 'Sarah L.', role: 'Student', quote: 'The lessons are so well structured. I finally learned proper touch typing.', avatar: '👩‍🎓' },
    { name: 'Mike R.', role: 'Content Writer', quote: 'My productivity doubled after mastering fast typing. Worth every penny!', avatar: '✍️' },
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
              <Link href="/pricing" className="text-primary-400 font-medium">Pricing</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. Start free, upgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-2xl p-2">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                billingPeriod === 'monthly' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-success-500/20 text-success-400 text-xs">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-2 border-primary-500/50 scale-105'
                  : 'glass'
              }`}
              style={plan.highlighted ? { boxShadow: '0 0 40px rgba(14, 165, 233, 0.2)' } : {}}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-dark-400 text-sm mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${plan.price[billingPeriod]}
                </span>
                {plan.price[billingPeriod] > 0 && (
                  <span className="text-dark-500">/month</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-dark-300 text-sm">
                    <svg className="w-5 h-5 text-success-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'bg-dark-800 text-white hover:bg-dark-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <p className="text-dark-300 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-dark-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel anytime and your subscription will remain active until the end of the billing period.' },
              { q: 'Is there a free trial for Pro?', a: 'Yes! Pro comes with a 7-day free trial. No credit card required to start.' },
              { q: 'Can I switch plans later?', a: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings.' },
              { q: 'Do you offer student discounts?', a: 'Yes, students get 50% off Pro with a valid .edu email address.' },
            ].map((faq, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="text-white font-medium mb-2">{faq.q}</div>
                <div className="text-dark-400">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/pricing" className="text-primary-400">Pricing</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
