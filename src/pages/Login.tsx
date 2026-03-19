import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary font-sans">
      <div className="w-full max-w-md p-8 bg-surface border border-border rounded-sm ">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-amber-500/10 rounded-sm flex items-center justify-center mb-4 border border-amber-500/20">
            <BrainCircuit className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-2xl font-mono font-bold uppercase tracking-wider">NALS</h1>
          <p className="text-text-secondary text-sm mt-2">NeuroAdaptive Learning System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-text-primary"
              placeholder="demo@nals.ai"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-text-primary"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-medium rounded-sm px-4 py-3 text-sm hover:bg-amber-600 transition-colors mt-6"
          >
            Access System
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-secondary font-mono">DEMO MODE ACTIVE</p>
          <p className="text-xs text-text-secondary mt-1">Use any email/password to enter.</p>
        </div>
      </div>
    </div>
  );
}
