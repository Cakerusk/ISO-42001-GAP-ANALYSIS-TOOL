import { AssessmentItem } from './types';

export const ISO_CLAUSES: AssessmentItem[] = [
  {
    id: '4.1',
    title: 'Understanding the Organization & Its Context',
    category: 'Clause 4: Context of the Organization',
    type: 'clause',
    description: 'Determine internal and external issues relevant to the organization\'s purpose and that affect its ability to achieve the intended outcome(s) of its AI Management System (AIMS).',
    guideline: 'Establish a systematic method to analyze market context, regulatory landscapes, corporate goals, and AI technologies used or developed by the organization.',
    checklist: [
      'Has the organization documented internal and external issues influencing the AIMS?',
      'Is there a regular review process for external regulatory shifts and internal business alterations?',
      'Are the ethical, social, and technological impacts of the AI systems understood by management?'
    ],
    evidenceExamples: [
      'Context Analysis Report / SWOT Matrix for AI systems',
      'Regulatory compliance register for AI (e.g., EU AI Act, local guidance)',
      'Management meeting minutes detailing context reviews'
    ]
  },
  {
    id: '4.2',
    title: 'Needs & Expectations of Interested Parties',
    category: 'Clause 4: Context of the Organization',
    type: 'clause',
    description: 'Determine interested parties relevant to the AIMS, and their requirements (legal, regulatory, contractual, and ethical needs).',
    guideline: 'Identify customers, employees, regulators, partners, and affected communities, and explicitly track what they expect from your AI systems in terms of fairness, safety, and transparency.',
    checklist: [
      'Is there a list of active interested parties mapped to the organization\'s AI deployment?',
      'Have legal, contractual, and regulatory expectations been documented for each party?',
      'Are mechanism in place to capture complaints or feedback from external stakeholders?'
    ],
    evidenceExamples: [
      'Stakeholder Matrix / Interested Parties Log',
      'Contractual agreements showing AI commitments',
      'Feedback/complaints procedure for AI-affected users'
    ]
  },
  {
    id: '4.3',
    title: 'Determining the Scope of the AIMS',
    category: 'Clause 4: Context of the Organization',
    type: 'clause',
    description: 'Establish the boundaries and applicability of the AIMS to define the organization\'s scope.',
    guideline: 'Define exactly which products, teams, models, and locations are covered under the AIMS. The scope must be documented and accessible.',
    checklist: [
      'Is the AIMS scope clearly documented in writing?',
      'Does the scope include both AI system development AND AI system deployment/use?',
      'Were external interfaces and outsourced AI services considered when drawing the boundaries?'
    ],
    evidenceExamples: [
      'AIMS Scope Statement Document',
      'Corporate architecture maps highlighting scoped AI services',
      'Vendor management files outlining scoped AI outsourcing'
    ]
  },
  {
    id: '5.1',
    title: 'Leadership & Commitment',
    category: 'Clause 5: Leadership',
    type: 'clause',
    description: 'Top management must demonstrate leadership and commitment with respect to the AIMS.',
    guideline: 'Executive sponsors must actively promote AIMS objectives, ensure resources are allocated, integrate AIMS rules into business operations, and drive ethical AI culture.',
    checklist: [
      'Does senior leadership actively review and approve AI policies and objectives?',
      'Are adequate funds, tools, and talent allocated to compliance and governance?',
      'Has management integrated governance milestones into standard product development gates?'
    ],
    evidenceExamples: [
      'Executive governance charter for AI',
      'AIMS budget allocations and organizational charts',
      'Management system review logs signed by executives'
    ]
  },
  {
    id: '5.2',
    title: 'AI Policy',
    category: 'Clause 5: Leadership',
    type: 'clause',
    description: 'Establish an AI policy that is appropriate to the purpose of the organization, provides a framework for setting objectives, and includes a commitment to meet applicable requirements and continually improve.',
    guideline: 'The AI Policy acts as the core steering document. It should promote transparency, safety, fairness, privacy, and continuous improvement, aligned with corporate values.',
    checklist: [
      'Is there an officially published, executive-approved AI Policy?',
      'Is the policy communicated internally to all staff and made available to relevant external parties?',
      'Does it outline specific commitments to ethical principles, compliance, and risk treatment?'
    ],
    evidenceExamples: [
      'Corporate AI Policy Document',
      'Intranet screenshots proving communication of AI principles',
      'Training completion records for AI Policy awareness'
    ]
  },
  {
    id: '5.3',
    title: 'Organizational Roles, Responsibilities & Authorities',
    category: 'Clause 5: Leadership',
    type: 'clause',
    description: 'Ensure that responsibilities and authorities for relevant roles are assigned and communicated within the organization.',
    guideline: 'Appoint specific AI Ethics officers, AIMS managers, model validators, and data owners. Clear separation of duties must be outlined.',
    checklist: [
      'Has an AIMS Manager / Chief AI Officer / Governance Board been formally appointed?',
      'Are roles clearly assigned for model validation, data management, and operational monitoring?',
      'Do employees know their escalation path when identifying an AI anomaly or high risk?'
    ],
    evidenceExamples: [
      'RACI Matrix for AI lifecycle activities',
      'Job descriptions of AI Safety/Ethics board members',
      'Official appointment letters for AIMS roles'
    ]
  },
  {
    id: '6.1',
    title: 'Actions to Address Risks & Opportunities',
    category: 'Clause 6: Planning',
    type: 'clause',
    description: 'Plan actions to address risks and opportunities, including specific AI risk assessments and risk treatment processes.',
    guideline: 'Adopt a structured methodology to assess systemic risks (such as societal bias, security, safety, IP theft) and opportunities. Document your risk tolerance.',
    checklist: [
      'Has an AI Risk Management Framework been formally adopted?',
      'Are risks graded based on impact severity, technical complexity, and likelihood?',
      'Are risk treatment plans (avoid, mitigate, transfer, accept) documented for identified threats?'
    ],
    evidenceExamples: [
      'AI Risk Management Procedure / Framework',
      'Master AI Risk Register',
      'Risk Acceptance Sign-offs for edge-case systems'
    ]
  },
  {
    id: '6.2',
    title: 'AI Objectives & Planning to Achieve Them',
    category: 'Clause 6: Planning',
    type: 'clause',
    description: 'Establish measurable AI objectives at relevant functions and levels, aligned with the AI Policy.',
    guideline: 'Define clear, KPI-based governance targets (e.g., "100% of LLM models screened for toxicity before deployment", "95% staff completed AI policy training").',
    checklist: [
      'Are AIMS objectives documented, quantifiable, and aligned to the AI Policy?',
      'Is there a plan detailing who is responsible, what resources are required, and how outcomes will be evaluated?',
      'Are objectives periodically reviewed and updated?'
    ],
    evidenceExamples: [
      'AIMS Annual Objectives Plan',
      'Dashboard / KPI logs demonstrating compliance targets',
      'Progress status updates presented in board reviews'
    ]
  },
  {
    id: '7.1',
    title: 'Resources',
    category: 'Clause 7: Support',
    type: 'clause',
    description: 'Determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the AIMS.',
    guideline: 'Identify and provision compute infrastructure, secure data storage, specialist tools (bias detectors, audit logs), and human capital required for governance.',
    checklist: [
      'Has the budget for AI audit tooling, training, and framework compliance been allocated?',
      'Are computing resources optimized for safe and resilient model testing?',
      'Is human capacity adequate to monitor scoped AI systems?'
    ],
    evidenceExamples: [
      'AIMS Resource allocation sheets',
      'Contracts for third-party auditing tools / model monitor suites',
      'Capacity planning documents'
    ]
  },
  {
    id: '7.2',
    title: 'Competence',
    category: 'Clause 7: Support',
    type: 'clause',
    description: 'Ensure that persons doing work under its control that affects AIMS performance are competent on the basis of appropriate education, training, or experience.',
    guideline: 'Establish competency profiles for data scientists, prompt engineers, and legal auditors. Bridge competency gaps with focused technical and ethical trainings.',
    checklist: [
      'Are competency requirements documented for technical AI roles and compliance staff?',
      'Is there a formal training program covering AI ethics, biases, security, and ISO 42001 requirements?',
      'Are credentials and training histories validated and stored?'
    ],
    evidenceExamples: [
      'Competency Matrices for Data Science / Engineering teams',
      'AI Governance training curriculum and completion logs',
      'Professional certificates / resumes of key AI staff'
    ]
  },
  {
    id: '7.3',
    title: 'Awareness',
    category: 'Clause 7: Support',
    type: 'clause',
    description: 'Persons doing work under the organization\'s control must be aware of the AI policy, their contribution to AIMS effectiveness, and the implications of non-conformance.',
    guideline: 'Ensure non-technical staff understand the risk of unapproved AI use (Shadow AI) and understand basic AI safety hygiene.',
    checklist: [
      'Do general employees know how the AI Policy affects their daily tool usage (e.g., using public LLMs with corporate data)?',
      'Do contractors understand AIMS requirements before writing code?',
      'Is there a systematic internal newsletter, banner, or brief highlighting compliance?'
    ],
    evidenceExamples: [
      'Shadow AI / Acceptable Use campaign records',
      'New hire onboarding slides mentioning AI compliance',
      'Survey results assessing corporate AI governance awareness'
    ]
  },
  {
    id: '7.5',
    title: 'Documented Information',
    category: 'Clause 7: Support',
    type: 'clause',
    description: 'The AIMS must include documented information required by ISO 42001 and determined by the organization as necessary for AIMS effectiveness.',
    guideline: 'Ensure all procedures, reports, assessments, and logs are controlled, properly formatted, approved, securely archived, and easily accessible.',
    checklist: [
      'Is there a standardized process for creating, updating, and reviewing governance documents?',
      'Are documents kept in a central, read-only location with granular access rights?',
      'Are retention periods established for model logs, testing telemetry, and audit evidence?'
    ],
    evidenceExamples: [
      'AIMS Document Control Procedure',
      'Document management repository permissions overview',
      'Retention and archiving log'
    ]
  },
  {
    id: '8.1',
    title: 'Operational Planning & Control',
    category: 'Clause 8: Operation',
    type: 'clause',
    description: 'Plan, implement and control processes needed to meet AIMS requirements and implement planning actions (Clause 6).',
    guideline: 'Establish operational criteria for AI lifecycles (stages, reviews, thresholds). Align vendor-supplied AI with the same criteria.',
    checklist: [
      'Are development sprints gated by compliance checklists (e.g., fairness review)?',
      'Are third-party AI models evaluated using standard intake checklists before production onboarding?',
      'Is there a documented process for managing deviations and operational bugs?'
    ],
    evidenceExamples: [
      'SDLC (Software Development Life Cycle) AI integration policy',
      'Vendor AI Intake Checklist',
      'Operational Release gate reports'
    ]
  },
  {
    id: '8.4',
    title: 'AI System Impact Assessment',
    category: 'Clause 8: Operation',
    type: 'clause',
    description: 'Perform, document, and maintain systematic assessments of the societal, environmental, user-level, and business impacts of each deployed or developed AI system.',
    guideline: 'This is a cornerstone requirement. For every scoped AI application, evaluate bias, human rights impact, safety, privacy, environmental compute footprint, and legal liabilities.',
    checklist: [
      'Is there a standardized AI System Impact Assessment (AISIA) template?',
      'Has an AISIA been conducted for EVERY active, scoped AI project?',
      'Does the assessment review risks of bias, automated decision discrimination, and mental health/user manipulation?'
    ],
    evidenceExamples: [
      'AI System Impact Assessment (AISIA) Procedure',
      'Completed AISIA reports for scoped models',
      'Governance board approval logs for high-impact AI systems'
    ]
  },
  {
    id: '9.1',
    title: 'Monitoring, Measurement, Analysis & Evaluation',
    category: 'Clause 9: Performance Evaluation',
    type: 'clause',
    description: 'Determine what needs to be monitored and measured, the methods for monitoring, and when monitoring must be performed and evaluated.',
    guideline: 'Implement continuous tracking of model metrics (drift, accuracy, latency), compliance indicators, training metrics, and user safety complaints.',
    checklist: [
      'Are key model performance metrics (e.g., accuracy, concept drift, bias rates) actively monitored in real-time?',
      'Is there an escalation workflow for when accuracy drops below threshold?',
      'Are customer feedback loops on AI outputs reviewed and evaluated systematically?'
    ],
    evidenceExamples: [
      'Model Telemetry dashboard screenshots (accuracy, drift logs)',
      'Incident escalation logs for automated system failures',
      'Quarterly performance report summarizing AI metrics'
    ]
  },
  {
    id: '9.2',
    title: 'Internal Audit',
    category: 'Clause 9: Performance Evaluation',
    type: 'clause',
    description: 'Conduct internal audits at planned intervals to provide information on whether the AIMS conforms to requirements and is effectively implemented.',
    guideline: 'Establish an independent internal audit program. Select qualified, unbiased auditors and report findings directly to leadership.',
    checklist: [
      'Is there an annual internal audit schedule defined for the AIMS?',
      'Are internal auditors trained, competent, and independent of the active development/design teams?',
      'Are audit results documented and delivered directly to the executive compliance committee?'
    ],
    evidenceExamples: [
      'AIMS Audit Schedule / Plan',
      'Official Internal Audit Report',
      'Evidence of corrective action implementation from prior audits'
    ]
  },
  {
    id: '9.3',
    title: 'Management Review',
    category: 'Clause 9: Performance Evaluation',
    type: 'clause',
    description: 'Top management must review the organization\'s AIMS at planned intervals to ensure its continuing suitability, adequacy and effectiveness.',
    guideline: 'Executives must formally review AIMS metrics, audit outcomes, risk changes, and progress on objectives. Outputs must include action plans.',
    checklist: [
      'Does executive management conduct a structured review of the AIMS at least annually?',
      'Do review inputs include results of audits, risk registers, AISIAs, and corrective actions?',
      'Are review outputs (decisions, resource adjustments, scope alterations) documented and actioned?'
    ],
    evidenceExamples: [
      'Management Review Meeting Agenda',
      'Executive Management Review Minutes / Reports',
      'Resource reallocation sign-offs resulting from review outputs'
    ]
  },
  {
    id: '10.2',
    title: 'Nonconformity & Corrective Action',
    category: 'Clause 10: Improvement',
    type: 'clause',
    description: 'React to nonconformity, take action to control and correct it, address the consequences, and eliminate the root causes to prevent recurrence.',
    guideline: 'Establish a systematic workflow for logging system malfunctions, ethics breaches, compliance gaps, or policy nonconformities. Track remediation.',
    checklist: [
      'Is there a central register to log nonconformities and incidents?',
      'Is a root cause analysis (RCA) performed for every major compliance incident?',
      'Do corrective actions include updating policies, retraining models, or altering data architectures to prevent recurrence?'
    ],
    evidenceExamples: [
      'Incident Response & Nonconformity Procedure',
      'Nonconformity and Incident Register',
      'Completed Root Cause Analysis (RCA) and remediation reports'
    ]
  }
];

