import React, { useState } from "react";
import { Search, Book, FileText, Video, ChevronRight, Sparkles, BrainCircuit, X, Send, Loader2, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  const [tutorMessage, setTutorMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Hello! I'm your NeuroAdaptive AI Tutor. What topic would you like to explore today?" }
  ]);
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<{title: string, category: string, readTime: string} | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{name: string, count: number, icon: any} | null>(null);

  const categories = [
    { name: "Computer Science Core", count: 42, icon: Book },
    { name: "System Design", count: 18, icon: FileText },
    { name: "Algorithms", count: 35, icon: Video },
    { name: "Machine Learning", count: 24, icon: Book },
  ];

  const recentDocs = [
    { title: "B-Tree Implementation Guide", category: "Computer Science Core", readTime: "12 min" },
    { title: "CAP Theorem Explained", category: "System Design", readTime: "8 min" },
    { title: "Dynamic Programming Patterns", category: "Algorithms", readTime: "25 min" },
  ];

  const handleGenerateStudyGuide = () => {
    if (!searchQuery) return;
    setIsGenerating(true);
    setGeneratedGuide(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedGuide(`Comprehensive Study Guide: ${searchQuery}`);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { role: "user", content: tutorMessage }]);
    const userMsg = tutorMessage;
    setTutorMessage("");
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "ai", 
        content: `I can certainly help you understand ${userMsg}. Let's break it down into core concepts...` 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-wider text-text-primary mb-2">Knowledge Base</h1>
          <p className="text-text-secondary">Your centralized repository of learning materials.</p>
        </div>
        <button 
          onClick={() => setShowTutor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-sm hover:bg-amber-500 hover:text-white transition-all text-sm font-medium"
        >
          <BrainCircuit className="w-4 h-4" />
          Ask AI Tutor
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-12 flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search topics, concepts, or documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-sm pl-12 pr-4 py-4 text-text-primary focus:outline-none focus:border-amber-500/50 transition-colors "
          />
        </div>
        <button 
          onClick={handleGenerateStudyGuide}
          disabled={!searchQuery || isGenerating}
          className="px-6 py-4 bg-amber-500 text-white rounded-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? "Generating..." : "Generate Guide"}
        </button>
      </motion.div>

      <AnimatePresence>
        {generatedGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 p-6 bg-amber-500/5 border border-amber-500/20 rounded-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-sm flex items-center justify-center border border-amber-500/30">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-primary">{generatedGuide}</h3>
                  <p className="text-sm text-text-secondary">AI-generated study path based on your cognitive profile</p>
                </div>
              </div>
              <button 
                onClick={() => setGeneratedGuide(null)}
                className="p-2 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                "Core Concepts & Prerequisites",
                "Common Pitfalls & Misconceptions",
                "Practice Problems (Adaptive Difficulty)"
              ].map((section, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-background border border-border rounded-sm">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-text-primary">{section}</span>
                  <ChevronRight className="w-4 h-4 text-text-secondary ml-auto" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div 
              key={cat.name} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedCategory(cat)}
              className="p-6 bg-background border border-border rounded-sm hover:border-amber-500/30 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-surface rounded-sm flex items-center justify-center border border-border mb-4 group-hover:border-amber-500/30 transition-colors">
                <Icon className="w-5 h-5 text-text-secondary group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-text-primary mb-1">{cat.name}</h3>
              <p className="text-xs text-text-secondary">{cat.count} resources</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg font-mono font-bold uppercase tracking-wider border-b border-border pb-2 mb-4 text-text-primary mb-6">Recently Accessed</h2>
        <div className="space-y-3">
          {recentDocs.map((doc, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              onClick={() => setSelectedDoc(doc)}
              className="flex items-center justify-between p-4 bg-surface border border-border rounded-sm hover:bg-background transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-background rounded-sm flex items-center justify-center border border-border">
                  <FileText className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-amber-500 transition-colors">{doc.title}</h4>
                  <p className="text-xs text-text-secondary">{doc.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-secondary font-mono">{doc.readTime}</span>
                <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCategory && <motion.div 
          key="backdrop-category"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCategory(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />}
        {selectedCategory && <motion.div 
          key="modal-category"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface border border-border rounded-sm z-50 overflow-hidden"
        >
              <div className="p-6 border-b border-border flex items-center justify-between bg-background">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-sm flex items-center justify-center border border-amber-500/20">
                    <selectedCategory.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{selectedCategory.name}</h2>
                    <p className="text-sm text-text-secondary">{selectedCategory.count} resources available</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-surface rounded-sm transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background border border-border rounded-sm hover:border-amber-500/30 transition-colors cursor-pointer group" onClick={() => {
                    setSelectedCategory(null);
                    setSelectedDoc({ title: `${selectedCategory.name} Concept ${i}`, category: selectedCategory.name, readTime: `${i * 5} min` });
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-surface rounded-sm flex items-center justify-center border border-border">
                        <FileText className="w-4 h-4 text-text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-text-primary group-hover:text-amber-500 transition-colors">{selectedCategory.name} Concept {i}</h4>
                        <p className="text-xs text-text-secondary">Last updated {i} days ago</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {selectedDoc && <motion.div 
          key="backdrop-doc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDoc(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />}
        {selectedDoc && <motion.div 
          key="modal-doc"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[80vh] bg-surface border border-border rounded-sm shadow-2xl z-50 flex flex-col overflow-hidden"
        >
              <div className="p-6 border-b border-border flex items-center justify-between bg-background">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{selectedDoc.category}</span>
                    <span className="text-xs text-text-secondary flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedDoc.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary">{selectedDoc.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-surface rounded-sm transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
              <div className="flex-1 p-8 overflow-y-auto bg-background">
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    This is a simulated document view for <strong>{selectedDoc.title}</strong>. In a fully implemented system, this would contain the actual learning material, interactive code snippets, and embedded quizzes.
                  </p>
                  <h3 className="text-lg font-medium text-text-primary mb-3">1. Introduction</h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="p-4 bg-surface border border-border rounded-sm mb-6 font-mono text-sm text-text-primary">
                    <span className="text-amber-400">function</span> <span className="text-blue-400">example</span>() {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-text-secondary">// Implementation details here</span>
                    <br/>&nbsp;&nbsp;<span className="text-amber-400">return</span> <span className="text-green-400">true</span>;
                    <br/>{'}'}
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-3">2. Core Concepts</h3>
                  <ul className="list-disc pl-5 text-text-secondary space-y-2 mb-6">
                    <li>First important concept related to the topic.</li>
                    <li>Second critical point to remember.</li>
                    <li>Common edge cases and how to handle them.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showTutor && <motion.div 
          key="backdrop-tutor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowTutor(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />}
        {showTutor && <motion.div 
          key="modal-tutor"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-surface border-l border-border z-50 flex flex-col shadow-2xl"
        >
              <div className="p-4 border-b border-border flex items-center justify-between bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-sm flex items-center justify-center border border-amber-500/20">
                    <BrainCircuit className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">NeuroAdaptive Tutor</h3>
                    <p className="text-[10px] text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTutor(false)}
                  className="p-2 hover:bg-surface rounded-sm transition-colors"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-sm text-sm ${
                      msg.role === 'user' 
                        ? 'bg-amber-500 text-white rounded-tr-sm' 
                        : 'bg-background border border-border text-text-primary rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-background border-t border-border">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text"
                    value={tutorMessage}
                    onChange={(e) => setTutorMessage(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-surface border border-border rounded-sm pl-4 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!tutorMessage.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 text-white rounded-sm hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:hover:bg-amber-500"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
}
