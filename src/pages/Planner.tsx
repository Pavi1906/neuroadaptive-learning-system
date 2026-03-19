import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, Circle, RefreshCw, BrainCircuit, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const INITIAL_SCHEDULE = [
  { id: 1, time: "09:00 AM", topic: "Database Normalization", type: "Critical Revision", duration: "45m", completed: true },
  { id: 2, time: "11:30 AM", topic: "Dynamic Programming", type: "New Concept", duration: "90m", completed: false },
  { id: 3, time: "02:00 PM", topic: "B-Trees & Indexing", type: "Warning Revision", duration: "30m", completed: false },
  { id: 4, time: "04:15 PM", topic: "System Design Basics", type: "Optimal Revision", duration: "60m", completed: false },
];

const OPTIMIZED_SCHEDULE = [
  { id: 1, time: "09:00 AM", topic: "Database Normalization", type: "Critical Revision", duration: "45m", completed: true },
  { id: 5, time: "11:00 AM", topic: "Recursion (Prerequisite)", type: "Critical Revision", duration: "30m", completed: false, isNew: true },
  { id: 2, time: "11:45 AM", topic: "Dynamic Programming", type: "New Concept", duration: "60m", completed: false },
  { id: 3, time: "02:30 PM", topic: "B-Trees & Indexing", type: "Warning Revision", duration: "45m", completed: false },
  { id: 4, time: "04:15 PM", topic: "System Design Basics", type: "Optimal Revision", duration: "60m", completed: false },
];

export default function Planner() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setSchedule(OPTIMIZED_SCHEDULE);
      setIsOptimizing(false);
      setHasOptimized(true);
    }, 1500);
  };

  const toggleComplete = (id: number) => {
    setSchedule(schedule.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-wider text-text-primary mb-2">AI Study Planner</h1>
          <p className="text-text-secondary">Optimized schedule based on your cognitive decay curve.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleOptimize}
            disabled={isOptimizing || hasOptimized}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all",
              hasOptimized 
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
            )}
          >
            {isOptimizing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : hasOptimized ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <BrainCircuit className="w-4 h-4" />
            )}
            {isOptimizing ? "Recalibrating..." : hasOptimized ? "Optimized" : "Adaptive Re-plan"}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-sm">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-text-primary">Today</span>
          </div>
        </div>
      </header>

      {hasOptimized && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-sm flex items-start gap-3"
        >
          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-1">Schedule Recalibrated</h4>
            <p className="text-xs text-amber-300/80">
              Detected high risk of failure in <strong>Recursion</strong>. Inserted a 30m critical revision session before <strong>Dynamic Programming</strong> to strengthen prerequisites.
            </p>
          </div>
        </motion.div>
      )}

      <div className="space-y-4 relative">
        {isOptimizing && (
          <motion.div 
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"
          />
        )}
        <AnimatePresence mode="popLayout">
          {schedule.map((item, index) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOptimizing ? 0.5 : 1, x: 0, filter: isOptimizing ? "blur(2px)" : "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-6 p-6 rounded-sm border transition-all relative overflow-hidden",
                item.completed 
                  ? "bg-background border-border opacity-60" 
                  : "bg-surface border-border hover:border-amber-500/30",
                (item as any).isNew && !item.completed ? "ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : ""
              )}
            >
              {(item as any).isNew && (
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              )}
              
              <div className="flex flex-col items-center justify-center w-16">
                <span className="text-sm font-mono text-text-secondary">{item.time}</span>
              </div>

              <div className="w-px h-12 bg-border"></div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={cn(
                    "text-lg font-medium",
                    item.completed ? "text-text-secondary line-through" : "text-text-primary"
                  )}>
                    {item.topic}
                  </h3>
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border",
                    item.type.includes("Critical") ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    item.type.includes("Warning") ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                    item.type.includes("New") ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-green-500/10 text-green-500 border-green-500/20"
                  )}>
                    {item.type}
                  </span>
                  {(item as any).isNew && (
                    <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Auto-Added
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => toggleComplete(item.id)}
                className="p-2 hover:bg-background rounded-full transition-colors cursor-pointer"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-text-secondary" />
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
