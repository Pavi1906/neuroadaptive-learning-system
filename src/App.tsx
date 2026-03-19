import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrainCircuit, Activity, Zap, Clock, AlertTriangle, CheckCircle2, ChevronRight, ChevronDown, TrendingDown, ShieldAlert, CalendarClock, ShieldCheck, Bot, Trophy, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import Planner from "./pages/Planner";
import KnowledgeBase from "./pages/KnowledgeBase";
import Leaderboard from "./pages/Leaderboard";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// --- Types ---
interface RevisionItem {
  topic: string;
  subject: string;
  urgency: "CRITICAL" | "WARNING" | "OPTIMAL";
  retention: number;
  timeGap: number;
  lastPerformance: number;
  lambda: number;
  confidence: number;
  message: string;
}

interface RiskTimelineItem {
  period: string;
  topics: { name: string; status: "CRITICAL" | "WARNING" | "STABLE"; timeToFailure: string }[];
}

interface DashboardData {
  globalRetention: number;
  pendingRevisions: RevisionItem[];
  averageLambda: number;
  insight: string;
  stabilityScore: number;
  predictiveAlert: string;
  riskTimeline: RiskTimelineItem[];
}

interface UserProfile {
  id: string;
  name: string;
  baseLambda: number;
}

const USERS: UserProfile[] = [
  { id: "user_alex", name: "Alex (Fast Learner)", baseLambda: 0.05 },
  { id: "user_jordan", name: "Jordan (Needs Repetition)", baseLambda: 0.15 },
];

// --- Components ---

