'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Category = 'ssc' | 'hsc' | 'ielts';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  word: string;
  meaning: string;
  options: string[];
  correctAnswer: number;
  example: string;
}

// SSC Level Vocabulary
const sscVocabulary: Question[] = [
  { word: 'Abandon', meaning: 'পরিত্যাগ করা', options: ['Accept', 'Leave behind', 'Collect', 'Create'], correctAnswer: 1, example: 'He had to abandon his car in the flood.' },
  { word: 'Brave', meaning: 'সাহসী', options: ['Cowardly', 'Fearless', 'Weak', 'Shy'], correctAnswer: 1, example: 'The brave soldier saved his friends.' },
  { word: 'Curious', meaning: 'কৌতূহলী', options: ['Bored', 'Eager to learn', 'Tired', 'Angry'], correctAnswer: 1, example: 'The curious child asked many questions.' },
  { word: 'Diligent', meaning: 'পরিশ্রমী', options: ['Lazy', 'Hardworking', 'Careless', 'Slow'], correctAnswer: 1, example: 'She is a diligent student.' },
  { word: 'Enormous', meaning: 'বিশাল', options: ['Tiny', 'Very large', 'Average', 'Small'], correctAnswer: 1, example: 'The elephant was enormous.' },
  { word: 'Fragile', meaning: 'ভঙ্গুর', options: ['Strong', 'Easily broken', 'Heavy', 'Flexible'], correctAnswer: 1, example: 'Handle with care, it is fragile.' },
  { word: 'Generous', meaning: 'উদার', options: ['Selfish', 'Willing to give', 'Greedy', 'Mean'], correctAnswer: 1, example: 'He is generous with his time.' },
  { word: 'Humble', meaning: 'বিনয়ী', options: ['Proud', 'Modest', 'Arrogant', 'Boastful'], correctAnswer: 1, example: 'Despite success, she remained humble.' },
  { word: 'Innocent', meaning: 'নিরপরাধ', options: ['Guilty', 'Not guilty', 'Criminal', 'Bad'], correctAnswer: 1, example: 'The innocent child smiled.' },
  { word: 'Joyful', meaning: 'আনন্দময়', options: ['Sad', 'Full of happiness', 'Angry', 'Bored'], correctAnswer: 1, example: 'It was a joyful celebration.' },
];

// HSC Level Vocabulary
const hscVocabulary: Question[] = [
  { word: 'Ambiguous', meaning: 'দ্ব্যর্থক', options: ['Clear', 'Having double meaning', 'Simple', 'Obvious'], correctAnswer: 1, example: 'The statement was ambiguous.' },
  { word: 'Benevolent', meaning: 'দয়ালু', options: ['Cruel', 'Kind and generous', 'Selfish', 'Mean'], correctAnswer: 1, example: 'The benevolent king helped the poor.' },
  { word: 'Contemplate', meaning: 'চিন্তা করা', options: ['Ignore', 'Think deeply', 'Forget', 'Rush'], correctAnswer: 1, example: 'He contemplated his future.' },
  { word: 'Deteriorate', meaning: 'অবনতি হওয়া', options: ['Improve', 'Get worse', 'Stay same', 'Grow'], correctAnswer: 1, example: 'His health began to deteriorate.' },
  { word: 'Eloquent', meaning: 'বাগ্মী', options: ['Silent', 'Fluent and persuasive', 'Quiet', 'Shy'], correctAnswer: 1, example: 'She gave an eloquent speech.' },
  { word: 'Fluctuate', meaning: 'ওঠানামা করা', options: ['Stay stable', 'Rise and fall', 'Stop', 'Continue'], correctAnswer: 1, example: 'Prices fluctuate daily.' },
  { word: 'Gregarious', meaning: 'মিশুক', options: ['Antisocial', 'Sociable', 'Lonely', 'Shy'], correctAnswer: 1, example: 'She has a gregarious personality.' },
  { word: 'Hypothetical', meaning: 'অনুমানমূলক', options: ['Real', 'Based on assumption', 'Proven', 'Factual'], correctAnswer: 1, example: 'Consider this hypothetical situation.' },
  { word: 'Imminent', meaning: 'আসন্ন', options: ['Distant', 'About to happen', 'Past', 'Unlikely'], correctAnswer: 1, example: 'The storm is imminent.' },
  { word: 'Juxtapose', meaning: 'পাশাপাশি রাখা', options: ['Separate', 'Place side by side', 'Remove', 'Hide'], correctAnswer: 1, example: 'The artist juxtaposed two contrasting images.' },
];

