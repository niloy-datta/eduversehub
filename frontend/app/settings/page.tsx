'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    soundEffects: true,
    keyboardSounds: false,
    smoothCaret: true,
    caretStyle: 'line',
    fontSize: 'medium',
    fontFamily: 'mono',
    showLiveWpm: true,
    showLiveAccuracy: true,
    showTimer: true,
    stopOnError: false,
    language: 'bn',
    difficulty: 'medium',
  });

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
              <Link href="/settings" className="text-primary-400 font-medium">Settings</Link>
              <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">JD</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12 max-w-4xl">
        <h1 className="text-3xl font-display font-bold text-white mb-8">
          <span className="gradient-text">Settings</span>
        </h1>

        {/* Appearance */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎨</span> Appearance
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Theme</div>
                <div className="text-dark-400 text-sm">Choose your preferred theme</div>
              </div>
              <div className="flex gap-2">
                {['dark', 'light', 'system'].map((t) => (
                  <button
                    key={t}
                    onClick={() => updateSetting('theme', t)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize ${
                      settings.theme === t ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Font Size</div>
                <div className="text-dark-400 text-sm">Typing text size</div>
              </div>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateSetting('fontSize', s)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize ${
                      settings.fontSize === s ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Caret Style</div>
                <div className="text-dark-400 text-sm">Cursor appearance</div>
              </div>
              <div className="flex gap-2">
                {['line', 'block', 'underline'].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateSetting('caretStyle', c)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize ${
                      settings.caretStyle === c ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sound */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔊</span> Sound
          </h2>
          <div className="space-y-4">
            {[
              { key: 'soundEffects' as const, label: 'Sound Effects', desc: 'Enable completion and error sounds' },
              { key: 'keyboardSounds' as const, label: 'Keyboard Sounds', desc: 'Play sounds on each keypress' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-dark-400 text-sm">{item.desc}</div>
                </div>
                <button
                  onClick={() => updateSetting(item.key, !settings[item.key])}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    settings[item.key] ? 'bg-primary-500' : 'bg-dark-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                    settings[item.key] ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>⚙️</span> Behavior
          </h2>
          <div className="space-y-4">
            {[
              { key: 'smoothCaret' as const, label: 'Smooth Caret', desc: 'Animate cursor movement' },
              { key: 'showLiveWpm' as const, label: 'Live WPM', desc: 'Show WPM while typing' },
              { key: 'showLiveAccuracy' as const, label: 'Live Accuracy', desc: 'Show accuracy while typing' },
              { key: 'showTimer' as const, label: 'Show Timer', desc: 'Display countdown timer' },
              { key: 'stopOnError' as const, label: 'Stop on Error', desc: 'Pause until error is corrected' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-dark-400 text-sm">{item.desc}</div>
                </div>
                <button
                  onClick={() => updateSetting(item.key, !settings[item.key])}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    settings[item.key] ? 'bg-primary-500' : 'bg-dark-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                    settings[item.key] ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🌐</span> Language
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Interface Language</div>
              <div className="text-dark-400 text-sm">Choose display language</div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="px-4 py-2 rounded-lg bg-dark-800 text-white border border-dark-700 focus:outline-none focus:border-primary-500"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button className="btn-outline">Reset to Default</button>
          <button className="btn-primary">Save Settings</button>
        </div>
      </main>
    </div>
  );
}