function Dashboard() {
  const [activeUser, setActiveUser] = useState<UserProfile>(USERS[0]);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [autoMode, setAutoMode] = useState(true);
  const [liveTelemetry, setLiveTelemetry] = useState<number>(0.94);
  const [startingSessionId, setStartingSessionId] = useState<string | null>(null);
  const [startedSessions, setStartedSessions] = useState<string[]>([]);

  const handleStartSession = (id: string) => {
    setStartingSessionId(id);
    setTimeout(() => {
      setStartingSessionId(null);
      setStartedSessions(prev => [...prev, id]);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetry(prev => {
        const change = (Math.random() - 0.5) * 0.02;
        return Math.min(Math.max(prev + change, 0.85), 0.99);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data for the active user
    const mockTopics = [
      { topic: "Normalization", subject: "Database Systems", timeGap: 7, performance: 0.6 },
      { topic: "Indexing", subject: "Database Systems", timeGap: 2, performance: 0.9 },
      { topic: "Recursion", subject: "Algorithms", timeGap: 14, performance: 0.4 },
      { topic: "Dynamic Programming", subject: "Algorithms", timeGap: 1, performance: 0.8 },
    ];

    // Simulate API call delay
    setTimeout(() => {
      const pendingRevisions: RevisionItem[] = mockTopics.map(t => {
        const retention = Math.exp(-activeUser.baseLambda * t.timeGap / t.performance);
        let urgency: "CRITICAL" | "WARNING" | "OPTIMAL" = "OPTIMAL";
        if (retention < 0.5) urgency = "CRITICAL";
        else if (retention < 0.75) urgency = "WARNING";

        return {
          topic: t.topic,
          subject: t.subject,
          urgency,
          retention,
          timeGap: t.timeGap,
          lastPerformance: t.performance,
          lambda: activeUser.baseLambda,
          confidence: 0.85,
          message: urgency === "CRITICAL" ? "Immediate review required" : urgency === "WARNING" ? "Review soon" : "Optimal retention"
        };
      }).sort((a, b) => a.retention - b.retention);

      const globalRetention = pendingRevisions.reduce((acc, curr) => acc + curr.retention, 0) / pendingRevisions.length;
      
      const stabilityScore = activeUser.id === "user_alex" ? 84 : 62;
      const predictiveAlert = activeUser.id === "user_alex" 
        ? "Predicted Failure: 'Recursion' will drop below 60% retention threshold in 18 hours."
        : "Predicted Failure: 'Database Normalization' will drop below 60% retention threshold in 4 hours.";

      const riskTimeline: RiskTimelineItem[] = [
        {
          period: "Next 24 Hours",
          topics: [
            { name: activeUser.id === "user_alex" ? "Recursion" : "DBMS Normalization", status: "CRITICAL", timeToFailure: activeUser.id === "user_alex" ? "18 hrs" : "4 hrs" },
            { name: "Dynamic Programming", status: "WARNING", timeToFailure: "22 hrs" }
          ]
        },
        {
          period: "Next 48 Hours",
          topics: [
            { name: "Indexing", status: "STABLE", timeToFailure: "48+ hrs" }
          ]
        }
      ];

      setData({
        globalRetention,
        pendingRevisions,
        averageLambda: activeUser.baseLambda,
        insight: activeUser.id === "user_alex" 
          ? "Your retention drops fastest in theoretical algorithms."
          : "You require 2.4x more repetition for Database Systems.",
        stabilityScore,
        predictiveAlert,
        riskTimeline
      });
      setLoading(false);
    }, 800);
  }, [activeUser]);

  // Generate curve data based on the average lambda
  const curveData = Array.from({ length: 30 }, (_, i) => {
    const t = i;
    const lambda = data?.averageLambda || 0.1;
    const retention = Math.exp(-lambda * t) * 100;
    return { day: t, retention: Number(retention.toFixed(1)) };
  });

  if (loading || !data) {
    return (
      <div className="flex-1 p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-surface rounded-sm mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-surface rounded-sm"></div>)}
        </div>
        <div className="h-16 w-full bg-surface rounded-sm"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[400px] bg-surface rounded-sm"></div>
          <div className="h-[400px] bg-surface rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header & User Switcher */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Cognitive Dashboard</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">Live Prediction</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full ml-2">
              <Activity className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-mono text-amber-400">Model Confidence: {(liveTelemetry * 100).toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-text-secondary">Real-time analysis of your memory decay and learning velocity.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Autonomous Mode Toggle */}
          <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-sm">
            <Bot className={cn("w-5 h-5", autoMode ? "text-amber-500" : "text-text-secondary")} />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">Auto Mode</span>
              <span className="text-[10px] text-text-secondary">AI schedules revisions</span>
            </div>
            <button 
              onClick={() => setAutoMode(!autoMode)}
              className={cn(
                "ml-2 w-10 h-5 rounded-full relative transition-colors cursor-pointer",
                autoMode ? "bg-amber-500" : "bg-border"
              )}
            >
              <div className={cn(
                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                autoMode ? "translate-x-5" : "translate-x-0"
              )} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-surface p-1.5 rounded-sm border border-border">
            {USERS.map(user => (
              <button
                key={user.id}
                onClick={() => setActiveUser(user)}
                className={cn(
                  "px-4 py-2 rounded-sm text-sm font-medium transition-all",
                  activeUser.id === user.id 
                    ? "bg-border text-text-primary shadow-sm border border-border" 
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Predictive Failure Alert */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-sm"
      >
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-500 font-medium">
            {data.predictiveAlert}
          </p>
        </div>
        {autoMode && (
          <span className="text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Auto-scheduled for intervention
          </span>
        )}
      </motion.div>

      {/* Top Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="p-6 bg-surface border border-border rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-sm flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Stability Score</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light text-text-primary">{data.stabilityScore}%</span>
              <span className={cn("text-sm font-medium", data.stabilityScore > 70 ? "text-emerald-500" : "text-yellow-500")}>
                Graph Health
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-surface border border-border rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit className="w-24 h-24 text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-sm flex items-center justify-center border border-amber-500/20">
                <Activity className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Global Retention</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light text-text-primary">{(data.globalRetention * 100).toFixed(1)}%</span>
              <span className="text-sm text-green-500 font-medium">Stable</span>
            </div>
          </div>
        </div>

        <div 
          className="p-6 bg-surface border border-border rounded-sm relative overflow-hidden group"
          title="Topics with retention < 60% that risk cascading memory failure."
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-24 h-24 text-red-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-sm flex items-center justify-center border border-red-500/20">
                <Zap className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Pending Revisions</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light text-text-primary">{data.pendingRevisions.filter(r => r.urgency !== 'OPTIMAL').length}</span>
              <span className="text-sm text-red-400 font-medium">Requires attention</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface border border-border rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-24 h-24 text-blue-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center border border-blue-500/20">
                <BrainCircuit className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Decay Rate (λ)</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light text-text-primary">{data.averageLambda.toFixed(3)}</span>
              <span className="text-sm text-text-secondary font-medium">Personalized</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Insight Banner */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeUser.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-sm"
        >
          <BrainCircuit className="w-5 h-5 text-amber-500" />
          <p className="text-sm text-amber-600 dark:text-amber-300">
            <strong className="font-semibold text-amber-500 dark:text-amber-400">System Insight:</strong> {data.insight}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Chart Section */}
        <div className="lg:col-span-2 p-6 bg-surface border border-border rounded-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-medium text-text-primary">Cognitive Decay Curve</h2>
              <p className="text-sm text-text-secondary mt-1">Projected memory retention over 30 days based on your unique λ.</p>
            </div>
            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-xs text-amber-400 font-mono">MODEL: EBBINGHAUS_MODIFIED</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#141414" vertical={false} />
                <XAxis dataKey="day" stroke="#333" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#333" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2a2a2a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#666', marginBottom: '4px' }}
                  formatter={(value: number) => [`${value}%`, 'Retention']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Revision Threshold', fill: '#ef4444', fontSize: 12 }} />
                <Area type="monotone" dataKey="retention" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRetention)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Timeline */}
        <div className="p-6 bg-surface border border-border rounded-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-text-primary flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-amber-500" />
              Risk Timeline
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
            {data.riskTimeline.map((period, idx) => (
              <div key={idx} className="relative">
                <h3 className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-3">{period.period}</h3>
                <div className="space-y-3">
                  {period.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-center justify-between bg-background p-3 rounded-sm border border-border">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          topic.status === "CRITICAL" ? "bg-red-500" :
                          topic.status === "WARNING" ? "bg-yellow-500" : "bg-emerald-500"
                        )} />
                        <span className="text-sm font-medium text-text-primary">{topic.name}</span>
                      </div>
                      <span className="text-xs font-mono text-text-secondary">{topic.timeToFailure}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Action Plan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-surface border border-border rounded-sm flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-medium text-text-primary flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              AI Intervention Planner
            </h2>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Warning</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Stable</span>
            </div>
          </div>
          <span className="text-xs font-mono text-text-secondary bg-border px-2 py-1 rounded">LIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.pendingRevisions.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-background border border-border rounded-sm overflow-hidden transition-all hover:border-amber-500/50"
            >
              {/* Main Item Row */}
              <div 
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedItem(expandedItem === item.topic ? null : item.topic)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border",
                    item.urgency === 'CRITICAL' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                    item.urgency === 'WARNING' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" :
                    "bg-green-500/10 border-green-500/20 text-green-500"
                  )}>
                    {item.urgency === 'CRITICAL' ? <AlertTriangle className="w-4 h-4" /> : 
                     item.urgency === 'WARNING' ? <Clock className="w-4 h-4" /> : 
                     <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary group-hover:text-amber-400 transition-colors">{item.topic}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">{item.subject} • {item.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-0.5">Retention</p>
                    <p className={cn(
                      "text-sm font-bold",
                      item.retention < 0.5 ? "text-red-500" : item.retention < 0.75 ? "text-yellow-500" : "text-green-500"
                    )}>{(item.retention * 100).toFixed(0)}%</p>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-text-secondary transition-transform",
                    expandedItem === item.topic ? "rotate-180" : ""
                  )} />
                </div>
              </div>

              {/* Expanded AI Reasoning */}
              {expandedItem === item.topic && (
                <div className="px-4 pb-4 pt-2 bg-surface border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <BrainCircuit className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Why this revision?</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-background rounded border border-border">
                      <p className="text-[10px] text-text-secondary uppercase">Time Gap</p>
                      <p className="text-xs text-text-primary font-mono">{item.timeGap} days</p>
                    </div>
                    <div className="p-2 bg-background rounded border border-border">
                      <p className="text-[10px] text-text-secondary uppercase">Last Perf.</p>
                      <p className="text-xs text-text-primary font-mono">{(item.lastPerformance * 100).toFixed(0)}%</p>
                    </div>
                    <div className="p-2 bg-background rounded border border-border">
                      <p className="text-[10px] text-text-secondary uppercase">Updated λ</p>
                      <p className="text-xs text-text-primary font-mono">{item.lambda.toFixed(3)}</p>
                    </div>
                    <div className="p-2 bg-background rounded border border-border">
                      <p className="text-[10px] text-text-secondary uppercase">AI Confidence</p>
                      <p className="text-xs text-green-500 font-mono">{(item.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded bg-amber-500/5 border border-amber-500/10 mb-4">
                    <BrainCircuit className="w-4 h-4 text-amber-400 mt-0.5" />
                    <p className="text-xs text-amber-600 dark:text-amber-200/80 leading-relaxed">
                      <strong className="text-amber-500 dark:text-amber-400">System Insight:</strong> Based on your base decay rate ({activeUser.baseLambda}) and your last performance score of {Math.round(item.lastPerformance * 100)}%, the system predicts your retention for this topic has dropped to {(item.retention * 100).toFixed(0)}%.
                    </p>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartSession(item.id);
                    }}
                    disabled={startingSessionId === item.id || startedSessions.includes(item.id)}
                    className={cn(
                      "w-full py-2 text-white text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-2",
                      startedSessions.includes(item.id) 
                        ? "bg-green-500" 
                        : "bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
                    )}
                  >
                    {startingSessionId === item.id ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Initializing Environment...</>
                    ) : startedSessions.includes(item.id) ? (
                      <><CheckCircle2 className="w-4 h-4" /> Session Active</>
                    ) : (
                      "Start Revision Session"
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AppContent() {
  return (
    <div className="flex min-h-screen bg-background text-text-primary font-sans selection:bg-amber-500/30">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
