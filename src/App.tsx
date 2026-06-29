import React, { useState, useEffect } from 'react';
import { Organization, AssessmentValue, AIAnalysisResult, HistoryItem } from './types';
import { ISO_CLAUSES, ISO_ANNEX_CONTROLS } from './isoData';
import OnboardingForm from './components/OnboardingForm';
import DashboardView from './components/DashboardView';
import AssessmentTable from './components/AssessmentTable';
import AIAnalysisView from './components/AIAnalysisView';
import ExecutiveReportView from './components/ExecutiveReportView';
import HistoryPanel from './components/HistoryPanel';
import LandingView from './components/LandingView';
import { 
  Terminal, ShieldCheck, BarChart3, ListChecks, HelpCircle, 
  Settings, FolderKanban, LogOut, CheckSquare, Sparkles, FileText, History as HistoryIcon
} from 'lucide-react';

export default function App() {
  // Sync Organizations state
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = localStorage.getItem('iso42001_orgs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(() => {
    const saved = localStorage.getItem('iso42001_selected_org_id');
    return saved || null;
  });

  // Sync Assessments state
  const [allAssessments, setAllAssessments] = useState<Record<string, Record<string, AssessmentValue>>>(() => {
    const saved = localStorage.getItem('iso42001_assessments');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync AI Reports state
  const [allAIAnalyses, setAllAIAnalyses] = useState<Record<string, AIAnalysisResult | null>>(() => {
    const saved = localStorage.getItem('iso42001_ai_analyses');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync History Snapshots
  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('iso42001_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<string>('onboarding');

  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const saved = localStorage.getItem('iso42001_landing_completed');
    return saved !== 'true';
  });

  // Load first organization if none is selected
  useEffect(() => {
    if (organizations.length > 0 && !selectedOrgId) {
      setSelectedOrgId(organizations[0].id);
      localStorage.setItem('iso42001_selected_org_id', organizations[0].id);
    }
  }, [organizations, selectedOrgId]);

  // Derive selected organization
  const selectedOrg = React.useMemo(() => {
    return organizations.find(org => org.id === selectedOrgId) || null;
  }, [organizations, selectedOrgId]);

  // Derive active organization assessments & analysis
  const activeAssessments = React.useMemo(() => {
    if (!selectedOrgId) return {};
    return allAssessments[selectedOrgId] || {};
  }, [allAssessments, selectedOrgId]);

  const activeAIAnalysis = React.useMemo(() => {
    if (!selectedOrgId) return null;
    return allAIAnalyses[selectedOrgId] || null;
  }, [allAIAnalyses, selectedOrgId]);

  // Handle adding a new organization
  const handleAddOrg = (newOrgData: Omit<Organization, 'id' | 'createdAt'>) => {
    const newOrg: Organization = {
      ...newOrgData,
      id: 'org_' + Date.now(),
      createdAt: new Date().toISOString()
    };

    const nextOrgs = [...organizations, newOrg];
    setOrganizations(nextOrgs);
    localStorage.setItem('iso42001_orgs', JSON.stringify(nextOrgs));

    setSelectedOrgId(newOrg.id);
    localStorage.setItem('iso42001_selected_org_id', newOrg.id);
    setActiveTab('dashboard'); // Auto navigate to dashboard
  };

  // Handle updating an assessment value for currently active org
  const handleUpdateAssessment = (itemId: string, updatedVal: Partial<AssessmentValue>) => {
    if (!selectedOrgId) return;

    setAllAssessments((prev) => {
      const orgAssessments = prev[selectedOrgId] || {};
      const currentItem = orgAssessments[itemId] || { status: 'NOT_STARTED', notes: '', actionPlan: '' };

      const nextOrgAssessments = {
        ...orgAssessments,
        [itemId]: { ...currentItem, ...updatedVal }
      };

      const next = {
        ...prev,
        [selectedOrgId]: nextOrgAssessments
      };

      localStorage.setItem('iso42001_assessments', JSON.stringify(next));
      return next;
    });
  };

  // Save AI analysis result for currently active org
  const handleSaveAIAnalysis = (result: AIAnalysisResult) => {
    if (!selectedOrgId) return;

    setAllAIAnalyses((prev) => {
      const next = {
        ...prev,
        [selectedOrgId]: result
      };
      localStorage.setItem('iso42001_ai_analyses', JSON.stringify(next));
      return next;
    });
  };

  // Save current assessment state to persistent snapshot ledger (Archive)
  const handleSaveSnapshot = () => {
    if (!selectedOrg) return;

    const currentAssessments = allAssessments[selectedOrg.id] || {};
    const currentAI = allAIAnalyses[selectedOrg.id] || null;

    let cC = 0, cP = 0, cG = 0;
    ISO_CLAUSES.forEach(i => {
      const v = currentAssessments[i.id];
      if (v?.status === 'COMPLIANT') cC++;
      else if (v?.status === 'PARTIAL') cP++;
      else if (v?.status === 'GAP') cG++;
    });

    let aC = 0, aP = 0, aG = 0;
    ISO_ANNEX_CONTROLS.forEach(i => {
      const v = currentAssessments[i.id];
      if (v?.status === 'COMPLIANT') aC++;
      else if (v?.status === 'PARTIAL') aP++;
      else if (v?.status === 'GAP') aG++;
    });

    const newSnapshot: HistoryItem = {
      id: 'snap_' + Date.now(),
      orgId: selectedOrg.id,
      orgDetails: selectedOrg,
      clausesStats: { compliant: cC, partial: cP, gap: cG, total: ISO_CLAUSES.length },
      annexStats: { compliant: aC, partial: aP, gap: aG, total: ISO_ANNEX_CONTROLS.length },
      assessmentsSnapshot: currentAssessments,
      aiAnalysis: currentAI,
      savedAt: new Date().toISOString()
    };

    const nextHistory = [newSnapshot, ...historyList];
    setHistoryList(nextHistory);
    localStorage.setItem('iso42001_history', JSON.stringify(nextHistory));
  };

  // Restore active state from a saved snapshot
  const handleRestoreSnapshot = (snapshot: HistoryItem) => {
    // Check if organization exists in current list, if not add it
    const orgExists = organizations.some(o => o.id === snapshot.orgId);
    if (!orgExists) {
      const nextOrgs = [...organizations, snapshot.orgDetails];
      setOrganizations(nextOrgs);
      localStorage.setItem('iso42001_orgs', JSON.stringify(nextOrgs));
    }

    setSelectedOrgId(snapshot.orgId);
    localStorage.setItem('iso42001_selected_org_id', snapshot.orgId);

    // Load snapshot assessments & AI Analysis
    setAllAssessments(prev => {
      const next = { ...prev, [snapshot.orgId]: snapshot.assessmentsSnapshot };
      localStorage.setItem('iso42001_assessments', JSON.stringify(next));
      return next;
    });

    setAllAIAnalyses(prev => {
      const next = { ...prev, [snapshot.orgId]: snapshot.aiAnalysis };
      localStorage.setItem('iso42001_ai_analyses', JSON.stringify(next));
      return next;
    });

    setActiveTab('dashboard');
  };

  // Delete a saved snapshot
  const handleDeleteSnapshot = (id: string) => {
    const next = historyList.filter(item => item.id !== id);
    setHistoryList(next);
    localStorage.setItem('iso42001_history', JSON.stringify(next));
  };

  // Handle direct file imports (Full workspace recovery)
  const handleImportProject = (data: any) => {
    const importedOrg: Organization = data.organization;
    const importedAssessments: Record<string, AssessmentValue> = data.assessments;
    const importedAI: AIAnalysisResult | null = data.aiAnalysis || null;

    // Check if organization exists, update it or add it
    setOrganizations(prev => {
      const filtered = prev.filter(o => o.id !== importedOrg.id);
      const next = [...filtered, importedOrg];
      localStorage.setItem('iso42001_orgs', JSON.stringify(next));
      return next;
    });

    setSelectedOrgId(importedOrg.id);
    localStorage.setItem('iso42001_selected_org_id', importedOrg.id);

    setAllAssessments(prev => {
      const next = { ...prev, [importedOrg.id]: importedAssessments };
      localStorage.setItem('iso42001_assessments', JSON.stringify(next));
      return next;
    });

    setAllAIAnalyses(prev => {
      const next = { ...prev, [importedOrg.id]: importedAI };
      localStorage.setItem('iso42001_ai_analyses', JSON.stringify(next));
      return next;
    });

    setActiveTab('dashboard');
  };

  if (showLanding) {
    return (
      <LandingView
        onStart={() => {
          setShowLanding(false);
          localStorage.setItem('iso42001_landing_completed', 'true');
        }}
      />
    );
  }

  return (
    <div id="aims-root" className="min-h-screen bg-[#050608] text-slate-300 flex flex-col font-sans select-none antialiased">
      {/* Top Banner Navigation bar (no-print category handles PDF masking) */}
      <header id="header-nav" className="no-print bg-[#0a0c12]/80 border-b border-white/5 py-4 px-6 sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        {/* Left column: Status indicator for balance */}
        <div className="hidden md:flex items-center flex-1 justify-start text-[10px] font-mono text-slate-500">
          <Terminal className="w-3.5 h-3.5 mr-1.5 text-orange-500/80" />
          <span>STATUS: AUDIT_ACTIVE</span>
        </div>

        {/* Center column: Centered logo and text clickable link */}
        <div className="flex justify-center items-center flex-1">
          <button
            onClick={() => setShowLanding(true)}
            title="Return to Landing Page"
            className="flex items-center gap-3.5 cursor-pointer hover:opacity-85 active:scale-[0.98] transition-all focus:outline-none bg-transparent border-none p-0 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.35)] flex items-center justify-center transition-transform group-hover:scale-105">
                <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="text-white font-extrabold tracking-tight text-xl font-sans">
                AIMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">42001</span>
              </span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="text-left font-mono">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block leading-none">AIMS 42001 GAP ANALYZER</span>
              <span className="text-[10px] text-slate-500 block mt-1">ISO/IEC 42001:2023 Standard</span>
            </div>
          </button>
        </div>

        {/* Right column: Selected Org Quick Status Indicator */}
        <div className="flex items-center justify-end flex-1">
          {selectedOrg ? (
            <div className="flex items-center gap-2 bg-[#111827] border border-white/5 px-3 py-1.5 rounded-lg font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">ORG_ID:</span>
              <span className="text-orange-400 font-bold font-mono">{selectedOrg.name.replace(/\s+/g, '-').toUpperCase()}-42001</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-900/40 border border-white/5 px-3 py-1.5 rounded-lg font-mono text-[10px] text-slate-500">
              NO ACTIVE PROFILE
            </div>
          )}
        </div>
      </header>

      {/* Main Core split view layout */}
      <div className="flex-1 flex flex-col lg:flex-row h-full">
        {/* Navigation Sidebar (Collapsible in smaller viewports, hidden in PDF print) */}
        <aside id="sidebar-nav" className="no-print lg:w-64 bg-[#0a0c12] border-b lg:border-b-0 lg:border-r border-white/5 p-5 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3 block">AIMS Auditor Modules</span>
              <nav className="space-y-1 font-mono text-xs font-medium">
                
                {/* Onboarding Profile Tab */}
                <button
                  id="nav-tab-onboarding"
                  onClick={() => setActiveTab('onboarding')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    activeTab === 'onboarding'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FolderKanban className="w-4 h-4 shrink-0" />
                  <span>01_ORGANIZATIONS</span>
                </button>

                {/* Dashboard Tab */}
                <button
                  id="nav-tab-dashboard"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'dashboard'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>02_DASHBOARD</span>
                </button>

                {/* Core Clauses Tab */}
                <button
                  id="nav-tab-clauses"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('clauses')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'clauses'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ListChecks className="w-4 h-4 shrink-0" />
                  <span>03_CLAUSES_4_10</span>
                </button>

                {/* Annex A Controls Tab */}
                <button
                  id="nav-tab-annex"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('annex')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'annex'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>04_ANNEX_CONTROLS</span>
                </button>

                {/* AI executive reporter Tab */}
                <button
                  id="nav-tab-ai-report"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('ai-report')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'ai-report'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-orange-400 hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-orange-400" />
                  <span>05_AI_REPORTER</span>
                </button>

                {/* Printable html document Tab */}
                <button
                  id="nav-tab-exec-report"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('exec-report')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'exec-report'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>06_EXECUTIVE_REPORT</span>
                </button>

                {/* History list Tab */}
                <button
                  id="nav-tab-history"
                  disabled={!selectedOrg}
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border-l-2 transition-all duration-150 cursor-pointer ${
                    !selectedOrg ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    activeTab === 'history'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <HistoryIcon className="w-4 h-4 shrink-0" />
                  <span>07_ARCHIVES_BACKUPS</span>
                </button>

              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 space-y-2 mt-8 lg:mt-0">
            <div className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span> ENGINE_ONLINE</div>
            <div>HOST: CLOUD_RUN_EDGE</div>
            <div>MODEL: GEMINI_FLASH_LATEST</div>
          </div>
        </aside>

        {/* Main Work Area Workspace */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#050608]">
          {/* Active Organization validation banner */}
          {!selectedOrg && activeTab !== 'onboarding' && (
            <div className="bg-[#211a14] border border-amber-900/40 text-amber-500 rounded-lg p-6 mb-8 font-mono text-xs flex items-start gap-3">
              <Settings className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold uppercase tracking-wider text-amber-400">Context Allocation Required</h3>
                <p className="font-sans text-gray-300">
                  No organization profile currently loaded in workspace directory. Please register or select an active organization profile to initiate governance auditing logs.
                </p>
                <button
                  id="banner-onboard-btn"
                  onClick={() => setActiveTab('onboarding')}
                  className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded uppercase"
                >
                  Onboard Organization
                </button>
              </div>
            </div>
          )}

          {/* Render Active Module Tab Component */}
          {activeTab === 'onboarding' && (
            <OnboardingForm
              organizations={organizations}
              selectedOrg={selectedOrg}
              onSelectOrg={(org) => {
                setSelectedOrgId(org.id);
                localStorage.setItem('iso42001_selected_org_id', org.id);
                setActiveTab('dashboard'); // Switch back to dashboard on selection
              }}
              onAddOrg={handleAddOrg}
            />
          )}

          {selectedOrg && activeTab === 'dashboard' && (
            <DashboardView
              organization={selectedOrg}
              assessments={activeAssessments}
              onTabChange={setActiveTab}
            />
          )}

          {selectedOrg && activeTab === 'clauses' && (
            <AssessmentTable
              items={ISO_CLAUSES}
              assessments={activeAssessments}
              onUpdateAssessment={handleUpdateAssessment}
              title="AIMS Clauses 4-10 Registry"
              subtitle="Core ISO/IEC 42001 system management audits"
            />
          )}

          {selectedOrg && activeTab === 'annex' && (
            <AssessmentTable
              items={ISO_ANNEX_CONTROLS}
              assessments={activeAssessments}
              onUpdateAssessment={handleUpdateAssessment}
              title="Annex A AI Controls Registry"
              subtitle="Tactical system security & ethics controls checklist"
            />
          )}

          {selectedOrg && activeTab === 'ai-report' && (
            <AIAnalysisView
              organization={selectedOrg}
              assessments={activeAssessments}
              analysisResult={activeAIAnalysis}
              onSaveAnalysisResult={handleSaveAIAnalysis}
            />
          )}

          {selectedOrg && activeTab === 'exec-report' && (
            <ExecutiveReportView
              organization={selectedOrg}
              assessments={activeAssessments}
              analysisResult={activeAIAnalysis}
            />
          )}

          {selectedOrg && activeTab === 'history' && (
            <HistoryPanel
              organization={selectedOrg}
              assessments={activeAssessments}
              aiAnalysis={activeAIAnalysis}
              historyList={historyList}
              onSaveSnapshot={handleSaveSnapshot}
              onRestoreSnapshot={handleRestoreSnapshot}
              onDeleteSnapshot={handleDeleteSnapshot}
              onImportProject={handleImportProject}
            />
          )}
        </main>
      </div>
    </div>
  );
}
