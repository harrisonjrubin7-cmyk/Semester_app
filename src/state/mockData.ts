import { 
  UserProfile, 
  ActionItem, 
  Course, 
  DegreeRequirement, 
  RegistrationPlan, 
  CalendarEvent, 
  AdvisorInfo, 
  TutorListing, 
  CareerOpportunity,
  GovernanceEvidence 
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_vand_2026_0918',
  name: 'Alexandria Vance',
  email: 'alexandria.m.vance@vanderbilt.edu',
  avatar: 'AV',
  institution: 'Vanderbilt University',
  campusId: 'VU-0094182',
  classYear: 'Junior (Class of 2027)',
  major: 'Economics & Public Policy',
  minor: 'Data Analytics',
  gpa: 3.84,
  creditsEarned: 68,
  creditsTotalRequired: 120,
  currentRole: 'student',
  availableRoles: ['student', 'faculty', 'advisor', 'registrar', 'operator']
};

export const sampleCourses: Course[] = [
  {
    id: 'crs_econ_201',
    code: 'ECON 201',
    name: 'Intermediate Microeconomic Theory',
    instructor: 'Dr. Gregory Thorne',
    instructorEmail: 'gregory.thorne@vanderbilt.edu',
    officeHours: 'Tuesdays & Thursdays 2:00 PM – 4:00 PM',
    officeLocation: 'Calhoun Hall 314',
    schedule: 'Mon, Wed, Fri 10:10 AM – 11:00 AM',
    location: 'Wilson Hall 103',
    credits: 3,
    color: '#10b981', // Emerald
    syllabusExcerpt: 'Rigorous analysis of consumer choice, firm production functions, market structures, general equilibrium, and game-theoretic models of imperfect competition. Prerequisites: ECON 101 and MATH 110.',
    aiPolicy: 'permitted_with_citation',
    assignments: [
      {
        id: 'asg_econ_ps4',
        title: 'Problem Set 4: Cournot Duopoly & Nash Equilibrium',
        dueDate: '2026-10-23',
        dueTime: '11:59 PM',
        points: 50,
        status: 'drafting',
        weight: '15% of grade',
        description: 'Derive best response reaction functions for two competing steel manufacturers under asymmetric marginal costs. Provide graphs of isoprofit curves.',
        rubric: [
          { criterion: 'Algebraic Derivation', points: 25, description: 'Correct FOC calculations and reaction functions.' },
          { criterion: 'Economic Interpretation', points: 15, description: 'Discussion of deadweight loss relative to Bertrand competition.' },
          { criterion: 'Graph Formatting', points: 10, description: 'Clear axes, equilibrium labels, and contract curve.' }
        ],
        skillsGained: ['Game Theory', 'Microeconomic Modeling', 'Quantitative Optimization']
      },
      {
        id: 'asg_econ_midterm',
        title: 'Midterm Exam II: Factor Markets & General Equilibrium',
        dueDate: '2026-11-04',
        dueTime: '10:10 AM',
        points: 100,
        status: 'not_started',
        weight: '25% of grade',
        description: 'In-person closed-book examination covering Edgeworth boxes, Pareto efficiency, and labor demand.',
        rubric: [
          { criterion: 'Analytical Rigor', points: 60, description: 'Mathematical proofs and equilibrium solutions.' },
          { criterion: 'Conceptual Synthesis', points: 40, description: 'First and Second Fundamental Welfare Theorems.' }
        ],
        skillsGained: ['Economic Synthesis', 'Mathematical Proofs']
      }
    ],
    materials: [
      { id: 'mat_econ_syl', title: 'Course Syllabus & Grading Matrix (Fall 2026)', type: 'syllabus', unit: 'Overview' },
      { id: 'mat_econ_lec7', title: 'Lecture 7 Slides: Asymmetric Information & Adverse Selection', type: 'slides', unit: 'Unit 3' },
      { id: 'mat_econ_pod2', title: 'Discussion Audio: Lemon Markets in Health Insurance', type: 'audio', unit: 'Unit 3', duration: '18 min' }
    ],
    flashcards: [
      { id: 'fc_econ_1', unit: 'Game Theory', question: 'What is a dominant strategy in a normal-form game?', answer: 'A strategy that yields a strictly higher payoff for a player regardless of the strategy chosen by opponents.', mastered: true },
      { id: 'fc_econ_2', unit: 'Market Structures', question: 'In Cournot competition, how does market price compare to Monopoly and Perfect Competition?', answer: 'P_comp < P_cournot < P_monopoly, converging to competitive price as the number of firms N approaches infinity.', mastered: false }
    ]
  },
  {
    id: 'crs_psci_102',
    code: 'PSCI 102',
    name: 'Comparative Democratic Institutions',
    instructor: 'Prof. Elena Rostova',
    instructorEmail: 'elena.rostova@vanderbilt.edu',
    officeHours: 'Wednesdays 1:30 PM – 3:30 PM',
    officeLocation: 'Commons Center 220',
    schedule: 'Tue, Thu 9:35 AM – 10:50 AM',
    location: 'Buttrick Hall 102',
    credits: 3,
    color: '#3b82f6', // Indigo Blue
    syllabusExcerpt: 'Examination of democratic regimes, electoral rules (PR vs FPTP), executive-legislative relations, coalition governance, and institutional resilience in contemporary democracies.',
    aiPolicy: 'open_with_guidance',
    assignments: [
      {
        id: 'asg_psci_policy_brief',
        title: 'Comparative Policy Memo: Electoral Reform in Mixed Systems',
        dueDate: '2026-10-25',
        dueTime: '5:00 PM',
        points: 75,
        status: 'drafting',
        weight: '20% of grade',
        description: 'Analyze legislative stability in Germany vs New Zealand following adoption of MMP. 2,000 words with primary constitutional citations.',
        rubric: [
          { criterion: 'Institutional Analysis', points: 35, description: 'Evaluation of overhang seats and electoral threshold impacts.' },
          { criterion: 'Empirical Evidence', points: 25, description: 'Use of comparative election data from 1996 to 2024.' },
          { criterion: 'Policy Recommendation', points: 15, description: 'Feasibility analysis for prospective adopters.' }
        ],
        skillsGained: ['Policy Analysis', 'Comparative Institutional Design', 'Constitutional Research']
      }
    ],
    materials: [
      { id: 'mat_psci_syl', title: 'PSCI 102 Full Syllabus and Seminar Reading List', type: 'syllabus', unit: 'Overview' },
      { id: 'mat_psci_read3', title: 'Required Reading: Lijphart on Consensus vs Westminster Democracies', type: 'reading', unit: 'Unit 2' }
    ],
    flashcards: [
      { id: 'fc_psci_1', unit: 'Electoral Systems', question: 'What is Duverger\'s Law?', answer: 'Plurality-rule elections structured within single-member districts tend to favor a two-party system.', mastered: true }
    ]
  },
  {
    id: 'crs_bus_310',
    code: 'BUS 310',
    name: 'Corporate Valuation & Capital Allocation',
    instructor: 'Prof. Marcus Sterling',
    instructorEmail: 'marcus.sterling@vanderbilt.edu',
    officeHours: 'Mondays 4:00 PM – 6:00 PM',
    officeLocation: 'Owen Graduate School 118',
    schedule: 'Mon, Wed 1:15 PM – 2:30 PM',
    location: 'Owen Hall 204',
    credits: 3,
    color: '#8b5cf6', // Violet
    syllabusExcerpt: 'Financial modeling, discounted cash flow (DCF), leveraged buyouts (LBO), weighted average cost of capital (WACC), and strategic mergers & acquisitions.',
    aiPolicy: 'permitted_with_citation',
    assignments: [
      {
        id: 'asg_bus_dcf',
        title: 'Three-Statement DCF Model & Sensitivity Matrix',
        dueDate: '2026-10-28',
        dueTime: '11:59 PM',
        points: 100,
        status: 'not_started',
        weight: '25% of grade',
        description: 'Build an unlevered free cash flow model for a publicly listed renewable infrastructure firm, calculating WACC and terminal value multiples.',
        rubric: [
          { criterion: 'Financial Model Integrity', points: 40, description: 'Dynamic three-statement links, working capital schedules.' },
          { criterion: 'WACC & Beta Unlevering', points: 30, description: 'Proper Hamada formula application and debt-weighting.' },
          { criterion: 'Sensitivity Table & Memo', points: 30, description: '2D data tables on exit multiple vs discount rate.' }
        ],
        skillsGained: ['DCF Modeling', 'Valuation Methodologies', 'Financial Strategy']
      }
    ],
    materials: [
      { id: 'mat_bus_syl', title: 'Corporate Valuation Course Syllabus (Fall 2026)', type: 'syllabus', unit: 'Overview' },
      { id: 'mat_bus_deck', title: 'LBO Mechanics & Waterfall Structures', type: 'slides', unit: 'Unit 4' }
    ],
    flashcards: [
      { id: 'fc_bus_1', unit: 'Valuation', question: 'How is Free Cash Flow to Firm (FCFF) calculated from EBIT?', answer: 'FCFF = EBIT * (1 - Tax Rate) + D&A - CapEx - Change in Net Working Capital.', mastered: true }
    ]
  },
  {
    id: 'crs_core_100',
    code: 'CORE 100',
    name: 'Humanities & Constitutional Thought',
    instructor: 'Dr. Sarah Al-Mansoor',
    instructorEmail: 'sarah.al-mansoor@vanderbilt.edu',
    officeHours: 'Thursdays 10:00 AM – 12:00 PM',
    officeLocation: 'Benson Hall 206',
    schedule: 'Tue, Thu 1:15 PM – 2:30 PM',
    location: 'Garland Hall 101',
    credits: 3,
    color: '#f59e0b', // Amber/Brass
    syllabusExcerpt: 'Philosophical roots of constitutionalism, social contract theory, rights of conscience, and historical debates on sovereignty from Hobbes to Habermas.',
    aiPolicy: 'strict_no_ai',
    assignments: [
      {
        id: 'asg_core_essay',
        title: 'Analytical Essay: Locke vs Rousseau on Property Rights',
        dueDate: '2026-10-31',
        dueTime: '11:59 PM',
        points: 100,
        status: 'not_started',
        weight: '30% of grade',
        description: 'Compare the state of nature narratives in the Second Treatise and Discourse on Inequality. Explicitly explore natural law justifications.',
        rubric: [
          { criterion: 'Textual Exegesis', points: 40, description: 'Deep engagement with primary source passages.' },
          { criterion: 'Argumentative Coherence', points: 40, description: 'Nuanced counter-argument consideration.' },
          { criterion: 'Prose & Scholarship', points: 20, description: 'Clarity, original thought, and accurate Chicago citations.' }
        ],
        skillsGained: ['Philosophical Synthesis', 'Critical Analysis', 'Primary Text Scholarship']
      }
    ],
    materials: [
      { id: 'mat_core_syl', title: 'CORE 100 Constitutional Thought Syllabus', type: 'syllabus', unit: 'Overview' },
      { id: 'mat_core_handout', title: 'Primary Source Packet: The Federalist No. 10 & 51', type: 'handout', unit: 'Unit 1' }
    ],
    flashcards: [
      { id: 'fc_core_1', unit: 'Social Contract', question: 'What is the General Will according to Rousseau?', answer: 'The collective interest that aims at the common good, distinct from the private wills of all individuals combined.', mastered: true }
    ]
  }
];

