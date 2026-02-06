'use client';

import { useState } from 'react';
import Link from 'next/link';

type TimePeriod = 'daily' | 'weekly' | 'alltime';
type Mode = 'typing' | 'code';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  wpm: number;
  accuracy: number;
  tests: number;
  change: number; // positive = moved up, negative = moved down
}

const generateLeaderboardData = (): LeaderboardEntry[] => {
  const usernames = [
    'SpeedTyper', 'KeyboardNinja', 'TypeMaster', 'CodeWizard', 'FastFingers',
    'TypingPro', 'QuickKeys', 'SwiftCoder', 'RapidType', 'ProTypist',
    'CodeRunner', 'KeyStorm', 'TypeRacer', 'WordMaster', 'KeyChamp',
    'TypeLord', 'CodeHero', 'SpeedKing', 'KeyboardKing', 'TypingAce',
  ];
  
  return usernames.map((username, i) => ({
    rank: i + 1,
    username,
    avatar: ['🐱', '🦊', '🐸', '🦉', '🐙', '🦋', '🐝', '🦄', '🐺', '🦁', '🐯', '🐨', '🐼', '🐧', '🦈', '🦅', '🦚', '🐢', '🦩', '🐳'][i],
    wpm: 150 - i * 5 + Math.floor(Math.random() * 5),
    accuracy: 99 - Math.floor(i * 0.3),
    tests: 500 - i * 20 + Math.floor(Math.random() * 50),
    change: Math.floor(Math.random() * 10) - 5,
  }));
};

export default function LeaderboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly');
  const [mode, setMode] = useState<Mode>('typing');
  const [leaderboardData] = useState(generateLeaderboardData);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return <span className="text-2xl">🥇</span>;
      case 2: return <span className="text-2xl">🥈</span>;
      case 3: return <span className="text-2xl">🥉</span>;
      default: return <span className="text-lg font-bold text-dark-400">#{rank}</span>;
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <span className="text-success-400 text-sm">↑{change}</span>;
    } else if (change < 0) {
      return <span className="text-error-400 text-sm">↓{Math.abs(change)}</span>;
    }
    return <span className="text-dark-500 text-sm">-</span>;
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
              <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                EduVerse Hub
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/code-typing" className="text-dark-400 hover:text-white transition-colors">Code</Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
              <Link href="/leaderboard" className="text-primary-400 font-medium">Leaderboard</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Global <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Compete with typists from around the world. Climb the ranks and prove your speed!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-4xl mb-3 mx-auto border-4 border-dark-800">
              {leaderboardData[1].avatar}
            </div>
            <div className="text-2xl mb-1">🥈</div>
            <div className="text-white font-bold">{leaderboardData[1].username}</div>
            <div className="text-primary-400 font-mono text-lg">{leaderboardData[1].wpm} WPM</div>
            <div className="h-24 w-28 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white/80">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center -mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-5xl mb-3 mx-auto border-4 border-yellow-400 shadow-lg" style={{boxShadow: '0 0 30px rgba(234, 179, 8, 0.5)'}}>
              {leaderboardData[0].avatar}
            </div>
            <div className="text-3xl mb-1">🥇</div>
            <div className="text-white font-bold text-lg">{leaderboardData[0].username}</div>
            <div className="text-primary-400 font-mono text-xl">{leaderboardData[0].wpm} WPM</div>
            <div className="h-32 w-32 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/80">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-4xl mb-3 mx-auto border-4 border-dark-800">
              {leaderboardData[2].avatar}
            </div>
            <div className="text-2xl mb-1">🥉</div>
            <div className="text-white font-bold">{leaderboardData[2].username}</div>
            <div className="text-primary-400 font-mono text-lg">{leaderboardData[2].wpm} WPM</div>
            <div className="h-20 w-28 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white/80">3</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {/* Mode Filter */}
          <div className="flex items-center gap-2 glass rounded-2xl p-2">
            {(['typing', 'code'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  mode === m
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
                style={mode === m ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
              >
                {m === 'typing' ? '⌨️ Typing' : '💻 Code'}
              </button>
            ))}
          </div>

          {/* Time Period Filter */}
          <div className="flex items-center gap-2 glass rounded-2xl p-2">
            {(['daily', 'weekly', 'alltime'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timePeriod === period
                    ? 'bg-secondary-500 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
                style={timePeriod === period ? {boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)'} : {}}
              >
                {period === 'daily' ? 'Today' : period === 'weekly' ? 'This Week' : 'All Time'}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-4 px-6 text-dark-400 font-medium text-sm">Rank</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-medium text-sm">User</th>
                  <th className="text-right py-4 px-6 text-dark-400 font-medium text-sm">WPM</th>
                  <th className="text-right py-4 px-6 text-dark-400 font-medium text-sm">Accuracy</th>
                  <th className="text-right py-4 px-6 text-dark-400 font-medium text-sm">Tests</th>
                  <th className="text-right py-4 px-6 text-dark-400 font-medium text-sm">Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr 
                    key={entry.rank} 
                    className={`border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors ${
                      entry.rank <= 3 ? 'bg-gradient-to-r from-primary-500/5 to-transparent' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      {getRankBadge(entry.rank)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{entry.avatar}</span>
                        <span className="text-white font-medium">{entry.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-primary-400 font-mono font-bold">{entry.wpm}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-success-400 font-mono">{entry.accuracy}%</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-dark-400 font-mono">{entry.tests}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {getChangeIndicator(entry.change)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="mt-8 glass rounded-2xl p-6 border-2 border-primary-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <div className="text-white font-bold text-lg">Your Ranking</div>
                <div className="text-dark-400">Keep practicing to climb higher!</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400">#234</div>
                <div className="text-xs text-dark-500">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">88</div>
                <div className="text-xs text-dark-500">Best WPM</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-400">96%</div>
                <div className="text-xs text-dark-500">Accuracy</div>
              </div>
              <Link href="/typing" className="btn-primary">
                Challenge Now
              </Link>
            </div>
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
