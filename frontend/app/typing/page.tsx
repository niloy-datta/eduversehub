'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Sample typing texts
const typingTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Programming is the art of telling a computer what to do through a series of instructions. These instructions must be precise and logical.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Keep pushing forward every single day.",
  "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't even notice it.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle for mediocrity.",
];

type TestMode = 'time' | 'words';
type TestDuration = 15 | 30 | 60 | 120;
type WordCount = 10 | 25 | 50 | 100;

interface TestStats {
  wpm: number;
  accuracy: number;
  raw: number;
  characters: { correct: number; incorrect: number; extra: number; missed: number };
  time: number;
}

export default function TypingPage() {
  const [mode, setMode] = useState<TestMode>('time');
  const [duration, setDuration] = useState<TestDuration>(30);
  const [wordCount, setWordCount] = useState<WordCount>(25);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState<TestStats | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate text based on mode
  const generateText = useCallback(() => {
    const randomText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
    if (mode === 'words') {
      const words = randomText.split(' ');
      return words.slice(0, wordCount).join(' ');
    }
    return randomText + ' ' + typingTexts[Math.floor(Math.random() * typingTexts.length)];
  }, [mode, wordCount]);

  // Initialize text
  useEffect(() => {
    setText(generateText());
    setTimeLeft(duration);
  }, [mode, duration, wordCount, generateText]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        if (mode === 'time') {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsFinished(true);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, mode]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Calculate final stats
  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    const incorrectChars = errors.size;
    const totalTyped = userInput.length;
    
    const wpm = Math.round((correctChars / 5) / timeInMinutes);
    const raw = Math.round((totalTyped / 5) / timeInMinutes);
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
    
    setStats({
      wpm,
      accuracy,
      raw,
      characters: {
        correct: correctChars,
        incorrect: incorrectChars,
        extra: 0,
        missed: text.length - userInput.length,
      },
      time: Math.round((endTime - startTime) / 1000),
    });
  }, [startTime, userInput, text, errors]);

  // Handle input change
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }
    
    if (isFinished) return;
    
    setUserInput(value);
    setCurrentIndex(value.length);
    
    // Track errors
    const newErrors = new Set(errors);
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        newErrors.add(i);
      }
    }
    setErrors(newErrors);
    
    // Check if finished (words mode)
    if (mode === 'words' && value.length >= text.length) {
      setIsFinished(true);
      calculateStats();
    }
  };

  // Reset test
  const resetTest = () => {
    setText(generateText());
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setStartTime(null);
    setCurrentIndex(0);
    setErrors(new Set());
    setStats(null);
    setElapsedTime(0);
    inputRef.current?.focus();
  };

  // Calculate live WPM
  const getLiveWPM = () => {
    if (!isStarted || elapsedTime === 0) return 0;
    const timeInMinutes = elapsedTime / 60;
    if (timeInMinutes < 0.01) return 0;
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    return Math.round((correctChars / 5) / timeInMinutes);
  };

  // Calculate live accuracy
  const getLiveAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    return Math.round((correctChars / userInput.length) * 100);
  };

  // Render character with appropriate styling
  const renderChar = (char: string, index: number) => {
    let className = 'transition-colors duration-75 ';
    
    if (index < currentIndex) {
      if (userInput[index] === char) {
        className += 'text-success-400';
      } else {
        className += 'text-error-400 bg-error-500/20';
      }
    } else if (index === currentIndex) {
      className += 'text-primary-400 border-l-2 border-primary-400 animate-pulse';
    } else {
      className += 'text-dark-500';
    }
    
    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
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
              <Link href="/typing" className="text-primary-400 font-medium">
                Typing
              </Link>
              <Link href="/code-typing" className="text-dark-400 hover:text-white transition-colors">
                Code
              </Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">
                Lessons
              </Link>
              <Link href="/leaderboard" className="text-dark-400 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        {/* Mode Selection */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {/* Test Mode */}
          <div className="flex items-center gap-4 glass rounded-2xl p-2">
            <button
              onClick={() => { setMode('time'); resetTest(); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === 'time' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-dark-400 hover:text-white'
              }`}
              style={mode === 'time' ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                time
              </span>
            </button>
            <button
              onClick={() => { setMode('words'); resetTest(); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === 'words' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-dark-400 hover:text-white'
              }`}
              style={mode === 'words' ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                words
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-dark-700" />

          {/* Duration/Word Count Selection */}
          <div className="flex items-center gap-2 glass rounded-2xl p-2">
            {mode === 'time' ? (
              <>
                {([15, 30, 60, 120] as TestDuration[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDuration(d); setTimeLeft(d); resetTest(); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      duration === d 
                        ? 'bg-secondary-500 text-white' 
                        : 'text-dark-400 hover:text-white'
                    }`}
                    style={duration === d ? {boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)'} : {}}
                  >
                    {d}
                  </button>
                ))}
              </>
            ) : (
              <>
                {([10, 25, 50, 100] as WordCount[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => { setWordCount(w); resetTest(); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      wordCount === w 
                        ? 'bg-secondary-500 text-white' 
                        : 'text-dark-400 hover:text-white'
                    }`}
                    style={wordCount === w ? {boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)'} : {}}
                  >
                    {w}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Stats Display (during test) */}
        {isStarted && !isFinished && (
          <div className="flex items-center justify-center gap-12 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-primary-400">
                {mode === 'time' ? timeLeft : getLiveWPM()}
              </div>
              <div className="text-sm text-dark-500 mt-1">
                {mode === 'time' ? 'seconds' : 'wpm'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-secondary-400">
                {getLiveWPM()}
              </div>
              <div className="text-sm text-dark-500 mt-1">wpm</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-accent-400">
                {getLiveAccuracy()}%
              </div>
              <div className="text-sm text-dark-500 mt-1">accuracy</div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {isFinished && stats && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <div className="glass rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold gradient-text mb-2">
                    {stats.wpm}
                  </div>
                  <div className="text-dark-400">wpm</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-success-400 mb-2">
                    {stats.accuracy}%
                  </div>
                  <div className="text-dark-400">accuracy</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-secondary-400 mb-2">
                    {stats.raw}
                  </div>
                  <div className="text-dark-400">raw</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-accent-400 mb-2">
                    {stats.time}s
                  </div>
                  <div className="text-dark-400">time</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={resetTest}
                  className="btn-primary flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
              
              {/* Character breakdown */}
              <div className="mt-8 pt-6 border-t border-dark-700">
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                    <span className="text-dark-400">correct: {stats.characters.correct}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error-500" />
                    <span className="text-dark-400">incorrect: {stats.characters.incorrect}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-dark-500" />
                    <span className="text-dark-400">missed: {stats.characters.missed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing Area */}
        {!isFinished && (
          <div
            ref={containerRef}
            className="relative max-w-4xl mx-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Hidden input */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInput}
              className="absolute opacity-0 w-full h-full cursor-text"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            
            {/* Text display */}
            <div className="glass rounded-3xl p-8 md:p-12">
              <p className="text-2xl md:text-3xl font-mono leading-relaxed tracking-wide select-none">
                {text.split('').map((char, index) => renderChar(char, index))}
              </p>
              
              {!isStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 backdrop-blur-sm rounded-3xl">
                  <div className="text-center">
                    <div className="text-dark-400 mb-2">Click or start typing to begin</div>
                    <div className="text-sm text-dark-600">
                      {mode === 'time' ? `${duration} second test` : `${wordCount} words`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={resetTest}
            className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors p-3 rounded-xl hover:bg-dark-800"
            title="Restart (Tab + Enter)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-dark-600 text-sm">
            <span className="text-dark-500">Pro tip:</span> Press{' '}
            <kbd className="px-2 py-1 text-xs bg-dark-800 rounded text-dark-400 border border-dark-700">Tab</kbd>
            {' '}+{' '}
            <kbd className="px-2 py-1 text-xs bg-dark-800 rounded text-dark-400 border border-dark-700">Enter</kbd>
            {' '}to quickly restart the test
          </p>
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
