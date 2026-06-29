import React from 'react';
import { ShieldCheck, Brain, ListChecks, History, ArrowRight, Activity, Cpu } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div id="landing-container" className="min-h-screen bg-[#050608] text-slate-300 flex flex-col justify-between overflow-hidden relative select-none font-sans antialiased">
      {/* Background radial gradient glow (orange-themed) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="no-print bg-[#0a0c12]/40 border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.35)] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-white font-extrabold tracking-tight text-xl font-sans">
            AIMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">42001</span>
          </span>
        </div>
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:block">
          ISO/IEC 42001 Compliance Framework
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase tracking-wider mb-6 animate-fade-in">
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>Artificial Intelligence Management System (AIMS)</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">ISO/IEC 42001</span> Compliance Journey
        </h1>

        <p className="text-base md:text-lg text-slate-400 font-sans max-w-3xl mt-6 leading-relaxed">
          The ultimate interactive workspace engineered to self-audit, trace, and establish an AI Management System (AIMS). Assess your organization's compliance with ISO/IEC 42001:2023 clauses and Annex A safety controls, build robust action plans, and instantly draft AI-powered executive reports.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            id="launch-workspace-btn"
            onClick={onStart}
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black font-sans font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center gap-3 cursor-pointer shadow-lg"
          >
            Launch Compliance Workspace
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16 md:mt-24 text-left font-sans">
          
          {/* Card 1 */}
          <div className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
              <ListChecks className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">01_Clause Tracker</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Verify your organizational core setup and processes against key AIMS requirements from Clauses 4 through 10.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">02_Annex A Controls</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Evaluate and monitor 38+ physical and logical AI-specific technical, administrative, and data safeguards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
              <Brain className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">03_Gemini Flash AI</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Leverage model-optimized AI generation to instantly draft gap analyses, strategic milestones, and policy checklists.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
              <History className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">04_Archival Ledger</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Keep full control of your compliance logs with instant offline transfers, JSON backups, and persistent snapshots.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-white/5 py-6 text-center text-[11px] font-mono text-slate-600 z-10 bg-[#050608]/80 backdrop-blur-sm">
        ISO/IEC 42001 Compliance Workspace — Engineered for Reliable AI Systems Governance and Auditing
      </footer>
    </div>
  );
}
