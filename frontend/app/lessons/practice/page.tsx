'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface KeyData {
  key: string;
  label: string;
  width?: string;
  finger: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky' | 'thumb';
}

interface Lesson {
  id: number;
  title: string;
  titleBn: string;
  description: string;
  keys: string[];
  exercises: string[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Home Row - J, F, and Space',
    titleBn: 'হোম রো - J, F এবং স্পেস',
    description: 'Learn the home row keys with your index fingers',
    keys: ['j', 'f', ' '],
    exercises: ['jjj fff jjf ffj jfj fjf', 'j f j f j f j f j f', 'jj ff jj ff jf jf fj fj'],
  },
  {
    id: 2,
    title: 'Home Row - D and K',
    titleBn: 'হোম রো - D এবং K',
    description: 'Add D and K to your practice',
    keys: ['d', 'k', 'j', 'f'],
    exercises: ['ddd kkk ddk kkd', 'jdk fkd djk kfj', 'dd kk jj ff dk fj'],
  },
  {
    id: 3,
    title: 'Home Row - S and L',
    titleBn: 'হোম রো - S এবং L',
    description: 'Practice S and L with ring fingers',
    keys: ['s', 'l', 'd', 'k', 'j', 'f'],
    exercises: ['sss lll ssl lls', 'sdk lkj fds', 'ss ll dd kk jj ff'],
  },
  {
    id: 4,
    title: 'Home Row - A and ;',
    titleBn: 'হোম রো - A এবং ;',
    description: 'Complete the home row with pinky fingers',
    keys: ['a', ';', 's', 'l', 'd', 'k', 'j', 'f'],
    exercises: ['aaa ;;; aa;; ;;aa', 'asdf jkl; asdf jkl;', 'aa ss dd ff jj kk ll ;;'],
  },
  {
    id: 5,
    title: 'Top Row - E and I',
    titleBn: 'টপ রো - E এবং I',
    description: 'Reach up to E and I',
    keys: ['e', 'i', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    exercises: ['eee iii eei iie', 'die fie lie sie', 'feed lead seal deal'],
  },
];

const keyboardLayout: KeyData[][] = [
  [
    { key: '`', label: '`', finger: 'left-pinky' },
    { key: '1', label: '1', finger: 'left-pinky' },
    { key: '2', label: '2', finger: 'left-ring' },
    { key: '3', label: '3', finger: 'left-middle' },
    { key: '4', label: '4', finger: 'left-index' },
    { key: '5', label: '5', finger: 'left-index' },
    { key: '6', label: '6', finger: 'right-index' },
    { key: '7', label: '7', finger: 'right-index' },
    { key: '8', label: '8', finger: 'right-middle' },
    { key: '9', label: '9', finger: 'right-ring' },
    { key: '0', label: '0', finger: 'right-pinky' },
    { key: '-', label: '-', finger: 'right-pinky' },
    { key: '=', label: '+', finger: 'right-pinky' },
    { key: 'Backspace', label: 'Delete', width: 'w-24', finger: 'right-pinky' },
  ],
  [
    { key: 'Tab', label: 'Tab', width: 'w-16', finger: 'left-pinky' },
    { key: 'q', label: 'Q', finger: 'left-pinky' },
    { key: 'w', label: 'W', finger: 'left-ring' },
    { key: 'e', label: 'E', finger: 'left-middle' },
    { key: 'r', label: 'R', finger: 'left-index' },
    { key: 't', label: 'T', finger: 'left-index' },
    { key: 'y', label: 'Y', finger: 'right-index' },
    { key: 'u', label: 'U', finger: 'right-index' },
    { key: 'i', label: 'I', finger: 'right-middle' },
    { key: 'o', label: 'O', finger: 'right-ring' },
    { key: 'p', label: 'P', finger: 'right-pinky' },
    { key: '[', label: '[', finger: 'right-pinky' },
    { key: ']', label: ']', finger: 'right-pinky' },
    { key: '\\', label: '\\', width: 'w-16', finger: 'right-pinky' },
  ],
  [
    { key: 'CapsLock', label: 'Caps', width: 'w-20', finger: 'left-pinky' },
    { key: 'a', label: 'A', finger: 'left-pinky' },
    { key: 's', label: 'S', finger: 'left-ring' },
    { key: 'd', label: 'D', finger: 'left-middle' },
    { key: 'f', label: 'F', finger: 'left-index' },
    { key: 'g', label: 'G', finger: 'left-index' },
    { key: 'h', label: 'H', finger: 'right-index' },
    { key: 'j', label: 'J', finger: 'right-index' },
    { key: 'k', label: 'K', finger: 'right-middle' },
    { key: 'l', label: 'L', finger: 'right-ring' },
    { key: ';', label: ';', finger: 'right-pinky' },
    { key: "'", label: "'", finger: 'right-pinky' },
    { key: 'Enter', label: 'Enter', width: 'w-24', finger: 'right-pinky' },
  ],
  [
    { key: 'Shift', label: 'Shift', width: 'w-28', finger: 'left-pinky' },
    { key: 'z', label: 'Z', finger: 'left-pinky' },
    { key: 'x', label: 'X', finger: 'left-ring' },
    { key: 'c', label: 'C', finger: 'left-middle' },
    { key: 'v', label: 'V', finger: 'left-index' },
    { key: 'b', label: 'B', finger: 'left-index' },
    { key: 'n', label: 'N', finger: 'right-index' },
    { key: 'm', label: 'M', finger: 'right-index' },
    { key: ',', label: ',', finger: 'right-middle' },
    { key: '.', label: '.', finger: 'right-ring' },
    { key: '/', label: '/', finger: 'right-pinky' },
    { key: 'ShiftRight', label: 'Shift', width: 'w-32', finger: 'right-pinky' },
  ],
  [
    { key: 'Ctrl', label: 'Ctrl', width: 'w-16', finger: 'left-pinky' },
    { key: 'Alt', label: 'Alt', width: 'w-12', finger: 'left-pinky' },
    { key: 'Cmd', label: 'Cmd', width: 'w-12', finger: 'left-pinky' },
    { key: ' ', label: 'Space', width: 'w-72', finger: 'thumb' },
    { key: 'CmdRight', label: 'Cmd', width: 'w-12', finger: 'right-pinky' },
    { key: 'AltRight', label: 'Alt', width: 'w-12', finger: 'right-pinky' },
    { key: 'CtrlRight', label: 'Ctrl', width: 'w-16', finger: 'right-pinky' },
  ],
];

const fingerColors: Record<string, string> = {
  'left-pinky': 'bg-rose-400',
  'left-ring': 'bg-orange-400',
  'left-middle': 'bg-yellow-400',
  'left-index': 'bg-lime-400',
  'right-index': 'bg-cyan-400',
  'right-middle': 'bg-blue-400',
  'right-ring': 'bg-violet-400',
  'right-pinky': 'bg-pink-400',
  'thumb': 'bg-emerald-400',
};

const fingerNames: Record<string, string> = {
  'left-pinky': 'Left Pinky',
  'left-ring': 'Left Ring',
  'left-middle': 'Left Middle',
  'left-index': 'Left Index',
  'right-index': 'Right Index',
  'right-middle': 'Right Middle',
  'right-ring': 'Right Ring',
  'right-pinky': 'Right Pinky',
  'thumb': 'Thumb',
};

export default function LessonPracticePage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [typedKeys, setTypedKeys] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'practice' | 'complete'>('intro');
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const lesson = lessons[currentLesson];
  const currentKey = lesson.keys[currentKeyIndex];
  const exercise = lesson.exercises[currentScreen];

