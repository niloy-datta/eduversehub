'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'notifications'>('profile');
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('Aspiring speed typist 🚀 Currently working on hitting 100 WPM!');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // TODO: Implement actual save
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ] as const;

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
              <Link href="/dashboard" className="text-dark-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-primary-500">
                JD
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="glass rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-3xl">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-dark-800 border-2 border-dark-700 flex items-center justify-center text-white hover:bg-dark-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-white mb-1">{username}</h1>
                <p className="text-dark-400 mb-4">{email}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400 font-bold">88</span>
                    <span className="text-dark-500">Best WPM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success-400 font-bold">96%</span>
                    <span className="text-dark-500">Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary-400 font-bold">47</span>
                    <span className="text-dark-500">Tests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-400 font-bold">#234</span>
                    <span className="text-dark-500">Rank</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <Link href="/dashboard" className="btn-outline text-sm">
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
                style={activeTab === tab.id ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass rounded-3xl p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Edit Profile</h2>
                
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all resize-none"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>

                {/* Theme */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Dark Mode</div>
                    <div className="text-sm text-dark-500">Use dark theme across the app</div>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Sound Effects */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Sound Effects</div>
                    <div className="text-sm text-dark-500">Play sounds while typing</div>
                  </div>
                  <button className="w-12 h-6 bg-dark-700 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-dark-500 rounded-full" />
                  </button>
                </div>

                {/* Show WPM */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Live WPM Display</div>
                    <div className="text-sm text-dark-500">Show WPM while typing</div>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="mt-12 pt-6 border-t border-dark-700">
                  <h3 className="text-lg font-bold text-error-400 mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-error-500/20 bg-error-500/5">
                    <div>
                      <div className="text-white font-medium">Delete Account</div>
                      <div className="text-sm text-dark-500">Permanently delete your account and all data</div>
                    </div>
                    <button className="px-4 py-2 rounded-xl border border-error-500 text-error-400 hover:bg-error-500/10 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Email Notifications</div>
                    <div className="text-sm text-dark-500">Receive updates via email</div>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Weekly Report */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Weekly Progress Report</div>
                    <div className="text-sm text-dark-500">Get a summary of your progress every week</div>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Achievement Alerts */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Achievement Alerts</div>
                    <div className="text-sm text-dark-500">Get notified when you unlock achievements</div>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Leaderboard Updates */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                  <div>
                    <div className="text-white font-medium">Leaderboard Updates</div>
                    <div className="text-sm text-dark-500">Get notified when your rank changes</div>
                  </div>
                  <button className="w-12 h-6 bg-dark-700 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-dark-500 rounded-full" />
                  </button>
                </div>
              </div>
            )}
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
