'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = 'ssc' | 'hsc' | 'ielts';

interface Word {
  word: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  synonyms: string[];
}

const sscWords: Word[] = [
  { word: 'Abandon', meaning: 'পরিত্যাগ করা, ছেড়ে দেওয়া', partOfSpeech: 'Verb', example: 'He had to abandon his car.', synonyms: ['Leave', 'Desert', 'Forsake'] },
  { word: 'Brave', meaning: 'সাহসী, বীর', partOfSpeech: 'Adjective', example: 'The brave soldier fought.', synonyms: ['Courageous', 'Bold', 'Fearless'] },
  { word: 'Curious', meaning: 'কৌতূহলী, জিজ্ঞাসু', partOfSpeech: 'Adjective', example: 'The curious child asked.', synonyms: ['Inquisitive', 'Interested', 'Eager'] },
  { word: 'Diligent', meaning: 'পরিশ্রমী, অধ্যবসায়ী', partOfSpeech: 'Adjective', example: 'A diligent student.', synonyms: ['Hardworking', 'Industrious', 'Assiduous'] },
  { word: 'Enormous', meaning: 'বিশাল, প্রকাণ্ড', partOfSpeech: 'Adjective', example: 'An enormous elephant.', synonyms: ['Huge', 'Massive', 'Immense'] },
  { word: 'Fragile', meaning: 'ভঙ্গুর, নাজুক', partOfSpeech: 'Adjective', example: 'Handle with care, fragile.', synonyms: ['Delicate', 'Brittle', 'Breakable'] },
  { word: 'Generous', meaning: 'উদার, দানশীল', partOfSpeech: 'Adjective', example: 'A generous donation.', synonyms: ['Liberal', 'Giving', 'Charitable'] },
  { word: 'Humble', meaning: 'বিনয়ী, নম্র', partOfSpeech: 'Adjective', example: 'He remained humble.', synonyms: ['Modest', 'Meek', 'Unassuming'] },
  { word: 'Innocent', meaning: 'নিরপরাধ, নির্দোষ', partOfSpeech: 'Adjective', example: 'An innocent child.', synonyms: ['Guiltless', 'Blameless', 'Pure'] },
  { word: 'Joyful', meaning: 'আনন্দময়, হর্ষোৎফুল্ল', partOfSpeech: 'Adjective', example: 'A joyful celebration.', synonyms: ['Happy', 'Cheerful', 'Delighted'] },
  { word: 'Knowledge', meaning: 'জ্ঞান, বিদ্যা', partOfSpeech: 'Noun', example: 'Knowledge is power.', synonyms: ['Wisdom', 'Learning', 'Information'] },
  { word: 'Liberty', meaning: 'স্বাধীনতা, মুক্তি', partOfSpeech: 'Noun', example: 'Fighting for liberty.', synonyms: ['Freedom', 'Independence', 'Autonomy'] },
];

const hscWords: Word[] = [
  { word: 'Ambiguous', meaning: 'দ্ব্যর্থক, অস্পষ্ট', partOfSpeech: 'Adjective', example: 'An ambiguous statement.', synonyms: ['Unclear', 'Vague', 'Equivocal'] },
  { word: 'Benevolent', meaning: 'দয়ালু, পরোপকারী', partOfSpeech: 'Adjective', example: 'A benevolent king.', synonyms: ['Kind', 'Generous', 'Charitable'] },
  { word: 'Contemplate', meaning: 'চিন্তা করা, মনন করা', partOfSpeech: 'Verb', example: 'Contemplate the future.', synonyms: ['Consider', 'Ponder', 'Reflect'] },
  { word: 'Deteriorate', meaning: 'অবনতি হওয়া, খারাপ হওয়া', partOfSpeech: 'Verb', example: 'Health deteriorated.', synonyms: ['Decline', 'Worsen', 'Degrade'] },
  { word: 'Eloquent', meaning: 'বাগ্মী, বাকপটু', partOfSpeech: 'Adjective', example: 'An eloquent speaker.', synonyms: ['Articulate', 'Fluent', 'Expressive'] },
  { word: 'Fluctuate', meaning: 'ওঠানামা করা, পরিবর্তিত হওয়া', partOfSpeech: 'Verb', example: 'Prices fluctuate.', synonyms: ['Vary', 'Oscillate', 'Waver'] },
  { word: 'Gregarious', meaning: 'মিশুক, সামাজিক', partOfSpeech: 'Adjective', example: 'A gregarious person.', synonyms: ['Sociable', 'Outgoing', 'Friendly'] },
  { word: 'Hypothetical', meaning: 'অনুমানমূলক, কাল্পনিক', partOfSpeech: 'Adjective', example: 'A hypothetical situation.', synonyms: ['Theoretical', 'Assumed', 'Supposed'] },
  { word: 'Imminent', meaning: 'আসন্ন, নিকটবর্তী', partOfSpeech: 'Adjective', example: 'Imminent danger.', synonyms: ['Impending', 'Approaching', 'Near'] },
  { word: 'Juxtapose', meaning: 'পাশাপাশি রাখা, তুলনা করা', partOfSpeech: 'Verb', example: 'Juxtapose two ideas.', synonyms: ['Compare', 'Contrast', 'Place alongside'] },
  { word: 'Inevitable', meaning: 'অনিবার্য, অবশ্যম্ভাবী', partOfSpeech: 'Adjective', example: 'Change is inevitable.', synonyms: ['Unavoidable', 'Inescapable', 'Certain'] },
  { word: 'Meticulous', meaning: 'সূক্ষ্মদর্শী, নিখুঁত', partOfSpeech: 'Adjective', example: 'Meticulous planning.', synonyms: ['Careful', 'Precise', 'Thorough'] },
];

