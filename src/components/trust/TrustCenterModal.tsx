import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { Shield, X, Download, Lock, CheckCircle2, AlertCircle, FileText, Database } from 'lucide-react';

export const TrustCenterModal: React.FC = () => {
  const { isTrustCenterOpen, setIsTrustCenterOpen, user } = useApp();
  const [exportRequested, setExportRequested] = useState(false);

  if (!isTrustCenterOpen) return null;

  const handleExportData = () => {
    setExportRequested(true);
    setTimeout(() => {
      // Simulate real JSON download
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        student: user.name,
        email: user.email,
        institution: user.institution,
        exportDate: new Date().toISOString(),
        ferpaClassification: "Student Controlled Educational Records",
        courses: ["ECON 201", "PSCI 102", "BUS 310", "CORE 100"]
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `semester_data_export_${user.campusId}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setExportRequested(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsTrustCenterOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#1c2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#d4af37]" />
            <span className="font-serif font-bold text-base text-white">Trust Center, FERPA & Privacy Governance</span>
          </div>
          <button 
            onClick={() => setIsTrustCenterOpen(false)}
            className="text-[#64748b] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#cbd5e1] leading-relaxed">
          
          {/* Institutional Data Isolation Guarantee */}
          <div className="p-4 rounded-lg bg-[#0c0f16] border border-[#1f2637] space-y-2">
            <div className="font-semibold text-white flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-[#10b981]" />
              <span>Strict Student Data Isolation Policy</span>
            </div>
            <p className="text-[#94a3b8]">
              Semester strictly enforces tenant boundaries. Your personal notes, what-if degree simulations, study drafts, and AI prompts are private to you. They are never published to employers, advisors, or official transcript records without your explicit opt-in confirmation.
            </p>
          </div>

          {/* Connected Integrations & Source Authority */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Authoritative Institutional Connectors</h3>
            
            <div className="space-y-2">
              <div className="p-3 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">PeopleSoft Campus Solutions (SIS)</div>
                  <div className="text-[11px] text-[#64748b]">Source authority for grades, active holds, official enrollment & transcripts.</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30">
                  Verified Synced
                </span>
              </div>

              <div className="p-3 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Canvas LMS API Connector</div>
                  <div className="text-[11px] text-[#64748b]">Real-time synchronization of syllabi, assignments, and rubric criteria.</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* FERPA Data Rights & Export */}
          <div className="p-4 rounded-lg bg-[#161c28] border border-[#222b3d] space-y-3">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>FERPA Data Rights & Portability Export</span>
            </h3>
            <p className="text-[#94a3b8]">
              Under FERPA and university data policies, you have the right to inspect and download all personal academic data, study history, and private drafts stored within Semester.
            </p>
            <button
              onClick={handleExportData}
              disabled={exportRequested}
              className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold rounded text-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{exportRequested ? 'Generating Verified Archive...' : 'Download My Full Data Package (JSON)'}</span>
            </button>
          </div>

          {/* Multi-Factor Authentication & Session Security */}
          <div className="flex items-center justify-between p-3 rounded bg-[#0c0f16] border border-[#1f2637]">
            <div className="space-y-0.5">
              <div className="font-medium text-white">Privileged MFA & SSO Session</div>
              <div className="text-[11px] text-[#64748b]">Secured by Vanderbilt Duo Security SSO. Session expires in 12 hours.</div>
            </div>
            <span className="text-[#10b981] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enforced</span>
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0c0f16] border-t border-[#1c2230] text-right">
          <button
            onClick={() => setIsTrustCenterOpen(false)}
            className="px-4 py-1.5 bg-[#1e2536] text-white rounded hover:bg-[#28324a] text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
