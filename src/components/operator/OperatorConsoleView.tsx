import React, { useState } from 'react';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Activity, 
  ShieldAlert, 
  Server, 
  Cpu, 
  Database, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Power
} from 'lucide-react';

export const OperatorConsoleView: React.FC = () => {
  const [connectors, setConnectors] = useState([
    { name: 'PeopleSoft SIS Connector (v3.2)', latency: '34ms', status: 'Healthy', p99: '62ms', uptime: '99.98%' },
    { name: 'Canvas LMS GraphQL Gateway', latency: '19ms', status: 'Healthy', p99: '45ms', uptime: '99.99%' },
    { name: 'Duo Security SSO / SAML 2.0', latency: '12ms', status: 'Healthy', p99: '28ms', uptime: '100.0%' },
    { name: 'AI Inference Policy Gateway', latency: '210ms', status: 'Healthy', p99: '450ms', uptime: '99.95%' },
    { name: 'Cloud Run Production Edge (us-east1)', latency: '8ms', status: 'Healthy', p99: '16ms', uptime: '100.0%' }
  ]);

  const [killSwitches, setKillSwitches] = useState({
    aiHomeworkAssistance: false,
    directSisWrites: false,
    externalCalendarSync: false
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const toggleSwitch = (key: keyof typeof killSwitches) => {
    setKillSwitches(prev => {
      const next = !prev[key];
      setStatusMessage(`Updated Kill Switch: ${key} is now ${next ? 'HALTED (CIRCUIT OPEN)' : 'ACTIVE (NORMAL)'}`);
      setTimeout(() => setStatusMessage(null), 3500);
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* SRE Banner */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Platform Engineering & Site Reliability Console</span>
              <span>·</span>
              <span>SLO / SLA Tier 1</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Semester Production SRE & Gateway Control Plane
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Real-time telemetry, connector health probes, circuit breaker kill switches, and SLA metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
            <span className="text-xs font-mono text-[#6ee7b7] font-bold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded bg-[#201d14] border border-[#d4af37]/40 text-xs text-[#fde047]">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Real-Time Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-1">
          <div className="text-[#64748b]">Edge Ingestion Latency</div>
          <div className="text-xl font-bold font-mono text-white">14.2 ms</div>
          <div className="text-[10px] text-[#10b981]">p99 target: &lt; 50ms</div>
        </div>

        <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-1">
          <div className="text-[#64748b]">Cache Hit Ratio</div>
          <div className="text-xl font-bold font-mono text-[#d4af37]">96.8%</div>
          <div className="text-[10px] text-[#64748b]">Static & Syllabi edge assets</div>
        </div>

        <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-1">
          <div className="text-[#64748b]">Database Connection Saturation</div>
          <div className="text-xl font-bold font-mono text-white">11.4%</div>
          <div className="text-[10px] text-[#10b981]">Scale-to-zero capacity</div>
        </div>

        <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-1">
          <div className="text-[#64748b]">Monthly Error Budget Burn</div>
          <div className="text-xl font-bold font-mono text-[#10b981]">0.02%</div>
          <div className="text-[10px] text-[#10b981]">99.98% remaining</div>
        </div>
      </div>

      {/* Connectors & Kill Switches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Connectors (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-serif font-semibold text-white">Authoritative Campus Connectors Telemetry</h2>
          
          <div className="space-y-2 text-xs">
            {connectors.map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#121620] border border-[#1f2637] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white text-xs">{c.name}</div>
                  <div className="text-[11px] text-[#64748b]">p99: {c.p99} · 30-Day Availability: {c.uptime}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#d4af37] text-[11px]">{c.latency}</span>
                  <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30 font-medium text-[10px]">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Kill Switches (1 Col) */}
        <div className="space-y-3">
          <h2 className="text-sm font-serif font-semibold text-white">Emergency Circuit Breakers</h2>

          <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3 text-xs">
            <p className="text-[#94a3b8] text-[11px]">
              Instantly trip service circuits across production without deploying new images.
            </p>

            <div className="space-y-2">
              <div className="p-2.5 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">AI Homework Copilot</div>
                  <div className="text-[10px] text-[#64748b]">Disable syllabus problem set inference</div>
                </div>
                <button
                  onClick={() => toggleSwitch('aiHomeworkAssistance')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    killSwitches.aiHomeworkAssistance
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-[#1e2536] text-[#94a3b8]'
                  }`}
                >
                  {killSwitches.aiHomeworkAssistance ? 'CIRCUIT OPEN' : 'ACTIVE'}
                </button>
              </div>

              <div className="p-2.5 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Direct SIS Writes</div>
                  <div className="text-[10px] text-[#64748b]">Restrict enrollment to cart-only staging</div>
                </div>
                <button
                  onClick={() => toggleSwitch('directSisWrites')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    killSwitches.directSisWrites
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-[#1e2536] text-[#94a3b8]'
                  }`}
                >
                  {killSwitches.directSisWrites ? 'CIRCUIT OPEN' : 'ACTIVE'}
                </button>
              </div>

              <div className="p-2.5 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">External Calendar Sync</div>
                  <div className="text-[10px] text-[#64748b]">Halt Google/Outlook iCal sync workers</div>
                </div>
                <button
                  onClick={() => toggleSwitch('externalCalendarSync')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    killSwitches.externalCalendarSync
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-[#1e2536] text-[#94a3b8]'
                  }`}
                >
                  {killSwitches.externalCalendarSync ? 'CIRCUIT OPEN' : 'ACTIVE'}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
