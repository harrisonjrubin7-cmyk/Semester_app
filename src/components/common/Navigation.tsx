import React from 'react';
import { useApp } from '../../state/AppContext';
import { Destination } from '../../types';
import { 
  CalendarCheck2, 
  Compass, 
  BookOpen, 
  LifeBuoy, 
  CalendarDays,
  Briefcase,
  GraduationCap,
  SlidersHorizontal,
  Activity
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeDestination, setActiveDestination, actionItems, user } = useApp();

  const urgentCount = actionItems.filter(
    i => (i.priority === 'urgent' || i.isDueToday) && i.status !== 'completed'
  ).length;

  const destinations: { id: Destination; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'today', label: 'Today', icon: CalendarCheck2, badge: urgentCount > 0 ? urgentCount : undefined },
    { id: 'path', label: 'My Path', icon: Compass },
    { id: 'courses', label: 'Courses & Learn', icon: BookOpen },
    { id: 'campus', label: 'Campus & Support', icon: LifeBuoy },
    { id: 'plan', label: 'Plan & Calendar', icon: CalendarDays }
  ];

  return (
    <nav className="bg-[#0c0f16] border-b border-[#1c2230] px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar">
        
        {/* Five Canonical Destinations */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-1">
          {destinations.map(dest => {
            const Icon = dest.icon;
            const isActive = activeDestination === dest.id;

            return (
              <button
                key={dest.id}
                onClick={() => setActiveDestination(dest.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#f1f3f7] bg-[#161c28] border border-[#2b354c] shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#f1f3f7] hover:bg-[#121620]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-[#64748b]'}`} />
                <span>{dest.label}</span>
                {dest.badge && (
                  <span className="w-4 h-4 rounded-full bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {dest.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#d4af37] rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Role Workspace Indicator / Contextual Info */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-[#64748b]">
          {user.currentRole !== 'student' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#201d12] border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <Activity className="w-3.5 h-3.5" />
              <span>Viewing in {user.currentRole.toUpperCase()} Authority Mode</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[11px] text-[#94a3b8]">
            <span>Degree Progress:</span>
            <span className="font-semibold text-white">{user.creditsEarned} / {user.creditsTotalRequired} Cr</span>
            <span className="text-[#64748b]">({Math.round((user.creditsEarned / user.creditsTotalRequired) * 100)}%)</span>
          </div>
        </div>

      </div>
    </nav>
  );
};
