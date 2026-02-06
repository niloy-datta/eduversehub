'use client';

import Link from 'next/link';

interface Activity {
  id: string;
  type: 'test' | 'lesson' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

const recentActivity: Activity[] = [
  { id: '1', type: 'test', title: 'Typing Test Completed', description: 'Scored 85 WPM with 97% accuracy', time: '2 hours ago', icon: '⌨️' },
  { id: '2', type: 'lesson', title: 'Completed Top Row Keys', description: 'Finished all 10 exercises', time: '5 hours ago', icon: '📚' },
  { id: '3', type: 'achievement', title: 'Speed Demon Unlocked', description: 'Reached 80 WPM for the first time', time: '1 day ago', icon: '🏆' },
  { id: '4', type: 'test', title: 'Code Typing - JavaScript', description: 'Scored 62 WPM with 94% accuracy', time: '2 days ago', icon: '💻' },
  { id: '5', type: 'lesson', title: 'Started Home Row Keys', description: 'Completed 5/8 exercises', time: '3 days ago', icon: '📚' },
];

const achievements: Achievement[] = [
  { id: '1', title: 'First Steps', description: 'Complete your first typing test', icon: '🎯', unlocked: true },
  { id: '2', title: 'Speed Demon', description: 'Reach 80 WPM', icon: '⚡', unlocked: true },
  { id: '3', title: 'Perfectionist', description: 'Get 100% accuracy', icon: '💯', unlocked: true },
  { id: '4', title: 'Code Master', description: 'Complete 10 code typing tests', icon: '💻', unlocked: false, progress: 40 },
  { id: '5', title: 'Marathon Runner', description: 'Type for 1 hour total', icon: '🏃', unlocked: false, progress: 65 },
  { id: '6', title: 'Polyglot', description: 'Complete tests in 5 languages', icon: '🌍', unlocked: false, progress: 20 },
];

const weeklyData = [
  { day: 'Mon', wpm: 72 },
  { day: 'Tue', wpm: 78 },
  { day: 'Wed', wpm: 75 },
  { day: 'Thu', wpm: 82 },
  { day: 'Fri', wpm: 85 },
  { day: 'Sat', wpm: 80 },
  { day: 'Sun', wpm: 88 },
];

export default function DashboardPage() {
  const maxWpm = Math.max(...weeklyData.map(d => d.wpm));

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
              <Link href="/leaderboard" className="text-dark-400 hover:text-white transition-colors">Leaderboard</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/dashboard" className="text-primary-400 font-medium">Dashboard</Link>
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">John</span>! 👋
          </h1>
          <p className="text-dark-400">Track your progress and keep improving your typing skills.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-dark-400 text-sm">Best WPM</span>
              <span className="text-2xl">🚀</span>
            </div>
            <div className="text-4xl font-bold text-primary-400 mb-1">88</div>
            <div className="text-xs text-success-400">+5 from last week</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-dark-400 text-sm">Avg Accuracy</span>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-4xl font-bold text-success-400 mb-1">96%</div>
            <div className="text-xs text-success-400">+2% from last week</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-dark-400 text-sm">Tests Taken</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-4xl font-bold text-secondary-400 mb-1">47</div>
            <div className="text-xs text-dark-500">12 this week</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-dark-400 text-sm">Global Rank</span>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-4xl font-bold text-accent-400 mb-1">#234</div>
            <div className="text-xs text-success-400">↑ 15 positions</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Progress</h2>
            <div className="flex items-end justify-between h-48 gap-3">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-sm text-primary-400 font-medium">{data.wpm}</span>
                  <div 
                    className="w-full rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${(data.wpm / maxWpm) * 150}px`,
                      background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
                    }}
                  />
                  <span className="text-xs text-dark-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/typing" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors">
                <span className="text-2xl">⌨️</span>
                <div>
                  <div className="text-white font-medium">Typing Test</div>
                  <div className="text-xs text-dark-500">Test your speed</div>
                </div>
              </Link>
              <Link href="/code-typing" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors">
                <span className="text-2xl">💻</span>
                <div>
                  <div className="text-white font-medium">Code Typing</div>
                  <div className="text-xs text-dark-500">Practice coding</div>
                </div>
              </Link>
              <Link href="/lessons" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="text-white font-medium">Continue Lesson</div>
                  <div className="text-xs text-dark-500">Top Row Keys (75%)</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-dark-800/30 transition-colors">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium">{activity.title}</div>
                    <div className="text-sm text-dark-500">{activity.description}</div>
                  </div>
                  <div className="text-xs text-dark-600 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Achievements</h2>
              <span className="text-sm text-dark-500">3/6 unlocked</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/20' 
                      : 'bg-dark-800/30 border-dark-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-2xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </span>
                    <div className="text-sm font-medium text-white">{achievement.title}</div>
                  </div>
                  <div className="text-xs text-dark-500 mb-2">{achievement.description}</div>
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div className="progress-bar h-1">
                      <div className="progress-fill" style={{ width: `${achievement.progress}%` }} />
                    </div>
                  )}
                </div>
              ))}
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