export const initialActionItems: ActionItem[] = [
  {
    id: 'act_hold_advising',
    title: 'Advising Hold: Mandatory Spring 2027 Registration Approval',
    category: 'registration',
    dueDate: '2026-10-24',
    isDueToday: false,
    priority: 'urgent',
    provenance: 'official_sis',
    status: 'pending',
    destinationLink: 'path',
    actionLabel: 'Schedule Advisor Meeting',
    description: 'All Economics & Public Policy juniors must review their degree audit with an assigned faculty advisor prior to registration time-ticket opening.',
    officialRecord: true,
    notes: 'Blocks registration until signed off by Dr. Gregory Thorne in the Registrar system.'
  },
  {
    id: 'act_asg_econ4',
    title: 'ECON 201: Submit Problem Set 4 (Cournot Duopoly)',
    category: 'assignment',
    courseCode: 'ECON 201',
    courseColor: '#10b981',
    dueDate: '2026-10-23',
    isDueToday: false,
    priority: 'high',
    provenance: 'canvas_lms',
    status: 'in_progress',
    destinationLink: 'courses',
    actionLabel: 'Open Assignment & Rubric',
    description: 'Solve mathematical questions 1 through 5. Upload PDF scan or typed LaTeX notebook.',
    officialRecord: true
  },
  {
    id: 'act_asg_psci',
    title: 'PSCI 102: Finalize Electoral Reform Memo Draft',
    category: 'assignment',
    courseCode: 'PSCI 102',
    courseColor: '#3b82f6',
    dueDate: '2026-10-25',
    isDueToday: false,
    priority: 'high',
    provenance: 'canvas_lms',
    status: 'in_progress',
    destinationLink: 'courses',
    actionLabel: 'Review Outline & Evidence',
    description: '2,000-word comparative memo comparing MMP adoption in Germany and New Zealand.',
    officialRecord: true
  },
  {
    id: 'act_time_ticket',
    title: 'Spring 2027 Registration Time-Ticket Opens',
    category: 'registration',
    dueDate: '2026-11-02',
    isDueToday: false,
    priority: 'medium',
    provenance: 'official_sis',
    status: 'pending',
    destinationLink: 'path',
    actionLabel: 'View Planned Cart (15 Cr)',
    description: 'Your assigned priority registration window begins Monday, Nov 2 at 8:00 AM CST.',
    officialRecord: true
  },
  {
    id: 'act_opp_brookings',
    title: 'Brookings Institution Economic Policy Fellowship Deadline',
    category: 'career',
    dueDate: '2026-11-05',
    isDueToday: false,
    priority: 'medium',
    provenance: 'student_draft',
    status: 'pending',
    destinationLink: 'campus',
    actionLabel: 'Review Application & Evidence',
    description: 'Requires writing sample (Econ PS4 or PSCI Memo) + verified course transcript.',
    officialRecord: false,
    notes: 'Student-curated career goal. Not an institution deadline.'
  },
  {
    id: 'act_tutor_request',
    title: 'Attend Peer Tutoring: ECON 201 Factor Markets',
    category: 'advising',
    courseCode: 'ECON 201',
    courseColor: '#10b981',
    dueDate: '2026-10-22',
    isDueToday: true,
    priority: 'medium',
    provenance: 'advising_system',
    status: 'pending',
    destinationLink: 'campus',
    actionLabel: 'View Room & Materials',
    description: 'Session with Lead Peer Tutor Maya Lin in Central Library Rm 402 at 4:00 PM.',
    officialRecord: true
  }
];

