import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { sampleAdvisors, sampleTutors } from '../../state/mockData';
import { AdvisorInfo } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { AdvisorBookingModal } from './AdvisorBookingModal';
import { 
  LifeBuoy, 
  UserCheck, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Star, 
  Briefcase, 
  Building2, 
  PhoneCall, 
  Bookmark, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  Search
} from 'lucide-react';

export const CampusSupportView: React.FC = () => {
  const { opportunities, toggleSaveOpportunity, resolveHold } = useApp();
  const [activeCampusTab, setActiveCampusTab] = useState<'advising' | 'tutoring' | 'directory' | 'career'>('advising');
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [selectedBookingAdvisor, setSelectedBookingAdvisor] = useState<AdvisorInfo | null>(null);

  const handleBookAdvisor = (advisor: AdvisorInfo) => {
    setSelectedBookingAdvisor(advisor);
  };

  const handleBookTutor = (tutorName: string) => {
    setBookingMessage(`Confirmed: 45-minute peer tutoring session scheduled with ${tutorName} at Central Library Rm 402.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Campus Hub Header */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Campus Ecosystem & Student Support</span>
              <span>·</span>
              <span>Vanderbilt Network</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Advising, Support & Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Connect with faculty mentors, peer tutors, certified campus resources, and career evidence pathways.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#0c0f16] border border-[#202738] rounded-md text-xs">
            {[
              { id: 'advising', label: 'Advising' },
              { id: 'tutoring', label: 'Tutoring Match' },
              { id: 'career', label: 'Career Evidence' },
              { id: 'directory', label: 'Campus Services' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCampusTab(tab.id as any);
                  setBookingMessage(null);
                }}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeCampusTab === tab.id
                    ? 'bg-[#1e2536] text-[#f1f3f7] border border-[#2d374e]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {bookingMessage && (
          <div className="mt-4 p-3 rounded bg-[#152a1e] border border-[#10b981]/50 text-xs text-[#86efac] flex items-center justify-between">
            <span>{bookingMessage}</span>
            <button onClick={() => setBookingMessage(null)} className="text-[11px] underline ml-2">Dismiss</button>
          </div>
        )}
      </div>

      {/* SUB-TAB 1: ADVISING */}
      {activeCampusTab === 'advising' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Assigned Faculty Advisors & Deans</h2>
            <ProvenanceBadge provenance="advising_system" officialRecord={true} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleAdvisors.map(adv => (
              <div key={adv.id} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{adv.name}</h3>
                    <div className="text-xs text-[#d4af37]">{adv.title}</div>
                    <div className="text-[11px] text-[#64748b] mt-0.5">{adv.department}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1e2434] border border-[#2b354c] flex items-center justify-center text-xs font-bold text-[#d4af37]">
                    {adv.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <div className="text-xs text-[#cbd5e1] space-y-1 pt-1">
                  <div>📍 Office: <span className="text-white">{adv.office}</span></div>
                  <div>✉️ Email: <span className="text-[#94a3b8] font-mono text-[11px]">{adv.email}</span></div>
                  <div className="text-[#10b981]">🕒 Next Slot: <strong>{adv.nextAvailableSlot}</strong></div>
                </div>

                <div className="pt-2 border-t border-[#1a2030] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b]">Includes Degree Audit Prep</span>
                  <button
                    onClick={() => handleBookAdvisor(adv)}
                    className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e5c068] text-black text-xs font-semibold rounded transition-colors"
                  >
                    Schedule 20-Min Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TUTORING MATCHER */}
      {activeCampusTab === 'tutoring' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Peer Tutoring & Subject Mentors</h2>
            <span className="text-xs text-[#10b981]">Free for all enrolled undergraduates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleTutors.map(tut => (
              <div key={tut.id} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm">{tut.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#10b981]/20 text-[#6ee7b7] rounded border border-[#10b981]/30">
                        Peer Lead
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#d4af37] mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
                      <span>{tut.rating} ({tut.sessionsCompleted} sessions)</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#6ee7b7]">{tut.rate}</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] text-[#64748b]">Certified Subjects:</div>
                  <div className="flex flex-wrap gap-1">
                    {tut.subjects.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#161c28] border border-[#232b3d] text-[#cbd5e1] text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-[#94a3b8] pt-1">
                    Availability: <strong className="text-white">{tut.availability}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1a2030] flex items-center justify-between">
                  <span className="text-[10px] text-[#64748b]">Central Library 4th Floor</span>
                  <button
                    onClick={() => handleBookTutor(tut.name)}
                    className="px-3 py-1.5 bg-[#1e2536] hover:bg-[#28324a] text-white text-xs font-medium rounded border border-[#2e3a54]"
                  >
                    Book Practice Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CAREER & EVIDENCE */}
      {activeCampusTab === 'career' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-serif font-semibold text-white">Course-Linked Career & Research Opportunities</h2>
              <p className="text-xs text-[#64748b]">Matches your completed coursework (ECON 201, PSCI 102, BUS 310) to vetted postings</p>
            </div>
            <ProvenanceBadge provenance="student_draft" officialRecord={false} />
          </div>

          <div className="space-y-3">
            {opportunities.map(opp => (
              <div key={opp.id} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm">{opp.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] font-medium border border-[#10b981]/30">
                        {opp.matchScore}% Academic Match
                      </span>
                    </div>
                    <div className="text-xs text-[#d4af37] font-medium mt-0.5">
                      {opp.organization} · <span className="text-[#94a3b8]">{opp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-1.5 rounded border transition-colors ${
                        opp.isSaved
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                          : 'bg-[#161c28] border-[#252f44] text-[#64748b] hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button className="px-3 py-1.5 bg-[#1e2536] hover:bg-[#28334b] text-white text-xs font-medium rounded border border-[#2e3b56] flex items-center gap-1">
                      <span>Apply with Evidence</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <span className="text-[11px] text-[#64748b]">Matched from Enrolled Syllabi:</span>
                  {opp.relevantCourseCodes.map((code, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#161c28] text-[#d4af37] border border-[#2b354c] text-[11px] font-mono">
                      {code}
                    </span>
                  ))}
                  <span className="text-[#64748b]">·</span>
                  <span className="text-[11px] text-[#94a3b8]">Deadline: {opp.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DIRECTORY & EMERGENCY */}
      {activeCampusTab === 'directory' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-[#2b1818] border border-[#ef4444]/40 flex items-center justify-between text-xs text-[#fca5a5]">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#ef4444] shrink-0" />
              <span>
                <strong>Urgent / Crisis Support:</strong> Vanderbilt Student Care Network (615-322-2571) & 24/7 Crisis Line (Text VANDY to 741741).
              </span>
            </div>
            <span className="font-mono text-[11px] text-white">Emergency: 911</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded bg-[#121620] border border-[#1f2637] space-y-1">
              <div className="font-semibold text-white">Student Accessibility Services (SAS)</div>
              <div className="text-[#94a3b8]">Baker Building Suite 108 · Accommodations & exam support</div>
              <div className="text-[11px] text-[#d4af37] font-mono">sas@vanderbilt.edu</div>
            </div>

            <div className="p-3.5 rounded bg-[#121620] border border-[#1f2637] space-y-1">
              <div className="font-semibold text-white">Office of Student Financial Aid</div>
              <div className="text-[#94a3b8]">2309 West End Ave · FAFSA, scholarship verification</div>
              <div className="text-[11px] text-[#d4af37] font-mono">finaid@vanderbilt.edu</div>
            </div>

            <div className="p-3.5 rounded bg-[#121620] border border-[#1f2637] space-y-1">
              <div className="font-semibold text-white">University Registrar Office</div>
              <div className="text-[#94a3b8]">Kirkland Hall Rm 110 · Official transcripts & degree audit</div>
              <div className="text-[11px] text-[#d4af37] font-mono">registrar@vanderbilt.edu</div>
            </div>
          </div>
        </div>
      )}

      {/* Advisor Booking Modal */}
      {selectedBookingAdvisor && (
        <AdvisorBookingModal
          advisor={selectedBookingAdvisor}
          onClose={() => setSelectedBookingAdvisor(null)}
          onBookSuccess={() => {
            setSelectedBookingAdvisor(null);
            setBookingMessage(`Confirmed: 20-minute degree audit appointment booked with ${selectedBookingAdvisor.name}. Advising hold officially cleared.`);
          }}
        />
      )}

    </div>
  );
};
