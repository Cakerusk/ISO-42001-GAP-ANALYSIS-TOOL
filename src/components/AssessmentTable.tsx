import React, { useState, useMemo } from 'react';
import { AssessmentItem, AssessmentStatus, AssessmentValue } from '../types';
import { Search, Filter, AlertTriangle, CheckCircle, Activity, ChevronRight, HelpCircle, Save } from 'lucide-react';

interface AssessmentTableProps {
  items: AssessmentItem[];
  assessments: Record<string, AssessmentValue>;
  onUpdateAssessment: (id: string, value: Partial<AssessmentValue>) => void;
  title: string;
  subtitle: string;
}

export default function AssessmentTable({
  items,
  assessments,
  onUpdateAssessment,
  title,
  subtitle,
}: AssessmentTableProps) {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Find currently active item
  const activeItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) || items[0];
  }, [items, selectedId]);

  // Current assessment state for selected item
  const currentVal = useMemo(() => {
    if (!activeItem) return { status: 'NOT_STARTED' as AssessmentStatus, notes: '', actionPlan: '' };
    return assessments[activeItem.id] || { status: 'NOT_STARTED', notes: '', actionPlan: '' };
  }, [assessments, activeItem]);

  // Handle value changes
  const handleStatusChange = (status: AssessmentStatus) => {
    if (!activeItem) return;
    onUpdateAssessment(activeItem.id, { status });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeItem) return;
    onUpdateAssessment(activeItem.id, { notes: e.target.value });
  };

  const handleActionPlanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeItem) return;
    onUpdateAssessment(activeItem.id, { actionPlan: e.target.value });
  };

  // Filter items based on search and status
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const itemVal = assessments[item.id] || { status: 'NOT_STARTED' };
      const matchesFilter = statusFilter === 'all' || itemVal.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, statusFilter, assessments]);

  // Stats for the current table view
  const totalCount = items.length;
  const compliantCount = items.filter(i => assessments[i.id]?.status === 'COMPLIANT').length;
  const partialCount = items.filter(i => assessments[i.id]?.status === 'PARTIAL').length;
  const gapCount = items.filter(i => assessments[i.id]?.status === 'GAP').length;

  const getStatusBadge = (status: AssessmentStatus) => {
    switch (status) {
      case 'COMPLIANT':
        return <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">Compliant</span>;
      case 'PARTIAL':
        return <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">Partial</span>;
      case 'GAP':
        return <span className="text-[10px] font-mono uppercase bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">Gap</span>;
      default:
        return <span className="text-[10px] font-mono uppercase bg-slate-500/10 text-slate-400 px-1.5 py-0.5 rounded border border-white/5">Unscored</span>;
    }
  };

  return (
    <div id="assessment-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
      
      {/* Left Column: Requirements Directory list (4 cols) */}
      <div id="req-directory" className="lg:col-span-4 bg-[#0a0c12] border border-white/5 rounded-xl p-5 flex flex-col h-[680px] shadow-lg">
        {/* Header summary of progress */}
        <div className="pb-4 border-b border-white/5 mb-4">
          <h2 className="text-sm font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-orange-400" /> {title}
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
            <div className="bg-[#111827]/40 border border-white/5 p-1.5 rounded">
              <span className="text-slate-500 block">Compliant</span>
              <span className="text-emerald-400 font-bold text-xs">{compliantCount}</span>
            </div>
            <div className="bg-[#111827]/40 border border-white/5 p-1.5 rounded">
              <span className="text-slate-500 block">Partial</span>
              <span className="text-amber-500 font-bold text-xs">{partialCount}</span>
            </div>
            <div className="bg-[#111827]/40 border border-white/5 p-1.5 rounded">
              <span className="text-slate-500 block">Gaps</span>
              <span className="text-red-500 font-bold text-xs">{gapCount}</span>
            </div>
          </div>
        </div>

        {/* Filters and search input */}
        <div className="space-y-2 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050608] border border-white/5 focus:border-orange-500/50 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#050608] border border-white/5 focus:border-orange-500/50 rounded-lg px-2 py-1.5 text-[10px] font-mono text-slate-400 focus:outline-none"
            >
              <option value="all">Show All Statuses</option>
              <option value="COMPLIANT">Compliant Only</option>
              <option value="PARTIAL">Partial Only</option>
              <option value="GAP">Gap Only</option>
              <option value="NOT_STARTED">Unscored Only</option>
            </select>
          </div>
        </div>

        {/* Scorable directory lists */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-none">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No requirements matched your criteria.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isActive = item.id === selectedId;
              const itemVal = assessments[item.id] || { status: 'NOT_STARTED' };
              
              return (
                <button
                  key={item.id}
                  id={`req-btn-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-3 rounded-lg border font-mono transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-orange-500/10 border-orange-500/30 text-white'
                      : 'bg-[#050608]/40 border-white/5 text-slate-400 hover:border-white/10 hover:bg-[#111827]/20'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${isActive ? 'text-orange-400' : 'text-slate-500'}`}>
                        {item.id}
                      </span>
                      <span className="text-[9px] text-slate-600 font-sans line-clamp-1 truncate max-w-[120px]">
                        {item.category.split(': ')[1] || item.category}
                      </span>
                    </div>
                    <div className="text-xs font-sans font-semibold text-slate-300 line-clamp-1">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {getStatusBadge(itemVal.status)}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Requirement Assessment details & editor (8 cols) */}
      <div id="req-editor-panel" className="lg:col-span-8 bg-[#0a0c12] border border-white/5 rounded-xl p-6 flex flex-col justify-between h-[680px] shadow-lg">
        {activeItem ? (
          <div className="flex flex-col h-full justify-between">
            {/* Header / Requirement definition */}
            <div className="overflow-y-auto flex-1 space-y-6 pr-2">
              <div className="pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 mb-2 font-mono">
                  <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
                    REQUIREMENT {activeItem.id}
                  </span>
                  <span className="text-xs text-slate-500">{activeItem.category}</span>
                </div>
                <h3 className="text-xl font-sans font-bold text-white tracking-tight">{activeItem.title}</h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2 bg-[#050608] p-3 rounded border border-white/5">
                  {activeItem.description}
                </p>
              </div>

              {/* Assessment Guidelines block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold block mb-2">Audit Guideline</span>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeItem.guideline}</p>
                  </div>

                  {/* Checklist questions */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">Internal Compliance Checklist</span>
                    <ul className="space-y-1.5 font-sans text-xs text-slate-400">
                      {activeItem.checklist.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-[#111827]/40 p-2 rounded border border-white/5">
                          <span className="text-orange-400 font-mono text-[10px] mt-0.5 font-bold">{idx + 1}.</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Evidence Examples list */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">Example Audit Evidence & Deliverables</span>
                  <div className="bg-[#111827]/30 p-4 rounded-lg border border-white/5 space-y-3">
                    <p className="text-[10px] text-slate-500 font-mono italic">
                      Collect and reference copies of these documents inside the implementation notes to pass external audits:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-400 font-sans">
                      {activeItem.evidenceExamples.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Selector picker bar */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">Compliance Assessment Posture</span>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  <button
                    id="status-btn-compliant"
                    onClick={() => handleStatusChange('COMPLIANT')}
                    className={`py-3 px-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      currentVal.status === 'COMPLIANT'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                        : 'bg-[#111827]/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    Compliant
                  </button>

                  <button
                    id="status-btn-partial"
                    onClick={() => handleStatusChange('PARTIAL')}
                    className={`py-3 px-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      currentVal.status === 'PARTIAL'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                        : 'bg-[#111827]/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    Partial
                  </button>

                  <button
                    id="status-btn-gap"
                    onClick={() => handleStatusChange('GAP')}
                    className={`py-3 px-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      currentVal.status === 'GAP'
                        ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                        : 'bg-[#111827]/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    Gap (Fail)
                  </button>

                  <button
                    id="status-btn-unscored"
                    onClick={() => handleStatusChange('NOT_STARTED')}
                    className={`py-3 px-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      currentVal.status === 'NOT_STARTED'
                        ? 'bg-[#111827] border-slate-500 text-slate-300'
                        : 'bg-[#111827]/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    Not Scored
                  </button>
                </div>
              </div>

              {/* Notes & Evidence Entry Text Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Audit Notes & Existing Evidence</label>
                  <textarea
                    rows={4}
                    placeholder="Document existing implementations, policy references, folder pathways, or specific explanations of conformity or gaps..."
                    value={currentVal.notes}
                    onChange={handleNotesChange}
                    className="w-full bg-[#050608] border border-white/5 focus:border-orange-500/50 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Gap Remediation Action Plan</label>
                  <textarea
                    rows={4}
                    placeholder="Detail specific milestones, assigned personnel, technical controls to implement, and estimated completion timelines to close this compliance gap..."
                    value={currentVal.actionPlan}
                    onChange={handleActionPlanChange}
                    className="w-full bg-[#050608] border border-white/5 focus:border-orange-500/50 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Bottom saving status block */}
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5 text-slate-500" /> Changes automatically saved locally.
              </span>
              <span className="text-slate-500">
                Item ID: {activeItem.id} | Scored: {currentVal.status !== 'NOT_STARTED' ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 font-mono">
            <HelpCircle className="w-12 h-12 text-slate-700 mb-2 animate-bounce" />
            <span>Select a requirement from the directory to start assessing.</span>
          </div>
        )}
      </div>

    </div>
  );
}