export const sampleDegreeRequirements: DegreeRequirement[] = [
  {
    id: 'req_econ_core',
    name: 'Economics Core Theory',
    category: 'major_core',
    requiredCredits: 12,
    completedCredits: 9,
    status: 'in_progress',
    matchedCourses: ['ECON 101 Intro Micro', 'ECON 102 Intro Macro', 'ECON 201 Intermed Micro (In Progress)'],
    suggestedCourses: [{ code: 'ECON 202', name: 'Intermediate Macroeconomics', term: 'Spring 2027' }]
  },
  {
    id: 'req_quant_econ',
    name: 'Quantitative & Econometric Methods',
    category: 'quantitative',
    requiredCredits: 9,
    completedCredits: 6,
    status: 'in_progress',
    matchedCourses: ['MATH 110 Calculus I', 'STAT 215 Probability & Inference'],
    suggestedCourses: [{ code: 'ECON 205', name: 'Econometric Analysis & Machine Learning', term: 'Spring 2027' }]
  },
  {
    id: 'req_pub_policy',
    name: 'Public Policy Seminar & Field Applications',
    category: 'major_elective',
    requiredCredits: 15,
    completedCredits: 12,
    status: 'in_progress',
    matchedCourses: ['PSCI 102 Comp Politics', 'PSCI 224 Public Policy Process', 'PSCI 230 Regulatory Politics', 'BUS 310 Corp Valuation'],
    suggestedCourses: [{ code: 'PSCI 390', name: 'Senior Policy Capstone', term: 'Fall 2027' }]
  },
  {
    id: 'req_liberal_arts',
    name: 'Liberal Arts & Humanities Distribution',
    category: 'general_ed',
    requiredCredits: 18,
    completedCredits: 18,
    status: 'fulfilled',
    matchedCourses: ['CORE 100 Constitutional Thought', 'PHIL 105 Ethics', 'HIST 210 US Modern History', 'ENG 120 Academic Writing', 'SPAN 201 Intermediate Spanish I', 'SPAN 202 Intermediate Spanish II']
  },
  {
    id: 'req_writing_immersion',
    name: 'Vanderbilt Immersion Project / Senior Thesis',
    category: 'writing',
    requiredCredits: 6,
    completedCredits: 0,
    status: 'unfulfilled',
    matchedCourses: [],
    suggestedCourses: [{ code: 'IMMR 300', name: 'Immersion Experience Proposal', term: 'Spring 2027' }]
  }
];

