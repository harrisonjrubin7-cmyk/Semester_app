export type UserRole = 'student' | 'faculty' | 'advisor' | 'registrar' | 'operator';

export type Destination = 'today' | 'path' | 'courses' | 'campus' | 'plan';

export type ProvenanceType = 
  | 'official_sis'       // Authoritative institutional SIS (PeopleSoft / Banner / Workday)
  | 'canvas_lms'          // Synced LMS course data
  | 'degree_audit'        // Official Registrar degree evaluation
  | 'advising_system'     // Official advising appointment/notes
  | 'student_draft'       // Private unverified student workspace draft
  | 'ai_generated';       // Semester Intelligence assist (unofficial)

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  institution: string;
  campusId: string;
  classYear: string;
  major: string;
  minor?: string;
  gpa: number;
  creditsEarned: number;
  creditsTotalRequired: number;
  currentRole: UserRole;
  availableRoles: UserRole[];
}

export interface ActionItem {
  id: string;
  title: string;
  category: 'assignment' | 'registration' | 'advising' | 'form' | 'career' | 'personal';
  courseCode?: string;
  courseColor?: string;
  dueDate: string; // ISO string or human string
  isDueToday?: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  provenance: ProvenanceType;
  status: 'pending' | 'in_progress' | 'completed' | 'snoozed';
  destinationLink?: Destination;
  actionLabel: string;
  description: string;
  officialRecord: boolean;
  notes?: string;
  snoozedUntil?: string;
}

export interface CourseAssignment {
  id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  points: number;
  status: 'not_started' | 'drafting' | 'submitted' | 'graded';
  grade?: string;
  score?: number;
  weight: string;
  rubric: { criterion: string; points: number; description: string }[];
  description: string;
  skillsGained: string[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'syllabus' | 'slides' | 'handout' | 'reading' | 'audio';
  unit: string;
  url?: string;
  duration?: string;
}

export interface Flashcard {
  id: string;
  unit: string;
  question: string;
  answer: string;
  mastered: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  instructorEmail: string;
  officeHours: string;
  officeLocation: string;
  schedule: string;
  location: string;
  credits: number;
  color: string;
  syllabusExcerpt: string;
  aiPolicy: 'permitted_with_citation' | 'strict_no_ai' | 'open_with_guidance';
  assignments: CourseAssignment[];
  materials: CourseMaterial[];
  flashcards: Flashcard[];
}

export interface DegreeRequirement {
  id: string;
  name: string;
  category: 'major_core' | 'major_elective' | 'general_ed' | 'writing' | 'quantitative';
  requiredCredits: number;
  completedCredits: number;
  status: 'fulfilled' | 'in_progress' | 'unfulfilled';
  matchedCourses: string[];
  suggestedCourses?: { code: string; name: string; term: string }[];
}

export interface RegistrationHold {
  id: string;
  title: string;
  department: string;
  originator: string;
  resolutionSteps: string;
  status: 'active' | 'resolved';
  blocksRegistration: boolean;
}

export interface RegistrationPlan {
  term: string;
  timeTicket: string;
  isEligible: boolean;
  totalPlannedCredits: number;
  holds: RegistrationHold[];
  plannedCourses: {
    crn: string;
    code: string;
    title: string;
    credits: number;
    section: string;
    instructor: string;
    time: string;
    days: string;
    status: 'enrolled' | 'cart' | 'waitlist' | 'conflict';
    prerequisitesMet: boolean;
  }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'class' | 'deadline' | 'exam' | 'advising' | 'office_hours' | 'club';
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  location: string;
  courseCode?: string;
  courseColor?: string;
}

export interface AdvisorInfo {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  office: string;
  nextAvailableSlot: string;
  photoUrl?: string;
}

export interface TutorListing {
  id: string;
  name: string;
  subjects: string[];
  rating: number;
  sessionsCompleted: number;
  rate: string; // e.g. "Free (Campus Peer Tutoring)"
  availability: string;
  verifiedStudent: boolean;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  type: 'internship' | 'research' | 'full_time' | 'fellowship';
  location: string;
  deadline: string;
  relevantCourseCodes: string[];
  skillsRequired: string[];
  verifiedEmployer: boolean;
  matchScore: number;
  isSaved?: boolean;
}

export interface Aimessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  citations?: { source: string; excerpt: string; pageOrUnit?: string }[];
  suggestedActions?: { label: string; action: () => void }[];
  isCleared: boolean; // Cleared through integrity policy
}

export interface GovernanceEvidence {
  id: string;
  title: string;
  domain: string;
  owner: string;
  evidenceType: 'contract' | 'test_run' | 'audit_log' | 'ferpa_review' | 'security_cert';
  status: 'verified' | 'draft' | 'pending_approval';
  lastReviewed: string;
  notes: string;
}
