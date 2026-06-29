import React, { useState } from 'react';
import { Organization, AssessmentValue, AIAnalysisResult, HistoryItem } from '../types';
import { History, Save, Trash2, ArrowUpRight, Upload, Download, FileJson, CheckCircle } from 'lucide-react';

interface HistoryPanelProps {
  organization: Organization | null;
  assessments: Record<string, AssessmentValue>;
  aiAnalysis: AIAnalysisResult | null;
  historyList: HistoryItem[];
  onSaveSnapshot: () => void;
  onRestoreSnapshot: (snapshot: HistoryItem) => void;
  onDeleteSnapshot: (id: string) => void;
  onImportProject: (data: any) => void;
}

export default function HistoryPanel({
  organization,
  assessments,
  aiAnalysis,
  historyList,
  onSaveSnapshot,
  onRestoreSnapshot,
  onDeleteSnapshot,
  onImportProject,
}: HistoryPanelProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = () => {
    if (!organization) return;
    onSaveSnapshot();
    triggerSuccess('Session snapshot archived successfully.');
  };

  const handleRestore = (item: HistoryItem) => {
    onRestoreSnapshot(item);
    triggerSuccess(`Successfully loaded snapshot for ${item.orgDetails.name}.`);
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleExportJSON = () => {
    if (!organization) return;
    const projectData = {
      organization,
      assessments,
      aiAnalysis,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISO-42001-Project-${organization.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerSuccess('JSON Project File exported.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.organization || !parsed.assessments) {
          throw new Error('Invalid project structure. Missing organization or assessments.');
        }
        onImportProject(parsed);
        triggerSuccess('Project details imported successfully.');
      } catch (err: any) {
        alert('Failed to parse file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="history-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1">
      {/* Left Columns: Capture snapshot and exports */}
      <div className="lg:col-span-1 bg-[#0a0c12] border border-white/5 rounded-xl p-6 h-[550px] flex flex-col justify-between shadow-lg">
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/5">
            <h2 className="text-sm font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Save className="w-5 h-5 text-orange-400" /> Backup & Archives
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-1">
              Save instant static snapshots of your active assessments or download complete files.
            </p>
          </div>

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-xs font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg space-y-3">
              <span className="text-slate-300 font-bold block">Archive Audit Progress</span>
              <p className="text-[11px] text-slate-500 font-sans">
                Save a timestamped ledger entry of the current assessment score, notes, and AI executive summaries.
              </p>
              <button
                id="archive-snapshot-btn"
                disabled={!organization}
                onClick={handleSave}
                className={`w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  !organization ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                Archive Session Snapshot
              </button>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg space-y-3">
              <span className="text-slate-300 font-bold block">Offline Data Transfers</span>
              <p className="text-[11px] text-slate-500 font-sans">
                Export/Import the complete workspace as a single portable JSON backup file.
              </p>
              <div className="flex gap-2">
                <button
                  id="export-project-btn"
                  disabled={!organization}
                  onClick={handleExportJSON}
                  className={`w-1/2 py-2.5 bg-[#111827] border border-white/5 hover:border-slate-500 text-slate-300 rounded-lg font-bold uppercase flex items-center justify-center gap-1 cursor-pointer ${
                    !organization ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
                <label className="w-1/2 py-2.5 bg-[#111827] border border-white/5 hover:border-slate-500 text-slate-300 rounded-lg font-bold uppercase flex items-center justify-center gap-1 cursor-pointer text-center">
                  <Upload className="w-3.5 h-3.5 mt-0.5" /> Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-600 font-mono text-center">
          ISO 42001 PERSISTENCE SYSTEM v1.1
        </div>
      </div>

      {/* Right Column: List of saved sessions history */}
      <div className="lg:col-span-2 bg-[#0a0c12] border border-white/5 rounded-xl p-6 h-[550px] flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm font-mono tracking-wider text-slate-400 uppercase">Archived Snapshots Directory</h2>
            </div>
            <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-white/5">
              {historyList.length} Ledger Records
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2">
            {historyList.length === 0 ? (
              <div className="text-center py-16 text-slate-500 font-mono text-xs leading-relaxed">
                No historic snapshots archived in this workspace.<br />Click "Archive Session Snapshot" to log compliance reports.
              </div>
            ) : (
              historyList.map((item) => {
                const totalScored = item.clausesStats.compliant + item.clausesStats.partial + item.clausesStats.gap + item.annexStats.compliant + item.annexStats.partial + item.annexStats.gap;
                const totalItems = item.clausesStats.total + item.annexStats.total;
                const percentCompliance = Math.round(((item.clausesStats.compliant + item.annexStats.compliant + (item.clausesStats.partial + item.annexStats.partial) * 0.5) / totalItems) * 100);

                return (
                  <div
                    key={item.id}
                    id={`snapshot-item-${item.id}`}
                    className="bg-[#111827]/40 border border-white/5 hover:border-slate-600 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-sans font-bold text-slate-200 text-sm">{item.orgDetails.name}</span>
                        <span className="text-[9px] uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded">
                          Index: {percentCompliance}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 space-y-0.5 font-mono">
                        <div>Archived At: {new Date(item.savedAt).toLocaleString()}</div>
                        <div>Audit Ref: {item.orgDetails.leadAssessor} | Scored: {totalScored} / {totalItems} controls</div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        id={`restore-snap-${item.id}`}
                        onClick={() => handleRestore(item)}
                        className="px-3 py-1.5 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 rounded flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" /> Restore
                      </button>
                      <button
                        id={`delete-snap-${item.id}`}
                        onClick={() => onDeleteSnapshot(item.id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-600 font-mono italic">
          Data safely stored within secure client-side localStorage domains.
        </div>
      </div>
    </div>
  );
}