export const sampleRegistrationPlan: RegistrationPlan = {
  term: 'Spring 2027',
  timeTicket: 'Monday, Nov 2, 2026 @ 8:00 AM CST',
  isEligible: false, // blocked by advising hold!
  totalPlannedCredits: 15,
  holds: [
    {
      id: 'hld_adv_01',
      title: 'Department Advising Clearance Required',
      department: 'College of Arts & Science - Economics Dept',
      originator: 'Dr. Gregory Thorne (Undergraduate Director)',
      resolutionSteps: 'Schedule and complete a 20-minute degree plan audit with your advisor before Nov 1.',
      status: 'active',
      blocksRegistration: true
    }
  ],
  plannedCourses: [
    {
      crn: '18492',
      code: 'ECON 202',
      title: 'Intermediate Macroeconomic Theory',
      credits: 3,
      section: '01',
      instructor: 'Prof. David K. Miller',
      time: '11:15 AM - 12:30 PM',
      days: 'Tue, Thu',
      status: 'cart',
      prerequisitesMet: true
    },
    {
      crn: '19304',
      code: 'ECON 205',
      title: 'Applied Econometric Methods',
      credits: 3,
      section: '02',
      instructor: 'Dr. Anita Roy',
      time: '9:05 AM - 10:20 AM',
      days: 'Mon, Wed',
      status: 'cart',
      prerequisitesMet: true
    },
    {
      crn: '20118',
      code: 'PSCI 226',
      title: 'Law and American Political Institutions',
      credits: 3,
      section: '01',
      instructor: 'Judge Lawrence Vance',
      time: '1:15 PM - 2:30 PM',
      days: 'Tue, Thu',
      status: 'cart',
      prerequisitesMet: true
    },
    {
      crn: '22849',
      code: 'DATA 210',
      title: 'Data Science for Public Policy',
      credits: 3,
      section: '03',
      instructor: 'Prof. Chen Wei',
      time: '2:40 PM - 3:55 PM',
      days: 'Mon, Wed',
      status: 'cart',
      prerequisitesMet: true
    },
    {
      crn: '15920',
      code: 'IMMR 300',
      title: 'Vanderbilt Immersion Capstone Seminar',
      credits: 3,
      section: '04',
      instructor: 'Dr. Angela Rossi',
      time: '4:10 PM - 5:25 PM',
      days: 'Wednesday',
      status: 'cart',
      prerequisitesMet: true
    }
  ]
};

