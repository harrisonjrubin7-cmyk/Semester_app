import React from 'react';
import { ProvenanceType } from '../../types';
import { ShieldCheck, Database, FileText, Sparkles, UserCheck } from 'lucide-react';

interface Props {
  provenance: ProvenanceType;
  officialRecord?: boolean;
}

export const ProvenanceBadge: React.FC<Props> = ({ provenance, officialRecord }) => {
  switch (provenance) {
    case 'official_sis':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#1c2230] text-[#d4af37] border border-[#d4af37]/30">
          <ShieldCheck className="w-3 h-3" />
          Official SIS
        </span>
      );
    case 'canvas_lms':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#1e2438] text-[#93c5fd] border border-[#3b82f6]/30">
          <Database className="w-3 h-3" />
          Canvas LMS
        </span>
      );
    case 'degree_audit':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#1a2e22] text-[#6ee7b7] border border-[#10b981]/30">
          <ShieldCheck className="w-3 h-3" />
          Registrar Audit
        </span>
      );
    case 'advising_system':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#271d33] text-[#d8b4fe] border border-[#8b5cf6]/30">
          <UserCheck className="w-3 h-3" />
          Advising System
        </span>
      );
    case 'ai_generated':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#2a1a2e] text-[#f472b6] border border-[#ec4899]/30">
          <Sparkles className="w-3 h-3" />
          AI Derived (Unofficial)
        </span>
      );
    case 'student_draft':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-[#151922] text-[#94a3b8] border border-dashed border-[#475569]">
          <FileText className="w-3 h-3" />
          Private Student Draft
        </span>
      );
  }
};
