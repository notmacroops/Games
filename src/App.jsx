import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  X, 
  Maximize2, 
  ExternalLink, 
  GraduationCap, 
  Bell, 
  User, 
  Calendar, 
  FileText, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isPanicMode, setIsPanicMode] = useState(false);

  // Panic button listener (Esc key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPanicMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  if (isPanicMode) {
    return (
      <div className="min-h-screen bg-white text-black font-sans p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif border-b-2 border-gray-300 pb-2 mb-4">Photosynthesis</h1>
          <p className="text-sm text-gray-600 mb-6 italic">From Wikipedia, the free encyclopedia</p>
          <div className="flex gap-8">
            <div className="flex-1 space-y-4 leading-relaxed">
              <p>
                <strong>Photosynthesis</strong> is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism's activities.
              </p>
              <p>
                This chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water – hence the name photosynthesis, from the Greek phōs, "light", and synthesis, "putting together".
              </p>
              <div className="bg-gray-100 p-4 border border-gray-300 rounded">
                <h3 className="font-bold mb-2">Contents</h3>
                <ul className="text-blue-600 underline text-sm space-y-1">
                  <li>1 Overview</li>
                  <li>2 Photosynthetic membranes and organelles</li>
                  <li>3 Light-dependent reactions</li>
                  <li>4 Light-independent reactions</li>
                </ul>
              </div>
            </div>
            <div className="w-64 border border-gray-300 p-2 text-xs bg-gray-50">
              <img src="https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=300" alt="Plant" className="mb-2" />
              <p className="font-bold">Plant cell structure</p>
              <p className="text-gray-500">Typical plant cell showing chloroplasts where photosynthesis occurs.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPanicMode(false)}
            className="fixed bottom-4 right-4 opacity-0 hover:opacity-10"
          >
            Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans">
      {/* School Header */}
      <div className="bg-[#1e3a8a] text-white py-2 px-4 text-xs flex justify-between items-center">
        <div className="flex gap-4">
          <span>District Home</span>
          <span>Staff Portal</span>
          <span>Parents</span>
        </div>
        <div className="flex gap-4 items-center">
          <Bell className="w-3 h-3" />
          <span>Language: English</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1e3a8a]">NORTHWOOD ACADEMY</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Student Resource Portal</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search curriculum resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-md py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 text-slate-600">
              <User className="w-5 h-5" />
              <div className="text-right">
                <p className="text-xs font-bold leading-none">J. Doe</p>
                <p className="text-[10px] text-slate-400">Grade 11</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPanicMode(true)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Panic Button (Esc)"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#1e3a8a]" />
                Navigation
              </h3>
            </div>
            <div className="p-2 space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" /> My Assignments
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Schedule
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm bg-[#1e3a8a]/10 text-[#1e3a8a] font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Learning Modules
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-bold text-sm mb-3">Upcoming Tasks</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-orange-400 pl-3">
                <p className="text-xs font-bold">History Essay</p>
                <p className="text-[10px] text-slate-500">Due in 2 hours</p>
              </div>
              <div className="border-l-4 border-blue-400 pl-3">
                <p className="text-xs font-bold">Physics Quiz</p>
                <p className="text-[10px] text-slate-500">Tomorrow</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">
              <span>Home</span>
              <span>/</span>
              <span className="text-[#1e3a8a]">Interactive Learning Modules</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Digital Curriculum Library</h2>
            <p className="text-slate-500 mt-1">Select a module to begin your interactive study session.</p>
          </header>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur shadow-sm text-[10px] font-bold text-[#1e3a8a] rounded uppercase">
                        {game.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                      {game.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Module ID: {game.id}04X</span>
                      <button className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider flex items-center gap-1">
                        Launch Module <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGames.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <p className="text-slate-400 font-medium">No learning modules found in this category.</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-[#1e3a8a]" />
              <span className="font-bold tracking-tight text-[#1e3a8a]">NORTHWOOD ACADEMY</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Committed to excellence in education and digital literacy. Northwood Academy is a registered institution of the State Board of Education.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Resources</h4>
              <ul className="text-xs text-slate-500 space-y-2">
                <li>Library</li>
                <li>Counseling</li>
                <li>IT Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Legal</h4>
              <ul className="text-xs text-slate-500 space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setSelectedGame(null)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 flex items-center justify-between bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1e3a8a] rounded flex items-center justify-center">
                    <BookOpen className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{selectedGame.title}</h2>
                    <p className="text-[10px] text-slate-500">Interactive Curriculum Module • Northwood Academy</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Iframe */}
              <div className="flex-1 relative bg-slate-100">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="fullscreen; autoplay; gamepad"
                  title={selectedGame.title}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 flex items-center justify-between bg-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> Fullscreen Mode Enabled
                  </span>
                </div>
                <p>Northwood Academy Digital Learning Environment</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
