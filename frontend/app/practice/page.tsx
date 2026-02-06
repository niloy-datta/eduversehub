'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function PracticePage() {
  const [customText, setCustomText] = useState('');
  const [practiceText, setPracticeText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const sampleTexts = [
    'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet.',
    'Practice makes perfect. The more you type, the faster and more accurate you become.',
    'আমি বাংলায় গান গাই। বাংলা আমার মায়ের ভাষা।',
    'Programming is the art of telling a computer what to do. Every great developer started as a beginner.',
  ];

  const startPractice = useCallback((text?: string) => {
    const textToUse = text || customText || sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setPracticeText(textToUse);
    setUserInput('');
    setIsStarted(true);
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [customText, sampleTexts]);

  useEffect(() => {
    if (!isStarted) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isStarted]);

  const isComplete = userInput.length >= practiceText.length && practiceText.length > 0;

  const calculateWPM = () => {
    if (!startTime || elapsedTime === 0) return 0;
    const minutes = elapsedTime / 60;
    const words = userInput.split('').filter((char, i) => char === practiceText[i]).length / 5;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correct = userInput.split('').filter((char, i) => char === practiceText[i]).length;
    return Math.round((correct / userInput.length) * 100);
  };

  const reset = () => {
    setIsStarted(false);
    setUserInput('');
    setPracticeText('');
    setStartTime(null);
    setElapsedTime(0);
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
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/practice" className="text-primary-400 font-medium">Practice</Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Custom <span className="gradient-text">Practice</span>
          </h1>
          <p className="text-dark-400">আপনার নিজের টেক্সট দিয়ে প্র্যাকটিস করুন</p>
        </div>

        {!isStarted ? (
          <>
            {/* Custom Text Input */}
            <div className="glass rounded-2xl p-6 mb-6">
              <label className="block text-white font-medium mb-3">Enter Your Text</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type or paste any text you want to practice..."
                className="w-full h-40 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 resize-none"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-dark-500 text-sm">{customText.length} characters</span>
                <button
                  onClick={() => startPractice()}
                  disabled={customText.length < 10}
                  className="btn-primary disabled:opacity-50"
                >
                  Start Practice
                </button>
              </div>
            </div>

            {/* Sample Texts */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Or Try Sample Texts</h2>
              <div className="space-y-3">
                {sampleTexts.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => startPractice(text)}
                    className="w-full p-4 rounded-xl bg-dark-800/50 text-left hover:bg-dark-700/50 transition-colors"
                  >
                    <p className="text-dark-300 text-sm line-clamp-2">{text}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : isComplete ? (
          /* Results */
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-6">Practice Complete!</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-primary-400">{calculateWPM()}</div>
                <div className="text-dark-400">WPM</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-success-400">{calculateAccuracy()}%</div>
                <div className="text-dark-400">Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary-400">{elapsedTime}s</div>
                <div className="text-dark-400">Time</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => startPractice(practiceText)} className="btn-primary">
                Try Again
              </button>
              <button onClick={reset} className="btn-outline">
                New Text
              </button>
            </div>
          </div>
        ) : (
          /* Practice Mode */
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">{calculateWPM()}</div>
                <div className="text-dark-500 text-sm">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-400">{calculateAccuracy()}%</div>
                <div className="text-dark-500 text-sm">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">{elapsedTime}s</div>
                <div className="text-dark-500 text-sm">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{Math.round((userInput.length / practiceText.length) * 100)}%</div>
                <div className="text-dark-500 text-sm">Progress</div>
              </div>
            </div>

            {/* Text Display */}
            <div className="glass rounded-2xl p-6 mb-6 font-mono text-lg leading-relaxed">
              {practiceText.split('').map((char, i) => {
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

            {/* Input */}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-dark-800 border-2 border-primary-500 text-white font-mono text-lg focus:outline-none"
              placeholder="Start typing..."
              autoFocus
            />

            <div className="text-center mt-6">
              <button onClick={reset} className="text-dark-400 hover:text-white transition-colors">
                Cancel Practice
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