export const sampleEvents: CalendarEvent[] = [
  { id: 'ev_1', title: 'ECON 201 Lecture', category: 'class', date: '2026-10-21', startTime: '10:10 AM', endTime: '11:00 AM', location: 'Wilson Hall 103', courseCode: 'ECON 201', courseColor: '#10b981' },
  { id: 'ev_2', title: 'BUS 310 Valuation Workshop', category: 'class', date: '2026-10-21', startTime: '1:15 PM', endTime: '2:30 PM', location: 'Owen Hall 204', courseCode: 'BUS 310', courseColor: '#8b5cf6' },
  { id: 'ev_3', title: 'Peer Tutoring Session: Econometrics', category: 'advising', date: '2026-10-22', startTime: '4:00 PM', endTime: '5:00 PM', location: 'Central Library Rm 402', courseCode: 'ECON 201', courseColor: '#10b981' },
  { id: 'ev_4', title: 'PSCI 102 Seminar', category: 'class', date: '2026-10-22', startTime: '9:35 AM', endTime: '10:50 AM', location: 'Buttrick Hall 102', courseCode: 'PSCI 102', courseColor: '#3b82f6' },
  { id: 'ev_5', title: 'ECON 201 Problem Set 4 Due', category: 'deadline', date: '2026-10-23', startTime: '11:59 PM', endTime: '11:59 PM', location: 'Canvas Submission', courseCode: 'ECON 201', courseColor: '#10b981' },
  { id: 'ev_6', title: 'Prof. Thorne Office Hours', category: 'office_hours', date: '2026-10-22', startTime: '2:00 PM', endTime: '4:00 PM', location: 'Calhoun Hall 314', courseCode: 'ECON 201', courseColor: '#10b981' },
  { id: 'ev_7', title: 'Vanderbilt Policy Society General Meeting', category: 'club', date: '2026-10-23', startTime: '6:30 PM', endTime: '8:00 PM', location: 'Sarratt Student Center 216' },
  { id: 'ev_8', title: 'PSCI 102 Comparative Policy Memo Due', category: 'deadline', date: '2026-10-25', startTime: '5:00 PM', endTime: '5:00 PM', location: 'Canvas Submission', courseCode: 'PSCI 102', courseColor: '#3b82f6' },
  { id: 'ev_9', title: 'ECON 201 Midterm Exam II', category: 'exam', date: '2026-11-04', startTime: '10:10 AM', endTime: '11:00 AM', location: 'Wilson Hall 103', courseCode: 'ECON 201', courseColor: '#10b981' }
];

