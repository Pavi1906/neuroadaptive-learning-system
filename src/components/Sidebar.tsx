import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, BarChart2, BookOpen, LogOut, BrainCircuit, Trophy, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [showRecruiter, setShowRecruiter] = useState(false);

  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/planner", label: "AI Planner", icon: Calendar },
    { path: "/analytics", label: "Analytics", icon: BarChart2 },
    { path: "/knowledge", label: "Knowledge Base", icon: BookOpen },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="w-64 h-screen border-r border-border bg-background flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-12 group cursor-pointer">
        <div className="w-8 h-8 bg-amber-500/10 rounded-sm flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <BrainCircuit className="w-4 h-4 text-amber-500 relative z-10" />
        </div>
        <div>
          <h1 className="font-mono font-bold uppercase tracking-wider text-text-primary group-hover:text-amber-400 transition-colors">NALS</h1>
          <p className="text-[10px] text-amber-500 dark:text-amber-400 font-mono uppercase tracking-widest">NeuroAdaptive</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative block"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-surface border border-border  rounded-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors z-10",
                isActive 
                  ? "text-amber-500 dark:text-amber-400 font-medium" 
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
              )}>
                <Icon className={cn("w-4 h-4", isActive ? "text-amber-500" : "")} />
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border space-y-2">
        <div className="relative">
          <button 
            onClick={() => setShowRecruiter(!showRecruiter)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all w-full text-left group border",
              showRecruiter 
                ? "bg-amber-500/10 text-amber-500 border-amber-500/30" 
                : "text-text-secondary hover:text-amber-400 hover:bg-amber-500/5 border-transparent"
            )}
          >
            <Briefcase className={cn("w-4 h-4 transition-transform", showRecruiter ? "scale-110" : "")} />
            Recruiter Mode
          </button>
          
          <AnimatePresence>
            {showRecruiter && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 w-full mb-2 p-4 bg-surface border border-amber-500/30 rounded-sm shadow-xl z-50"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                    <span className="text-xl">👋</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">Looking to hire?</h4>
                    <p className="text-xs text-text-secondary mt-1">I built this AI system to showcase my full-stack and ML integration skills.</p>
                  </div>
                  <a 
                    href="mailto:pavithra061204@gmail.com"
                    className="block w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-sm transition-colors"
                  >
                    Contact Me
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ThemeToggle />
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-all w-full text-left group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Disconnect
        </button>
      </div>
    </div>
  );
}
