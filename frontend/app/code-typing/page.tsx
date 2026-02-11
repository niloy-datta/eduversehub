'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Code snippets by language
const codeSnippets = {
  javascript: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};`,
    `const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`,
  ],
  python: [
    `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    `class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    
    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BinaryTree(value)
            else:
                self.left.insert(value)`,
  ],
  java: [
    `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  ],
  cpp: [
    `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    `template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << max(10, 20) << endl;
    return 0;
}`,
  ],
  c: [
    `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("%d", factorial(5));
    return 0;
}`,
  ],
};

type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'c';

interface TestStats {
  wpm: number;
  accuracy: number;
  raw: number;
  characters: { correct: number; incorrect: number; extra: number; missed: number };
  time: number;
  language: Language;
}

export default function CodeTypingPage() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState<TestStats | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Generate code based on language
  const generateCode = useCallback(() => {
    const snippets = codeSnippets[language];
    return snippets[Math.floor(Math.random() * snippets.length)];
  }, [language]);

  // Initialize code
  useEffect(() => {
    setCode(generateCode());
  }, [language, generateCode]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Calculate final stats
  const calculateStats = useCallback(() => {
    if (!startTime) return;

    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const correctChars = userInput.split('').filter((char, i) => char === code[i]).length;
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
        missed: code.length - userInput.length,
      },
      time: Math.round((endTime - startTime) / 1000),
      language,
    });
  }, [startTime, userInput, code, errors, language]);

  // Handle input change
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      if (value[i] !== code[i]) {
        newErrors.add(i);
      }
    }
    setErrors(newErrors);

    // Check if finished
    if (value.length >= code.length) {
      setIsFinished(true);
      calculateStats();
    }
  };

  // Reset test
  const resetTest = () => {
    setCode(generateCode());
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
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
    const correctChars = userInput.split('').filter((char, i) => char === code[i]).length;
    return Math.round((correctChars / 5) / timeInMinutes);
  };

  // Calculate live accuracy
  const getLiveAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, i) => char === code[i]).length;
    return Math.round((correctChars / userInput.length) * 100);
  };

  // Get syntax color for character
  const getSyntaxColor = (char: string, context: string) => {
    // Simple syntax highlighting based on common patterns
    if (/[{}()\[\]]/.test(char)) return 'text-secondary-400';
    if (/['"`;]/.test(char)) return 'text-accent-400';
    if (/[0-9]/.test(char)) return 'text-warning-400';
    if (/[=<>!+\-*/%&|^~]/.test(char)) return 'text-error-400';
    return '';
  };

  // Render character with appropriate styling
  const renderChar = (char: string, index: number) => {
    let className = 'transition-colors duration-75 whitespace-pre ';
    const syntaxColor = getSyntaxColor(char, code);

    if (index < currentIndex) {
      if (userInput[index] === char) {
        className += 'text-success-400';
      } else {
        className += 'text-error-400 bg-error-500/20';
      }
    } else if (index === currentIndex) {
      className += 'bg-primary-500/30 text-white';
    } else {
      className += syntaxColor || 'text-dark-400';
    }

    // Handle special characters display
    if (char === '\n') {
      return (
        <span key={index}>
          <span className={className}>↵</span>
          <br />
        </span>
      );
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  const languageLabels: Record<Language, { name: string; icon: string }> = {
    javascript: { name: 'JavaScript', icon: '🟨' },
    python: { name: 'Python', icon: '🐍' },
    java: { name: 'Java', icon: '☕' },
    cpp: { name: 'C++', icon: '⚡' },
    c: { name: 'C', icon: '🔧' },
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-800/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 brand-mark">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                EduVerse Hub
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">
                Typing
              </Link>
              <Link href="/code-typing" className="text-primary-400 font-medium">
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
        {/* Language Selection */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 glass rounded-2xl p-2">
            {(Object.keys(codeSnippets) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  resetTest();
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  language === lang
                    ? 'language-pill-active'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <span>{languageLabels[lang].icon}</span>
                <span>{languageLabels[lang].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Display (during test) */}
        {isStarted && !isFinished && (
          <div className="flex items-center justify-center gap-12 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-primary-400">{elapsedTime}</div>
              <div className="text-sm text-dark-500 mt-1">seconds</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-secondary-400">{getLiveWPM()}</div>
              <div className="text-sm text-dark-500 mt-1">wpm</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-accent-400">{getLiveAccuracy()}%</div>
              <div className="text-sm text-dark-500 mt-1">accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-success-400">
                {Math.round((currentIndex / code.length) * 100)}%
              </div>
              <div className="text-sm text-dark-500 mt-1">progress</div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {isFinished && stats && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl">{languageLabels[stats.language].icon}</span>
                <span className="text-xl font-bold text-white">{languageLabels[stats.language].name}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold gradient-text mb-2">{stats.wpm}</div>
                  <div className="text-dark-400">wpm</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-success-400 mb-2">{stats.accuracy}%</div>
                  <div className="text-dark-400">accuracy</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-secondary-400 mb-2">{stats.raw}</div>
                  <div className="text-dark-400">raw</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-dark-800/50">
                  <div className="text-6xl font-mono font-bold text-accent-400 mb-2">{stats.time}s</div>
                  <div className="text-dark-400">time</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={resetTest} className="btn-primary flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
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

        {/* Code Typing Area */}
        {!isFinished && (
          <div className="relative max-w-4xl mx-auto cursor-text" onClick={() => inputRef.current?.focus()}>
            {/* Hidden textarea */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInput}
              className="absolute opacity-0 w-full h-full cursor-text resize-none"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Typing input"
            />

            {/* Code display */}
            <div className="glass rounded-3xl p-8 md:p-12">
              {/* Language badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">{languageLabels[language].icon}</span>
                <span className="text-sm font-medium text-dark-400">{languageLabels[language].name}</span>
              </div>

              {/* Code block */}
              <pre className="text-lg md:text-xl font-mono leading-relaxed select-none overflow-x-auto">
                <code>{code.split('').map((char, index) => renderChar(char, index))}</code>
              </pre>

              {!isStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 backdrop-blur-sm rounded-3xl">
                  <div className="text-center">
                    <div className="text-dark-400 mb-2">Click or start typing to begin</div>
                    <div className="text-sm text-dark-600">{languageLabels[language].name} code snippet</div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {isStarted && (
              <div className="mt-4">
                <progress className="progress-meter" value={currentIndex} max={code.length} />
              </div>
            )}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-dark-600 text-sm">
            <span className="text-dark-500">Tip:</span> Use{' '}
            <kbd className="px-2 py-1 text-xs bg-dark-800 rounded text-dark-400 border border-dark-700">Tab</kbd>
            {' '}to insert tabs and{' '}
            <kbd className="px-2 py-1 text-xs bg-dark-800 rounded text-dark-400 border border-dark-700">Enter</kbd>
            {' '}for new lines
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6 mt-12">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