// IELTS Level Vocabulary
const ieltsVocabulary: Question[] = [
  { word: 'Ubiquitous', meaning: 'সর্বব্যাপী', options: ['Rare', 'Present everywhere', 'Limited', 'Scarce'], correctAnswer: 1, example: 'Smartphones are ubiquitous today.' },
  { word: 'Pragmatic', meaning: 'বাস্তববাদী', options: ['Idealistic', 'Practical and realistic', 'Dreamy', 'Theoretical'], correctAnswer: 1, example: 'We need a pragmatic approach.' },
  { word: 'Exacerbate', meaning: 'আরও খারাপ করা', options: ['Improve', 'Make worse', 'Solve', 'Help'], correctAnswer: 1, example: 'His comments exacerbated the situation.' },
  { word: 'Mitigate', meaning: 'প্রশমিত করা', options: ['Worsen', 'Make less severe', 'Increase', 'Ignore'], correctAnswer: 1, example: 'Steps to mitigate climate change.' },
  { word: 'Paradigm', meaning: 'দৃষ্টান্ত', options: ['Exception', 'Model or pattern', 'Anomaly', 'Mistake'], correctAnswer: 1, example: 'A paradigm shift in thinking.' },
  { word: 'Quintessential', meaning: 'সারভূত', options: ['Ordinary', 'Perfect example of', 'Common', 'Average'], correctAnswer: 1, example: 'She is the quintessential leader.' },
  { word: 'Resilient', meaning: 'স্থিতিস্থাপক', options: ['Fragile', 'Able to recover', 'Weak', 'Brittle'], correctAnswer: 1, example: 'Children are remarkably resilient.' },
  { word: 'Substantiate', meaning: 'প্রমাণ করা', options: ['Deny', 'Provide evidence', 'Ignore', 'Question'], correctAnswer: 1, example: 'Can you substantiate your claim?' },
  { word: 'Transcend', meaning: 'অতিক্রম করা', options: ['Limit', 'Go beyond', 'Stay within', 'Follow'], correctAnswer: 1, example: 'Music transcends language barriers.' },
  { word: 'Unprecedented', meaning: 'অভূতপূর্ব', options: ['Common', 'Never done before', 'Expected', 'Routine'], correctAnswer: 1, example: 'An unprecedented achievement.' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function VocabularyQuizPage() {
  const [category, setCategory] = useState<Category>('ssc');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<'menu' | 'quiz' | 'results'>('menu');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState<{question: number; correct: boolean}[]>([]);

  const getQuestions = useCallback(() => {
    const vocabMap = {
      ssc: sscVocabulary,
      hsc: hscVocabulary,
      ielts: ieltsVocabulary,
    };
    const numQuestions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
    return shuffleArray(vocabMap[category]).slice(0, numQuestions);
  }, [category, difficulty]);

  const startQuiz = () => {
    const q = getQuestions();
    setQuestions(q);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(15);
    setAnswers([]);
    setGameState('quiz');
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'quiz' || showAnswer) return;
    
    if (timeLeft <= 0) {
      handleAnswer(-1); // Time's up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, showAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswers(prev => [...prev, { question: currentQuestion, correct: isCorrect }]);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(15);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  const getCategoryInfo = (cat: Category) => {
    const info = {
      ssc: { name: 'SSC', icon: '📚', color: 'from-blue-400 to-blue-600', desc: 'Secondary School Certificate' },
      hsc: { name: 'HSC', icon: '🎓', color: 'from-purple-400 to-purple-600', desc: 'Higher Secondary Certificate' },
      ielts: { name: 'IELTS', icon: '🌍', color: 'from-green-400 to-green-600', desc: 'International English Language Testing' },
    };
    return info[cat];
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
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
              <Link href="/vocabulary" className="text-primary-400 font-medium">Vocabulary</Link>
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
                Vocabulary <span className="gradient-text">Quiz</span>
              </h1>
              <p className="text-xl text-dark-400 max-w-2xl mx-auto">
                SSC, HSC এবং IELTS পরীক্ষার জন্য শব্দভাণ্ডার উন্নত করুন
              </p>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(['ssc', 'hsc', 'ielts'] as Category[]).map((cat) => {
                const info = getCategoryInfo(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`glass rounded-2xl p-6 text-left transition-all hover:scale-[1.02] ${
                      category === cat ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-3xl mb-4`}>
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{info.name}</h3>
                    <p className="text-dark-400 text-sm">{info.desc}</p>
                    {category === cat && (
                      <div className="mt-4 text-primary-400 text-sm font-medium">✓ Selected</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Difficulty Selection */}
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
                    {diff === 'easy' ? '🌱 Easy (5)' : diff === 'medium' ? '🌿 Medium (10)' : '🌳 Hard (15)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
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
            <div className="flex items-center justify-between mb-8">
              <div className="text-dark-400">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-dark-400">Score: <span className="text-primary-400 font-bold">{score}</span></div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  timeLeft <= 5 ? 'bg-error-500/20 text-error-400' : 'bg-dark-800 text-white'
                }`}>
                  {timeLeft}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-dark-800 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="glass rounded-3xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold gradient-text mb-4">
                  {questions[currentQuestion].word}
                </div>
                <div className="text-lg text-dark-400">
                  এই শব্দের অর্থ কি?
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  } else if (selectedAnswer === index) {
                    buttonClass = 'bg-primary-500/20 border-2 border-primary-500 text-primary-400';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showAnswer}
                      className={`p-4 rounded-xl font-medium transition-all ${buttonClass}`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Show meaning and example after answer */}
              {showAnswer && (
                <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                  <div className="text-dark-300 mb-2">
                    <span className="font-medium text-white">বাংলা অর্থ:</span> {questions[currentQuestion].meaning}
                  </div>
                  <div className="text-dark-400 text-sm italic">
                    <span className="font-medium text-dark-300">Example:</span> {questions[currentQuestion].example}
                  </div>
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
                {score === questions.length ? 'Perfect Score!' : score >= questions.length * 0.7 ? 'Great Job!' : score >= questions.length * 0.5 ? 'Good Effort!' : 'Keep Practicing!'}
              </h2>
              
              <div className="text-5xl font-bold gradient-text mb-4">
                {score}/{questions.length}
              </div>
              <div className="text-dark-400 mb-8">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>

              {/* Answer Summary */}
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
                  Try Again
                </button>
                <button onClick={() => setGameState('menu')} className="btn-outline">
                  Change Category
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
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
