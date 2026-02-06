'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Racer {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  wpm: number;
  isBot: boolean;
}

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog near the peaceful river bank on a warm summer day.",
  "Programming is the art of telling computers what to do through carefully crafted instructions and logic.",
  "Success is not final failure is not fatal it is the courage to continue that counts in the end.",
];

export default function RacePage() {
  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'racing' | 'finished'>('lobby');
  const [countdown, setCountdown] = useState(3);
  const [text] = useState(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [racers, setRacers] = useState<Racer[]>([
    { id: 'you', name: 'You', avatar: '🏎️', progress: 0, wpm: 0, isBot: false },
    { id: 'bot1', name: 'SpeedBot', avatar: '🤖', progress: 0, wpm: 85, isBot: true },
    { id: 'bot2', name: 'TypeMaster', avatar: '👾', progress: 0, wpm: 72, isBot: true },
    { id: 'bot3', name: 'QuickFingers', avatar: '🦾', progress: 0, wpm: 65, isBot: true },
  ]);

  const userProgress = (userInput.length / text.length) * 100;
  const isFinished = userInput.length >= text.length;

  // Calculate user WPM
  const calculateWPM = useCallback(() => {
    if (!startTime || elapsedTime === 0) return 0;
    const minutes = elapsedTime / 60;
    const words = userInput.split('').filter((char, i) => char === text[i]).length / 5;
    return Math.round(words / minutes);
  }, [startTime, elapsedTime, userInput, text]);

  // Start the race
  const startRace = () => {
    setGameState('countdown');
    setCountdown(3);
    setUserInput('');
    setElapsedTime(0);
    setStartTime(null);
    
    // Reset racer positions
    setRacers(prev => prev.map(r => ({ ...r, progress: 0, wpm: r.isBot ? r.wpm : 0 })));
  };

  // Countdown effect
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState('racing');
        setStartTime(Date.now());
      }
    }
  }, [gameState, countdown]);

  // Racing timer and bot movement
  useEffect(() => {
    if (gameState === 'racing' && !isFinished) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 0.1);
        
        // Move bots
        setRacers(prev => prev.map(racer => {
          if (!racer.isBot) {
            return { ...racer, progress: userProgress, wpm: calculateWPM() };
          }
          // Bot movement based on their WPM
          const charsPerSecond = (racer.wpm * 5) / 60;
          const newProgress = Math.min((charsPerSecond * elapsedTime / text.length) * 100, 100);
          return { ...racer, progress: newProgress };
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState, isFinished, userProgress, calculateWPM, elapsedTime, text.length]);

  // Check if race finished
  useEffect(() => {
    if (isFinished && gameState === 'racing') {
      setGameState('finished');
    }
  }, [isFinished, gameState]);

  // Handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'racing') return;
    setUserInput(e.target.value);
  };

  // Get rankings
  const rankings = [...racers].sort((a, b) => b.progress - a.progress);
  const userRank = rankings.findIndex(r => r.id === 'you') + 1;

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
              <Link href="/race" className="text-primary-400 font-medium">Race</Link>
              <Link href="/leaderboard" className="text-dark-400 hover:text-white transition-colors">Leaderboard</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Typing <span className="gradient-text">Race</span> 🏁
          </h1>
          <p className="text-xl text-dark-400">
            Compete against AI racers and prove your speed!
          </p>
        </div>

        {/* Race Track */}
        <div className="glass rounded-3xl p-8 mb-8">
          <div className="space-y-4 mb-8">
            {racers.map((racer, index) => (
              <div key={racer.id} className="flex items-center gap-4">
                <div className="w-8 text-center text-dark-500 font-mono">#{index + 1}</div>
                <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-2xl">
                  {racer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${racer.id === 'you' ? 'text-primary-400' : 'text-white'}`}>
                      {racer.name}
                      {racer.isBot && <span className="text-dark-500 text-xs ml-2">(Bot)</span>}
                    </span>
                    <span className="text-dark-400 text-sm font-mono">{Math.round(racer.wpm)} WPM</span>
                  </div>
                  <div className="h-3 bg-dark-800 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-100 ${
                        racer.id === 'you' 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                          : 'bg-dark-600'
                      }`}
                      style={{ width: `${racer.progress}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-100"
                      style={{ left: `calc(${racer.progress}% - 10px)` }}
                    >
                      {racer.avatar}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finish Line */}
          <div className="border-t-2 border-dashed border-dark-700 pt-4 flex justify-end">
            <span className="text-2xl">🏁</span>
          </div>
        </div>

        {/* Game State Display */}
        {gameState === 'lobby' && (
          <div className="text-center">
            <div className="glass rounded-3xl p-12 max-w-xl mx-auto">
              <div className="text-6xl mb-6">🏎️</div>
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Race?</h2>
              <p className="text-dark-400 mb-8">
                You&apos;ll be racing against 3 AI opponents. Type the text as fast as you can!
              </p>
              <button onClick={startRace} className="btn-primary text-lg px-8 py-3">
                Start Race
              </button>
            </div>
          </div>
        )}

        {gameState === 'countdown' && (
          <div className="text-center">
            <div className="text-9xl font-bold gradient-text animate-pulse">
              {countdown || 'GO!'}
            </div>
          </div>
        )}

        {gameState === 'racing' && (
          <div className="max-w-4xl mx-auto">
            {/* Text Display */}
            <div className="glass rounded-2xl p-6 mb-6 font-mono text-lg leading-relaxed">
              {text.split('').map((char, i) => {
                let className = 'text-dark-500';
                if (i < userInput.length) {
                  className = userInput[i] === char ? 'text-success-400' : 'text-error-400 bg-error-500/20';
                } else if (i === userInput.length) {
                  className = 'text-white bg-primary-500/30';
                }
                return (
                  <span key={i} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              className="w-full px-6 py-4 rounded-2xl bg-dark-800 border-2 border-primary-500 text-white font-mono text-lg focus:outline-none"
              placeholder="Start typing..."
              autoFocus
            />

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">{calculateWPM()}</div>
                <div className="text-dark-500 text-sm">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-400">{Math.round(userProgress)}%</div>
                <div className="text-dark-500 text-sm">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400">{elapsedTime.toFixed(1)}s</div>
                <div className="text-dark-500 text-sm">Time</div>
              </div>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center">
            <div className="glass rounded-3xl p-12 max-w-xl mx-auto">
              <div className="text-6xl mb-4">
                {userRank === 1 ? '🏆' : userRank === 2 ? '🥈' : userRank === 3 ? '🥉' : '🏁'}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {userRank === 1 ? "You Won!" : `You finished #${userRank}`}
              </h2>
              <p className="text-dark-400 mb-6">
                {userRank === 1 ? "Amazing performance!" : "Keep practicing to beat the bots!"}
              </p>

              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">{calculateWPM()}</div>
                  <div className="text-dark-500 text-sm">Final WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-400">{elapsedTime.toFixed(1)}s</div>
                  <div className="text-dark-500 text-sm">Time</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={startRace} className="btn-primary">
                  Race Again
                </button>
                <Link href="/leaderboard" className="btn-outline">
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
        )}
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
