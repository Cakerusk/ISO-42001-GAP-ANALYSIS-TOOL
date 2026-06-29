export interface Organization {
  id: string;
  name: string;
  industry: string;
  aiUseCase: string;
  aiTech: string;
  leadAssessor: string;
  maturityLevel: string;
  targetDate: string;
  createdAt: string;
}

export type AssessmentStatus = 'NOT_STARTED' | 'GAP' | 'PARTIAL' | 'COMPLIANT';

export interface AssessmentItem {
  id: string;
  title: string;
  category: string;
  type: 'clause' | 'annex';
  description: string;
  guideline: string;
  checklist: string[];
  evidenceExamples: string[];
}

export interface AssessmentValue {
  status: AssessmentStatus;
  notes: string;
  actionPlan: string;
}

export interface OrganizationSession {
  orgId: string;
  assessments: Record<string, AssessmentValue>;
  aiAnalysis: AIAnalysisResult | null;
  updatedAt: string;
}

export interface AIAnalysisResult {
  executiveSummary: string;
  strategicRoadmap: {
    phase1: { title: string; duration: string; milestones: string[] };
    phase2: { title: string; duration: string; milestones: string[] };
    phase3: { title: string; duration: string; milestones: string[] };
  };
  keyFindings: Array<{
    title: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    clauseOrControl: string;
    description: string;
    recommendation: string;
  }>;
  requiredPolicies: Array<{
    name: string;
    description: string;
  }>;
  immediateActionPlan: string[];
  generatedAt: string;
}

export interface HistoryItem {
  id: string;
  orgId: string;
  orgDetails: Organization;
  clausesStats: { compliant: number; partial: number; gap: number; total: number };
  annexStats: { compliant: number; partial: number; gap: number; total: number };
  assessmentsSnapshot: Record<string, AssessmentValue>;
  aiAnalysis: AIAnalysisResult | null;
  savedAt: string;
}
