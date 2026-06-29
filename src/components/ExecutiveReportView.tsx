import React from 'react';
import { Organization, AssessmentValue, AIAnalysisResult } from '../types';
import { ISO_CLAUSES, ISO_ANNEX_CONTROLS } from '../isoData';
import { Download, Printer, Shield, FileText, CheckCircle2, Circle, AlertCircle, Award } from 'lucide-react';

interface ExecutiveReportViewProps {
  organization: Organization;
  assessments: Record<string, AssessmentValue>;
  analysisResult: AIAnalysisResult | null;
}

export default function ExecutiveReportView({
  organization,
  assessments,
  analysisResult,
}: ExecutiveReportViewProps) {
  // Stats
  const totalClauses = ISO_CLAUSES.length;
  const totalAnnex = ISO_ANNEX_CONTROLS.length;
  const totalItems = totalClauses + totalAnnex;

  let clausesCompliant = 0, clausesPartial = 0, clausesGap = 0, clausesNotStarted = 0;
  ISO_CLAUSES.forEach(i => {
    const val = assessments[i.id];
    if (!val || val.status === 'NOT_STARTED') clausesNotStarted++;
    else if (val.status === 'COMPLIANT') clausesCompliant++;
    else if (val.status === 'PARTIAL') clausesPartial++;
    else if (val.status === 'GAP') clausesGap++;
  });

  let annexCompliant = 0, annexPartial = 0, annexGap = 0, annexNotStarted = 0;
  ISO_ANNEX_CONTROLS.forEach(i => {
    const val = assessments[i.id];
    if (!val || val.status === 'NOT_STARTED') annexNotStarted++;
    else if (val.status === 'COMPLIANT') annexCompliant++;
    else if (val.status === 'PARTIAL') annexPartial++;
    else if (val.status === 'GAP') annexGap++;
  });

  const compliantCount = clausesCompliant + annexCompliant;
  const partialCount = clausesPartial + annexPartial;
  const gapCount = clausesGap + annexGap;
  const unscoredCount = clausesNotStarted + annexNotStarted;

  const complianceScore = totalItems > 0
    ? Math.round(((compliantCount + partialCount * 0.5) / totalItems) * 100)
    : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHTML = () => {
    // Compile findings
    const findingsHTML = (analysisResult?.keyFindings || []).map((f: any) => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid ${f.riskLevel === 'High' ? '#ef4444' : f.riskLevel === 'Medium' ? '#f59e0b' : '#3b82f6'}; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 11px; text-transform: uppercase; font-family: monospace; font-weight: bold; color: ${f.riskLevel === 'High' ? '#ef4444' : f.riskLevel === 'Medium' ? '#d97706' : '#2563eb'};">${f.riskLevel} Risk</span>
          <span style="font-size: 11px; font-family: monospace; color: #64748b;">Ref: ${f.clauseOrControl}</span>
        </div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #1e293b;">${f.title}</h4>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #475569; line-height: 1.5;">${f.description}</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; font-size: 11px; color: #334155;">
          <strong>Recommendation:</strong> ${f.recommendation}
        </div>
      </div>
    `).join('');

    const policiesHTML = (analysisResult?.requiredPolicies || []).map((p: any) => `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
        <strong style="font-size: 12px; color: #0f172a; display: block; margin-bottom: 4px;">• ${p.name}</strong>
        <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.4;">${p.description}</p>
      </div>
    `).join('');

    const actionsHTML = (analysisResult?.immediateActionPlan || []).map((item: string, idx: number) => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 8px; display: flex; align-items: start; gap: 10px;">
        <span style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-family: monospace; font-size: 11px; font-weight: bold; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${idx + 1}</span>
        <span style="font-size: 12px; color: #334155; line-height: 1.4;">${item}</span>
      </div>
    `).join('');

    // Generate full HTML page
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISO/IEC 42001 Gap Analysis Report - ${organization.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #334155;
      background-color: #f8fafc;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      padding: 40px;
    }
    header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    .header-title-grid {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo-badge {
      background: #0f172a;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 13px;
      letter-spacing: 0.05em;
    }
    .org-details-grid {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      background: #f1f5f9;
      border-radius: 8px;
      padding: 20px;
    }
    .org-stat-box h5 {
      margin: 0 0 6px 0;
      font-size: 10px;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.05em;
    }
    .org-stat-box p {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
    }
    .metrics-grid {
      display: grid;
      grid-template-cols: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    .metric-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    .metric-card.compliant { border-top: 4px solid #10b981; }
    .metric-card.partial { border-top: 4px solid #f59e0b; }
    .metric-card.gap { border-top: 4px solid #ef4444; }
    .metric-card.score { border-top: 4px solid #8b5cf6; background: #faf5ff; }
    
    .metric-num {
      font-size: 24px;
      font-weight: bold;
      margin-top: 8px;
      color: #0f172a;
    }
    h2 {
      font-size: 18px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 10px;
      margin-top: 40px;
      margin-bottom: 20px;
      color: #0f172a;
    }
    .sec-summary {
      font-size: 13.5px;
      line-height: 1.6;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-title-grid">
        <div>
          <h1 style="margin:0; font-size: 24px; color: #0f172a;">ISO/IEC 42001 Gap Analysis Report</h1>
          <p style="margin:6px 0 0 0; font-size:12px; color:#64748b;">AIMS Governance & Assurance Framework</p>
        </div>
        <div class="logo-badge">ISO 42001 ASSURED</div>
      </div>
    </header>

    <div class="org-details-grid">
      <div class="org-stat-box">
        <h5>Organization</h5>
        <p>${organization.name}</p>
      </div>
      <div class="org-stat-box">
        <h5>Industry</h5>
        <p>${organization.industry}</p>
      </div>
      <div class="org-stat-box">
        <h5>AI Core Stack</h5>
        <p>${organization.aiTech}</p>
      </div>
      <div class="org-stat-box">
        <h5>Lead Assessor</h5>
        <p>${organization.leadAssessor}</p>
      </div>
      <div class="org-stat-box">
        <h5>Maturity Rating</h5>
        <p>${organization.maturityLevel}</p>
      </div>
      <div class="org-stat-box">
        <h5>Target Date</h5>
        <p>${organization.targetDate}</p>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card score">
        <div style="font-size: 10px; text-transform: uppercase; color: #7c3aed; font-weight: bold;">Compliance Index</div>
        <div class="metric-num">${complianceScore}%</div>
      </div>
      <div class="metric-card compliant">
        <div style="font-size: 10px; text-transform: uppercase; color: #10b981; font-weight: bold;">Compliant</div>
        <div class="metric-num">${compliantCount}</div>
      </div>
      <div class="metric-card partial">
        <div style="font-size: 10px; text-transform: uppercase; color: #f59e0b; font-weight: bold;">Partial</div>
        <div class="metric-num">${partialCount}</div>
      </div>
      <div class="metric-card gap">
        <div style="font-size: 10px; text-transform: uppercase; color: #ef4444; font-weight: bold;">Gaps</div>
        <div class="metric-num">${gapCount}</div>
      </div>
    </div>

    ${analysisResult ? `
      <h2>Executive Summary of Findings</h2>
      <div class="sec-summary">
        ${analysisResult.executiveSummary.replace(/\n/g, '<br>')}
      </div>

      <h2>Detailed Vulnerability & Risk Findings</h2>
      <div style="margin-bottom: 30px;">
        ${findingsHTML}
      </div>

      <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-top: 30px;">
        <div>
          <h2>Required Policies</h2>
          ${policiesHTML}
        </div>
        <div>
          <h2>Immediate Actions</h2>
          ${actionsHTML}
        </div>
      </div>
    ` : `
      <div style="text-align: center; padding: 40px; border: 1px dashed #cbd5e1; border-radius: 8px; color: #64748b; font-size: 13px;">
        Executive AI report analysis has not been generated yet. Open the tool and trigger "Generate Executive Analysis" to include recommendations.
      </div>
    `}

    <footer style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; font-family: monospace;">
      Report compiled automatically on ${new Date().toLocaleDateString()} via ISO 42001 Gap Analyzer.
    </footer>
  </div>
</body>
</html>
    `;

    // Download flow
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISO-42001-Executive-Report-${organization.name.replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="executive-report-view" className="space-y-6">
      {/* Top action control rail */}
      <div className="flex items-center justify-between p-4 bg-[#0a0c12] border border-white/5 rounded-xl font-mono shadow-lg">
        <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-orange-400" /> Document Deliverables
        </span>
        <div className="flex gap-3">
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-4 py-2 bg-[#111827] border border-white/5 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
          <button
            id="download-html-report-btn"
            onClick={handleDownloadHTML}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-orange-500/10"
          >
            <Download className="w-4 h-4" /> Download HTML Report
          </button>
        </div>
      </div>

      {/* Preview container */}
      <div id="printable-area" className="bg-white text-[#1e293b] rounded-xl p-8 shadow-xl border border-gray-200 mx-auto max-w-4xl font-sans print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        <div className="border-b-2 border-gray-200 pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">ISO/IEC 42001 GAP ASSESSMENT REPORT</h1>
            <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-widest">ARTIFICIAL INTELLIGENCE MANAGEMENT SYSTEM (AIMS)</p>
          </div>
          <div className="bg-[#0f172a] text-white text-[10px] font-mono tracking-widest uppercase font-extrabold px-3 py-1.5 rounded-md">
            ISO 42001 CERTIFICATION REPORT
          </div>
        </div>

        {/* Info grids */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 border border-gray-100 p-6 rounded-lg mb-8 font-sans">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">Organization</span>
            <span className="text-sm font-bold text-gray-800">{organization.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">Industry Sect</span>
            <span className="text-sm font-bold text-gray-800">{organization.industry}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">AI Use Case</span>
            <span className="text-sm font-bold text-gray-800 line-clamp-1">{organization.aiUseCase}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">Assessor / Lead</span>
            <span className="text-sm font-bold text-gray-800">{organization.leadAssessor}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">Maturity Level</span>
            <span className="text-sm font-bold text-gray-800">{organization.maturityLevel}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block tracking-wider font-semibold mb-1">Target Audit Date</span>
            <span className="text-sm font-bold text-gray-800">{organization.targetDate}</span>
          </div>
        </div>

        {/* Stats and compliance bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <span className="text-[10px] uppercase font-mono text-[#7c3aed] font-bold">Compliance Index</span>
            <div className="text-3xl font-mono font-black text-gray-800 mt-1">{complianceScore}%</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg bg-[#f0fdf4]">
            <span className="text-[10px] uppercase font-mono text-[#10b981] font-bold">Compliant Controls</span>
            <div className="text-3xl font-mono font-black text-[#10b981] mt-1">{compliantCount}</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg bg-[#fffbeb]">
            <span className="text-[10px] uppercase font-mono text-[#f59e0b] font-bold">Partial Progress</span>
            <div className="text-3xl font-mono font-black text-[#d97706] mt-1">{partialCount}</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg bg-[#fef2f2]">
            <span className="text-[10px] uppercase font-mono text-[#ef4444] font-bold">Outstanding Gaps</span>
            <div className="text-3xl font-mono font-black text-[#ef4444] mt-1">{gapCount}</div>
          </div>
        </div>

        {/* Dynamic AI contents */}
        {analysisResult ? (
          <div className="space-y-8">
            <div className="pb-6 border-b border-gray-100">
              <h2 className="text-sm font-mono tracking-widest text-[#0f172a] font-black uppercase mb-3 flex items-center gap-1.5 border-b pb-2">
                <FileText className="w-4 h-4 text-[#8b5cf6]" /> Executive Summary
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-5 rounded border">
                {analysisResult.executiveSummary}
              </p>
            </div>

            <div className="pb-6 border-b border-gray-100">
              <h2 className="text-sm font-mono tracking-widest text-[#0f172a] font-black uppercase mb-4 flex items-center gap-1.5 border-b pb-2">
                <Shield className="w-4 h-4 text-red-500" /> Vulnerabilities & Gaps Map
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(analysisResult.keyFindings || []).map((f: any, idx: number) => {
                  const isHigh = f.riskLevel === 'High';
                  const isMed = f.riskLevel === 'Medium';
                  return (
                    <div key={idx} className={`border p-4 rounded-lg ${isHigh ? 'border-red-200 bg-red-50/20' : isMed ? 'border-amber-200 bg-amber-50/20' : 'border-blue-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-extrabold ${isHigh ? 'bg-red-100 text-red-700' : isMed ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                          Risk: {f.riskLevel}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">{f.clauseOrControl}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-800 mb-1">{f.title}</h4>
                      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{f.description}</p>
                      <div className="bg-white p-2.5 rounded border text-[11px] text-gray-600 leading-normal">
                        <strong>Remediation:</strong> {f.recommendation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              <div>
                <h2 className="text-sm font-mono tracking-widest text-[#0f172a] font-black uppercase mb-3 flex items-center gap-1.5 border-b pb-2">
                  <Award className="w-4 h-4 text-[#10b981]" /> Required Policies
                </h2>
                <div className="space-y-2">
                  {(analysisResult.requiredPolicies || []).map((p: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 border p-3 rounded">
                      <span className="text-xs font-bold text-gray-800 block mb-0.5">{p.name}</span>
                      <p className="text-[11px] text-gray-500">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-mono tracking-widest text-[#0f172a] font-black uppercase mb-3 flex items-center gap-1.5 border-b pb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8b5cf6]" /> Immediate Execution List
                </h2>
                <div className="space-y-2 text-xs text-gray-600">
                  {(analysisResult.immediateActionPlan || []).map((action: string, idx: number) => (
                    <div key={idx} className="bg-gray-50 border p-3 rounded flex gap-2">
                      <strong className="text-gray-400 font-mono">{idx + 1}.</strong>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 border border-dashed border-gray-300 rounded-lg">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="font-bold text-gray-600">No AI-Powered Analysis Appended</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
              To construct the comprehensive executive report, navigate to the "AI Executive Report" tab and click "Generate Executive Analysis".
            </p>
          </div>
        )}

        <footer className="mt-16 pt-6 border-t border-gray-100 text-center font-mono text-[10px] text-gray-400 uppercase tracking-wider">
          ISO/IEC 42001 GAP ASSESSOR | {organization.name} | CONFIDENTIAL INTERNAL AUDIT USE ONLY
        </footer>
      </div>
    </div>
  );
}
