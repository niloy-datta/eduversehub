'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type Subject = 'physics' | 'math' | 'higher-math' | 'biology';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Physics Questions
const physicsQuestions: Question[] = [
  { question: 'পদার্থের জড়তার পরিমাপ কোনটি?', options: ['ভর', 'ওজন', 'বল', 'গতি'], correctAnswer: 0, explanation: 'ভর হল পদার্থের জড়তার পরিমাপ। জড়তা হল বস্তুর স্থির বা গতিশীল অবস্থা বজায় রাখার ধর্ম।' },
  { question: 'গতির প্রথম সূত্র কার?', options: ['আইনস্টাইন', 'নিউটন', 'গ্যালিলিও', 'কেপলার'], correctAnswer: 1, explanation: 'গতির প্রথম সূত্র নিউটনের। এই সূত্র অনুযায়ী, বাহ্যিক বল প্রয়োগ না করলে স্থির বস্তু স্থিরই থাকবে এবং গতিশীল বস্তু সমবেগে চলতে থাকবে।' },
  { question: 'আলোর বেগ প্রতি সেকেন্ডে কত?', options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10⁴ m/s', '3×10¹⁰ m/s'], correctAnswer: 1, explanation: 'শূন্য মাধ্যমে আলোর বেগ প্রায় 3×10⁸ মিটার/সেকেন্ড বা প্রায় ৩ লক্ষ কিলোমিটার/সেকেন্ড।' },
  { question: 'বিদ্যুৎ প্রবাহের একক কোনটি?', options: ['ভোল্ট', 'ওহম', 'অ্যাম্পিয়ার', 'ওয়াট'], correctAnswer: 2, explanation: 'বিদ্যুৎ প্রবাহের SI একক হল অ্যাম্পিয়ার (A)। এটি প্রতি একক সময়ে প্রবাহিত চার্জের পরিমাণ।' },
  { question: 'ওহমের সূত্র কোনটি?', options: ['V = IR', 'V = I/R', 'V = I+R', 'V = I-R'], correctAnswer: 0, explanation: 'ওহমের সূত্র: V = IR, যেখানে V = বিভব পার্থক্য, I = বিদ্যুৎ প্রবাহ, R = রোধ।' },
  { question: 'শব্দ তরঙ্গ কোন ধরনের তরঙ্গ?', options: ['আড় তরঙ্গ', 'অনুদৈর্ঘ্য তরঙ্গ', 'তড়িৎচুম্বকীয় তরঙ্গ', 'স্থির তরঙ্গ'], correctAnswer: 1, explanation: 'শব্দ তরঙ্গ একটি অনুদৈর্ঘ্য তরঙ্গ বা longitudinal wave। এতে কণার স্পন্দন তরঙ্গের গতির দিকে হয়।' },
  { question: 'g এর মান কত?', options: ['9.8 m/s', '9.8 m/s²', '10 m/s', '10 m'], correctAnswer: 1, explanation: 'অভিকর্ষজ ত্বরণ g এর মান পৃথিবীপৃষ্ঠে প্রায় 9.8 m/s² বা প্রায় 10 m/s²।' },
  { question: 'তাপের SI একক কোনটি?', options: ['ক্যালরি', 'জুল', 'সেলসিয়াস', 'কেলভিন'], correctAnswer: 1, explanation: 'তাপ একটি শক্তি, তাই এর SI একক জুল (J)। ক্যালরি হল CGS একক।' },
  { question: 'প্রতিফলনের প্রথম সূত্র কী বলে?', options: ['আপতন কোণ = প্রতিফলন কোণ', 'আলো সরলরেখায় যায়', 'আলো বাঁকে', 'কিছুই না'], correctAnswer: 0, explanation: 'প্রতিফলনের প্রথম সূত্র: আপতন কোণ প্রতিফলন কোণের সমান।' },
  { question: 'চৌম্বক ক্ষেত্রের একক কোনটি?', options: ['টেসলা', 'ওয়েবার', 'হেনরি', 'ওহম'], correctAnswer: 0, explanation: 'চৌম্বক ক্ষেত্রের SI একক টেসলা (T)। 1 টেসলা = 1 Wb/m²।' },
];

// Math Questions
const mathQuestions: Question[] = [
  { question: 'x² - 9 এর উৎপাদক কী?', options: ['(x+3)(x+3)', '(x-3)(x-3)', '(x+3)(x-3)', '(x+9)(x-9)'], correctAnswer: 2, explanation: 'a² - b² = (a+b)(a-b) সূত্র অনুসারে, x² - 9 = x² - 3² = (x+3)(x-3)।' },
  { question: 'sin 30° এর মান কত?', options: ['0', '1/2', '1', '√3/2'], correctAnswer: 1, explanation: 'sin 30° = 1/2। এটি ত্রিকোণমিতির একটি মৌলিক মান।' },
  { question: 'log₁₀ 100 = ?', options: ['1', '2', '10', '100'], correctAnswer: 1, explanation: 'log₁₀ 100 = log₁₀ 10² = 2 × log₁₀ 10 = 2 × 1 = 2।' },
  { question: 'একটি বৃত্তের ব্যাস 14 cm হলে পরিধি কত?', options: ['44 cm', '22 cm', '88 cm', '28 cm'], correctAnswer: 0, explanation: 'পরিধি = πd = (22/7) × 14 = 44 cm।' },
  { question: '√144 = ?', options: ['11', '12', '13', '14'], correctAnswer: 1, explanation: '√144 = 12, কারণ 12 × 12 = 144।' },
  { question: '(a+b)² = ?', options: ['a²+b²', 'a²+2ab+b²', 'a²-2ab+b²', 'a²+ab+b²'], correctAnswer: 1, explanation: '(a+b)² = a² + 2ab + b²। এটি একটি গুরুত্বপূর্ণ বীজগণিতীয় সূত্র।' },
  { question: 'cos 60° এর মান কত?', options: ['0', '1/2', '1', '√3/2'], correctAnswer: 1, explanation: 'cos 60° = 1/2। মনে রাখুন: sin 30° = cos 60° = 1/2।' },
  { question: '3, 5, 7, 9, ... ধারাটির সাধারণ অন্তর কত?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'সাধারণ অন্তর = 5 - 3 = 2 বা 7 - 5 = 2।' },
  { question: 'tan 45° = ?', options: ['0', '1', '∞', '√3'], correctAnswer: 1, explanation: 'tan 45° = sin 45° / cos 45° = 1। এটি একটি গুরুত্বপূর্ণ ত্রিকোণমিতিক মান।' },
  { question: '২x + ৩ = ৭ হলে x = ?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: '2x + 3 = 7, 2x = 4, x = 2।' },
];

// Higher Math Questions  
const higherMathQuestions: Question[] = [
  { question: 'd/dx (sin x) = ?', options: ['cos x', '-cos x', 'sin x', '-sin x'], correctAnswer: 0, explanation: 'sin x এর derivative হল cos x। এটি ক্যালকুলাসের মৌলিক সূত্র।' },
  { question: '∫ cos x dx = ?', options: ['sin x + C', '-sin x + C', 'cos x + C', '-cos x + C'], correctAnswer: 0, explanation: 'cos x এর integration হল sin x + C, যেখানে C হল ধ্রুবক।' },
  { question: 'lim(x→0) (sin x)/x = ?', options: ['0', '1', '∞', 'অসংজ্ঞায়িত'], correctAnswer: 1, explanation: 'এটি একটি গুরুত্বপূর্ণ সীমা। L\'Hospital নিয়ম বা সিরিজ expansion দ্বারা দেখানো যায় এর মান 1।' },
  { question: 'd/dx (eˣ) = ?', options: ['xeˣ⁻¹', 'eˣ', 'e', 'xeˣ'], correctAnswer: 1, explanation: 'eˣ এর derivative হল eˣ নিজেই। এটি e এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য।' },
  { question: '∫ 1/x dx = ?', options: ['x + C', 'ln x + C', '1/x² + C', 'eˣ + C'], correctAnswer: 1, explanation: '1/x এর integration হল ln|x| + C বা log x + C।' },
  { question: 'i² = ? (যেখানে i = √-1)', options: ['1', '-1', 'i', '-i'], correctAnswer: 1, explanation: 'i = √(-1), তাই i² = (√-1)² = -1।' },
  { question: 'det(AB) = ?', options: ['det(A) + det(B)', 'det(A) × det(B)', 'det(A) - det(B)', 'det(A) / det(B)'], correctAnswer: 1, explanation: 'দুটি ম্যাট্রিক্সের গুণফলের নির্ণায়ক = তাদের নির্ণায়কদ্বয়ের গুণফল।' },
  { question: 'd/dx (ln x) = ?', options: ['x', '1/x', 'eˣ', 'ln x'], correctAnswer: 1, explanation: 'ln x এর derivative হল 1/x।' },
  { question: '∫₀¹ x² dx = ?', options: ['1', '1/2', '1/3', '1/4'], correctAnswer: 2, explanation: '∫x² dx = x³/3। সীমা 0 থেকে 1 প্রয়োগ করলে: 1³/3 - 0³/3 = 1/3।' },
  { question: 'Σ(n=1 to ∞) 1/n² = ?', options: ['∞', 'π²/6', '1', 'e'], correctAnswer: 1, explanation: 'এই ধারার যোগফল π²/6, এটি Basel problem নামে পরিচিত।' },
];

// Biology Questions
const biologyQuestions: Question[] = [
  { question: 'কোষের শক্তিঘর কোনটি?', options: ['রাইবোজোম', 'মাইটোকন্ড্রিয়া', 'নিউক্লিয়াস', 'গলগি বডি'], correctAnswer: 1, explanation: 'মাইটোকন্ড্রিয়াকে কোষের শক্তিঘর বলা হয় কারণ এখানে ATP তৈরি হয়।' },
  { question: 'DNA এর পূর্ণ রূপ কী?', options: ['Deoxyribonucleic Acid', 'Dinucleic Acid', 'Dual Nucleic Acid', 'Dioxynucleic Acid'], correctAnswer: 0, explanation: 'DNA = Deoxyribonucleic Acid। এটি জীবের বংশগতির মূল উপাদান।' },
  { question: 'সালোকসংশ্লেষণে কোন গ্যাস উৎপন্ন হয়?', options: ['CO₂', 'N₂', 'O₂', 'H₂'], correctAnswer: 2, explanation: 'সালোকসংশ্লেষণে গাছ CO₂ গ্রহণ করে এবং O₂ (অক্সিজেন) ত্যাগ করে।' },
  { question: 'মানুষের স্বাভাবিক রক্তচাপ কত?', options: ['80/120', '120/80', '100/60', '140/90'], correctAnswer: 1, explanation: 'স্বাভাবিক রক্তচাপ 120/80 mmHg। এখানে 120 হল সিস্টোলিক এবং 80 হল ডায়াস্টোলিক চাপ।' },
  { question: 'লোহিত রক্তকণিকায় কোন প্রোটিন থাকে?', options: ['মায়োগ্লোবিন', 'হিমোগ্লোবিন', 'কেরাটিন', 'ইনসুলিন'], correctAnswer: 1, explanation: 'হিমোগ্লোবিন লোহিত রক্তকণিকায় থাকে এবং অক্সিজেন বহন করে।' },
  { question: 'জীবের সবচেয়ে ছোট একক কোনটি?', options: ['টিস্যু', 'অঙ্গ', 'কোষ', 'অণু'], correctAnswer: 2, explanation: 'কোষ হল জীবের গঠন ও কার্যগত একক। এটি জীবনের সবচেয়ে ছোট একক।' },
  { question: 'ইনসুলিন কোন গ্রন্থি থেকে নিঃসৃত হয়?', options: ['থাইরয়েড', 'পিটুইটারি', 'অগ্ন্যাশয়', 'অ্যাড্রিনাল'], correctAnswer: 2, explanation: 'ইনসুলিন অগ্ন্যাশয়ের আইলেটস অফ ল্যাঙ্গারহ্যানস থেকে নিঃসৃত হয়।' },
  { question: 'মানুষের ক্রোমোজোম সংখ্যা কত?', options: ['23', '46', '44', '48'], correctAnswer: 1, explanation: 'মানুষের কোষে 46টি (23 জোড়া) ক্রোমোজোম থাকে।' },
  { question: 'পরাগায়ন কাকে বলে?', options: ['পরাগরেণু স্ত্রীকেশরে পড়া', 'বীজ অঙ্কুরোদগম', 'ফুল ফোটা', 'ফল পাকা'], correctAnswer: 0, explanation: 'পরাগরেণু পুংকেশর থেকে স্ত্রীকেশরের গর্ভমুণ্ডে স্থানান্তরকে পরাগায়ন বলে।' },
  { question: 'ভিটামিন C এর অভাবে কোন রোগ হয়?', options: ['রাতকানা', 'স্কার্ভি', 'রিকেট', 'বেরিবেরি'], correctAnswer: 1, explanation: 'ভিটামিন C এর অভাবে স্কার্ভি রোগ হয়। এতে মাড়ি ফুলে যায় ও রক্তপাত হয়।' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SubjectQuizPage() {
  const [subject, setSubject] = useState<Subject>('physics');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<'menu' | 'quiz' | 'results'>('menu');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<{question: number; correct: boolean}[]>([]);

  const subjectMap = useMemo(() => ({
    physics: { questions: physicsQuestions, name: 'পদার্থবিজ্ঞান', icon: '⚛️', color: 'from-blue-400 to-blue-600' },
    math: { questions: mathQuestions, name: 'গণিত', icon: '📐', color: 'from-green-400 to-green-600' },
    'higher-math': { questions: higherMathQuestions, name: 'উচ্চতর গণিত', icon: '∫', color: 'from-purple-400 to-purple-600' },
    biology: { questions: biologyQuestions, name: 'জীববিজ্ঞান', icon: '🧬', color: 'from-red-400 to-red-600' },
  }), []);

  const startQuiz = () => {
    const numQuestions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
    const q = shuffleArray(subjectMap[subject].questions).slice(0, numQuestions);
    setQuestions(q);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(30);
    setAnswers([]);
    setGameState('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswers(prev => [...prev, { question: currentQuestion, correct: isCorrect }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(30);
      } else {
        setGameState('results');
      }
    }, 3000);
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'quiz' || showAnswer) return;
    
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, showAnswer]);
    


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
              <Link href="/vocabulary" className="text-dark-400 hover:text-white transition-colors">Vocabulary</Link>
              <Link href="/quiz" className="text-primary-400 font-medium">Subject Quiz</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {gameState === 'menu' && (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                SSC <span className="gradient-text">Subject Quiz</span>
              </h1>
              <p className="text-xl text-dark-400 max-w-2xl mx-auto">
                পদার্থবিজ্ঞান, গণিত, উচ্চতর গণিত ও জীববিজ্ঞান পরীক্ষার প্রস্তুতি নিন
              </p>
            </div>

            {/* Subject Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {(Object.entries(subjectMap) as [Subject, typeof subjectMap.physics][]).map(([key, sub]) => (
                <button
                  key={key}
                  onClick={() => setSubject(key)}
                  className={`glass rounded-2xl p-6 text-center transition-all hover:scale-[1.02] ${
                    subject === key ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-3xl mx-auto mb-3`}>
                    {sub.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                  <p className="text-dark-500 text-sm">{sub.questions.length} questions</p>
                  {subject === key && (
                    <div className="mt-2 text-primary-400 text-sm font-medium">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="max-w-xl mx-auto mb-12">
              <h2 className="text-xl font-bold text-white text-center mb-6">Difficulty Level</h2>
              <div className="flex items-center gap-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-4 rounded-xl font-medium transition-all capitalize ${
                      difficulty === diff
                        ? 'bg-primary-500 text-white'
                        : 'glass text-dark-400 hover:text-white'
                    }`}
                    style={difficulty === diff ? {boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'} : {}}
                  >
                    {diff === 'easy' ? '🌱 Easy (5)' : diff === 'medium' ? '🌿 Medium (8)' : '🌳 Hard (10)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Start */}
            <div className="text-center">
              <button onClick={startQuiz} className="btn-primary text-lg px-12 py-4">
                Start Quiz
              </button>
            </div>
          </>
        )}

        {gameState === 'quiz' && questions.length > 0 && (
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className={`text-2xl`}>{subjectMap[subject].icon}</span>
                <span className="text-dark-400">{subjectMap[subject].name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dark-400">Score: <span className="text-primary-400 font-bold">{score}</span></span>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                  timeLeft <= 10 ? 'bg-error-500/20 text-error-400' : 'bg-dark-800 text-white'
                }`}>
                  {timeLeft}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 h-2 rounded-full ${
                    i < currentQuestion ? 'bg-primary-500' : i === currentQuestion ? 'bg-primary-400' : 'bg-dark-800'
                  }`}
                />
              ))}
            </div>

            {/* Question Card */}
            <div className="glass rounded-3xl p-8 mb-8">
              <div className="text-sm text-dark-500 mb-4">Question {currentQuestion + 1} of {questions.length}</div>
              <h2 className="text-2xl font-bold text-white mb-8">{questions[currentQuestion].question}</h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  let buttonClass = 'glass text-white hover:bg-dark-700';
                  
                  if (showAnswer) {
                    if (index === questions[currentQuestion].correctAnswer) {
                      buttonClass = 'bg-success-500/20 border-2 border-success-500 text-success-400';
                    } else if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
                      buttonClass = 'bg-error-500/20 border-2 border-error-500 text-error-400';
                    } else {
                      buttonClass = 'glass text-dark-500';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showAnswer}
                      className={`w-full p-4 rounded-xl font-medium text-left transition-all ${buttonClass}`}
                    >
                      <span className="font-mono mr-3 text-dark-500">{String.fromCharCode(2453 + index)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {showAnswer && (
                <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                  <div className="text-success-400 font-medium mb-2">ব্যাখ্যা:</div>
                  <p className="text-dark-300">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'results' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass rounded-3xl p-12">
              <div className="text-6xl mb-6">
                {score === questions.length ? '🏆' : score >= questions.length * 0.7 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {score === questions.length ? 'অসাধারণ!' : score >= questions.length * 0.7 ? 'খুব ভালো!' : score >= questions.length * 0.5 ? 'ভালো চেষ্টা!' : 'আরো অনুশীলন করুন!'}
              </h2>
              
              <div className="text-5xl font-bold gradient-text mb-4">
                {score}/{questions.length}
              </div>
              <div className="text-dark-400 mb-8">
                {Math.round((score / questions.length) * 100)}% সঠিক
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {answers.map((ans, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      ans.correct ? 'bg-success-500/20 text-success-400' : 'bg-error-500/20 text-error-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={startQuiz} className="btn-primary">
                  আবার চেষ্টা করুন
                </button>
                <button onClick={() => setGameState('menu')} className="btn-outline">
                  বিষয় পরিবর্তন
                </button>
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
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
