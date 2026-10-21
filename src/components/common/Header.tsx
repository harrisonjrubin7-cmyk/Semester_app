import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { UserRole } from '../../types';
import { 
  Search, 
  Sparkles, 
  Shield, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  ChevronDown,
  Layers,
  FileCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, 
    switchRole, 
    actionItems, 
    isAiOpen, 
    setIsAiOpen, 
    setIsCommandPaletteOpen,
    setIsTrustCenterOpen,
    setIsEvidenceRegisterOpen,
    isOffline,
    toggleOffline
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const pendingUrgentCount = actionItems.filter(
    item => (item.priority === 'urgent' || item.isDueToday) && item.status !== 'completed'
  ).length;

  const roleLabels: Record<UserRole, { label: string; desc: string }> = {
    student: { label: 'Student View', desc: 'Alexandria Vance (Junior)' },
    faculty: { label: 'Faculty View', desc: 'Dr. Gregory Thorne (Economics)' },
    advisor: { label: 'Advisor View', desc: 'Patricia Holland (Dean\'s Office)' },
    registrar: { label: 'Registrar Operations', desc: 'Curriculum & Holds Authority' },
    operator: { label: 'System Operator', desc: 'SRE & Audit Gateway' }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0c0f16]/95 backdrop-blur-md border-b border-[#1c2230] px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo and Institution Context */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[#d4af37] to-[#997b1a] flex items-center justify-center shadow-sm">
              <span className="font-serif font-bold text-black text-sm tracking-tighter">S</span>
            </div>
            <span className="font-serif font-semibold text-lg text-white tracking-wide">Semester</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#131722] border border-[#202738] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="font-medium text-[#f1f3f7]">{user.institution}</span>
            <span className="text-[#64748b]">·</span>
            <span className="text-[#94a3b8]">Fall 2026</span>
          </div>
        </div>

        {/* Global Search Button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex-1 max-w-md mx-2 hidden md:flex items-center justify-between px-3 py-1.5 rounded-md bg-[#131722] border border-[#202738] hover:border-[#38435d] text-sm text-[#94a3b8] transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#64748b]" />
            <span>Search courses, requirements, rooms, people...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[#1a2030] text-[#94a3b8] rounded border border-[#2b354c] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Offline Mode Toggle */}
          <button
            onClick={toggleOffline}
            title={isOffline ? "App is running offline with cached local storage" : "Connected to Campus Edge Network"}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors border ${
              isOffline 
                ? 'bg-[#3b1d1d] text-[#fca5a5] border-[#ef4444]/40' 
                : 'bg-[#131722] text-[#94a3b8] border-[#202738] hover:text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#ef4444]" /> : <Wifi className="w-3.5 h-3.5 text-[#10b981]" />}
            <span className="hidden lg:inline text-[11px] font-medium">
              {isOffline ? 'Offline Cache' : 'Edge Live'}
            </span>
          </button>

          {/* Governed AI Assistant Toggle */}
          <button
            onClick={() => setIsAiOpen(!isAiOpen)}
            className={`px-2.5 py-1.5 rounded flex items-center gap-1.5 text-xs font-medium transition-all border ${
              isAiOpen
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm font-semibold'
                : 'bg-[#181d2a] text-[#f1f3f7] border-[#293247] hover:border-[#d4af37]/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Semester Intelligence</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Evidence & Release Register (Requested in Prompt) */}
          <button
            onClick={() => setIsEvidenceRegisterOpen(true)}
            title="Capability & Evidence Register"
            className="p-1.5 rounded bg-[#131722] text-[#94a3b8] border border-[#202738] hover:text-white hover:border-[#38435d] transition-colors"
          >
            <FileCheck className="w-4 h-4 text-[#d4af37]" />
          </button>

          {/* Trust Center / Privacy Modal */}
          <button
            onClick={() => setIsTrustCenterOpen(true)}
            title="Trust Center, FERPA & Privacy Controls"
            className="p-1.5 rounded bg-[#131722] text-[#94a3b8] border border-[#202738] hover:text-white hover:border-[#38435d] transition-colors"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded bg-[#161b26] border border-[#242c3f] hover:border-[#3a4763] text-xs transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-[#20273a] flex items-center justify-center text-[10px] font-medium text-[#d4af37]">
                {user.avatar || 'AV'}
              </div>
              <div className="text-left hidden md:block">
                <div className="font-medium text-[#f1f3f7] leading-tight capitalize">{user.currentRole}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
            </button>

            {isRoleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-md bg-[#121620] border border-[#232a3b] shadow-xl p-1.5 z-50 text-xs"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-2.5 py-2 border-b border-[#1c2230] mb-1">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-[11px] text-[#94a3b8]">{user.email}</div>
                  <div className="text-[10px] text-[#d4af37] font-mono mt-0.5">{user.campusId}</div>
                </div>

                <div className="text-[10px] uppercase font-semibold text-[#64748b] px-2.5 py-1">
                  Switch System Persona
                </div>

                {user.availableRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => switchRole(role)}
                    className={`w-full text-left px-2.5 py-2 rounded flex flex-col gap-0.5 transition-colors ${
                      user.currentRole === role 
                        ? 'bg-[#1e2434] text-[#d4af37] font-medium' 
                        : 'text-[#cbd5e1] hover:bg-[#181d2a]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{roleLabels[role].label}</span>
                      {user.currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>}
                    </div>
                    <span className="text-[10px] text-[#64748b]">{roleLabels[role].desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
