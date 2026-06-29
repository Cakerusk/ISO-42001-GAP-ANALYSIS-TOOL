import React, { useState } from 'react';
import DotField from './DotField';
import { 
  ShieldCheck, 
  Brain, 
  ListChecks, 
  History, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  FileSpreadsheet, 
  Scale, 
  Eye, 
  ShieldAlert, 
  HeartHandshake,
  CheckCircle2,
  Lock,
  Compass,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

// Decorative corner tick brackets for high-tech premium aesthetics
const CornerBorders = ({ className = "border-orange-500/30" }: { className?: string }) => {
  return (
    <>
      <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${className} pointer-events-none rounded-tl-[2px] z-10`} />
      <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r ${className} pointer-events-none rounded-tr-[2px] z-10`} />
      <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l ${className} pointer-events-none rounded-bl-[2px] z-10`} />
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${className} pointer-events-none rounded-br-[2px] z-10`} />
    </>
  );
};

// Reusable micro-grid crosshair indicator with glowing center-dot
const TechCrosshair = ({ className = "", showDot = true, animate = true }: { className?: string; showDot?: boolean; animate?: boolean }) => {
  return (
    <div className={`absolute w-16 h-16 pointer-events-none z-10 select-none ${className}`}>
      {/* Horizontal Line with fade */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-y-1/2" />
      {/* Vertical Line with fade */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent -translate-x-1/2" />
      
      {showDot && (
        <>
          {/* Glowing center dot */}
          <div className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] -translate-x-1/2 -translate-y-1/2 ${animate ? 'animate-pulse' : ''}`} />
          {/* Pulsing ring */}
          {animate && (
            <div className="absolute top-1/2 left-1/2 w-3.5 h-3.5 rounded-full border border-orange-500/25 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDuration: '4s' }} />
          )}
        </>
      )}
    </div>
  );
};

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Fairness & Bias Minimization",
      subtitle: "ANNEX A.10 CONTROLS",
      icon: Scale,
      color: "from-orange-500 to-amber-500",
      textColor: "text-orange-400",
      borderColor: "border-orange-500/20",
      glowColor: "rgba(249,115,22,0.15)",
      bgGlow: "bg-orange-500/5",
      description: "Annex A.10 elements map continuous model evaluation guidelines, advising organizations on establishing training set integrity, algorithmic bias detection, and ongoing validation protocols.",
      metrics: [
        { label: "Target Control Clause", value: "A.10.2 Data Processing & Validation" },
        { label: "Assessor Responsibility", value: "Verify statistical representation & eliminate feedback loops" },
        { label: "Audit Strategy", value: "Implement automated demographic parity audits" }
      ]
    },
    {
      title: "Transparency & Explainability",
      subtitle: "ANNEX A.7 CONTROLS",
      icon: Eye,
      color: "from-amber-500 to-yellow-500",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/20",
      glowColor: "rgba(245,158,11,0.15)",
      bgGlow: "bg-amber-500/5",
      description: "Supports drafting explicit AI system impact assessments. Gaptify matches your current audit profile to requirements for traceable automated decision-making and human oversight metrics.",
      metrics: [
        { label: "Target Control Clause", value: "A.7.2 Transparency Disclosures" },
        { label: "Assessor Responsibility", value: "Deliver human-interpretable explanations of model outputs" },
        { label: "Audit Strategy", value: "Archive SHAP/LIME explanation reports in system records" }
      ]
    },
    {
      title: "Robustness & Safety Guardrails",
      subtitle: "ANNEX A.8 CONTROLS",
      icon: ShieldAlert,
      color: "from-red-500 to-orange-500",
      textColor: "text-red-400",
      borderColor: "border-red-500/20",
      glowColor: "rgba(239,68,68,0.15)",
      bgGlow: "bg-red-500/5",
      description: "Aligns and reports on vulnerability testing, cybersecurity defense thresholds, and model security guidelines to prevent poisoning attacks, adversarial manipulations, and system malfunctions.",
      metrics: [
        { label: "Target Control Clause", value: "A.8.2 AI System Cybersecurity" },
        { label: "Assessor Responsibility", value: "Establish rate limits & defend against prompt injection" },
        { label: "Audit Strategy", value: "Schedule regular red-teaming penetration exercises" }
      ]
    },
    {
      title: "Social & Environmental Impact",
      subtitle: "ANNEX A.11 CONTROLS",
      icon: HeartHandshake,
      color: "from-orange-600 to-red-500",
      textColor: "text-orange-500",
      borderColor: "border-orange-600/20",
      glowColor: "rgba(234,88,12,0.15)",
      bgGlow: "bg-orange-600/5",
      description: "ISO/IEC 42001 calls for assessing systemic resource implications. Use Gaptify to trace and document your high-compute operational structures, environmental footprints, and societal safety impact.",
      metrics: [
        { label: "Target Control Clause", value: "A.11.2 Sustainable Resource Management" },
        { label: "Assessor Responsibility", value: "Log server-side compute metrics and carbon impact" },
        { label: "Audit Strategy", value: "Offset resource utilization through certified green cloud zones" }
      ]
    }
  ];

  const scrollToFeatures = () => {
    const el = document.getElementById('core-capabilities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="landing-container" className="min-h-screen bg-[#050608] text-slate-300 flex flex-col justify-between relative font-sans antialiased overflow-x-hidden w-full">
      
      {/* Background Decorations Layer to prevent overflow-y stretching */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Ambient Side-Gradient Wash (inspired by futurecoding.ai & image 1) */}
        <div className="absolute left-0 top-0 bottom-0 w-[120px] sm:w-[240px] md:w-[480px] bg-gradient-to-r from-orange-600/20 via-amber-600/10 to-transparent pointer-events-none z-0 filter blur-[40px] mix-blend-plus-lighter" />
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent pointer-events-none z-0" />

        {/* Dynamic DotField Background Component */}
        <div className="absolute inset-0 w-full h-full opacity-90">
          <DotField
            dotRadius={1.5}
            dotSpacing={16}
            cursorRadius={400}
            cursorForce={0.08}
            bulgeOnly={true}
            bulgeStrength={50}
            glowRadius={220}
            sparkle={true}
            waveAmplitude={0.5}
            gradientFrom="rgba(249, 115, 22, 0.45)"
            gradientTo="rgba(245, 158, 11, 0.28)"
            glowColor="rgba(234, 88, 12, 0.18)"
          />
        </div>

        {/* Animated Cyber-Grid Background Layer */}
        <div className="absolute inset-0 bg-grid-pattern animate-grid-scroll opacity-40" />
        
        {/* Retro-futuristic Tech Crosshairs / Grid Intersection Markers */}
        <TechCrosshair className="top-[10%] left-[6%] md:left-[12%]" />
        <TechCrosshair className="top-[18%] right-[5%] md:right-[12%]" />
        <TechCrosshair className="top-[38%] left-[4%] md:left-[15%]" />
        <TechCrosshair className="top-[48%] right-[3%] md:right-[10%]" />
        <TechCrosshair className="top-[78%] left-[5%] md:left-[14%]" />
        <TechCrosshair className="top-[86%] right-[8%] md:right-[18%]" />
        
        {/* Minimal auxiliary grid intersections to build the spatial grid board */}
        <TechCrosshair className="top-[28%] left-[48%] opacity-65 scale-75" showDot={true} animate={false} />
        <TechCrosshair className="top-[62%] left-[25%] opacity-65 scale-75" showDot={true} animate={false} />
        <TechCrosshair className="top-[72%] right-[40%] opacity-65 scale-75" showDot={true} animate={false} />
        <TechCrosshair className="top-[93%] left-[45%] opacity-65 scale-75" showDot={true} animate={false} />
        
        {/* Animated Background Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[40%] rounded-full bg-orange-500/10 blur-[140px] animate-pulse-slow" />
        <div className="absolute top-[35%] right-[-10%] w-[50%] h-[40%] rounded-full bg-amber-600/5 blur-[120px] animate-pulse-slower" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[35%] rounded-full bg-orange-500/10 blur-[130px] animate-pulse-slow" />

        {/* Floating Sparkle Particles in the Background */}
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-orange-500/30 rounded-full animate-float-slow" />
        <div className="absolute top-[45%] left-[8%] w-2 h-2 bg-amber-500/20 rounded-full animate-float-medium" />
        <div className="absolute top-[25%] right-[15%] w-1 h-1 bg-orange-400/40 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[70%] right-[25%] w-2.5 h-2.5 bg-orange-500/15 rounded-full animate-float-medium" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[85%] left-[30%] w-1.5 h-1.5 bg-amber-400/20 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="no-print bg-[#0a0c12]/40 border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-md z-10 sticky top-0 w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.35)] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-white font-extrabold tracking-tight text-xl font-sans uppercase">
            GAP<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">TIFY</span>
          </span>
        </div>
      </header>

      {/* Main Core split view layout */}
      <main className="flex-1 w-full flex flex-col items-center z-10 relative">
        
        {/* SECTION 1: HERO AREA (Takes up full initial viewport to hide the 4 boxes below the fold) */}
        <section className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-12 relative w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-orange-500/10 border border-orange-500/15 text-orange-400 font-mono text-xs uppercase tracking-wider mb-6 hover:bg-orange-500/15 hover:border-orange-500/25 transition-all duration-300 transform hover:scale-102 relative overflow-hidden">
            <CornerBorders className="border-orange-500/40" />
            <Cpu className="w-3.5 h-3.5 animate-pulse text-orange-500" />
            <span>Artificial Intelligence Management System (AIMS)</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">ISO/IEC 42001</span> Compliance Journey
          </h1>

          <p className="text-base md:text-lg text-slate-400 font-sans max-w-3xl mt-6 leading-relaxed">
            The ultimate interactive workspace engineered to self-audit, trace, and establish an AI Management System (AIMS). Assess your organization's compliance with ISO/IEC 42001:2023 clauses and Annex A safety controls, build robust action plans, and instantly draft AI-powered executive reports.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center relative p-1.5 bg-[#0a0c12]/30 border border-white/5 rounded-xl">
            <CornerBorders className="border-orange-500/30" />
            <button
              id="launch-workspace-btn"
              onClick={onStart}
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black font-sans font-extrabold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] active:scale-[0.98] flex items-center gap-3 cursor-pointer shadow-lg relative overflow-hidden"
            >
              <CornerBorders className="border-black/40" />
              Launch Compliance Workspace
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <button 
            onClick={scrollToFeatures}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-orange-400 transition-colors focus:outline-none cursor-pointer group"
            title="Scroll Down to Explore"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity">Explore Capabilities</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-orange-500/80" />
          </button>
        </section>

        {/* SECTION 2: CORE CAPABILITIES (The 4 boxes pushed below the fold) */}
        <section id="core-capabilities" className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 border-t border-white/5 scroll-mt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold">CORE CAPABILITIES</span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight mt-1">Gaptify Core Workspace Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left font-sans">
            
            {/* Card 1 */}
            <div 
              className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden" 
              onClick={onStart}
            >
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                <ListChecks className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>01_Clause Tracker</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-400 transition-colors duration-300" />
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                Verify your organizational core setup and processes against key AIMS requirements from Clauses 4 through 10.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden" 
              onClick={onStart}
            >
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>02_Annex A Controls</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-400 transition-colors duration-300" />
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                Evaluate and monitor 38+ physical and logical AI-specific technical, administrative, and data safeguards.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden" 
              onClick={onStart}
            >
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                <Brain className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>03_Gemini Flash AI</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-400 transition-colors duration-300" />
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                Leverage model-optimized AI generation to instantly draft gap analyses, strategic milestones, and policy checklists.
              </p>
            </div>

            {/* Card 4 */}
            <div 
              className="bg-[#0a0c12]/60 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden" 
              onClick={onStart}
            >
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                <History className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>04_Archival Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-400 transition-colors duration-300" />
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                Keep full control of your compliance logs with instant offline transfers, JSON backups, and persistent snapshots.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: HOW THE TOOL WORKS */}
        <section id="how-it-works" className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 border-t border-white/5 text-left">
          <div className="flex flex-col items-center justify-center text-center gap-2 pb-6 border-b border-white/5 mb-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold">OPERATIONAL DIRECTIVE</span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight mt-1">How Gaptify Powers Governance</h2>
            <p className="text-xs text-slate-400 font-sans max-w-2xl leading-relaxed mt-2">
              A structured, interactive compliance pipeline designed to move you from baseline self-assessment to certified audit readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative bg-[#0a0c12]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-orange-500/10 hover:bg-[#0c0e16]/50 transition-all duration-300 group overflow-hidden">
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div>
                <span className="font-mono text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 font-bold">STEP 01</span>
                <h3 className="text-base font-bold text-slate-200 mt-4 mb-2 font-sans flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" /> Configure & Scope
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Set up your organization's compliance profile. Choose target baselines, input active assessors, and align tracking with specific operating models.
                </p>
              </div>
            </div>

            <div className="relative bg-[#0a0c12]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-orange-500/10 hover:bg-[#0c0e16]/50 transition-all duration-300 group overflow-hidden">
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div>
                <span className="font-mono text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 font-bold">STEP 02</span>
                <h3 className="text-base font-bold text-slate-200 mt-4 mb-2 font-sans flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" /> Evaluate Control Gaps
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Go line-by-line through the standard clauses and safety checkpoints. Log physical evidence paths, set current conformance statuses, and assign custom remediation owners.
                </p>
              </div>
            </div>

            <div className="relative bg-[#0a0c12]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-orange-500/10 hover:bg-[#0c0e16]/50 transition-all duration-300 group overflow-hidden">
              <CornerBorders className="border-white/10 group-hover:border-orange-500/50 transition-colors duration-300" />
              <div>
                <span className="font-mono text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 font-bold">STEP 03</span>
                <h3 className="text-base font-bold text-slate-200 mt-4 mb-2 font-sans flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" /> Generate Roadmaps
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Activate the Gemini 1.5 Flash compiler. The system synthesizes your documented scores to draft full executive reports, strategic timeline milestones, and mandatory policy templates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RESPONSIBLE AI & TRUST - REIMAGINED DISTINCT INTERACTIVE LAYOUT */}
        <section id="responsible-ai-alignment" className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 border-t border-white/5 text-left">
          <div className="flex flex-col items-center justify-center text-center gap-2 pb-6 border-b border-white/5 mb-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold">TRUST & INTEGRITY BOARD</span>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight mt-1">Responsible AI Alignment</h2>
            <p className="text-xs text-slate-400 font-sans max-w-2xl leading-relaxed mt-2">
              Gaptify maps the fundamental objectives of ethical AI systems directly to core ISO/IEC 42001 safeguards. Explore the operational matrices below.
            </p>
          </div>

          {/* Interactive Split Column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            
            {/* Left side: Pillar Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 justify-center">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isActive = activePillar === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePillar(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer focus:outline-none relative group overflow-hidden ${
                      isActive 
                        ? 'bg-[#0f111a] border-orange-500/40 shadow-[0_4px_20px_rgba(249,115,22,0.1)] scale-[1.01]' 
                        : 'bg-[#0a0c12]/40 border-white/5 hover:border-white/10 hover:bg-[#07090e]'
                    }`}
                  >
                    {/* Glowing Corner Ticks */}
                    <CornerBorders className="border-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Glowing Accent Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-amber-600" />
                    )}
                    
                    <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-orange-500/10 text-orange-400 rotate-3' 
                        : 'bg-slate-900/60 text-slate-500 group-hover:text-slate-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className={`block font-mono text-[9px] font-bold tracking-widest leading-none ${
                        isActive ? 'text-orange-400' : 'text-slate-600 group-hover:text-slate-500'
                      }`}>
                        {pillar.subtitle}
                      </span>
                      <h4 className={`text-sm font-bold mt-1.5 truncate ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {pillar.title}
                      </h4>
                    </div>

                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-orange-500 scale-125' : 'bg-transparent'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right side: Detailed Workspace Board */}
            <div className="lg:col-span-7 flex">
              <div 
                className="w-full bg-gradient-to-b from-[#0c0d15] to-[#07080d] border border-orange-500/10 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-500"
                style={{
                  boxShadow: `0 10px 30px -10px ${pillars[activePillar].glowColor}`
                }}
              >
                {/* Glowing Corner Ticks */}
                <CornerBorders className="border-orange-500/30" />

                {/* Background active glow bubble */}
                <div className={`absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-25 blur-[60px] pointer-events-none transition-all duration-500 ${pillars[activePillar].bgGlow}`} />

                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/5 mb-6">
                    <span className="font-mono text-xs font-bold text-orange-400/90 tracking-wider">
                      {pillars[activePillar].subtitle} // DETAILED PROTOCOL
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      COMPLIANCE READY
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    {React.createElement(pillars[activePillar].icon, { className: "w-5 h-5 text-orange-400" })}
                    {pillars[activePillar].title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-4">
                    {pillars[activePillar].description}
                  </p>

                  {/* Operational parameters checklist */}
                  <div className="mt-8 space-y-4">
                    {pillars[activePillar].metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-slate-900/30 border border-white/5 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-white/10 transition-colors duration-300">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500/80 shrink-0" />
                          <span className="font-sans font-bold text-slate-300 text-xs">{metric.label}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 text-left sm:text-right bg-slate-950 px-2.5 py-0.5 rounded border border-white/5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>METRIC: ALIGNED_WITH_ISO_42001_ANNEX_A</span>
                  <span>GAPTIFY COMPLIANCE SECURE</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Structured Footer & Compliance Badges (Strictly aligned to edge, zero margin gaps) */}
      <footer className="no-print border-t border-white/5 bg-[#07080c] relative z-10 pt-16 pb-8 font-sans w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Logo and brief summary */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.35)] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
                <span className="text-white font-extrabold tracking-tight text-lg uppercase">
                  GAP<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">TIFY</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The authoritative governance workspace and framework analyzer for AI Management Systems (AIMS). Build audit confidence and operational transparency.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h5 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</h5>
              <button 
                onClick={onStart}
                className="text-xs text-slate-500 hover:text-orange-400 text-left transition-colors font-mono uppercase bg-transparent border-none p-0 cursor-pointer"
              >
                // LAUNCH_ANALYZER
              </button>
              <button 
                onClick={onStart}
                className="text-xs text-slate-500 hover:text-orange-400 text-left transition-colors font-mono uppercase bg-transparent border-none p-0 cursor-pointer"
              >
                // CLAUSE_TRACKER
              </button>
              <button 
                onClick={onStart}
                className="text-xs text-slate-500 hover:text-orange-400 text-left transition-colors font-mono uppercase bg-transparent border-none p-0 cursor-pointer"
              >
                // ANNEX_A_CONTROLS
              </button>
            </div>

            {/* Technical Parameters / Specs */}
            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs">
              <h5 className="font-bold text-slate-400 uppercase tracking-widest">Technical Specifications</h5>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-500">ENGINE_VERSION:</span>
                <span className="text-slate-400 font-bold">1.0.4-RELEASE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-500">LLM_COMPILER:</span>
                <span className="text-orange-400 font-bold">GEMINI 1.5 FLASH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">STANDARDS_MAPPING:</span>
                <span className="text-slate-400 font-bold">ISO/IEC 42001:2023</span>
              </div>
            </div>

          </div>

          {/* Compliance Badges Grid */}
          <div className="border-t border-b border-white/5 py-8 my-8 flex flex-wrap gap-4 items-center justify-center sm:justify-between text-left">
            <div className="text-center sm:text-left">
              <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">AUDIT READY COMPLIANCE</span>
              <p className="text-[11px] text-slate-400 font-sans">Gaptify matches the strict regulatory targets of top security certifications.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {/* Badge 1: ISO 42001 */}
              <div className="px-3.5 py-1.5 bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/30 rounded-lg flex items-center gap-2 transition-all duration-300">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-mono text-[10px] font-bold text-slate-200">ISO/IEC 42001</span>
              </div>

              {/* Badge 2: SOC 2 Type II */}
              <div className="px-3.5 py-1.5 bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-white/10 rounded-lg flex items-center gap-2 transition-all duration-300">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[10px] font-bold text-slate-200">SOC 2 TYPE II READY</span>
              </div>

              {/* Badge 3: GDPR Compliant */}
              <div className="px-3.5 py-1.5 bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-white/10 rounded-lg flex items-center gap-2 transition-all duration-300">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[10px] font-bold text-slate-200">GDPR ALIGNED</span>
              </div>
            </div>
          </div>

          {/* Copyright and signature */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600 mt-4">
            <span>© {new Date().getFullYear()} GAPTIFY COMPLIANCE WORKSPACE. ALL RIGHTS RESERVED.</span>
            <span>DEVELOPED FOR ISO/IEC 42001 AUDITORS AND AI TEAM LEADERS.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
