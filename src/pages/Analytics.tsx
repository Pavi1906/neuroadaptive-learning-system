import React, { useState, useEffect } from "react";
import CognitiveMap from "../components/CognitiveMap";
import { BrainCircuit, Activity, Zap, Target } from "lucide-react";
import { motion } from "motion/react";

export default function Analytics() {
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [liveTelemetry, setLiveTelemetry] = useState<number>(0.94);
  const [inferenceTime, setInferenceTime] = useState<number>(24);

  useEffect(() => {
    // In a real app, fetch this from the user profile
    setWeakTopics(["DBMS Normalization", "Recursion"]);
    
    const interval = setInterval(() => {
      setLiveTelemetry(prev => {
        const change = (Math.random() - 0.5) * 0.02;
        return Math.min(Math.max(prev + change, 0.85), 0.99);
      });
      setInferenceTime(Math.floor(Math.random() * 15 + 18));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-6xl mx-auto space-y-8"
    >
      <header className="mb-12">
        <h1 className="text-3xl font-mono font-bold uppercase tracking-wider text-text-primary mb-2">Cognitive Analytics</h1>
        <p className="text-text-secondary">Deep dive into your learning patterns and knowledge dependencies.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-surface border border-border rounded-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/10 rounded-sm flex items-center justify-center border border-amber-500/20">
              <BrainCircuit className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Knowledge Nodes</h3>
          </div>
          <p className="text-3xl font-light text-text-primary">124</p>
          <p className="text-xs text-green-500 mt-2">+12 this week</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-surface border border-border rounded-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center border border-blue-500/20">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Retention Stability</h3>
          </div>
          <p className="text-3xl font-light text-text-primary">87%</p>
          <p className="text-xs text-green-500 mt-2">Optimal range</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-surface border border-border rounded-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-sm flex items-center justify-center border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Learning Velocity</h3>
          </div>
          <p className="text-3xl font-light text-text-primary">1.4x</p>
          <p className="text-xs text-text-secondary mt-2">Compared to baseline</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-background border border-border rounded-sm p-6"
          >
            <h2 className="text-lg font-mono font-bold uppercase tracking-wider border-b border-border pb-2 mb-4 text-text-primary mb-6">Dependency Analysis</h2>
            <CognitiveMap weakTopics={weakTopics} />
          </motion.div>

          {/* Real-time ML Prediction Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-border rounded-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-medium text-text-primary">ML Model Telemetry</h2>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-4">Feature Importance (λ Prediction)</h3>
                <div className="space-y-3">
                  {[
                    { feature: "Time Since Last Review", weight: 0.42 },
                    { feature: "Previous Quiz Score", weight: 0.28 },
                    { feature: "Topic Complexity", weight: 0.15 },
                    { feature: "Time of Day", weight: 0.08 },
                    { feature: "Session Duration", weight: 0.07 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-primary">{item.feature}</span>
                        <span className="text-amber-400 font-mono">{(item.weight * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.weight * 100}%` }}
                          transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                          className="h-full bg-amber-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-background rounded-sm p-4 border border-border flex flex-col justify-center">
                <h3 className="text-sm font-medium text-text-secondary mb-2 text-center">Current Model State</h3>
                <div className="flex justify-center items-center my-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface" />
                      <motion.circle 
                        cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" 
                        className="text-amber-500 transition-all duration-1000 ease-in-out"
                        strokeDasharray="351.86"
                        initial={{ strokeDashoffset: 351.86 }}
                        animate={{ strokeDashoffset: 351.86 - (351.86 * liveTelemetry) }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-light text-text-primary transition-all duration-1000">{(liveTelemetry * 100).toFixed(1)}%</span>
                      <span className="text-[10px] text-text-secondary uppercase tracking-wider">Confidence</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 px-4 py-2 bg-surface rounded-sm border border-border">
                  <span className="text-xs text-text-secondary">Inference Time</span>
                  <span className="text-xs font-mono text-green-500 transition-all duration-300">{inferenceTime}ms</span>
                </div>
                <p className="text-xs text-center text-text-secondary mt-3">
                  Model is highly confident in current decay predictions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-border rounded-sm p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-medium text-text-primary">Prediction vs Reality</h2>
          </div>
          <p className="text-sm text-text-secondary mb-6">
            NALS continuously validates its cognitive decay predictions against your actual quiz performance to refine your personalized learning rate (λ).
          </p>

          <div className="space-y-4 flex-1">
            <div className="p-4 bg-background border border-border rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">DBMS Normalization</span>
                <span className="text-xs text-text-secondary font-mono">2 hrs ago</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">Predicted</p>
                  <p className="text-lg font-mono text-amber-500">42%</p>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">Actual Score</p>
                  <p className="text-lg font-mono text-text-primary">38%</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-background border border-border rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">A* Search Algorithm</span>
                <span className="text-xs text-text-secondary font-mono">1 day ago</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">Predicted</p>
                  <p className="text-lg font-mono text-amber-500">75%</p>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">Actual Score</p>
                  <p className="text-lg font-mono text-text-primary">78%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Model Accuracy</span>
              <span className="text-xl font-medium text-green-500">91.4%</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '91.4%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

