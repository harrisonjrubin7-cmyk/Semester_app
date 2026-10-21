import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Destination, 
  ActionItem, 
  Course, 
  RegistrationPlan, 
  CalendarEvent, 
  CareerOpportunity,
  Aimessage 
} from '../types';
import { 
  initialUser, 
  sampleCourses, 
  initialActionItems, 
  sampleRegistrationPlan, 
  sampleEvents, 
  sampleOpportunities 
} from './mockData';

interface AppContextType {
  user: UserProfile;
  switchRole: (role: UserRole) => void;
  activeDestination: Destination;
  setActiveDestination: (dest: Destination) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  actionItems: ActionItem[];
  completeActionItem: (id: string) => void;
  snoozeActionItem: (id: string) => void;
  addActionItem: (item: { title: string; category: ActionItem['category']; dueDate: string; priority: ActionItem['priority']; notes?: string }) => void;
  registrationPlan: RegistrationPlan;
  resolveHold: (holdId: string) => void;
  enrollInCart: () => { success: boolean; message: string };
  events: CalendarEvent[];
  courses: Course[];
  opportunities: CareerOpportunity[];
  toggleSaveOpportunity: (id: string) => void;
  isAiOpen: boolean;
  setIsAiOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isTrustCenterOpen: boolean;
  setIsTrustCenterOpen: (open: boolean) => void;
  isEvidenceRegisterOpen: boolean;
  setIsEvidenceRegisterOpen: (open: boolean) => void;
  isOffline: boolean;
  toggleOffline: () => void;
  isReadOnly: boolean;
  aiMessages: Aimessage[];
  sendAiPrompt: (text: string) => Promise<void>;
  whatIfMajor: string;
  setWhatIfMajor: (m: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [activeDestination, setActiveDestination] = useState<Destination>('today');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('crs_econ_201');
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionItems);
  const [registrationPlan, setRegistrationPlan] = useState<RegistrationPlan>(sampleRegistrationPlan);
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [courses] = useState<Course[]>(sampleCourses);
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>(sampleOpportunities);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTrustCenterOpen, setIsTrustCenterOpen] = useState(false);
  const [isEvidenceRegisterOpen, setIsEvidenceRegisterOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [whatIfMajor, setWhatIfMajor] = useState('Economics & Public Policy');

  const [aiMessages, setAiMessages] = useState<Aimessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      timestamp: 'Today at 9:00 AM',
      content: 'Welcome back Alexandria. I am Semester Intelligence, your academic copilot for Vanderbilt Fall 2026. I am grounded in your 4 course syllabi, degree requirements, and university policies. How can I assist your study or planning today?',
      citations: [
        { source: 'ECON 201 Syllabus', excerpt: 'Policy: AI permitted for homework concept assistance with explicit citation.', pageOrUnit: 'Grading Guidelines §4' },
        { source: 'Academic Integrity Board', excerpt: 'Never use AI for direct solution generation during exams or closed assessments.' }
      ],
      isCleared: true
    }
  ]);

  const switchRole = (newRole: UserRole) => {
    setUser(prev => ({
      ...prev,
      currentRole: newRole
    }));
  };

  const completeActionItem = (id: string) => {
    setActionItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'completed' as const } : item
    ));
  };

  const snoozeActionItem = (id: string) => {
    setActionItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'snoozed' as const, snoozedUntil: 'Tomorrow at 8:00 AM' } : item
    ));
  };

  const addActionItem = (data: { title: string; category: ActionItem['category']; dueDate: string; priority: ActionItem['priority']; notes?: string }) => {
    const newItem: ActionItem = {
      id: `act_user_${Date.now()}`,
      title: data.title,
      category: data.category,
      dueDate: data.dueDate,
      priority: data.priority,
      provenance: 'student_draft',
      status: 'pending',
      actionLabel: 'Mark Done',
      description: data.notes || 'User added task.',
      officialRecord: false
    };
    setActionItems(prev => [newItem, ...prev]);
  };

  const resolveHold = (holdId: string) => {
    setRegistrationPlan(prev => {
      const updatedHolds = prev.holds.map(h => h.id === holdId ? { ...h, status: 'resolved' as const } : h);
      const remainingBlocking = updatedHolds.some(h => h.status === 'active' && h.blocksRegistration);
      return {
        ...prev,
        holds: updatedHolds,
        isEligible: !remainingBlocking
      };
    });
    // Also resolve action item
    setActionItems(prev => prev.map(a => a.id === 'act_hold_advising' ? { ...a, status: 'completed' as const } : a));
  };

  const enrollInCart = () => {
    if (!registrationPlan.isEligible) {
      return { success: false, message: 'Registration blocked: Active Advising Hold must be resolved by Dr. Thorne first.' };
    }
    setRegistrationPlan(prev => ({
      ...prev,
      plannedCourses: prev.plannedCourses.map(c => ({ ...c, status: 'enrolled' as const }))
    }));
    return { success: true, message: 'Official registration written to PeopleSoft SIS. 15 credits confirmed.' };
  };

  const toggleSaveOpportunity = (id: string) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, isSaved: !o.isSaved } : o));
  };

  const toggleOffline = () => {
    setIsOffline(prev => !prev);
  };

  const sendAiPrompt = async (text: string) => {
    const userMsg: Aimessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      content: text,
      isCleared: true
    };
    setAiMessages(prev => [...prev, userMsg]);

    // Generate grounded contextual response
    setTimeout(() => {
      let responseContent = `Based on your course materials and academic records at Vanderbilt:`;
      const citations: { source: string; excerpt: string; pageOrUnit?: string }[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('cournot') || lower.includes('econ') || lower.includes('nash')) {
        responseContent = `For ECON 201 Problem Set 4, you are finding the Nash equilibrium in a Cournot duopoly with asymmetric marginal costs (c1 ≠ c2). 

1. Write Firm 1 profit: π1 = (a - b(q1 + q2) - c1) * q1
2. Take First-Order Condition: ∂π1/∂q1 = a - 2bq1 - bq2 - c1 = 0
3. Derive Reaction Function: R1(q2) = (a - c1 - bq2) / 2b
4. Solve simultaneously with R2(q1) = (a - c2 - bq1) / 2b.

Notice that the firm with lower marginal cost produces strictly more output in equilibrium.`;
        citations.push({
          source: 'ECON 201 Unit 3 Lecture Slides',
          excerpt: 'Reaction curves cross at unique Nash-Cournot point (q1*, q2*).',
          pageOrUnit: 'Slide 14'
        });
      } else if (lower.includes('registration') || lower.includes('hold') || lower.includes('spring')) {
        responseContent = `Your Spring 2027 priority time-ticket opens Monday, November 2 at 8:00 AM CST.

However, you currently have 1 active Registration Hold:
• Mandatory Department Advising Clearance (Dr. Gregory Thorne)

Resolution: You must attend an advising meeting. Dr. Thorne has open office hours Tuesdays & Thursdays from 2:00 PM – 4:00 PM in Calhoun 314, or you can book an appointment via the Campus & Support tab. Once signed, your hold will be cleared automatically in PeopleSoft.`;
        citations.push({
          source: 'Vanderbilt University Registrar Bulletin',
          excerpt: 'Advising holds must be lifted at the departmental level prior to enrollment cart checkout.',
          pageOrUnit: 'Registration Policies §3.1'
        });
      } else if (lower.includes('policy') || lower.includes('psci') || lower.includes('mmp')) {
        responseContent = `For PSCI 102 Memo, Mixed-Member Proportional (MMP) representation combines single-member district plurality seats with nationwide party-list proportional seats.

Key comparison points for Germany vs New Zealand:
• Overhang seats (Überhangmandate) and leveling mandates (Ausgleichsmandate)
• The 5% electoral threshold prevents excessive party fractionalization
• Coalition formation dynamics typically produce stable center-left or center-right governance.`;
        citations.push({
          source: 'PSCI 102 Reading: Lijphart',
          excerpt: 'Patterns of Democracy: Mixed electoral systems balance local accountability with fair proportionality.',
          pageOrUnit: 'Ch. 8, pp. 142-158'
        });
      } else {
        responseContent = `I have examined your 4 enrolled courses, degree evaluation audit, and upcoming deadlines. 

Your most pressing commitment is ECON 201 Problem Set 4 due Friday, Oct 23, and scheduling your required Advising session with Dr. Thorne before your Nov 2 registration ticket opens.

How can I help you break this down further?`;
        citations.push({
          source: 'Semester Education Graph',
          excerpt: 'Cross-referenced Action Center with official SIS enrollment record.',
          pageOrUnit: 'Fall 2026 Term'
        });
      }

      const aiReply: Aimessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: responseContent,
        citations,
        isCleared: true
      };
      setAiMessages(prev => [...prev, aiReply]);
    }, 700);
  };

  // Keyboard shortcut for Cmd+K command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        switchRole,
        activeDestination,
        setActiveDestination,
        selectedCourseId,
        setSelectedCourseId,
        actionItems,
        completeActionItem,
        snoozeActionItem,
        addActionItem,
        registrationPlan,
        resolveHold,
        enrollInCart,
        events,
        courses,
        opportunities,
        toggleSaveOpportunity,
        isAiOpen,
        setIsAiOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isTrustCenterOpen,
        setIsTrustCenterOpen,
        isEvidenceRegisterOpen,
        setIsEvidenceRegisterOpen,
        isOffline,
        toggleOffline,
        isReadOnly: isOffline,
        aiMessages,
        sendAiPrompt,
        whatIfMajor,
        setWhatIfMajor
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
