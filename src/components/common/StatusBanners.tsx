import React from 'react';
import { useApp } from '../../state/AppContext';
import { AlertCircle, WifiOff, Info, ExternalLink } from 'lucide-react';

export const StatusBanners: React.FC = () => {
  const { isOffline, toggleOffline } = useApp();

  return (
    <div className="space-y-1">
      {/* Offline Mode Banner */}
      {isOffline && (
        <div className="bg-[#3b1515] border-b border-[#ef4444]/40 px-4 py-2 text-xs text-[#fecaca] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-[#ef4444] shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> Reading from local browser storage cache. Submissions and SIS writes will queue safely until network connectivity is restored.
            </span>
          </div>
          <button
            onClick={toggleOffline}
            className="px-2.5 py-1 bg-[#ef4444] text-white rounded font-medium text-[11px] hover:bg-[#dc2626] transition-colors"
          >
            Reconnect Edge
          </button>
        </div>
      )}

      {/* Advisory Simulation & Data Boundary Banner */}
      <div className="bg-[#121620] border-b border-[#1f2637] px-4 py-1.5 text-[11px] text-[#94a3b8] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Info className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span className="truncate">
            <strong>System Notice:</strong> Student planning drafts and what-if simulations are advisory and private. Official registration and degree conferral are determined exclusively by the University Registrar.
          </span>
        </div>
        <div className="shrink-0 text-[10px] text-[#64748b] hidden sm:block">
          FERPA & Institutional Policy 2026.4
        </div>
      </div>
    </div>
  );
};
