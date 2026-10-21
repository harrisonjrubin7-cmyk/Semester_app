import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Building2, 
  ShieldCheck, 
  FileCheck, 
  Database, 
  RefreshCw, 
  Lock, 
  Activity,
  History
} from 'lucide-react';

export const RegistrarView: React.FC = () => {
  const { registrationPlan, resolveHold } = useApp();
  const [reconcileStatus, setReconcileStatus] = useState<string | null>(null);

  const handleSyncSIS = () => {
    setReconcileStatus('Reconciled 4,812 enrollment records with PeopleSoft SIS database. Zero drift detected.');
    setTimeout(() => setReconcileStatus(null), 4000);
  };

  const auditLogs = [
    { id: 'log_1', time: 'Today 10:14 AM', event: 'FERPA Access Log: Faculty Thorne viewed Alexandria Vance transcript', status: 'Authorized' },
    { id: 'log_2', time: 'Today 9:45 AM', event: 'Degree Audit Evaluation Engine: Batch run completed for 380 Arts & Science Juniors', status: 'Success' },
    { id: 'log_3', time: 'Today 8:00 AM', event: 'Canvas LMS Connector: Synchronized 4 course gradebooks and assignment rubrics', status: 'Healthy' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Registrar Header */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>University Registrar Operations & Governance</span>
              <span>·</span>
              <span>Authoritative Control Plane</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Office of the University Registrar
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Curriculum governance, degree conferral audit, SIS hold registry, and FERPA access log ledger.
            </p>
          </div>

          <button
            onClick={handleSyncSIS}
            className="px-3.5 py-2 bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold text-xs rounded flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconcile SIS & Edge Cache</span>
          </button>
        </div>

        {reconcileStatus && (
          <div className="mt-4 p-3 rounded bg-[#152a1e] border border-[#10b981]/50 text-xs text-[#86efac]">
            {reconcileStatus}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Registration Hold Ledger */}
        <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Institutional Registration Holds Master Ledger</h2>
            <ProvenanceBadge provenance="official_sis" officialRecord={true} />
          </div>

          <div className="space-y-2.5 text-xs">
            {registrationPlan.holds.map(h => (
              <div key={h.id} className="p-3.5 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{h.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      h.status === 'active' ? 'bg-[#ef4444] text-white' : 'bg-[#10b981] text-black'
                    }`}>
                      {h.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-0.5">{h.department} · {h.originator}</div>
                </div>

                {h.status === 'active' ? (
                  <button
                    onClick={() => resolveHold(h.id)}
                    className="px-2.5 py-1 bg-[#10b981] hover:bg-[#059669] text-black font-semibold rounded text-[11px]"
                  >
                    Release Hold
                  </button>
                ) : (
                  <span className="text-[11px] text-[#6ee7b7]">Released</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FERPA Compliance & Access Audit Log */}
        <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#d4af37]" />
              <span>FERPA Audit Trail Ledger</span>
            </h2>
            <span className="text-xs text-[#10b981]">Encrypted & Immutable</span>
          </div>

          <div className="space-y-2 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded bg-[#0c0f16] border border-[#1a2030] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#d4af37] text-[10px] font-mono">{log.time}</span>
                  <span className="text-[#6ee7b7] text-[10px] font-medium">{log.status}</span>
                </div>
                <div className="text-[#cbd5e1]">{log.event}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
