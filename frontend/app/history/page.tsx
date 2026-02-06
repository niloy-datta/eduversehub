'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TestResult {
  id: string;
  date: string;
  time: string;
  mode: string;
  wpm: number;
  accuracy: number;
  duration: string;
  characters: number;
}

const mockHistory: TestResult[] = [
  { id: '1', date: 'Today', time: '10:30 AM', mode: 'Time 60s', wpm: 85, accuracy: 97, duration: '1:00', characters: 425 },
  { id: '2', date: 'Today', time: '9:15 AM', mode: 'Words 50', wpm: 78, accuracy: 95, duration: '0:38', characters: 312 },
  { id: '3', date: 'Yesterday', time: '8:45 PM', mode: 'Code JS', wpm: 62, accuracy: 92, duration: '1:30', characters: 465 },
  { id: '4', date: 'Yesterday', time: '7:20 PM', mode: 'Time 30s', wpm: 92, accuracy: 98, duration: '0:30', characters: 230 },
  { id: '5', date: 'Yesterday', time: '6:00 PM', mode: 'Race', wpm: 88, accuracy: 96, duration: '0:45', characters: 396 },
  { id: '6', date: '2 days ago', time: '9:00 PM', mode: 'Time 60s', wpm: 82, accuracy: 94, duration: '1:00', characters: 410 },
  { id: '7', date: '2 days ago', time: '8:30 PM', mode: 'Words 100', wpm: 76, accuracy: 93, duration: '1:18', characters: 595 },
  { id: '8', date: '3 days ago', time: '7:45 PM', mode: 'Code Python', wpm: 58, accuracy: 91, duration: '2:00', characters: 580 },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<'all' | 'typing' | 'code' | 'race'>('all');

  const filteredHistory = mockHistory.filter(test => {
    if (filter === 'all') return true;
    if (filter === 'typing') return test.mode.includes('Time') || test.mode.includes('Words');
    if (filter === 'code') return test.mode.includes('Code');
    if (filter === 'race') return test.mode.includes('Race');
    return true;
  });

  const stats = {
    totalTests: mockHistory.length,
    avgWpm: Math.round(mockHistory.reduce((a, b) => a + b.wpm, 0) / mockHistory.length),
    avgAccuracy: (mockHistory.reduce((a, b) => a + b.accuracy, 0) / mockHistory.length).toFixed(1),
    bestWpm: Math.max(...mockHistory.map(t => t.wpm)),
  };

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
              <Link href="/dashboard" className="text-dark-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/history" className="text-primary-400 font-medium">History</Link>
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">JD</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Test <span className="gradient-text">History</span></h1>
            <p className="text-dark-400">আপনার সকল টাইপিং টেস্টের রেকর্ড</p>
          </div>
          <Link href="/statistics" className="btn-outline">View Statistics</Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalTests}</div>
            <div className="text-dark-400 text-sm">Total Tests</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary-400">{stats.avgWpm}</div>
            <div className="text-dark-400 text-sm">Avg WPM</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-success-400">{stats.avgAccuracy}%</div>
            <div className="text-dark-400 text-sm">Avg Accuracy</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent-400">{stats.bestWpm}</div>
            <div className="text-dark-400 text-sm">Best WPM</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'typing', 'code', 'race'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f ? 'bg-primary-500 text-white' : 'glass text-dark-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f === 'typing' ? '⌨️ Typing' : f === 'code' ? '💻 Code' : '🏎️ Race'}
            </button>
          ))}
        </div>

        {/* History Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-4 px-6 text-dark-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-dark-400 font-medium">Mode</th>
                <th className="text-right py-4 px-6 text-dark-400 font-medium">WPM</th>
                <th className="text-right py-4 px-6 text-dark-400 font-medium">Accuracy</th>
                <th className="text-right py-4 px-6 text-dark-400 font-medium">Duration</th>
                <th className="text-right py-4 px-6 text-dark-400 font-medium">Characters</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((test) => (
                <tr key={test.id} className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="text-white">{test.date}</div>
                    <div className="text-dark-500 text-sm">{test.time}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 rounded-lg bg-dark-800 text-dark-300 text-sm">{test.mode}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-lg text-primary-400">{test.wpm}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-success-400">{test.accuracy}%</span>
                  </td>
                  <td className="py-4 px-6 text-right text-dark-400">{test.duration}</td>
                  <td className="py-4 px-6 text-right text-dark-400">{test.characters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-dark-400">No tests found for this filter</p>
          </div>
        )}
      </main>
    </div>
  );
}