export const sampleAdvisors: AdvisorInfo[] = [
  {
    id: 'adv_thorne',
    name: 'Dr. Gregory Thorne',
    title: 'Associate Professor & Director of Undergraduate Studies',
    department: 'Department of Economics',
    email: 'gregory.thorne@vanderbilt.edu',
    office: 'Calhoun Hall 314',
    nextAvailableSlot: 'Tomorrow at 2:30 PM (In-Person or Zoom)'
  },
  {
    id: 'adv_dean',
    name: 'Dean Patricia Holland',
    title: 'Academic Dean for Arts & Science Junior Class',
    department: 'College of Arts and Science Dean\'s Office',
    email: 'patricia.holland@vanderbilt.edu',
    office: 'Kirkland Hall 210',
    nextAvailableSlot: 'Friday at 10:00 AM'
  }
];

export const sampleTutors: TutorListing[] = [
  {
    id: 'tut_maya',
    name: 'Maya Lin',
    subjects: ['ECON 201 Micro', 'ECON 101', 'STAT 215'],
    rating: 4.96,
    sessionsCompleted: 42,
    rate: 'Free (Campus Funded)',
    availability: 'Mon, Wed, Fri 3:00 - 6:00 PM',
    verifiedStudent: true
  },
  {
    id: 'tut_sam',
    name: 'Samuel Henderson',
    subjects: ['BUS 310 Valuation', 'MATH 110 Calculus', 'Excel / Financial Modeling'],
    rating: 4.88,
    sessionsCompleted: 29,
    rate: 'Free (Peer Tutoring Center)',
    availability: 'Tue, Thu 1:00 - 4:00 PM',
    verifiedStudent: true
  }
];

