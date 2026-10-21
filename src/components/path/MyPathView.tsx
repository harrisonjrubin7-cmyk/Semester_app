import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { sampleDegreeRequirements } from '../../state/mockData';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { PrerequisiteGraphModal } from './PrerequisiteGraphModal';
import { 
  Compass, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Shuffle, 
  BookOpen, 
  ShoppingCart, 
  ShieldAlert, 
  Check, 
  ChevronRight,
  Info,
  CalendarCheck,
  GitBranch
} from 'lucide-react';

export const MyPathView: React.FC = () => {
  const { 
    user, 
    registrationPlan, 
    resolveHold, 
    enrollInCart, 
    whatIfMajor, 
    setWhatIfMajor,
    setActiveDestination 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'audit' | 'registration' | 'whatif'>('audit');
  const [enrollmentResult, setEnrollmentResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isPrereqModalOpen, setIsPrereqModalOpen] = useState(false);

  const handleEnroll = () => {
    const res = enrollInCart();
    setEnrollmentResult(res);
  };

  const activeHold = registrationPlan.holds.find(h => h.status === 'active' && h.blocksRegistration);

  return (
    <div className="space-y-6">
      
      {/* Path Header */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Academic Planning & Degree Architecture</span>
              <span>·</span>
              <span>Class of 2027</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Degree Audit & Pathway
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Tracking official requirements for <strong className="text-white">{user.major}</strong> with minor in <strong className="text-white">{user.minor}</strong>.
            </p>
          </div>

          {/* Quick Tabs & Prereq Graph Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPrereqModalOpen(true)}
              className="px-3 py-1.5 rounded bg-[#161c28] hover:bg-[#202738] border border-[#2d374e] text-xs font-medium text-[#d4af37] flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Prerequisite Flowchart</span>
            </button>

            <div className="flex items-center gap-1.5 p-1 bg-[#0c0f16] border border-[#202738] rounded-md text-xs">
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'audit'
                    ? 'bg-[#1e2536] text-[#f1f3f7] border border-[#2d374e]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Degree Audit
              </button>
              <button
                onClick={() => setActiveTab('registration')}
                className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'registration'
                    ? 'bg-[#1e2536] text-[#f1f3f7] border border-[#2d374e]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <span>Spring '27 Cart</span>
                {activeHold && <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>}
              </button>
              <button
                onClick={() => setActiveTab('whatif')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'whatif'
                    ? 'bg-[#1e2536] text-[#f1f3f7] border border-[#2d374e]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                What-If Simulator
              </button>
            </div>
          </div>
        </div>

        {/* Progress Metric Bar */}
        <div className="mt-5 pt-4 border-t border-[#1f2637] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[#64748b]">Total Credits Earned</div>
            <div className="text-base font-bold text-white mt-0.5">{user.creditsEarned} Cr</div>
            <div className="text-[11px] text-[#10b981]">Official Registrar Count</div>
          </div>
          <div>
            <div className="text-[#64748b]">In Progress (Fall 2026)</div>
            <div className="text-base font-bold text-[#d4af37] mt-0.5">12 Cr (4 courses)</div>
            <div className="text-[11px] text-[#94a3b8]">Enrolled & Active</div>
          </div>
          <div>
            <div className="text-[#64748b]">Remaining for BS/BA</div>
            <div className="text-base font-bold text-white mt-0.5">40 Cr</div>
            <div className="text-[11px] text-[#94a3b8]">3 Semesters on track</div>
          </div>
          <div>
            <div className="text-[#64748b]">Cumulative GPA</div>
            <div className="text-base font-bold text-white mt-0.5">{user.gpa} / 4.00</div>
            <div className="text-[11px] text-[#10b981]">Dean's List Standing</div>
          </div>
        </div>
      </div>

      {/* TAB 1: DEGREE AUDIT */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-semibold text-white flex items-center gap-2">
              <span>Undergraduate Degree Requirements</span>
              <ProvenanceBadge provenance="degree_audit" officialRecord={true} />
            </h2>
            <span className="text-xs text-[#64748b]">Evaluated using 2024-2028 Undergraduate Catalog</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sampleDegreeRequirements.map(req => {
              const pct = Math.min(100, Math.round((req.completedCredits / req.requiredCredits) * 100));
              const isFulfilled = req.status === 'fulfilled';

              return (
                <div key={req.id} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{req.name}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          isFulfilled
                            ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30'
                            : req.status === 'in_progress'
                            ? 'bg-[#d4af37]/20 text-[#fde047] border border-[#d4af37]/30'
                            : 'bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/30'
                        }`}>
                          {req.status === 'fulfilled' ? 'Fulfilled' : req.status === 'in_progress' ? 'In Progress' : 'Unfulfilled'}
                        </span>
                      </div>
                      <div className="text-xs text-[#94a3b8] mt-0.5">
                        {req.completedCredits} of {req.requiredCredits} credits completed ({pct}%)
                      </div>
                    </div>

                    <div className="w-full sm:w-48 bg-[#1a2030] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isFulfilled ? 'bg-[#10b981]' : 'bg-[#d4af37]'}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Matched Courses */}
                  {req.matchedCourses.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-[#64748b] uppercase">Applied Coursework:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {req.matchedCourses.map((c, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 rounded bg-[#161c28] border border-[#232b3d] text-[#cbd5e1]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Next Courses */}
                  {req.suggestedCourses && req.suggestedCourses.length > 0 && (
                    <div className="pt-2 border-t border-[#1c2230] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#94a3b8]">
                        <span className="text-[#d4af37] font-medium">Recommended Next:</span>
                        {req.suggestedCourses.map((s, idx) => (
                          <span key={idx} className="text-white font-medium">
                            {s.code} ({s.name}) · <span className="text-[#64748b]">{s.term}</span>
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveTab('registration')}
                        className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1"
                      >
                        <span>Add to Spring Cart</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: REGISTRATION READINESS & CART */}
      {activeTab === 'registration' && (
        <div className="space-y-5">
          
          {/* Active Hold Alert Box */}
          {activeHold ? (
            <div className="p-4 rounded-lg bg-[#2b1818] border border-[#ef4444]/50 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{activeHold.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ef4444] text-white font-bold">
                      Registration Blocking Hold
                    </span>
                  </div>
                  <p className="text-xs text-[#fca5a5]">
                    {activeHold.resolutionSteps}
                  </p>
                  <div className="text-[11px] text-[#e2e8f0] pt-1">
                    Originator: <strong className="text-white">{activeHold.originator}</strong> ({activeHold.department})
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#ef4444]/30">
                <span className="text-[11px] text-[#fca5a5]">
                  Advisor sign-off releases this hold instantly across PeopleSoft and Semester.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => resolveHold(activeHold.id)}
                    className="px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-black text-xs font-bold rounded transition-colors"
                  >
                    Authorize Release (Advisor / Demo Override)
                  </button>
                  <button
                    onClick={() => setActiveDestination('campus')}
                    className="px-3 py-1.5 bg-[#181d2a] text-white text-xs rounded hover:bg-[#202738] border border-[#374151]"
                  >
                    Book with Dr. Thorne
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-lg bg-[#14231b] border border-[#10b981]/40 flex items-center justify-between text-xs text-[#6ee7b7]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>
                  <strong>All Registration Holds Cleared:</strong> You are fully authorized to register when your time-ticket opens.
                </span>
              </div>
              <span className="text-[11px] text-white font-mono">{registrationPlan.timeTicket}</span>
            </div>
          )}

          {/* Planned Schedule Cart */}
          <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#d4af37]" />
                  <span>Spring 2027 Planned Schedule Cart</span>
                  <span className="text-xs text-[#94a3b8]">({registrationPlan.totalPlannedCredits} Credits Planned)</span>
                </h3>
                <p className="text-xs text-[#64748b]">Prerequisites validated against transcript; 0 time clashes detected.</p>
              </div>

              <button
                onClick={handleEnroll}
                disabled={!registrationPlan.isEligible}
                className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 transition-all ${
                  registrationPlan.isEligible
                    ? 'bg-[#d4af37] hover:bg-[#e5c068] text-black shadow'
                    : 'bg-[#1e2434] text-[#64748b] cursor-not-allowed border border-[#2b354c]'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Submit Official SIS Registration (15 Cr)</span>
              </button>
            </div>

            {/* Enrollment feedback receipt */}
            {enrollmentResult && (
              <div className={`p-3 rounded text-xs border ${
                enrollmentResult.success 
                  ? 'bg-[#152a1e] border-[#10b981]/40 text-[#86efac]' 
                  : 'bg-[#2b1818] border-[#ef4444]/40 text-[#fca5a5]'
              }`}>
                {enrollmentResult.message}
              </div>
            )}

            {/* Courses in Cart */}
            <div className="space-y-2">
              {registrationPlan.plannedCourses.map(course => (
                <div key={course.crn} className="p-3.5 rounded bg-[#161c28] border border-[#222b3d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{course.code}</span>
                      <span className="text-[#94a3b8] font-medium">{course.title}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#0c0f16] text-[#d4af37] font-mono text-[10px]">
                        CRN: {course.crn}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      Sec {course.section} · {course.instructor} · {course.days} {course.time} · {course.credits} Credits
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30 text-[10px] font-medium">
                      Prereqs Met
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize ${
                      course.status === 'enrolled' 
                        ? 'bg-[#10b981] text-black font-bold' 
                        : 'bg-[#1c2436] text-[#93c5fd] border border-[#3b82f6]/40'
                    }`}>
                      {course.status === 'enrolled' ? 'Officially Enrolled' : 'Ready in Cart'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: WHAT-IF SIMULATOR */}
      {activeTab === 'whatif' && (
        <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-semibold text-white">Interactive What-If Degree Simulator</h3>
                <ProvenanceBadge provenance="student_draft" officialRecord={false} />
              </div>
              <p className="text-xs text-[#94a3b8] mt-1">
                Model alternative academic tracks, double majors, or concentrations without altering your declared degree record.
              </p>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#201d14] border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-mono">
              Draft Sandbox
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                Simulate Program / Major:
              </label>
              <select
                value={whatIfMajor}
                onChange={(e) => setWhatIfMajor(e.target.value)}
                className="w-full bg-[#0c0f16] border border-[#232b3d] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Economics & Public Policy">Economics & Public Policy (Current Major)</option>
                <option value="Economics + Data Science (Double Major)">Economics + Data Science (Double Major)</option>
                <option value="Finance & Quantitative Economics">Finance & Quantitative Economics (Owen Pre-Track)</option>
                <option value="Political Science & Constitutional Law">Political Science & Constitutional Law</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                Anticipated Graduation Term:
              </label>
              <select className="w-full bg-[#0c0f16] border border-[#232b3d] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#d4af37]">
                <option>May 2027 (On Schedule)</option>
                <option>December 2026 (Accelerated)</option>
                <option>December 2027 (With Immersion Research)</option>
              </select>
            </div>
          </div>

          {/* Simulation Result Comparison */}
          <div className="p-4 rounded bg-[#0c0f16] border border-[#1f2637] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Simulation Scenario: {whatIfMajor}</span>
              <span className="text-[#10b981] font-medium">92% Course Overlap</span>
            </div>

            <div className="text-xs text-[#94a3b8] space-y-1.5">
              <div>• <strong>Current Completed Courses:</strong> 22 of 24 required courses satisfy this simulated curriculum.</div>
              <div>• <strong>Delta Requirements:</strong> Requires 2 additional courses: <span className="text-white">CS 2201 (Data Structures)</span> and <span className="text-white">MATH 2410 (Linear Algebra)</span>.</div>
              <div>• <strong>Estimated Terms to Degree:</strong> 3 terms at standard 15-credit pace.</div>
            </div>

            <div className="pt-2 text-[11px] text-[#64748b] border-t border-[#1a2030] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>To officially change your major or declare a second program, submit an Academic Program Change Petition to the College Registrar.</span>
            </div>
          </div>

        </div>
      )}

      {/* Prerequisite Flowchart Modal */}
      {isPrereqModalOpen && (
        <PrerequisiteGraphModal onClose={() => setIsPrereqModalOpen(false)} />
      )}

    </div>
  );
};
