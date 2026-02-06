'use client';

import { useState } from 'react';
import Link from 'next/link';

type TimePeriod = '7d' | '30d' | '90d' | 'all';

export default function StatisticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('30d');

  const stats = {
    totalTests: 147,
    totalTime: '12h 34m',
    avgWpm: 78,
    avgAccuracy: 96.2,
    bestWpm: 112,
    totalCharacters: 45230,
    testsThisWeek: 23,
    streak: 7,
  };

  const recentTests = [
    { date: 'Today', wpm: 85, accuracy: 97, mode: 'Time 60s' },
    { date: 'Today', wpm: 78, accuracy: 95, mode: 'Words 50' },
    { date: 'Yesterday', wpm: 92, accuracy: 98, mode: 'Time 30s' },
    { date: 'Yesterday', wpm: 75, accuracy: 94, mode: 'Code JS' },
    { date: '2 days ago', wpm: 88, accuracy: 96, mode: 'Time 60s' },
    { date: '2 days ago', wpm: 82, accuracy: 97, mode: 'Words 100' },
  ];

  const languageStats = [
    { lang: 'JavaScript', tests: 45, avgWpm: 62, color: 'from-yellow-400 to-yellow-600' },
    { lang: 'Python', tests: 32, avgWpm: 68, color: 'from-blue-400 to-blue-600' },
    { lang: 'TypeScript', tests: 28, avgWpm: 58, color: 'from-blue-500 to-blue-700' },
    { lang: 'HTML/CSS', tests: 22, avgWpm: 72, color: 'from-orange-400 to-orange-600' },
  ];

  const weeklyData = [
    { day: 'Mon', tests: 5, wpm: 72 },
    { day: 'Tue', tests: 8, wpm: 78 },
    { day: 'Wed', tests: 3, wpm: 75 },
    { day: 'Thu', tests: 6, wpm: 82 },
    { day: 'Fri', tests: 4, wpm: 85 },
    { day: 'Sat', tests: 10, wpm: 80 },
    { day: 'Sun', tests: 7, wpm: 88 },
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
              <Link href="/dashboard" className="text-dark-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/statistics" className="text-primary-400 font-medium">Statistics</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Your <span className="gradient-text">Statistics</span>
            </h1>
            <p className="text-dark-400">Detailed insights into your typing performance</p>
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-2 glass rounded-xl p-1">
            {(['7d', '30d', '90d', 'all'] as TimePeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  period === p ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Time' : p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-2xl p-6">
            <div className="text-dark-400 text-sm mb-2">Tests Completed</div>
            <div className="text-3xl font-bold text-white">{stats.totalTests}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-dark-400 text-sm mb-2">Total Practice Time</div>
            <div className="text-3xl font-bold text-primary-400">{stats.totalTime}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-dark-400 text-sm mb-2">Best WPM</div>
            <div className="text-3xl font-bold text-success-400">{stats.bestWpm}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-dark-400 text-sm mb-2">Day Streak 🔥</div>
            <div className="text-3xl font-bold text-accent-400">{stats.streak}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* WPM & Accuracy Cards */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dark-400">Average WPM</div>
              <span className="text-xl">⌨️</span>
            </div>
            <div className="text-5xl font-bold text-primary-400 mb-2">{stats.avgWpm}</div>
            <div className="text-sm text-success-400">+5 from last month</div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dark-400">Average Accuracy</div>
              <span className="text-xl">🎯</span>
            </div>
            <div className="text-5xl font-bold text-success-400 mb-2">{stats.avgAccuracy}%</div>
            <div className="text-sm text-success-400">+1.2% from last month</div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dark-400">Characters Typed</div>
              <span className="text-xl">📊</span>
            </div>
            <div className="text-5xl font-bold text-secondary-400 mb-2">{(stats.totalCharacters / 1000).toFixed(1)}K</div>
            <div className="text-sm text-dark-500">{stats.totalCharacters.toLocaleString()} total</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity Chart */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Activity</h2>
            <div className="flex items-end justify-between h-40 gap-2">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-primary-400">{data.wpm}</span>
                  <div 
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${(data.tests / 10) * 100}px`,
                      background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
                    }}
                  />
                  <span className="text-xs text-dark-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Typing Stats */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Code Typing by Language</h2>
            <div className="space-y-4">
              {languageStats.map((lang) => (
                <div key={lang.lang}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white">{lang.lang}</span>
                    <span className="text-dark-400 text-sm">{lang.avgWpm} WPM avg</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                      style={{ width: `${(lang.tests / 45) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-dark-500 mt-1">{lang.tests} tests</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Tests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Mode</th>
                  <th className="text-right py-3 px-4 text-dark-400 font-medium">WPM</th>
                  <th className="text-right py-3 px-4 text-dark-400 font-medium">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((test, i) => (
                  <tr key={i} className="border-b border-dark-800/50 hover:bg-dark-800/30">
                    <td className="py-3 px-4 text-dark-300">{test.date}</td>
                    <td className="py-3 px-4 text-white">{test.mode}</td>
                    <td className="py-3 px-4 text-right font-mono text-primary-400">{test.wpm}</td>
                    <td className="py-3 px-4 text-right font-mono text-success-400">{test.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