export const ISO_ANNEX_CONTROLS: AssessmentItem[] = [
  {
    id: 'A.2.1',
    title: 'Policies Related to AI',
    category: 'Annex A.2: Policies related to AI',
    type: 'annex',
    description: 'Ensure a set of governing policies is established to define boundaries, ethics, and corporate commitments in designing, developing, procuring, and using AI.',
    guideline: 'Draft and enforce policies that detail explicit rules regarding model transparency, algorithmic bias limits, intellectual property protections, and model safety parameters.',
    checklist: [
      'Does a specific AI Governance framework exist separately from or integrated into standard security policies?',
      'Are there guidelines regarding the ethical boundaries of automated model design (e.g. avoiding dark patterns, neural manipulation)?',
      'Is there an approved policy restricting employees from feeding customer data into generic commercial LLMs?'
    ],
    evidenceExamples: [
      'AIMS Policies & Standards manual',
      'User agreements / acceptable use logs for company devices',
      'Ethical AI Design specification policy'
    ]
  },
  {
    id: 'A.3.1',
    title: 'AI Roles & Responsibilities',
    category: 'Annex A.3: Internal organization',
    type: 'annex',
    description: 'Define and assign specific organizational roles, structures, and coordination capabilities for governing and supporting the AI lifecycle.',
    guideline: 'Map out the human-in-the-loop, human-on-the-loop, and human-in-command structures for every deployed AI system.',
    checklist: [
      'Are technical product managers, data curators, and safety checkers formally assigned for each model?',
      'Is there an active AI Safety Committee or multi-disciplinary risk review board?',
      'Has the "Human-in-the-Loop" operational supervisor been defined for automated scoring systems?'
    ],
    evidenceExamples: [
      'Roles and Responsibilities Chart (RACI Matrix)',
      'AIMS Committee Terms of Reference and meeting records',
      'Standard Operating Procedures showing human control points'
    ]
  },
  {
    id: 'A.4.1',
    title: 'Infrastructure, Data and Computing Resources',
    category: 'Annex A.4: Resources for AI',
    type: 'annex',
    description: 'Track, manage, and secure computing resources, cloud storage, accelerators (GPUs/TPUs), and physical hardware vital to safe model operations.',
    guideline: 'Ensure AI environments (sands, staging, production clusters) are insulated, monitored for capacity, energy consumption, and cyber vulnerabilities.',
    checklist: [
      'Is there an active inventory of compute assets (on-prem or cloud) dedicated to AI operations?',
      'Are staging and training clusters separated secure zones from production data systems?',
      'Is the environmental / carbon footprint of model training estimated and documented?'
    ],
    evidenceExamples: [
      'Compute resource inventory list',
      'Network architecture diagrams showing model deployment zones',
      'Cloud instance config lists and sustainability reporting'
    ]
  },
  {
    id: 'A.5.1',
    title: 'System Impact Assessments',
    category: 'Annex A.5: Assess AI system impacts',
    type: 'annex',
    description: 'Implement rigorous impact screening for all systems to calculate potential societal harms, bias risks, and privacy impacts.',
    guideline: 'Assessments must be conducted prior to deployment, covering potential harms to individuals, protected groups, environments, and business processes.',
    checklist: [
      'Is there a threshold screening assessment to identify "high-risk" or "unacceptable-risk" AI systems?',
      'Do evaluations explicitly test for potential systemic discrimination, automated redlining, or privacy exposure?',
      'Are assessments revisited whenever a major retrain or model version upgrade occurs?'
    ],
    evidenceExamples: [
      'Completed Algorithmic Impact Assessments (AIA)',
      'High-Risk AI Screening procedure',
      'Re-validation review schedule logs'
    ]
  },
  {
    id: 'A.6.1',
    title: 'AI System Life Cycle Controls',
    category: 'Annex A.6: AI system life cycle',
    type: 'annex',
    description: 'Apply structured design, development, and deployment milestones to ensure model compliance across the full life cycle.',
    guideline: 'Establish gates within your CI/CD pipeline ensuring compliance checks (fairness, safety, security, drift indicators) are met before code is compiled or deployed.',
    checklist: [
      'Does the engineering workflow mandate peer review for model architectures?',
      'Are CI/CD pipelines configured to test models for regression, out-of-distribution robustness, and performance thresholds?',
      'Is model lineage (code commit, training run, hyperparameter specs) fully traceable?'
    ],
    evidenceExamples: [
      'Git model repository logs showing code-model lineage',
      'DevOps build configuration files containing automated test gates',
      'Model Card templates or registered Model Cards'
    ]
  },
  {
    id: 'A.6.2',
    title: 'Data for AI Systems',
    category: 'Annex A.6: AI system life cycle',
    type: 'annex',
    description: 'Ensure data quality, integrity, representative nature, and privacy across training, validation, testing, and operation datasets.',
    guideline: 'Establish structured processes for data provenance, data cleaning, synthetic data generation, and screening for historical bias and noise.',
    checklist: [
      'Are training and test datasets audited for historical bias, missing representative data, or systemic errors?',
      'Is personal identifiable information (PII) sanitized, anonymized, or masked prior to model feeding?',
      'Is data leakage (train-test overlap) prevented by automated pipeline safeguards?'
    ],
    evidenceExamples: [
      'Data preparation and cleaning procedures',
      'PII scrubbing scripts and pipeline confirmation reports',
      'Bias and representation analysis reports on training sets'
    ]
  },
  {
    id: 'A.6.3',
    title: 'Verification, Validation & Testing',
    category: 'Annex A.6: AI system life cycle',
    type: 'annex',
    description: 'Establish verification, validation, and testing procedures to measure model robustness, safety, accuracy, and predictability.',
    guideline: 'Develop systematic adversarial testing (red-teaming), stress-testing under extreme scenarios, and cross-validation scripts before model release.',
    checklist: [
      'Are model test sets independent of training data and validated for representativeness?',
      'Has adversarial red-teaming been completed for high-risk user-facing agents (e.g., trying to prompt-inject or extract core instructions)?',
      'Are statistical safety parameters (false positive rates, precision-recall thresholds) verified?'
    ],
    evidenceExamples: [
      'Completed Red-Teaming Reports',
      'Model validation metrics tables (accuracy, precision, F1-score)',
      'Adversarial test suite specifications'
    ]
  },
  {
    id: 'A.7.1',
    title: 'Data Provenance & Assets',
    category: 'Annex A.7: AI system data and assets',
    type: 'annex',
    description: 'Maintain strict tracking and records of where data originated, licensing terms, consent structures, and usage conditions.',
    guideline: 'Implement data sheets for datasets. Do not train models on unlicensed, scrap, or sensitive public data without checking compliance parameters.',
    checklist: [
      'Is there a detailed log documenting the source (provenance) of every training dataset?',
      'Have intellectual property (IP) and licensing terms (e.g., CC, Commercial limits) of training assets been formally checked?',
      'Is user consent documented and verified for all collected and processed user datasets?'
    ],
    evidenceExamples: [
      'Data Sheet / Metadata Registry for training datasets',
      'IP / License compliance sign-off documents',
      'Consent management workflow architecture diagrams'
    ]
  },
  {
    id: 'A.8.1',
    title: 'Transparency & Information',
    category: 'Annex A.8: Information for interested parties',
    type: 'annex',
    description: 'Ensure transparency regarding AI operations, informing users clearly when they interact with automated systems, and providing output explanations.',
    guideline: 'Build visual disclosures into user interfaces. Offer plain-English explanations of how AI scoring, advice, or choices are derived.',
    checklist: [
      'Do interfaces explicitly notify users that they are talking to a chatbot or seeing AI-generated content?',
      'Are systems that score, filter, or recommend actions accompanied by clear "How this was decided" sections?',
      'Is there an option for human override or human review of automated decisions?'
    ],
    evidenceExamples: [
      'User interface designs / screenshots displaying AI labels',
      'Explanation module specifications (e.g., SHAP/LIME logic or human fallback)',
      'Product documentation provided to end-users detailing AI use'
    ]
  },
  {
    id: 'A.9.1',
    title: 'Acceptable Use of AI Systems',
    category: 'Annex A.9: Use of AI systems',
    type: 'annex',
    description: 'Establish and enforce rules regarding what types of AI systems, models, and capabilities are permitted within the organization.',
    guideline: 'Define an official "Approved AI List" (e.g., approved SaaS, specific LLM models). Prohibit unapproved tools and monitor compliance.',
    checklist: [
      'Is there an active and updated directory of approved commercial AI products and engines?',
      'Are prohibited AI categories (e.g., social credit scoring, real-time facial scoring in public, emotion detection in workplaces) documented?',
      'Are security controls in place to block network traffic to unapproved consumer AI sites?'
    ],
    evidenceExamples: [
      'Corporate Policy on Acceptable Use of Generative AI',
      'Approved AI Tool Registry / Software Directory',
      'Network logs / DNS filter rules mapping blocked AI domains'
    ]
  },
  {
    id: 'A.10.1',
    title: 'Relationships with Interested Parties & Vendors',
    category: 'Annex A.10: Relationships with interested parties',
    type: 'annex',
    description: 'Manage risks from suppliers, API partners, model providers, and contractors providing AI systems.',
    guideline: 'Enforce standard audit clauses in vendor agreements. Require OpenAI, Microsoft, Google, or other API partners to verify their own compliance posture.',
    checklist: [
      'Do procurement SLAs mandate compliance with security and privacy requirements (e.g., SOC2, ISO 42001)?',
      'Is the downstream risk of vendor model deprecation or API outages managed by contingency plans?',
      'Are upstream model bias parameters or dataset audits requested from major vendors?'
    ],
    evidenceExamples: [
      'Vendor AI SLA and Security exhibit templates',
      'Completed Vendor Risk Assessment questionnaires',
      'Business Continuity and Contingency plans for API failure'
    ]
  }
];
