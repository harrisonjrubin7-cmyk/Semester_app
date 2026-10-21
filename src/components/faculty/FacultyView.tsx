import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Sparkles, 
  ShieldAlert, 
  Sliders, 
  Send,
  Clock
} from 'lucide-react';

export const FacultyView: React.FC = () => {
  const { user } = useApp();
  const [courseAiPolicy, setCourseAiPolicy] = useState<'permitted_with_citation' | 'strict_no_ai'>('permitted_with_citation');
  const [gradingNotice, setGradingNotice] = useState<string | null>(null);

  const pendingSubmissions = [
    { student: 'Alexandria Vance', assignment: 'Problem Set 4: Cournot Duopoly', status: 'Submitted', time: 'Yesterday 8:42 PM', score: 'Draft 48/50' },
    { student: 'Tyler Brooks', assignment: 'Problem Set 4: Cournot Duopoly', status: 'Submitted', time: 'Today 10:14 AM', score: 'Ungraded' },
    { student: 'Chloe Zhang', assignment: 'Problem Set 4: Cournot Duopoly', status: 'In Progress', time: 'Active Draft', score: '—' }
  ];

  const handleGrade = (student: string) => {
    setGradingNotice(`Grade posted to Canvas LMS for ${student}. Student notification queued.`);
    setTimeout(() => setGradingNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Faculty Hero Banner */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Faculty Instruction Workspace</span>
              <span>·</span>
              <span>ECON 201 Section 01</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Dr. Gregory Thorne — Economics Faculty Desk
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Course roster, grading queue, office hours booking, and institutional AI governance.
            </p>
          </div>
          <ProvenanceBadge provenance="official_sis" officialRecord={true} />
        </div>

        {gradingNotice && (
          <div className="mt-4 p-3 rounded bg-[#152a1e] border border-[#10b981]/50 text-xs text-[#86efac]">
            {gradingNotice}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Grading Queue (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Student Submissions & Assessment Queue</h2>
            <span className="text-xs text-[#94a3b8]">3 Submissions in Review</span>
          </div>

          <div className="space-y-2.5">
            {pendingSubmissions.map((sub, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{sub.student}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1a2030] text-[#93c5fd]">
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-[#94a3b8]">{sub.assignment} · <span className="text-[#64748b]">{sub.time}</span></div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#d4af37] px-2 py-1 rounded bg-[#0c0f16] border border-[#1c2230]">
                    {sub.score}
                  </span>
                  <button
                    onClick={() => handleGrade(sub.student)}
                    className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold rounded transition-colors text-xs"
                  >
                    Post Grade to SIS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Integrity & Office Hours Controls (1 Col) */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Course AI Assistance Policy</span>
            </h3>

            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Define how Semester Intelligence handles homework help and code assistance for your students:
            </p>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2.5 p-2 rounded bg-[#161c28] border border-[#222b3d] cursor-pointer">
                <input
                  type="radio"
                  name="ai_policy"
                  checked={courseAiPolicy === 'permitted_with_citation'}
                  onChange={() => setCourseAiPolicy('permitted_with_citation')}
                  className="accent-[#d4af37]"
                />
                <div>
                  <div className="font-medium text-white">Permitted with Citation</div>
                  <div className="text-[10px] text-[#94a3b8]">AI helps with conceptual explanation but requires students to footnote prompt.</div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded bg-[#161c28] border border-[#222b3d] cursor-pointer">
                <input
                  type="radio"
                  name="ai_policy"
                  checked={courseAiPolicy === 'strict_no_ai'}
                  onChange={() => setCourseAiPolicy('strict_no_ai')}
                  className="accent-[#d4af37]"
                />
                <div>
                  <div className="font-medium text-white">Strict No AI Mode</div>
                  <div className="text-[10px] text-[#94a3b8]">AI copilot refuses problem set assistance for this course.</div>
                </div>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-2 text-xs">
            <div className="font-semibold text-white">Office Hours Schedule</div>
            <div className="text-[#94a3b8]">Tuesdays & Thursdays 2:00 PM – 4:00 PM (Calhoun 314)</div>
            <div className="text-[11px] text-[#10b981]">2 student appointments booked for today</div>
          </div>
        </div>

      </div>

    </div>
  );
};
