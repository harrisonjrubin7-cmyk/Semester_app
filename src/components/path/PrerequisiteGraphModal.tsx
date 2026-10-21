import React from 'react';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  GitBranch, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Lock, 
  Sparkles,
  Layers
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onSelectCourse?: (code: string) => void;
}

export const PrerequisiteGraphModal: React.FC<Props> = ({ onClose, onSelectCourse }) => {
  const tiers = [
    {
      term: 'Foundational Prerequisites',
      courses: [
        { code: 'ECON 101', name: 'Principles of Microeconomics', status: 'completed', credits: 3 },
        { code: 'ECON 102', name: 'Principles of Macroeconomics', status: 'completed', credits: 3 },
        { code: 'MATH 110', name: 'Calculus I for Social Sciences', status: 'completed', credits: 3 },
        { code: 'PSCI 102', name: 'Comparative Democratic Institutions', status: 'enrolled', credits: 3 }
      ]
    },
    {
      term: 'Intermediate Core & Methods (Current Term - Fall 2026)',
      courses: [
        { code: 'ECON 201', name: 'Intermediate Microeconomic Theory', status: 'enrolled', credits: 3, prereq: 'ECON 101, MATH 110' },
        { code: 'STAT 215', name: 'Statistical Inference & Probability', status: 'completed', credits: 3, prereq: 'MATH 110' },
        { code: 'BUS 310', name: 'Corporate Valuation & Capital', status: 'enrolled', credits: 3, prereq: 'ECON 101' },
        { code: 'CORE 100', name: 'Humanities & Constitutional Thought', status: 'enrolled', credits: 3 }
      ]
    },
    {
      term: 'Spring 2027 Planned Curriculum (Cart)',
      courses: [
        { code: 'ECON 202', name: 'Intermediate Macroeconomic Theory', status: 'planned', credits: 3, prereq: 'ECON 102, MATH 110' },
        { code: 'ECON 205', name: 'Econometric Analysis & ML', status: 'planned', credits: 3, prereq: 'ECON 201, STAT 215' },
        { code: 'PSCI 226', name: 'Law and American Political Institutions', status: 'planned', credits: 3, prereq: 'PSCI 102' },
        { code: 'DATA 210', name: 'Data Science for Public Policy', status: 'planned', credits: 3, prereq: 'STAT 215' }
      ]
    },
    {
      term: 'Senior Capstone & Immersion (Fall 2027 - Spring 2028)',
      courses: [
        { code: 'PSCI 390', name: 'Senior Policy Capstone Seminar', status: 'locked', credits: 3, prereq: 'PSCI 226, ECON 205' },
        { code: 'IMMR 300', name: 'Vanderbilt Immersion Capstone', status: 'planned', credits: 3, prereq: 'Junior Standing' }
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#1c2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#d4af37]" />
            <span className="font-serif font-bold text-base text-white">
              Course Prerequisite Architecture & Curriculum Graph
            </span>
          </div>
          <button onClick={onClose} className="text-[#64748b] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="p-3 bg-[#0c0f16] border-b border-[#1c2230] flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#10b981]/30 border border-[#10b981]"></span>
            <span className="text-[#a7f3d0]">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#3b82f6]/30 border border-[#3b82f6]"></span>
            <span className="text-[#93c5fd]">In Progress (Fall 2026)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#d4af37]/30 border border-[#d4af37]"></span>
            <span className="text-[#fde047]">Ready in Spring Cart</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#334155]/30 border border-[#475569]"></span>
            <span className="text-[#94a3b8]">Future / Locked</span>
          </div>
        </div>

        {/* Dependency Flowchart Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {tiers.map((tier, tIdx) => (
            <div key={tIdx} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-bold text-[#d4af37] tracking-wide uppercase">
                  {tier.term}
                </span>
                <div className="flex-1 h-px bg-[#1f2637]"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.courses.map(c => {
                  let badgeClass = 'bg-[#181d2a] border-[#252f44] text-[#94a3b8]';
                  let statusLabel = 'Future';
                  let icon = <Lock className="w-3 h-3 text-[#64748b]" />;

                  if (c.status === 'completed') {
                    badgeClass = 'bg-[#12241b] border-[#10b981]/50 text-white';
                    statusLabel = 'Completed';
                    icon = <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />;
                  } else if (c.status === 'enrolled') {
                    badgeClass = 'bg-[#142033] border-[#3b82f6]/50 text-white';
                    statusLabel = 'Active';
                    icon = <Clock className="w-3.5 h-3.5 text-[#3b82f6]" />;
                  } else if (c.status === 'planned') {
                    badgeClass = 'bg-[#201d14] border-[#d4af37]/50 text-white';
                    statusLabel = 'Prereqs Met';
                    icon = <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />;
                  }

                  return (
                    <div
                      key={c.code}
                      className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 transition-all ${badgeClass}`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white font-mono">{c.code}</span>
                          <span className="text-[10px] flex items-center gap-1 font-medium">
                            {icon}
                            <span>{statusLabel}</span>
                          </span>
                        </div>
                        <div className="text-xs text-[#cbd5e1] font-medium mt-1 leading-snug">
                          {c.name}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-[10px] text-[#94a3b8] flex items-center justify-between">
                        <span>{c.credits} Credits</span>
                        {c.prereq && <span className="text-[#d4af37] truncate ml-1">Req: {c.prereq}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0c0f16] border-t border-[#1c2230] flex items-center justify-between text-xs">
          <span className="text-[#64748b]">
            All prerequisite validation rules are backed by the official Vanderbilt Registrar Course Catalog.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e2536] text-white rounded hover:bg-[#28324a]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
