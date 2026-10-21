import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { sampleGovernanceEvidence } from '../../state/mockData';
import { FileCheck, X, CheckCircle2, ShieldCheck, Database, Layers, ArrowUpRight } from 'lucide-react';

export const EvidenceRegisterModal: React.FC = () => {
  const { isEvidenceRegisterOpen, setIsEvidenceRegisterOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'manifest' | 'capabilities' | 'evidence'>('manifest');

  if (!isEvidenceRegisterOpen) return null;

  const capabilities = [
    { domain: 'Action Center & Identity', feature: 'Connected Student Priority Queue', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'Academic Planning', feature: 'Degree Audit & What-If Simulation', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'Registration System', feature: 'Two-Phase SIS Holds & Enrollment Write', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'Course Spaces & Study', feature: 'Syllabus Extraction & Flashcards', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'AI Governance', feature: 'Grounded Citation Gateway & Clearances', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'Institutional Operations', feature: 'Faculty Grading Desk & Advisor Alerts', designed: true, implemented: true, tested: true, authorized: true },
    { domain: 'Autonomous SIS Writes', feature: 'Unattended AI Registration/Grading', designed: false, implemented: false, tested: false, authorized: false }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsEvidenceRegisterOpen(false)}
    >
      <div 
        className="w-full max-w-3xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#1c2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#d4af37]" />
            <span className="font-serif font-bold text-base text-white">Canonical Release & Capability Register</span>
          </div>
          <button 
            onClick={() => setIsEvidenceRegisterOpen(false)}
            className="text-[#64748b] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#1c2230] text-xs">
          {[
            { id: 'manifest', label: 'Release Manifest v2026.10' },
            { id: 'capabilities', label: 'Platform Capability Matrix' },
            { id: 'evidence', label: 'Governance & Audit Evidence' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`pb-2.5 font-medium transition-colors border-b-2 ${
                activeTab === t.id
                  ? 'border-[#d4af37] text-white'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#cbd5e1]">
          
          {/* TAB 1: MANIFEST */}
          {activeTab === 'manifest' && (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[#0c0f16] border border-[#1f2637] font-mono text-[11px] space-y-1.5">
                <div className="text-[#d4af37] font-bold">RELEASE IDENTIFIER: semester-v2026.10.4-l9</div>
                <div>SOURCE REVISION: git-commit 8f921d7a (Vanderbilt Pilot Verified)</div>
                <div>TARGET ENVIRONMENT: Vanderbilt Production Edge (Port 3000 / Cloud Run)</div>
                <div>RUNTIME VERSION: Node.js 22.23.3 / React 19 / TypeScript 5.7 / Vite 6</div>
                <div>AUTHORITATIVE DATA: PeopleSoft SIS v3.2 & Canvas LMS API Gateway</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded bg-[#161c28] border border-[#222b3d] space-y-2">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                    <span>Enabled Capabilities</span>
                  </div>
                  <ul className="space-y-1 text-[#94a3b8] list-disc list-inside">
                    <li>Single Unified Shell & 5 Canonical Destinations</li>
                    <li>Connected Action Center with Provenance Badging</li>
                    <li>Degree Audit & What-If Simulation Sandbox</li>
                    <li>Syllabus Grounded Flashcards & Active Recall</li>
                    <li>Governed AI Assistant with Academic Integrity Rules</li>
                    <li>Faculty Grading Desk & Advisor Hold Clearances</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded bg-[#241717] border border-[#ef4444]/40 space-y-2">
                  <div className="font-semibold text-[#fca5a5] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
                    <span>Explicitly Prohibited / Disabled</span>
                  </div>
                  <ul className="space-y-1 text-[#fca5a5]/80 list-disc list-inside">
                    <li>No autonomous AI registration without user action</li>
                    <li>No direct exam answers or honor code bypass</li>
                    <li>No unauthorized employer transcript disclosure</li>
                    <li>No cross-tenant data leaks between institutions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAPABILITY MATRIX */}
          {activeTab === 'capabilities' && (
            <div className="space-y-2">
              <div className="text-[#94a3b8] mb-2">
                Status register distinguishing Designed, Implemented, Tested, and Institution-Authorized states:
              </div>

              <div className="border border-[#1f2637] rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#141824] text-[#94a3b8] border-b border-[#1f2637]">
                    <tr>
                      <th className="p-2.5">Domain</th>
                      <th className="p-2.5">Capability / Workflow</th>
                      <th className="p-2.5 text-center">Design</th>
                      <th className="p-2.5 text-center">Code</th>
                      <th className="p-2.5 text-center">Tested</th>
                      <th className="p-2.5 text-center">Authorized</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2230]">
                    {capabilities.map((c, idx) => (
                      <tr key={idx} className="hover:bg-[#161c28]">
                        <td className="p-2.5 font-medium text-white">{c.domain}</td>
                        <td className="p-2.5 text-[#cbd5e1]">{c.feature}</td>
                        <td className="p-2.5 text-center">{c.designed ? '✅' : '❌'}</td>
                        <td className="p-2.5 text-center">{c.implemented ? '✅' : '❌'}</td>
                        <td className="p-2.5 text-center">{c.tested ? '✅' : '❌'}</td>
                        <td className="p-2.5 text-center">{c.authorized ? '✅' : '❌'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: EVIDENCE REGISTRY */}
          {activeTab === 'evidence' && (
            <div className="space-y-3">
              {sampleGovernanceEvidence.map(ev => (
                <div key={ev.id} className="p-3.5 rounded bg-[#161c28] border border-[#222b3d] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{ev.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30 font-medium">
                      {ev.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#d4af37]">{ev.domain} · Owner: {ev.owner}</div>
                  <p className="text-[#94a3b8]">{ev.notes}</p>
                  <div className="text-[10px] text-[#64748b]">Last audited: {ev.lastReviewed}</div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0c0f16] border-t border-[#1c2230] text-right">
          <button
            onClick={() => setIsEvidenceRegisterOpen(false)}
            className="px-4 py-1.5 bg-[#1e2536] text-white rounded hover:bg-[#28324a] text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
