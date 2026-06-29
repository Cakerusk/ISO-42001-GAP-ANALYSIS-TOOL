import React, { useState } from 'react';
import { Organization, AssessmentValue, AIAnalysisResult } from '../types';
import { ISO_CLAUSES, ISO_ANNEX_CONTROLS } from '../isoData';
import { Sparkles, Brain, Loader, CheckCircle2, ShieldAlert, FileText, Download, ListTodo, CalendarRange } from 'lucide-react';

interface AIAnalysisViewProps {
  organization: Organization;
  assessments: Record<string, AssessmentValue>;
  analysisResult: AIAnalysisResult | null;
  onSaveAnalysisResult: (result: AIAnalysisResult) => void;
}

export default function AIAnalysisView({
  organization,
  assessments,
  analysisResult,
  onSaveAnalysisResult,
}: AIAnalysisViewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate assessment statistics
  const totalClauses = ISO_CLAUSES.length;
  const totalAnnex = ISO_ANNEX_CONTROLS.length;

  let clausesCompliant = 0;
  let clausesPartial = 0;
  let clausesGap = 0;

  ISO_CLAUSES.forEach((item) => {
    const val = assessments[item.id];
    if (val?.status === 'COMPLIANT') clausesCompliant++;
    else if (val?.status === 'PARTIAL') clausesPartial++;
    else if (val?.status === 'GAP') clausesGap++;
  });

  let annexCompliant = 0;
  let annexPartial = 0;
  let annexGap = 0;

  ISO_ANNEX_CONTROLS.forEach((item) => {
    const val = assessments[item.id];
    if (val?.status === 'COMPLIANT') annexCompliant++;
    else if (val?.status === 'PARTIAL') annexPartial++;
    else if (val?.status === 'GAP') annexGap++;
  });

  // Extract major gaps to send to Gemini
  const majorGapsList = [
    ...ISO_CLAUSES.map(i => ({ ...i, isClause: true })),
    ...ISO_ANNEX_CONTROLS.map(i => ({ ...i, isClause: false }))
  ]
    .filter(item => assessments[item.id]?.status === 'GAP')
    .map(item => ({
      id: item.id,
      title: item.title,
      notes: assessments[item.id]?.notes || 'No current notes.',
      actionPlan: assessments[item.id]?.actionPlan || 'No action plan drafted.'
    }));

  const customAssessorNotes = [
    ...ISO_CLAUSES.map(i => ({ id: i.id, notes: assessments[i.id]?.notes })),
    ...ISO_ANNEX_CONTROLS.map(i => ({ id: i.id, notes: assessments[i.id]?.notes }))
  ]
    .filter(item => item.notes && item.notes.trim() !== '')
    .map(item => `${item.id}: ${item.notes}`)
    .join('\n');

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analysis/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organization,
          clausesStats: { compliant: clausesCompliant, partial: clausesPartial, gap: clausesGap },
          annexStats: { compliant: annexCompliant, partial: annexPartial, gap: annexGap },
          majorGaps: majorGapsList.slice(0, 15), // Limiting to top 15 gaps to respect token payload
          customNotes: customAssessorNotes || "No additional notes."
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server responded with an error generating report.');
      }

      onSaveAnalysisResult({
        ...data,
        generatedAt: new Date().toISOString()
      });

    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'An unexpected failure occurred contacting the server-side analysis module.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-analysis-container" className="space-y-6">
      {/* Generate trigger header panel */}
      <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-8 font-mono flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Brain className="w-6 h-6 text-orange-400" />
            <h1 className="text-xl font-sans font-extrabold text-white tracking-tight">AI Audit Executive Reporter</h1>
          </div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-2xl">
            Trigger a deep governance assessment using Gemini 1.5 Flash. This module maps your compliance scores, assessor evidence, and action plans to outline an executive summary and strategic roadmaps.
          </p>
        </div>

        <div>
          <button
            id="trigger-ai-btn"
            disabled={loading}
            onClick={handleGenerateReport}
            className={`w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(249,115,22,0.25)] cursor-pointer ${
              loading ? 'opacity-55 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin text-white" /> Analyzing Gap Matrix...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" /> Generate Executive Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div id="ai-error-banner" className="bg-red-500/10 border border-red-500/20 rounded-lg p-5 font-mono flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-red-400">Analysis Generation Suspended</h3>
            <p className="text-xs text-red-300 font-sans leading-relaxed">{error}</p>
            <p className="text-[10px] text-slate-500 mt-2">
              Note: To resolve API issues, check that your `GEMINI_API_KEY` is fully configured inside AI Studio's Secrets panel under Settings.
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div id="ai-loading-panel" className="bg-[#0a0c12] border border-white/5 rounded-xl p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-lg">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            <Brain className="w-6 h-6 text-orange-400 absolute animate-pulse" />
          </div>
          <div className="font-mono text-sm space-y-1">
            <p className="text-slate-200 font-sans font-bold">Synthesizing ISO/IEC 42001 Framework Parameters</p>
            <p className="text-xs text-slate-500 max-w-sm font-sans mx-auto leading-relaxed">
              Gemini is assessing organizational maturity indicators, cross-referencing Annex A controls, and drafting remediation timelines.
            </p>
          </div>
        </div>
      )}

      {/* Show Results */}
      {!loading && analysisResult && (
        <div id="ai-results-panel" className="space-y-8 animate-fade-in">
          
          {/* Executive Summary Card */}
          <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 font-mono shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <FileText className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm uppercase tracking-wider text-slate-200">AIMS Executive Summary</h2>
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-line p-4 bg-[#111827]/40 rounded border border-white/5">
              {analysisResult.executiveSummary}
            </p>
          </div>

          {/* Strategic Roadmap Stages */}
          <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 font-mono shadow-lg">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/5">
              <CalendarRange className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm uppercase tracking-wider text-slate-200">Strategic Certification Roadmap</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {/* Phase 1 */}
              <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3 font-mono">
                    <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">PHASE 1</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{analysisResult.strategicRoadmap?.phase1?.duration || 'Weeks 1-8'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-2">{analysisResult.strategicRoadmap?.phase1?.title || 'Foundation & Alignment'}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {(analysisResult.strategicRoadmap?.phase1?.milestones || []).map((m: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-orange-400 font-mono mt-0.5">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3 font-mono">
                    <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">PHASE 2</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{analysisResult.strategicRoadmap?.phase2?.duration || 'Weeks 9-20'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-2">{analysisResult.strategicRoadmap?.phase2?.title || 'Implementation & Controls'}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {(analysisResult.strategicRoadmap?.phase2?.milestones || []).map((m: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-orange-400 font-mono mt-0.5">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3 font-mono">
                    <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">PHASE 3</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{analysisResult.strategicRoadmap?.phase3?.duration || 'Weeks 21-30'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-2">{analysisResult.strategicRoadmap?.phase3?.title || 'Audit Readiness'}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {(analysisResult.strategicRoadmap?.phase3?.milestones || []).map((m: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-orange-400 font-mono mt-0.5">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings Card Deck */}
          <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 font-mono shadow-lg">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/5">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <h2 className="text-sm uppercase tracking-wider text-slate-200">Key Audit Findings & Risks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              {(analysisResult.keyFindings || []).map((finding: any, idx: number) => {
                const isHigh = finding.riskLevel === 'High';
                const isMed = finding.riskLevel === 'Medium';
                
                return (
                  <div 
                    key={idx}
                    id={`finding-${idx}`}
                    className={`bg-[#111827]/40 border rounded-lg p-5 flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 ${
                      isHigh 
                        ? 'border-red-500/20 shadow-[inset_0_0_15px_rgba(239,68,68,0.03)]' 
                        : isMed 
                        ? 'border-amber-500/20' 
                        : 'border-blue-500/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[9px] uppercase font-mono border px-2 py-0.5 rounded font-bold ${
                          isHigh 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                            : isMed 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          Risk: {finding.riskLevel}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Ref: {finding.clauseOrControl}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-200 mb-2">{finding.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{finding.description}</p>
                    </div>

                    <div className="bg-[#111827] p-3 rounded border border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-semibold block mb-1">Audit Recommendation</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{finding.recommendation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policy requirements & Immediate Action Plan Split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
            {/* Policies */}
            <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <FileText className="w-5 h-5 text-orange-400" />
                <h2 className="text-sm uppercase tracking-wider text-slate-200">Required AIMS Policies Checklist</h2>
              </div>
              <div className="space-y-3 font-sans">
                {(analysisResult.requiredPolicies || []).map((policy: any, idx: number) => (
                  <div key={idx} className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg">
                    <h3 className="text-xs font-bold text-orange-400 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {policy.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{policy.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Action Checklist */}
            <div className="bg-[#0a0c12] border border-white/5 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <ListTodo className="w-5 h-5 text-orange-400" />
                <h2 className="text-sm uppercase tracking-wider text-slate-200">30-90 Day Action Items</h2>
              </div>
              <ul className="space-y-3 font-sans text-xs text-slate-300">
                {(analysisResult.immediateActionPlan || []).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#111827]/40 p-3 rounded border border-white/5">
                    <span className="w-5 h-5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center py-4 text-xs font-mono text-slate-500">
            Analysis Report compiled on {new Date(analysisResult.generatedAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
