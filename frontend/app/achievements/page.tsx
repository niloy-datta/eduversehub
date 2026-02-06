import Link from 'next/link';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'speed' | 'accuracy' | 'consistency' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

const achievements: Achievement[] = [
  // Speed
  { id: '1', title: 'First Steps', description: 'Complete your first typing test', icon: '🎯', category: 'speed', rarity: 'common', unlocked: true, unlockedDate: 'Jan 15, 2026' },
  { id: '2', title: 'Speed Demon', description: 'Reach 80 WPM', icon: '⚡', category: 'speed', rarity: 'common', unlocked: true, unlockedDate: 'Jan 20, 2026' },
  { id: '3', title: 'Lightning Fingers', description: 'Reach 100 WPM', icon: '🌩️', category: 'speed', rarity: 'rare', unlocked: true, unlockedDate: 'Feb 1, 2026' },
  { id: '4', title: 'Supersonic', description: 'Reach 120 WPM', icon: '🚀', category: 'speed', rarity: 'epic', unlocked: false, progress: 75 },
  { id: '5', title: 'Speed of Light', description: 'Reach 150 WPM', icon: '💫', category: 'speed', rarity: 'legendary', unlocked: false, progress: 45 },
  
  // Accuracy
  { id: '6', title: 'Perfectionist', description: 'Get 100% accuracy on a test', icon: '💯', category: 'accuracy', rarity: 'common', unlocked: true, unlockedDate: 'Jan 18, 2026' },
  { id: '7', title: 'Sharp Shooter', description: 'Get 100% accuracy 5 times', icon: '🎯', category: 'accuracy', rarity: 'rare', unlocked: true, unlockedDate: 'Jan 25, 2026' },
  { id: '8', title: 'No Mistakes', description: 'Complete 10 tests without errors', icon: '✨', category: 'accuracy', rarity: 'epic', unlocked: false, progress: 60 },
  
  // Consistency
  { id: '9', title: 'Daily Driver', description: 'Practice 7 days in a row', icon: '🔥', category: 'consistency', rarity: 'common', unlocked: true, unlockedDate: 'Jan 22, 2026' },
  { id: '10', title: 'Dedicated', description: 'Practice 30 days in a row', icon: '📅', category: 'consistency', rarity: 'rare', unlocked: false, progress: 23 },
  { id: '11', title: 'Unstoppable', description: 'Practice 100 days in a row', icon: '💎', category: 'consistency', rarity: 'legendary', unlocked: false, progress: 7 },
  
  // Milestones
  { id: '12', title: 'Getting Started', description: 'Complete 10 typing tests', icon: '📊', category: 'milestone', rarity: 'common', unlocked: true, unlockedDate: 'Jan 16, 2026' },
  { id: '13', title: 'Rising Star', description: 'Complete 100 typing tests', icon: '⭐', category: 'milestone', rarity: 'rare', unlocked: true, unlockedDate: 'Feb 5, 2026' },
  { id: '14', title: 'Veteran', description: 'Complete 500 typing tests', icon: '🏅', category: 'milestone', rarity: 'epic', unlocked: false, progress: 30 },
  { id: '15', title: 'Legend', description: 'Complete 1000 typing tests', icon: '👑', category: 'milestone', rarity: 'legendary', unlocked: false, progress: 15 },
  
  // Special
  { id: '16', title: 'Code Master', description: 'Complete tests in 5 programming languages', icon: '💻', category: 'special', rarity: 'rare', unlocked: false, progress: 60 },
  { id: '17', title: 'Night Owl', description: 'Practice after midnight', icon: '🦉', category: 'special', rarity: 'common', unlocked: true, unlockedDate: 'Jan 28, 2026' },
  { id: '18', title: 'Race Champion', description: 'Win 10 multiplayer races', icon: '🏆', category: 'special', rarity: 'epic', unlocked: false, progress: 40 },
];

export default function AchievementsPage() {
  const categories = ['all', 'speed', 'accuracy', 'consistency', 'milestone', 'special'] as const;
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500 border-gray-500/30';
      case 'rare': return 'from-blue-400 to-blue-600 border-blue-500/30';
      case 'epic': return 'from-purple-400 to-purple-600 border-purple-500/30';
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-500/30';
      default: return 'from-gray-400 to-gray-500 border-gray-500/30';
    }
  };

  const getRarityBadge = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'bg-gray-500/20 text-gray-400',
      rare: 'bg-blue-500/20 text-blue-400',
      epic: 'bg-purple-500/20 text-purple-400',
      legendary: 'bg-yellow-500/20 text-yellow-400',
    };
    return colors[rarity] || colors.common;
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
              <Link href="/dashboard" className="text-dark-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/achievements" className="text-primary-400 font-medium">Achievements</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Your <span className="gradient-text">Achievements</span>
          </h1>
          <p className="text-xl text-dark-400 mb-6">
            {unlockedCount} of {achievements.length} achievements unlocked
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {categories.slice(1).map((cat) => {
            const catAchievements = achievements.filter(a => a.category === cat);
            const unlocked = catAchievements.filter(a => a.unlocked).length;
            return (
              <div key={cat} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2 capitalize">{cat === 'speed' ? '⚡' : cat === 'accuracy' ? '🎯' : cat === 'consistency' ? '🔥' : cat === 'milestone' ? '⭐' : '✨'}</div>
                <div className="text-lg font-bold text-white capitalize">{cat}</div>
                <div className="text-sm text-dark-400">{unlocked}/{catAchievements.length}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-2xl p-6 border-2 transition-all ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}`
                  : 'bg-dark-900/50 border-dark-700/50 opacity-60'
              }`}
              style={achievement.unlocked && achievement.rarity === 'legendary' ? { boxShadow: '0 0 30px rgba(234, 179, 8, 0.3)' } : {}}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                  achievement.unlocked ? 'bg-white/10' : 'bg-dark-800 grayscale'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{achievement.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getRarityBadge(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-dark-300 mb-2">{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <p className="text-xs text-dark-400">Unlocked {achievement.unlockedDate}</p>
                  ) : achievement.progress !== undefined ? (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-dark-500">Progress</span>
                        <span className="text-dark-400">{achievement.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
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