const ieltsWords: Word[] = [
  { word: 'Ubiquitous', meaning: 'সর্বব্যাপী, সর্বত্র বিদ্যমান', partOfSpeech: 'Adjective', example: 'Smartphones are ubiquitous.', synonyms: ['Omnipresent', 'Pervasive', 'Universal'] },
  { word: 'Pragmatic', meaning: 'বাস্তববাদী, ব্যবহারিক', partOfSpeech: 'Adjective', example: 'A pragmatic approach.', synonyms: ['Practical', 'Realistic', 'Sensible'] },
  { word: 'Exacerbate', meaning: 'আরও খারাপ করা, বাড়িয়ে দেওয়া', partOfSpeech: 'Verb', example: 'Exacerbate the problem.', synonyms: ['Worsen', 'Aggravate', 'Intensify'] },
  { word: 'Mitigate', meaning: 'প্রশমিত করা, হ্রাস করা', partOfSpeech: 'Verb', example: 'Mitigate the risks.', synonyms: ['Alleviate', 'Reduce', 'Lessen'] },
  { word: 'Paradigm', meaning: 'দৃষ্টান্ত, আদর্শ', partOfSpeech: 'Noun', example: 'A new paradigm shift.', synonyms: ['Model', 'Pattern', 'Example'] },
  { word: 'Quintessential', meaning: 'সারভূত, আদর্শ উদাহরণ', partOfSpeech: 'Adjective', example: 'The quintessential leader.', synonyms: ['Typical', 'Classic', 'Ideal'] },
  { word: 'Resilient', meaning: 'স্থিতিস্থাপক, দৃঢ়', partOfSpeech: 'Adjective', example: 'Children are resilient.', synonyms: ['Tough', 'Strong', 'Flexible'] },
  { word: 'Substantiate', meaning: 'প্রমাণ করা, সমর্থন করা', partOfSpeech: 'Verb', example: 'Substantiate your claim.', synonyms: ['Prove', 'Verify', 'Confirm'] },
  { word: 'Transcend', meaning: 'অতিক্রম করা, ছাড়িয়ে যাওয়া', partOfSpeech: 'Verb', example: 'Transcend limitations.', synonyms: ['Surpass', 'Exceed', 'Go beyond'] },
  { word: 'Unprecedented', meaning: 'অভূতপূর্ব, নজিরবিহীন', partOfSpeech: 'Adjective', example: 'Unprecedented success.', synonyms: ['Unparalleled', 'Unique', 'Novel'] },
  { word: 'Ameliorate', meaning: 'উন্নতি করা, ভালো করা', partOfSpeech: 'Verb', example: 'Ameliorate conditions.', synonyms: ['Improve', 'Better', 'Enhance'] },
  { word: 'Coalesce', meaning: 'একত্রিত হওয়া, মিশে যাওয়া', partOfSpeech: 'Verb', example: 'Ideas coalesced.', synonyms: ['Merge', 'Unite', 'Combine'] },
];

export default function WordListPage() {
  const [category, setCategory] = useState<Category>('ssc');
  const [searchQuery, setSearchQuery] = useState('');

  const wordMap = { ssc: sscWords, hsc: hscWords, ielts: ieltsWords };
  const words = wordMap[category];

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.meaning.includes(searchQuery)
  );

  const getCategoryInfo = (cat: Category) => {
    const info = {
      ssc: { name: 'SSC', icon: '📚', color: 'from-blue-400 to-blue-600' },
      hsc: { name: 'HSC', icon: '🎓', color: 'from-purple-400 to-purple-600' },
      ielts: { name: 'IELTS', icon: '🌍', color: 'from-green-400 to-green-600' },
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
              <Link href="/vocabulary" className="text-dark-400 hover:text-white transition-colors">Quiz</Link>
              <Link href="/vocabulary/wordlist" className="text-primary-400 font-medium">Word List</Link>
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
            Word <span className="gradient-text">List</span>
          </h1>
          <p className="text-xl text-dark-400">
            শব্দভাণ্ডার শিখুন এবং মুখস্থ করুন
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 glass rounded-xl p-1">
            {(['ssc', 'hsc', 'ielts'] as Category[]).map((cat) => {
              const info = getCategoryInfo(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-primary-500 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  <span>{info.icon}</span>
                  {info.name}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary-400">{words.length}</div>
            <div className="text-dark-400 text-sm">Total Words</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-success-400">{getCategoryInfo(category).name}</div>
            <div className="text-dark-400 text-sm">Level</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <Link href="/vocabulary" className="text-2xl">📝</Link>
            <div className="text-dark-400 text-sm">Take Quiz</div>
          </div>
        </div>

        {/* Word Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word, index) => (
            <div key={index} className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{word.word}</h3>
                  <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">{word.partOfSpeech}</span>
                </div>
                <button className="text-dark-500 hover:text-primary-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                </button>
              </div>
              
              <p className="text-lg text-success-400 mb-2">{word.meaning}</p>
              
              <p className="text-dark-400 text-sm italic mb-3">&ldquo;{word.example}&rdquo;</p>
              
              <div className="flex flex-wrap gap-1">
                {word.synonyms.map((syn, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-dark-800 text-dark-300">
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredWords.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-dark-400">No words found matching &ldquo;{searchQuery}&rdquo;</p>
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
