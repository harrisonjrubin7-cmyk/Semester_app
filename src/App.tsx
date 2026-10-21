import React from 'react';
import { AppProvider, useApp } from './state/AppContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { StatusBanners } from './components/common/StatusBanners';
import { TodayView } from './components/today/TodayView';
import { MyPathView } from './components/path/MyPathView';
import { CoursesView } from './components/courses/CoursesView';
import { CampusSupportView } from './components/campus/CampusSupportView';
import { PlanCalendarView } from './components/plan/PlanCalendarView';
import { FacultyView } from './components/faculty/FacultyView';
import { AdvisorView } from './components/advisor/AdvisorView';
import { RegistrarView } from './components/registrar/RegistrarView';
import { OperatorConsoleView } from './components/operator/OperatorConsoleView';
import { SemesterAiDrawer } from './components/ai/SemesterAiDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { TrustCenterModal } from './components/trust/TrustCenterModal';
import { EvidenceRegisterModal } from './components/evidence/EvidenceRegisterModal';

const AppContent: React.FC = () => {
  const { user, activeDestination } = useApp();

  const renderActiveView = () => {
    // Role-specific authority dashboards
    if (user.currentRole === 'faculty') {
      return <FacultyView />;
    }
    if (user.currentRole === 'advisor') {
      return <AdvisorView />;
    }
    if (user.currentRole === 'registrar') {
      return <RegistrarView />;
    }
    if (user.currentRole === 'operator') {
      return <OperatorConsoleView />;
    }

    // Five canonical student destinations
    switch (activeDestination) {
      case 'today':
        return <TodayView />;
      case 'path':
        return <MyPathView />;
      case 'courses':
        return <CoursesView />;
      case 'campus':
        return <CampusSupportView />;
      case 'plan':
        return <PlanCalendarView />;
      default:
        return <TodayView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f1f3f7] flex flex-col font-sans">
      <Header />
      <Navigation />
      <StatusBanners />

      <main id="main" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {renderActiveView()}
      </main>

      {/* Global Modals & Drawers */}
      <SemesterAiDrawer />
      <CommandPalette />
      <TrustCenterModal />
      <EvidenceRegisterModal />

      {/* Footer */}
      <footer className="border-t border-[#1a2030] py-4 px-6 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Semester Platform v2026.10 · Unified Education Operating System
          </div>
          <div className="flex items-center gap-3">
            <span>Vanderbilt Pilot</span>
            <span>·</span>
            <span>FERPA Verified</span>
            <span>·</span>
            <span>WCAG 2.2 AA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
