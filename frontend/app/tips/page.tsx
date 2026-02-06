import Link from 'next/link';

const tips = [
  {
    id: 1,
    title: 'Home Row Position',
    icon: '🏠',
    category: 'Basics',
    content: 'Always return your fingers to the home row keys: ASDF for left hand and JKL; for right hand. Your index fingers should rest on F and J (with the bumps).',
    bangla: 'সবসময় আঙুলগুলো হোম রো-তে রাখুন: বাম হাতে ASDF এবং ডান হাতে JKL;',
  },
  {
    id: 2,
    title: 'Look at the Screen, Not Keyboard',
    icon: '👀',
    category: 'Basics',
    content: 'Train yourself to type without looking at the keyboard. This is called touch typing and is essential for speed improvement.',
    bangla: 'কীবোর্ডের দিকে না তাকিয়ে স্ক্রিনের দিকে তাকান। এটাকে টাচ টাইপিং বলে।',
  },
  {
    id: 3,
    title: 'Accuracy Before Speed',
    icon: '🎯',
    category: 'Improvement',
    content: 'Focus on accuracy first. Speed will naturally follow as you make fewer mistakes. Aim for 95%+ accuracy before pushing for faster WPM.',
    bangla: 'প্রথমে নির্ভুলতায় মনোযোগ দিন। ভুল কমলে গতি এমনিতেই বাড়বে।',
  },
  {
    id: 4,
    title: 'Practice Daily',
    icon: '📅',
    category: 'Improvement',
    content: '15-30 minutes of daily practice is more effective than occasional long sessions. Consistency is key to building muscle memory.',
    bangla: 'প্রতিদিন ১৫-৩০ মিনিট প্র্যাকটিস করুন। নিয়মিত অনুশীলনে পারদর্শিতা আসে।',
  },
  {
    id: 5,
    title: 'Use All Fingers',
    icon: '🖐️',
    category: 'Technique',
    content: 'Each finger is responsible for specific keys. Using the correct finger for each key improves both speed and accuracy.',
    bangla: 'সব আঙুল ব্যবহার করুন। প্রতিটি আঙুলের জন্য নির্দিষ্ট কী আছে।',
  },
  {
    id: 6,
    title: 'Relax Your Hands',
    icon: '😌',
    category: 'Technique',
    content: 'Keep your wrists elevated and fingers curved. Tense muscles slow you down and can cause strain injuries.',
    bangla: 'হাত শিথিল রাখুন। শক্ত হয়ে গেলে গতি কমে যায় এবং হাত ব্যথা করতে পারে।',
  },
  {
    id: 7,
    title: 'Master Common Words',
    icon: '📝',
    category: 'Advanced',
    content: 'The 100 most common words make up about 50% of all text. Practice these words until you can type them without thinking.',
    bangla: 'সবচেয়ে বেশি ব্যবহৃত শব্দগুলো আয়ত্ত করুন। এগুলো ৫০% লেখায় থাকে।',
  },
  {
    id: 8,
    title: 'Learn Keyboard Shortcuts',
    icon: '⌨️',
    category: 'Advanced',
    content: 'Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.) save time in real-world tasks. Learn the common ones for your operating system.',
    bangla: 'কীবোর্ড শর্টকাট শিখুন। এগুলো দৈনন্দিন কাজে অনেক সময় বাঁচায়।',
  },
  {
    id: 9,
    title: 'Take Breaks',
    icon: '☕',
    category: 'Health',
    content: 'Take a 5-minute break every 30 minutes. Stretch your fingers, wrists, and look away from the screen to reduce eye strain.',
    bangla: 'প্রতি ৩০ মিনিটে ৫ মিনিট বিশ্রাম নিন। আঙুল ও চোখের যত্ন নিন।',
  },
  {
    id: 10,
    title: 'Proper Posture',
    icon: '🪑',
    category: 'Health',
    content: 'Sit up straight with feet flat on the floor. Keep the keyboard at elbow height and the monitor at eye level.',
    bangla: 'সোজা হয়ে বসুন। কীবোর্ড কনুই বরাবর এবং মনিটর চোখ বরাবর রাখুন।',
  },
];

const categories = ['All', 'Basics', 'Improvement', 'Technique', 'Advanced', 'Health'];

export default function TipsPage() {
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
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
              <Link href="/tips" className="text-primary-400 font-medium">Tips</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Typing <span className="gradient-text">Tips</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            টাইপিং দক্ষতা বাড়াতে এই টিপসগুলো অনুসরণ করুন
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cat === 'All' ? 'bg-primary-500 text-white' : 'glass text-dark-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div key={tip.id} className="glass rounded-2xl p-6 hover:scale-[1.01] transition-transform">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{tip.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-dark-800 text-dark-400">{tip.category}</span>
                  </div>
                  <p className="text-dark-300 text-sm mb-3">{tip.content}</p>
                  <p className="text-primary-400/70 text-sm">🇧🇩 {tip.bangla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Practice?</h2>
            <p className="text-dark-400 mb-6">টিপস শিখেছেন, এবার প্র্যাকটিস করুন!</p>
            <div className="flex justify-center gap-4">
              <Link href="/typing" className="btn-primary">Start Typing Test</Link>
              <Link href="/lessons" className="btn-outline">Take a Lesson</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
