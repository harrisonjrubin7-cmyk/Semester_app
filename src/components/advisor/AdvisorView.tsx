import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  GraduationCap, 
  ShieldCheck,
  Send
} from 'lucide-react';

export const AdvisorView: React.FC = () => {
  const { resolveHold, registrationPlan } = useApp();
  const [clearedNotice, setClearedNotice] = useState<string | null>(null);

  const advisees = [
    {
      id: 'adv_1',
      name: 'Alexandria Vance',
      class: 'Junior (Class of 2027)',
      major: 'Economics & Public Policy',
      credits: '68 / 120 Cr',
      gpa: '3.84',
      holdActive: registrationPlan.holds.some(h => h.id === 'hld_adv_01' && h.status === 'active'),
      alert: 'Spring 2027 Registration Hold Pending Approval'
    },
    {
      id: 'adv_2',
      name: 'Marcus Reed',
      class: 'Senior (Class of 2026)',
      major: 'Economics',
      credits: '106 / 120 Cr',
      gpa: '3.42',
      holdActive: false,
      alert: 'Graduation audit approved for May 2027'
    },
    {
      id: 'adv_3',
      name: 'Priya Patel',
      class: 'Sophomore (Class of 2028)',
      major: 'Public Policy',
      credits: '34 / 120 Cr',
      gpa: '3.91',
      holdActive: false,
      alert: 'Needs quantitative methods course prerequisite check'
    }
  ];

  const handleClearHold = () => {
    resolveHold('hld_adv_01');
    setClearedNotice('Advising Hold officially cleared in Registrar SIS for Alexandria Vance. Student time-ticket is now active.');
  };

  return (
    <div className="space-y-6">
      
      {/* Advisor Banner */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Academic Advising & Caseload Console</span>
              <span>·</span>
              <span>College of Arts & Science</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Patricia Holland — Academic Advising Desk
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Student progress monitoring, mandatory pre-registration clearance, and intervention workflows.
            </p>
          </div>
          <ProvenanceBadge provenance="advising_system" officialRecord={true} />
        </div>

        {clearedNotice && (
          <div className="mt-4 p-3 rounded bg-[#152a1e] border border-[#10b981]/50 text-xs text-[#86efac]">
            {clearedNotice}
          </div>
        )}
      </div>

      {/* Advisee Roster Table */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-serif font-semibold text-white">Assigned Student Cohort (Junior Class)</h2>
          <span className="text-xs text-[#64748b]">3 Active Advisees</span>
        </div>

        <div className="space-y-3">
          {advisees.map(student => (
            <div key={student.id} className="p-4 rounded-lg bg-[#161c28] border border-[#222b3d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{student.name}</span>
                  <span className="text-[11px] text-[#d4af37]">{student.class}</span>
                  <span className="text-[#64748b]">·</span>
                  <span className="text-[#94a3b8]">{student.major}</span>
                </div>
                <div className="text-[11px] text-[#64748b] flex items-center gap-3">
                  <span>GPA: <strong className="text-white">{student.gpa}</strong></span>
                  <span>Progress: <strong className="text-white">{student.credits}</strong></span>
                  <span className={student.holdActive ? 'text-[#ef4444] font-medium' : 'text-[#10b981]'}>
                    {student.alert}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {student.holdActive ? (
                  <button
                    onClick={handleClearHold}
                    className="px-3.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-black font-bold rounded text-xs transition-colors shadow-sm"
                  >
                    Clear Advising Hold
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded bg-[#132219] text-[#6ee7b7] border border-[#10b981]/30 text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Hold Cleared</span>
                  </span>
                )}
                <button className="px-3 py-1.5 bg-[#1e2434] hover:bg-[#273045] text-white rounded text-xs border border-[#2e3a52]">
                  Degree Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