export const sampleOpportunities: CareerOpportunity[] = [
  {
    id: 'opp_1',
    title: 'Junior Policy Research Analyst — Summer 2027',
    organization: 'Brookings Institution',
    type: 'internship',
    location: 'Washington, D.C. (Hybrid)',
    deadline: '2026-11-05',
    relevantCourseCodes: ['ECON 201', 'PSCI 102'],
    skillsRequired: ['Econometric Modeling', 'Policy Memo Writing', 'Stata/Python'],
    verifiedEmployer: true,
    matchScore: 96,
    isSaved: true
  },
  {
    id: 'opp_2',
    title: 'Investment Banking Summer Analyst (Energy & Infrastructure)',
    organization: 'Morgan Stanley',
    type: 'internship',
    location: 'New York, NY',
    deadline: '2026-11-15',
    relevantCourseCodes: ['BUS 310', 'ECON 201'],
    skillsRequired: ['Three-Statement DCF', 'WACC Calculations', 'Excel Modeling'],
    verifiedEmployer: true,
    matchScore: 92,
    isSaved: false
  },
  {
    id: 'opp_3',
    title: 'Undergraduate Research Fellow: Electoral Institutions Lab',
    organization: 'Vanderbilt Center for Democratic Studies',
    type: 'research',
    location: 'Nashville, TN (Campus)',
    deadline: '2026-11-20',
    relevantCourseCodes: ['PSCI 102'],
    skillsRequired: ['Comparative Politics', 'Literature Review', 'Data Collection'],
    verifiedEmployer: true,
    matchScore: 89,
    isSaved: true
  }
];

export const sampleGovernanceEvidence: GovernanceEvidence[] = [
  {
    id: 'ev_ferpa_crosswalk',
    title: 'FERPA Student Privacy & Data Boundary Crosswalk',
    domain: 'Security & Legal Compliance',
    owner: 'Office of General Counsel & Registrar',
    evidenceType: 'ferpa_review',
    status: 'verified',
    lastReviewed: '2026-10-18',
    notes: 'Verified that private student notes and drafts remain strictly isolated from institutional records and third-party AI APIs.'
  },
  {
    id: 'ev_sis_contract',
    title: 'PeopleSoft Campus Solutions SIS Integration Contract v3.2',
    domain: 'Integrations & Source Authority',
    owner: 'Enterprise Academic Systems',
    evidenceType: 'contract',
    status: 'verified',
    lastReviewed: '2026-10-14',
    notes: 'Enforces read-only mirror of transcripts, active holds, and schedule time-tickets. Two-phase commit for registration writes.'
  },
  {
    id: 'ev_ai_policy',
    title: 'Semester AI Gateway Clearance & Policy Enforcement Engine',
    domain: 'AI Governance & Academic Integrity',
    owner: 'Academic Integrity Board & Engineering',
    evidenceType: 'security_cert',
    status: 'verified',
    lastReviewed: '2026-10-19',
    notes: 'Per-course AI policies strictly enforced. Untrusted document prompt injection filter passed 100% of test suites.'
  },
  {
    id: 'ev_wcag_audit',
    title: 'WCAG 2.2 AA Accessibility & Screen Reader Audit',
    domain: 'Design System & Accessibility',
    owner: 'Student Accessibility Services',
    evidenceType: 'test_run',
    status: 'verified',
    lastReviewed: '2026-10-15',
    notes: 'Zero critical contrast violations; all interactive dialogues support keyboard focus traps and ARIA live regions.'
  }
];
