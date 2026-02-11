'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface CodePracticeProps {
  code: string;
  language: string;
  title?: string;
  onComplete?: (stats: TestStats) => void;
}

export interface TestStats {
  wpm: number;
  accuracy: number;
  time: number;
  totalChars: number;
  correctChars: number;
}

export default function CodePractice({ code, language, title, onComplete }: CodePracticeProps) {
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stats, setStats] = useState<TestStats | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const resetTest = () => {
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setCurrentIndex(0);
    setElapsedTime(0);
    setStats(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  // Reset when code changes
  useEffect(() => {
    resetTest();
  }, [code]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  const calculateStats = useCallback(() => {
    if (!startTime) return;

    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const correctChars = userInput.split('').filter((char, i) => char === code[i]).length;
    const totalTyped = userInput.length;

    const wpm = Math.round((correctChars / 5) / timeInMinutes) || 0;
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
    const timeSeconds = Math.round((endTime - startTime) / 1000);

    const result = {
      wpm,
      accuracy,
      time: timeSeconds,
      totalChars: totalTyped,
      correctChars
    };

    setStats(result);
    if (onComplete) onComplete(result);
  }, [startTime, userInput, code, onComplete]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    if (isFinished) return;

    setUserInput(value);
    setCurrentIndex(value.length);

    if (value.length >= code.length) {
      setIsFinished(true);
      calculateStats();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = userInput.substring(0, start) + '    ' + userInput.substring(end);
      setUserInput(newValue);
      
      // We need to manually trigger the update logic since onChange won't fire
      if (!isStarted) {
        setIsStarted(true);
        setStartTime(Date.now());
      }
      setCurrentIndex(newValue.length);
      
      // Defer selection update
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };



  const getSyntaxColor = (char: string) => {
    if (/[{}()\[\]]/.test(char)) return 'text-secondary-400';
    if (/['"`;]/.test(char)) return 'text-accent-400';
    if (/[0-9]/.test(char)) return 'text-warning-400';
    if (/[=<>!+\-*/%&|^~]/.test(char)) return 'text-error-400';
    return 'text-dark-300';
  };

  const renderChar = (char: string, index: number) => {
    let className = 'transition-colors duration-75 whitespace-pre ';
    
    if (index < currentIndex) {
      if (userInput[index] === char) {
        className += 'text-success-400';
      } else {
        className += 'text-error-400 bg-error-500/20';
      }
    } else if (index === currentIndex) {
      className += 'bg-primary-500/50 text-white animate-pulse';
    } else {
      className += getSyntaxColor(char);
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  return (
    <div className="w-full">
      {/* Title & Stats Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">⌨️</span>
            {title || 'Code Practice'}
          </h3>
          <p className="text-dark-400 text-sm">Type the code exactly as shown below</p>
        </div>

        {(isStarted || isFinished) && (
          <div className="flex items-center gap-6 bg-dark-900 border border-dark-800 rounded-xl px-6 py-3">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-white">{elapsedTime}s</div>
              <div className="text-xs text-dark-500">Time</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-mono font-bold ${stats ? 'text-secondary-400' : 'text-dark-400'}`}>
                {stats ? stats.wpm : Math.round((userInput.length / 5) / (elapsedTime / 60)) || 0}
              </div>
              <div className="text-xs text-dark-500">WPM</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-mono font-bold ${stats ? 'text-success-400' : 'text-dark-400'}`}>
                {stats ? stats.accuracy : 100}%
              </div>
              <div className="text-xs text-dark-500">Accuracy</div>
            </div>
          </div>
        )}
      </div>

      <div className="relative group">
        {/* Editor Container */}
        <div 
          className="relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-dark-700 font-mono text-sm md:text-base leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Header */}
          <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-dark-700 select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error-500"></div>
              <div className="w-3 h-3 rounded-full bg-warning-500"></div>
              <div className="w-3 h-3 rounded-full bg-success-500"></div>
            </div>
            <span className="ml-4 text-xs text-dark-400">{language}</span>
          </div>

          {/* Code Content */}
          <div className="p-6 overflow-x-auto min-h-[300px] relative">
            <pre className="relative z-10 pointer-events-none">
              <code>{code.split('').map((char, i) => renderChar(char, i))}</code>
            </pre>
            
            {!isStarted && !isFinished && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-950/40 backdrop-blur-[2px] z-20 pointer-events-none">
                <div className="bg-dark-900/90 border border-dark-700 px-6 py-3 rounded-xl shadow-xl text-dark-300 animate-bounce">
                  Click to start typing...
                </div>
              </div>
            )}
            
            {/* Success Overlay */}
            {isFinished && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-950/80 backdrop-blur-[2px] z-30 animate-fade-in">
                <div className="text-center bg-dark-900 border border-success-500/30 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Great Job!</h3>
                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <div className="text-secondary-400 font-bold text-xl">{stats?.wpm}</div>
                      <div className="text-xs text-dark-500">WPM</div>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <div className="text-success-400 font-bold text-xl">{stats?.accuracy}%</div>
                      <div className="text-xs text-dark-500">Accuracy</div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetTest(); }}
                    className="btn-primary w-full py-2 rounded-lg"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none z-0 p-6 font-mono bg-transparent text-transparent caret-transparent"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