  const getKeyFinger = (key: string): string => {
    for (const row of keyboardLayout) {
      const found = row.find(k => k.key.toLowerCase() === key.toLowerCase());
      if (found) return found.finger;
    }
    return 'thumb';
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setPressedKey(key);
    
    setTimeout(() => setPressedKey(null), 150);

    if (phase === 'intro') {
      if (key === currentKey.toLowerCase()) {
        if (currentKeyIndex < lesson.keys.length - 1) {
          setCurrentKeyIndex(prev => prev + 1);
        } else {
          setPhase('practice');
          setCurrentKeyIndex(0);
        }
      }
    } else if (phase === 'practice') {
      const expected = exercise[typedKeys.length];
      if (expected && key === expected.toLowerCase()) {
        setTypedKeys(prev => [...prev, key]);
        if (typedKeys.length + 1 >= exercise.length) {
          // Exercise complete
          if (currentScreen < lesson.exercises.length - 1) {
            setCurrentScreen(prev => prev + 1);
            setTypedKeys([]);
          } else {
            setPhase('complete');
          }
        }
      } else if (expected) {
        setErrors(prev => prev + 1);
      }
    }
  }, [phase, currentKey, currentKeyIndex, lesson, exercise, typedKeys, currentScreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setCurrentScreen(0);
      setCurrentKeyIndex(0);
      setTypedKeys([]);
      setErrors(0);
      setPhase('intro');
    }
  };

  const resetLesson = () => {
    setCurrentScreen(0);
    setCurrentKeyIndex(0);
    setTypedKeys([]);
    setErrors(0);
    setPhase('intro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      {/* Header */}
      <header className="bg-sky-500 text-white py-3">
        <div className="container-custom flex items-center justify-between">
          <Link href="/lessons" className="flex items-center gap-2 text-white/80 hover:text-white">
            <span>←</span> Back to Lessons
          </Link>
          <div className="text-center">
            <span className="font-medium">{lesson.title}</span>
            <span className="mx-2">•</span>
            <span>Screen {currentScreen + 1} of {lesson.exercises.length + lesson.keys.length}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="hover:text-white/80">🔊 Sounds</button>
            <button className="hover:text-white/80">⌨️ Keyboard</button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Mascot and Instructions */}
        <div className="flex items-start gap-8 mb-8">
          {/* Mascot */}
          <div className="w-40 h-40 bg-sky-300 rounded-lg flex items-center justify-center shadow-lg">
            <div className="text-6xl">💻</div>
          </div>

          {/* Instructions Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 text-center">
            {phase === 'intro' && (
              <>
                <p className="text-gray-600 mb-4">
                  {fingerNames[getKeyFinger(currentKey)]} আঙ্গুল দিয়ে টাইপ করুন:
                </p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl text-gray-700">Type the</span>
                  <div className={`w-16 h-16 rounded-lg ${fingerColors[getKeyFinger(currentKey)]} flex items-center justify-center text-3xl font-bold text-gray-800 shadow-md`}>
                    {currentKey === ' ' ? '␣' : currentKey.toUpperCase()}
                  </div>
                  <span className="text-2xl text-gray-700">key</span>
                </div>
              </>
            )}
            
            {phase === 'practice' && (
              <div>
                <p className="text-gray-600 mb-4">Type the following text:</p>
                <div className="font-mono text-2xl tracking-widest">
                  {exercise.split('').map((char, i) => {
                    let className = 'text-gray-400';
                    if (i < typedKeys.length) {
                      className = 'text-green-500';
                    } else if (i === typedKeys.length) {
                      className = 'bg-sky-200 text-sky-700 px-1 rounded';
                    }
                    return (
                      <span key={i} className={className}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Errors: <span className="text-red-500 font-bold">{errors}</span>
                </p>
              </div>
            )}

            {phase === 'complete' && (
              <div className="py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">অসাধারণ!</h2>
                <p className="text-gray-600 mb-6">
                  You completed the lesson with {errors} errors!
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={resetLesson} className="px-6 py-3 bg-gray-200 rounded-xl font-medium hover:bg-gray-300">
                    Try Again
                  </button>
                  {currentLesson < lessons.length - 1 && (
                    <button onClick={nextLesson} className="px-6 py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600">
                      Next Lesson →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Keyboard */}
        <div className="bg-gray-100 rounded-3xl p-6 shadow-inner">
          {/* Keyboard */}
          <div className="flex flex-col items-center gap-1">
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((keyData) => {
                  const isTarget = phase === 'intro' && keyData.key.toLowerCase() === currentKey.toLowerCase();
                  const isNextChar = phase === 'practice' && 
                    exercise[typedKeys.length]?.toLowerCase() === keyData.key.toLowerCase();
                  const isPressed = pressedKey === keyData.key.toLowerCase();
                  const isHomeRow = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(keyData.key.toLowerCase());
                  
                  return (
                    <div
                      key={keyData.key}
                      className={`
                        ${keyData.width || 'w-12'} h-12 rounded-lg flex items-center justify-center
                        font-medium text-sm transition-all duration-100
                        ${isTarget || isNextChar
                          ? `${fingerColors[keyData.finger]} text-gray-800 scale-105 shadow-lg`
                          : isPressed
                            ? 'bg-gray-400 text-white scale-95'
                            : 'bg-white text-gray-700 shadow'
                        }
                        ${isHomeRow && !isTarget && !isNextChar ? 'border-b-4 border-gray-300' : ''}
                      `}
                    >
                      {keyData.label === 'Space' ? '' : keyData.label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Hands Indicator */}
          <div className="flex justify-center mt-6 gap-32">
            {/* Left Hand */}
            <div className="relative">
              <div className="text-6xl opacity-50">🤚</div>
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <span className="text-xs text-gray-500">Left Hand</span>
              </div>
            </div>
            {/* Right Hand */}
            <div className="relative">
              <div className="text-6xl opacity-50 transform scale-x-[-1]">🤚</div>
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <span className="text-xs text-gray-500">Right Hand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Finger Color Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {Object.entries(fingerColors).map(([finger, color]) => (
            <div key={finger} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${color}`}></div>
              <span className="text-sm text-gray-600">{fingerNames[finger]}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-200 py-4 mt-8">
        <div className="container-custom flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-700">EduVerse Hub</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-gray-700">T.O.S</Link>
          </div>
          <div>© 2026 EduVerse Hub</div>
        </div>
      </footer>
    </div>
  );
}
