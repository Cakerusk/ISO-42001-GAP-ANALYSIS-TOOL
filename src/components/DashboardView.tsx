import { Organization, AssessmentValue } from '../types';
import { ISO_CLAUSES, ISO_ANNEX_CONTROLS } from '../isoData';
import { AlertCircle, CheckCircle2, Circle, HelpCircle, Activity, Award, ShieldAlert, Zap } from 'lucide-react';

interface DashboardViewProps {
  organization: Organization;
  assessments: Record<string, AssessmentValue>;
  onTabChange: (tab: string) => void;
}

export default function DashboardView({
  organization,
  assessments,
  onTabChange,
}: DashboardViewProps) {
  // Compute Stats
  const totalClauses = ISO_CLAUSES.length;
  const totalAnnex = ISO_ANNEX_CONTROLS.length;
  const totalItems = totalClauses + totalAnnex;

  let clausesCompliant = 0;
  let clausesPartial = 0;
  let clausesGap = 0;
  let clausesNotStarted = 0;

  ISO_CLAUSES.forEach((item) => {
    const val = assessments[item.id];
    if (!val || val.status === 'NOT_STARTED') clausesNotStarted++;
    else if (val.status === 'COMPLIANT') clausesCompliant++;
    else if (val.status === 'PARTIAL') clausesPartial++;
    else if (val.status === 'GAP') clausesGap++;
  });

  let annexCompliant = 0;
  let annexPartial = 0;
  let annexGap = 0;
  let annexNotStarted = 0;

  ISO_ANNEX_CONTROLS.forEach((item) => {
    const val = assessments[item.id];
    if (!val || val.status === 'NOT_STARTED') annexNotStarted++;
    else if (val.status === 'COMPLIANT') annexCompliant++;
    else if (val.status === 'PARTIAL') annexPartial++;
    else if (val.status === 'GAP') annexGap++;
  });

  const totalCompliant = clausesCompliant + annexCompliant;
  const totalPartial = clausesPartial + annexPartial;
  const totalGap = clausesGap + annexGap;
  const totalNotStarted = clausesNotStarted + annexNotStarted;

  // Percentage Calculations
  // Let's count compliance score: Compliant = 100%, Partial = 50%, Gap = 0%
  const scoreClauses = totalClauses > 0 
    ? Math.round(((clausesCompliant + clausesPartial * 0.5) / totalClauses) * 100) 
    : 0;
  const scoreAnnex = totalAnnex > 0 
    ? Math.round(((annexCompliant + annexPartial * 0.5) / totalAnnex) * 100) 
    : 0;
  const overallScore = totalItems > 0 
    ? Math.round(((totalCompliant + totalPartial * 0.5) / totalItems) * 100) 
    : 0;

  const assessmentProgress = Math.round(((totalItems - totalNotStarted) / totalItems) * 100);

  // Identify top gaps (prioritizing Clauses over Annex, status = GAP)
  const identifiedGaps = [
    ...ISO_CLAUSES.map(item => ({ ...item, isClause: true })),
    ...ISO_ANNEX_CONTROLS.map(item => ({ ...item, isClause: false }))
  ].filter(item => assessments[item.id]?.status === 'GAP')
   .slice(0, 5);

  // SVG Gauge calculations
  const circumference = 2 * Math.PI * 50; // r=50
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div id="dashboard-view" className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-[#0a0c12] border border-white/5 rounded-xl font-mono shadow-lg">
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Active Scoped Workspace</span>
          <h1 className="text-xl font-sans font-extrabold text-white tracking-tight">{organization.name}</h1>
        </div>
        <div className="mt-4 md:mt-0 flex gap-6 items-center">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase block">Certification Date</span>
            <span className="text-sm font-semibold text-slate-200">{organization.targetDate}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase block">AIMS Assessor</span>
            <span className="text-sm font-semibold text-slate-200">{organization.leadAssessor}</span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Core Circular Compliance Gauge */}
        <div id="gauge-card" className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-between text-center min-h-[300px] shadow-lg">
          <div className="w-full flex justify-between items-center pb-3 border-b border-white/5 mb-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
            <span>AIMS Compliance Index</span>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>

          <div className="relative w-40 h-40 my-3 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="50"
                className="stroke-white/5"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Highlight Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r="50"
                className="stroke-orange-500 transition-all duration-1000 ease-out"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-mono font-extrabold text-white">{overallScore}%</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mt-1">Weighted Score</span>
            </div>
          </div>

          <p className="text-xs font-sans text-slate-400 px-4 leading-relaxed">
            Calculated assessment based on ISO 42001 clauses and Annex A. Compliant counts 100%, Partial counts 50%, Gaps count 0%.
          </p>
        </div>

        {/* Section Metrics Splits */}
        <div id="sections-splits-card" className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 flex flex-col justify-between min-h-[300px] shadow-lg">
          <div className="w-full flex justify-between items-center pb-3 border-b border-white/5 mb-4 font-mono text-xs text-slate-400 uppercase tracking-wider">
            <span>System Posture Splitting</span>
            <Award className="w-4 h-4 text-orange-400" />
          </div>

          <div className="space-y-6">
            {/* Clauses Progress */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Clauses 4-10 (Framework)</span>
                <span className="text-orange-400 font-bold">{scoreClauses}%</span>
              </div>
              <div className="h-2 w-full bg-[#050608] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700"
                  style={{ width: `${scoreClauses}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{clausesCompliant} Compliant</span>
                <span>{clausesGap} Gaps</span>
              </div>
            </div>

            {/* Annex A Controls Progress */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Annex A Controls (Tactical)</span>
                <span className="text-orange-400 font-bold">{scoreAnnex}%</span>
              </div>
              <div className="h-2 w-full bg-[#050608] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700"
                  style={{ width: `${scoreAnnex}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{annexCompliant} Compliant</span>
                <span>{annexGap} Gaps</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111827]/40 border border-white/5 p-3 rounded-lg flex items-center justify-between mt-4">
            <span className="text-xs font-mono text-slate-400">Total Progress:</span>
            <span className="text-xs font-mono text-orange-400 font-bold">
              {totalItems - totalNotStarted} / {totalItems} Scored ({assessmentProgress}%)
            </span>
          </div>
        </div>

        {/* Counter breakdown summary grid */}
        <div id="stats-counter-card" className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 flex flex-col justify-between min-h-[300px] shadow-lg">
          <div className="w-full flex justify-between items-center pb-3 border-b border-white/5 mb-4 font-mono text-xs text-slate-400 uppercase tracking-wider">
            <span>Assessment Tallies</span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono">
            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg flex flex-col justify-between">
              <span className="text-slate-500 text-[10px] uppercase block">Compliant</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-orange-400">{totalCompliant}</span>
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
              </div>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg flex flex-col justify-between">
              <span className="text-slate-500 text-[10px] uppercase block">Partial</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-amber-500">{totalPartial}</span>
                <Circle className="w-4 h-4 text-amber-500 fill-amber-500/10" />
              </div>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg flex flex-col justify-between">
              <span className="text-slate-500 text-[10px] uppercase block">Gaps</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-red-500">{totalGap}</span>
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg flex flex-col justify-between">
              <span className="text-slate-500 text-[10px] uppercase block">Not Scored</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-slate-500">{totalNotStarted}</span>
                <HelpCircle className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              id="dash-begin-audit"
              onClick={() => onTabChange('clauses')}
              className="w-full py-2.5 bg-[#111827] border border-white/5 hover:border-orange-500/30 hover:bg-[#1f2937] rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-orange-400" /> Continue Assessing Gaps
            </button>
          </div>
        </div>
      </div>

      {/* Critical Gaps & Weaknesses Alert Panel */}
      <div id="critical-gaps-section" className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 font-mono shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <h2 className="text-sm uppercase tracking-wider text-slate-200">Critical Compliance Gaps</h2>
          </div>
          <span className="text-[10px] text-red-400 bg-red-950/40 border border-red-900/50 px-2 py-0.5 rounded-md">
            {totalGap} Active Failures
          </span>
        </div>

        {identifiedGaps.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            {totalNotStarted === totalItems 
              ? 'Assessment not started yet. Complete the clause checklists to detect corporate gaps.'
              : 'Excellent! No critical compliance gaps detected. All scored items are either Partial or Compliant.'}
          </div>
        ) : (
          <div className="space-y-3">
            {identifiedGaps.map((gap) => (
              <div 
                key={gap.id}
                id={`critical-gap-${gap.id}`}
                className="bg-[#111827]/40 border-l-2 border-l-red-500 border-t border-b border-r border-white/5 p-4 rounded-r-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-red-900/40 transition-all duration-200"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono border border-red-500/20">
                      ID: {gap.id}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {gap.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-sans font-semibold text-slate-200">{gap.title}</h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-1">
                    {gap.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    id={`fix-gap-${gap.id}`}
                    onClick={() => onTabChange(gap.isClause ? 'clauses' : 'annex')}
                    className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500 hover:bg-red-500/20 text-xs rounded transition-all font-mono cursor-pointer"
                  >
                    Assess Gap
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
