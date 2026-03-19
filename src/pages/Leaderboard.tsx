import React, { useState } from "react";
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Zap, Swords, BrainCircuit, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Alex (Fast Learner)", score: 9850, streak: 42, lambda: 0.05, trend: "up" },
  { rank: 2, name: "Sarah J.", score: 9240, streak: 28, lambda: 0.08, trend: "up" },
  { rank: 3, name: "Michael T.", score: 8900, streak: 15, lambda: 0.11, trend: "down" },
  { rank: 4, name: "Jordan (Needs Repetition)", score: 8450, streak: 7, lambda: 0.15, trend: "up" },
  { rank: 5, name: "Emma W.", score: 8120, streak: 12, lambda: 0.14, trend: "down" },
];

export default function Leaderboard() {
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  const handleMatchmaking = () => {
    setIsMatchmaking(true);
    setTimeout(() => {
      setIsMatchmaking(false);
      setMatchFound(true);
      setTimeout(() => setMatchFound(false), 3000);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-wider text-text-primary mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Global Rankings
          </h1>
          <p className="text-text-secondary">Compare your cognitive retention and learning velocity with top performers.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface border border-border px-6 py-3 rounded-sm">
          <div className="text-center">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Your Rank</p>
            <p className="text-2xl font-bold text-amber-500">#4</p>
          </div>
          <div className="w-px h-10 bg-border"></div>
          <div className="text-center">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Top Percentile</p>
            <p className="text-2xl font-bold text-emerald-500">12%</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-border rounded-none overflow-hidden ">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-background/50 text-xs font-semibold text-text-secondary uppercase tracking-wider">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">Learner</div>
            <div className="col-span-2 text-right">Cognitive Score</div>
            <div className="col-span-2 text-right">Decay (λ)</div>
            <div className="col-span-3 text-right">Current Streak</div>
          </div>

          <div className="divide-y divide-border">
            {LEADERBOARD_DATA.map((user, idx) => (
              <motion.div 
                key={user.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-background/50 group",
                  user.name.includes("Jordan") ? "bg-amber-500/5 border-l-4 border-l-amber-500" : "border-l-4 border-l-transparent"
                )}
              >
                <div className="col-span-1 flex justify-center">
                  {user.rank === 1 ? <Medal className="w-6 h-6 text-yellow-500" /> :
                   user.rank === 2 ? <Medal className="w-6 h-6 text-gray-400" /> :
                   user.rank === 3 ? <Medal className="w-6 h-6 text-amber-600" /> :
                   <span className="text-lg font-mono text-text-secondary">{user.rank}</span>}
                </div>
                
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-border flex items-center justify-center">
                    <span className="font-bold text-text-primary">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      {user.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                      {user.trend === 'up' ? 'Improving' : 'Declining'}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <span className="text-lg font-mono font-semibold text-text-primary">{user.score.toLocaleString()}</span>
                </div>

                <div className="col-span-2 text-right">
                  <span className="text-sm font-mono text-text-secondary">{user.lambda.toFixed(3)}</span>
                </div>

                <div className="col-span-3 flex items-center justify-end gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className={cn("w-4 h-4", user.streak > 10 ? "text-yellow-500 fill-yellow-500" : "text-text-secondary")} />
                    <span className="text-sm font-medium text-text-primary">{user.streak} days</span>
                  </div>
                  {!user.name.includes("Jordan") && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-amber-500/10 text-amber-500 rounded-sm hover:bg-amber-500 hover:text-white" title="Challenge User">
                      <Swords className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-border rounded-sm p-6"
          >
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Recent Achievements
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-sm">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">7-Day Streak!</p>
                  <p className="text-xs text-text-secondary mt-0.5">You've maintained optimal retention for a full week.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-sm">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <BrainCircuit className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Cognitive Master</p>
                  <p className="text-xs text-text-secondary mt-0.5">Reduced decay rate (λ) by 15% in System Design.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-surface border border-border rounded-sm p-6 relative overflow-hidden"
          >
            {isMatchmaking && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-amber-500/10 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
              >
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-2" />
                <p className="text-sm font-medium text-amber-500">Finding Opponent...</p>
              </motion.div>
            )}
            {matchFound && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-green-500/10 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2  shadow-green-500/30">
                  <Swords className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-green-500">Match Found!</p>
                <p className="text-xs text-green-600/80">vs. Sarah J.</p>
              </motion.div>
            )}
            <h3 className="text-lg font-medium text-text-primary mb-4">Challenge a Peer</h3>
            <p className="text-sm text-text-secondary mb-4">
              Engage in a cognitive duel to test your retention against top learners.
            </p>
            <button 
              onClick={handleMatchmaking}
              disabled={isMatchmaking || matchFound}
              className="w-full py-2.5 bg-amber-500 text-white text-sm font-medium rounded-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Swords className="w-4 h-4" />
              Find Match
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
