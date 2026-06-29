import React, { useState } from 'react';
import { Organization } from '../types';
import { Plus, Users, Shield, Calendar, Award, Code, Check } from 'lucide-react';

interface OnboardingFormProps {
  organizations: Organization[];
  selectedOrg: Organization | null;
  onSelectOrg: (org: Organization) => void;
  onAddOrg: (org: Omit<Organization, 'id' | 'createdAt'>) => void;
}

export default function OnboardingForm({
  organizations,
  selectedOrg,
  onSelectOrg,
  onAddOrg,
}: OnboardingFormProps) {
  const [showAddForm, setShowAddForm] = useState(organizations.length === 0);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [leadAssessor, setLeadAssessor] = useState('');
  const [aiUseCase, setAiUseCase] = useState('');
  const [aiTech, setAiTech] = useState('');
  const [maturityLevel, setMaturityLevel] = useState('Level 2 - Managed');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddOrg({
      name,
      industry: industry || 'Technology',
      leadAssessor: leadAssessor || 'Internal Auditor',
      aiUseCase: aiUseCase || 'Internal AI Agents & Models',
      aiTech: aiTech || 'Generative AI',
      maturityLevel,
      targetDate: targetDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    setName('');
    setIndustry('');
    setLeadAssessor('');
    setAiUseCase('');
    setAiTech('');
    setMaturityLevel('Level 2 - Managed');
    setTargetDate('');
    setShowAddForm(false);
  };

  return (
    <div id="onboarding-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1">
      {/* Left Column: List of Organizations */}
      <div id="org-list-panel" className="lg:col-span-1 bg-[#0a0c12] border border-white/5 rounded-xl p-6 flex flex-col justify-between h-[650px] shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm font-mono tracking-wider text-slate-400 uppercase">Organizations</h2>
            </div>
            <span className="font-mono text-[11px] bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded-md border border-orange-500/20">
              {organizations.length} Active
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[420px] pr-2">
            {organizations.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                No organizations registered.<br />Create one to begin analysis.
              </div>
            ) : (
              organizations.map((org) => {
                const isSelected = selectedOrg?.id === org.id;
                return (
                  <button
                    key={org.id}
                    id={`select-org-${org.id}`}
                    onClick={() => {
                      onSelectOrg(org);
                      setShowAddForm(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg border font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#111827] border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                        : 'bg-[#0a0c12]/60 border-white/5 text-slate-400 hover:border-white/20 hover:bg-[#111827]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-sans text-sm font-semibold text-slate-200 mb-1 flex items-center gap-2">
                        {org.name}
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />}
                      </div>
                      <span className="text-[10px] uppercase font-mono bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">
                        {org.industry}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">
                      {org.aiUseCase}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-orange-400" /> {org.maturityLevel.split(' - ')[0]}
                      </span>
                      <span>Target: {org.targetDate}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <button
          id="toggle-add-org-btn"
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 px-4 bg-[#111827] hover:bg-[#1f2937] border border-white/5 hover:border-orange-500/30 text-orange-400 hover:text-orange-300 rounded-lg font-mono text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Organization
        </button>
      </div>

      {/* Right Column: Dynamic Form or Details */}
      <div id="onboarding-main-panel" className="lg:col-span-2 bg-[#0a0c12] border border-white/5 rounded-xl p-8 min-h-[650px] flex flex-col justify-between shadow-xl">
        {showAddForm ? (
          <form id="create-org-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-xl font-sans font-bold text-white tracking-tight flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-400" />
                Register Organization Profile
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Establish the administrative context for the ISO/IEC 42001 system scoping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex AI Labs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Industry / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Financial Services, Healthcare"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Primary AI Technologies</label>
                <input
                  type="text"
                  placeholder="e.g. LLMs, Computer Vision, RAG Pipelines"
                  value={aiTech}
                  onChange={(e) => setAiTech(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Lead Assessor / Auditor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Connor, CISA"
                  value={leadAssessor}
                  onChange={(e) => setLeadAssessor(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">AIMS Maturity Assessment Level</label>
                <select
                  value={maturityLevel}
                  onChange={(e) => setMaturityLevel(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none font-mono"
                >
                  <option value="Level 1 - Initial (Ad-hoc)">Level 1 - Initial (Ad-hoc)</option>
                  <option value="Level 2 - Managed (Documented)">Level 2 - Managed (Documented)</option>
                  <option value="Level 3 - Defined (Systematized)">Level 3 - Defined (Systematized)</option>
                  <option value="Level 4 - Quantitatively Managed">Level 4 - Quantitatively Managed</option>
                  <option value="Level 5 - Optimizing (Continuous)">Level 5 - Optimizing (Continuous)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">Target Certification Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">AI Core Business Use Case</label>
              <textarea
                placeholder="Describe how the organization utilizes AI models and training pipelines (e.g. Automated credit risk modeling with custom-trained Deep Learning networks, customer chatbot for retail banking)..."
                rows={4}
                value={aiUseCase}
                onChange={(e) => setAiUseCase(e.target.value)}
                className="w-full bg-[#050608] border border-white/10 focus:border-orange-500/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <button
                type="submit"
                id="save-org-btn"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer"
              >
                Create Profile & Init AIMS
              </button>
              {organizations.length > 0 && (
                <button
                  type="button"
                  id="cancel-add-org-btn"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white rounded-lg font-mono text-xs border border-white/10 hover:border-slate-500 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : selectedOrg ? (
          <div className="flex flex-col justify-between h-full space-y-8">
            <div>
              <div className="pb-4 border-b border-white/5 mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-sans font-extrabold text-white tracking-tight">
                    {selectedOrg.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Administrative context verified. AIMS initialized.
                  </p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> ACTIVE SYSTEM
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono">
                <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1">Industry Sector</span>
                  <span className="text-slate-200 text-sm font-sans font-medium">{selectedOrg.industry}</span>
                </div>
                <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1">Lead Assessor</span>
                  <span className="text-slate-200 text-sm font-sans font-medium">{selectedOrg.leadAssessor}</span>
                </div>
                <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1">AI Stack Technologies</span>
                  <span className="text-slate-200 text-sm font-sans font-medium">{selectedOrg.aiTech}</span>
                </div>
                <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-lg">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1">Target Certification Date</span>
                  <span className="text-slate-200 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" /> {selectedOrg.targetDate}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-orange-400" />
                    <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">AI Operations & Use Cases</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans bg-[#050608] p-4 rounded border border-white/5">
                    {selectedOrg.aiUseCase}
                  </p>
                </div>

                <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 text-orange-400 p-2.5 rounded-lg border border-orange-500/20">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-0.5">Maturity Classification</span>
                      <span className="text-slate-200 font-sans font-semibold text-sm">{selectedOrg.maturityLevel}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono italic">Continuous evaluation active</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                AIMS Profile Created: {new Date(selectedOrg.createdAt).toLocaleDateString()}
              </span>
              <button
                id="navigate-to-assessment"
                onClick={() => {
                  const dashTab = document.getElementById('nav-tab-dashboard');
                  if (dashTab) dashTab.click();
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer"
              >
                Go to Gap Assessment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-20 text-slate-500 font-mono">
            <Shield className="w-16 h-16 text-slate-700 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-400">No active profile selected</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-sm font-sans">
              Please register a new organization or select an existing corporate profile from the panel on the left to start the ISO 42001 assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
