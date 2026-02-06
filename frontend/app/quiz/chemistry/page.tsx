'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const chemistryQuestions: Question[] = [
  { question: 'পানির রাসায়নিক সংকেত কী?', options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], correctAnswer: 0, explanation: 'পানির রাসায়নিক সংকেত H₂O। এতে ২টি হাইড্রোজেন ও ১টি অক্সিজেন পরমাণু আছে।' },
  { question: 'কার্বন ডাই-অক্সাইডের সংকেত কী?', options: ['CO', 'CO₂', 'C₂O', 'CO₃'], correctAnswer: 1, explanation: 'CO₂ হল কার্বন ডাই-অক্সাইড। এতে ১টি কার্বন ও ২টি অক্সিজেন পরমাণু আছে।' },
  { question: 'pH স্কেলে ৭ মানে কী?', options: ['অম্লীয়', 'ক্ষারীয়', 'নিরপেক্ষ', 'তীব্র অম্ল'], correctAnswer: 2, explanation: 'pH ৭ মানে নিরপেক্ষ। ৭ এর কম অম্লীয় এবং ৭ এর বেশি ক্ষারীয়।' },
  { question: 'সোডিয়াম ক্লোরাইডের সাধারণ নাম কী?', options: ['চিনি', 'লবণ', 'সোডা', 'চুন'], correctAnswer: 1, explanation: 'NaCl বা সোডিয়াম ক্লোরাইডের সাধারণ নাম হল লবণ বা খাবার লবণ।' },
  { question: 'পর্যায় সারণিতে মোট কতটি মৌল আছে?', options: ['92', '108', '118', '120'], correctAnswer: 2, explanation: 'বর্তমানে পর্যায় সারণিতে ১১৮টি মৌল আছে।' },
  { question: 'অক্সিজেনের পারমাণবিক সংখ্যা কত?', options: ['6', '7', '8', '16'], correctAnswer: 2, explanation: 'অক্সিজেনের পারমাণবিক সংখ্যা ৮। এতে ৮টি প্রোটন আছে।' },
  { question: 'সালফিউরিক অ্যাসিডের সংকেত কী?', options: ['HCl', 'HNO₃', 'H₂SO₄', 'H₃PO₄'], correctAnswer: 2, explanation: 'সালফিউরিক অ্যাসিডের সংকেত H₂SO₄। এটি একটি শক্তিশালী অ্যাসিড।' },
  { question: 'ইলেকট্রন কোথায় থাকে?', options: ['নিউক্লিয়াসে', 'কক্ষপথে', 'প্রোটনে', 'নিউট্রনে'], correctAnswer: 1, explanation: 'ইলেকট্রন নিউক্লিয়াসের চারপাশে কক্ষপথে বা শেলে থাকে।' },
  { question: 'ক্যালসিয়াম কার্বোনেটের সাধারণ নাম কী?', options: ['লবণ', 'চুনাপাথর', 'সোডা', 'জিপসাম'], correctAnswer: 1, explanation: 'CaCO₃ বা ক্যালসিয়াম কার্বোনেটের সাধারণ নাম চুনাপাথর।' },
  { question: 'আয়রনের প্রতীক কী?', options: ['Ir', 'Fe', 'In', 'I'], correctAnswer: 1, explanation: 'আয়রন বা লোহার প্রতীক Fe (Latin: Ferrum থেকে)।' },
];

type Difficulty = 'easy' | 'medium' | 'hard';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ChemistryQuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<'menu' | 'quiz' | 'results'>('menu');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<{correct: boolean}[]>([]);

  const numQuestions = useMemo(() => 
    difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10
  , [difficulty]);

  const startQuiz = () => {
    const q = shuffleArray(chemistryQuestions).slice(0, numQuestions);
    setQuestions(q);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(30);
    setAnswers([]);
    setGameState('quiz');
  };

  useEffect(() => {
    if (gameState !== 'quiz' || showAnswer) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft, showAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, { correct: isCorrect }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(30);
      } else {
        setGameState('results');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-dark-950">
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
              <Link href="/quiz" className="text-dark-400 hover:text-white transition-colors">All Quizzes</Link>
              <Link href="/quiz/chemistry" className="text-primary-400 font-medium">Chemistry</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {gameState === 'menu' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-5xl mx-auto mb-6">
              🧪
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">
              রসায়ন <span className="gradient-text">Quiz</span>
            </h1>
            <p className="text-dark-400 mb-8">SSC Chemistry - রাসায়নিক সংকেত, pH, মৌল ইত্যাদি</p>

            <div className="flex justify-center gap-4 mb-8">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-3 rounded-xl font-medium capitalize ${
                    difficulty === d ? 'bg-primary-500 text-white' : 'glass text-dark-400'
                  }`}
                >
                  {d === 'easy' ? 'Easy (5)' : d === 'medium' ? 'Medium (8)' : 'Hard (10)'}
                </button>
              ))}
            </div>

            <button onClick={startQuiz} className="btn-primary text-lg px-12 py-4">
              Start Quiz
            </button>
          </div>
        )}

        {gameState === 'quiz' && questions.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-dark-400">Question {currentQuestion + 1}/{questions.length}</span>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                timeLeft <= 10 ? 'bg-error-500/20 text-error-400' : 'bg-dark-800 text-white'
              }`}>{timeLeft}</div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">{questions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, i) => {
                  let cls = 'glass text-white hover:bg-dark-700';
                  if (showAnswer) {
                    if (i === questions[currentQuestion].correctAnswer) cls = 'bg-success-500/20 border-2 border-success-500 text-success-400';
                    else if (i === selectedAnswer) cls = 'bg-error-500/20 border-2 border-error-500 text-error-400';
                    else cls = 'glass text-dark-500';
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={showAnswer}
                      className={`w-full p-4 rounded-xl font-medium text-left ${cls}`}>
                      {String.fromCharCode(2453 + i)}. {opt}
                    </button>
                  );
                })}
              </div>
              {showAnswer && (
                <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                  <p className="text-dark-300">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'results' && (
          <div className="max-w-xl mx-auto text-center glass rounded-3xl p-12">
            <div className="text-6xl mb-6">{score >= questions.length * 0.7 ? '🏆' : '📚'}</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {score >= questions.length * 0.7 ? 'অসাধারণ!' : 'আরো চেষ্টা করুন!'}
            </h2>
            <div className="text-5xl font-bold gradient-text mb-6">{score}/{questions.length}</div>
            <div className="flex justify-center gap-2 mb-8">
              {answers.map((a, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  a.correct ? 'bg-success-500/20 text-success-400' : 'bg-error-500/20 text-error-400'
                }`}>{i+1}</div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={startQuiz} className="btn-primary">Try Again</button>
              <Link href="/quiz" className="btn-outline">Other Quizzes</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
