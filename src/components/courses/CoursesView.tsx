import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { Course, CourseAssignment, CourseMaterial, Flashcard } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { AudioLessonPlayer } from './AudioLessonPlayer';
import { AssignmentSubmissionModal } from './AssignmentSubmissionModal';
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  RotateCw, 
  Award, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Download, 
  ShieldCheck, 
  ShieldAlert,
  Headphones,
  Upload,
  Layers,
  ChevronRight
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { courses, selectedCourseId, setSelectedCourseId, setIsAiOpen, completeActionItem } = useApp();

  const [activeCourseTab, setActiveCourseTab] = useState<'assignments' | 'materials' | 'flashcards' | 'policy'>('assignments');
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  
  // Audio Player State
  const [activeAudioUnit, setActiveAudioUnit] = useState<CourseMaterial | null>(null);

  // Assignment Submission Modal State
  const [submissionModalAssignment, setSubmissionModalAssignment] = useState<CourseAssignment | null>(null);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setSelectedCardIdx((prev) => (prev + 1) % currentCourse.flashcards.length);
  };

  const currentCard = currentCourse.flashcards[selectedCardIdx] || currentCourse.flashcards[0];

  const handleOpenSubmission = (asg: CourseAssignment) => {
    setSubmissionModalAssignment(asg);
  };

  const handleSubmitSuccess = () => {
    if (submissionModalAssignment) {
      setSubmissionNotice(`Delivered: ${submissionModalAssignment.title} officially submitted to Canvas.`);
      // If ECON PS4, also resolve action item
      if (submissionModalAssignment.id === 'asg_econ_ps4') {
        completeActionItem('act_asg_econ4');
      }
      setTimeout(() => setSubmissionNotice(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Course Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {courses.map(course => {
          const isSelected = course.id === currentCourse.id;

          return (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourseId(course.id);
                setSelectedCardIdx(0);
                setIsFlipped(false);
                setActiveAudioUnit(null);
              }}
              className={`p-3.5 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-[#161c28] border-[#384562] shadow-sm'
                  : 'bg-[#121620] border-[#1f2637] hover:border-[#2d374f]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${course.color}22`, color: course.color }}
                >
                  {course.code}
                </span>
                <span className="text-[11px] text-[#64748b]">{course.credits} Cr</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-white mt-2 truncate">
                {course.name}
              </div>
              <div className="text-[11px] text-[#94a3b8] truncate mt-0.5">
                {course.instructor}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Course Header Banner */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-sm font-bold px-2.5 py-0.5 rounded"
                style={{ backgroundColor: `${currentCourse.color}25`, color: currentCourse.color }}
              >
                {currentCourse.code}
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {currentCourse.name}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#94a3b8] mt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#64748b]" />
                {currentCourse.location} ({currentCourse.schedule})
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#64748b]" />
                {currentCourse.instructor} · {currentCourse.officeLocation}
              </span>
              <span>·</span>
              <span className="text-[#d4af37]">Office Hours: {currentCourse.officeHours}</span>
            </div>
          </div>

          {/* AI Policy & Assistance Button */}
          <div className="flex items-center gap-2.5">
            <div className={`px-2.5 py-1.5 rounded text-xs font-medium border flex items-center gap-1.5 ${
              currentCourse.aiPolicy === 'strict_no_ai'
                ? 'bg-[#2b1818] text-[#fca5a5] border-[#ef4444]/40'
                : 'bg-[#18231c] text-[#86efac] border-[#10b981]/40'
            }`}>
              {currentCourse.aiPolicy === 'strict_no_ai' ? <ShieldAlert className="w-3.5 h-3.5 text-[#ef4444]" /> : <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />}
              <span>{currentCourse.aiPolicy === 'strict_no_ai' ? 'Strict No-AI Policy' : 'AI Permitted (Cite Source)'}</span>
            </div>

            <button
              onClick={() => setIsAiOpen(true)}
              className="px-3 py-1.5 rounded bg-[#d4af37] text-black text-xs font-semibold hover:bg-[#e5c068] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Query Syllabus</span>
            </button>
          </div>
        </div>

        {submissionNotice && (
          <div className="p-3 rounded bg-[#152a1e] border border-[#10b981]/50 text-xs text-[#86efac] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>{submissionNotice}</span>
          </div>
        )}

        <p className="text-xs text-[#94a3b8] leading-relaxed pt-2 border-t border-[#1a2030]">
          {currentCourse.syllabusExcerpt}
        </p>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#1a2030] overflow-x-auto text-xs font-medium">
          {[
            { id: 'assignments', label: `Assignments (${currentCourse.assignments.length})` },
            { id: 'materials', label: `Syllabus & Materials (${currentCourse.materials.length})` },
            { id: 'flashcards', label: `Active Recall (${currentCourse.flashcards.length})` },
            { id: 'policy', label: 'Academic Integrity & Rubrics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCourseTab(tab.id as any)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeCourseTab === tab.id
                  ? 'bg-[#1c2333] text-white border border-[#2e3b56]'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#141824]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Embedded Audio Lesson Player */}
      {activeAudioUnit && (
        <AudioLessonPlayer
          courseCode={currentCourse.code}
          courseName={currentCourse.name}
          unit={activeAudioUnit.unit}
          audioSrc={
            currentCourse.code.includes('ECON') ? '/audio/lessons/econ/unit-0.mp3' :
            currentCourse.code.includes('PSCI') ? '/audio/lessons/psci/unit-0.mp3' :
            currentCourse.code.includes('BUS') ? '/audio/lessons/bus/unit-0.mp3' :
            '/audio/lessons/core/unit-0.mp3'
          }
          vttSrc={
            currentCourse.code.includes('ECON') ? '/audio/econ-podcast.vtt' :
            currentCourse.code.includes('PSCI') ? '/audio/psci-podcast.vtt' :
            currentCourse.code.includes('BUS') ? '/audio/bus-podcast.vtt' :
            '/audio/core-podcast.vtt'
          }
          onClose={() => setActiveAudioUnit(null)}
        />
      )}

      {/* SUB-TAB 1: ASSIGNMENTS */}
      {activeCourseTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Course Deliverables & Assessment Rubrics</h2>
            <ProvenanceBadge provenance="canvas_lms" officialRecord={true} />
          </div>

          <div className="space-y-3">
            {currentCourse.assignments.map(asg => {
              const isExpanded = activeAssignmentId === asg.id;

              return (
                <div key={asg.id} className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{asg.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c2333] text-[#93c5fd] border border-[#2d3a54]">
                          {asg.weight}
                        </span>
                      </div>
                      <div className="text-xs text-[#94a3b8] flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                          Due: {asg.dueDate} at {asg.dueTime}
                        </span>
                        <span>·</span>
                        <span>{asg.points} Total Points</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenSubmission(asg)}
                        className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>

                      <button
                        onClick={() => setActiveAssignmentId(isExpanded ? null : asg.id)}
                        className="px-3 py-1.5 bg-[#1a2030] hover:bg-[#232b40] text-xs text-white rounded border border-[#2a344d]"
                      >
                        {isExpanded ? 'Hide Rubric' : 'View Rubric'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {asg.description}
                  </p>

                  {/* Skills Tagging for Career Evidence */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-[#64748b]">Demonstrates Competencies:</span>
                    {asg.skillsGained.map((sk, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#1c2230] text-[#cbd5e1] border border-[#283248]">
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* Rubric Criteria Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[#1c2230] space-y-2">
                      <div className="text-xs font-semibold text-[#d4af37]">Official Assessment Rubric:</div>
                      <div className="space-y-1.5 text-xs">
                        {asg.rubric.map((r, rIdx) => (
                          <div key={rIdx} className="p-2.5 rounded bg-[#0c0f16] border border-[#1e2536] flex items-center justify-between">
                            <div>
                              <div className="font-medium text-white">{r.criterion}</div>
                              <div className="text-[11px] text-[#94a3b8]">{r.description}</div>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#d4af37] ml-4 shrink-0">
                              {r.points} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MATERIALS */}
      {activeCourseTab === 'materials' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Syllabus, Slide Decks & Audio Handouts</h2>
            <span className="text-xs text-[#64748b]">Hosted on Vanderbilt Course Repository</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCourse.materials.map(mat => (
              <div key={mat.id} className="p-3.5 rounded-lg bg-[#121620] border border-[#1f2637] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#181f2e] border border-[#26324a] flex items-center justify-center text-[#d4af37]">
                    {mat.type === 'audio' ? <Headphones className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white truncate max-w-[220px]">{mat.title}</div>
                    <div className="text-[11px] text-[#64748b]">{mat.unit} {mat.duration && `· ${mat.duration}`}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {mat.type === 'audio' ? (
                    <button
                      onClick={() => setActiveAudioUnit(mat)}
                      className="px-2.5 py-1 rounded bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Headphones className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  ) : (
                    <a
                      href={
                        currentCourse.code.includes('ECON') ? '/handouts/econ.pdf' :
                        currentCourse.code.includes('PSCI') ? '/handouts/psci.pdf' :
                        currentCourse.code.includes('BUS') ? '/handouts/bus.pdf' :
                        '/handouts/core.pdf'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#181d2a] hover:bg-[#202738] text-[11px] text-[#cbd5e1] flex items-center gap-1 border border-[#2b354c]"
                    >
                      <Download className="w-3 h-3 text-[#d4af37]" />
                      <span>PDF</span>
                    </a>
                  )}

                  <button 
                    onClick={() => setIsAiOpen(true)}
                    className="px-2 py-1 rounded bg-[#181d2a] hover:bg-[#202738] text-[11px] text-[#cbd5e1] flex items-center gap-1 border border-[#2b354c]"
                    title="Query with Semester Intelligence"
                  >
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ACTIVE RECALL FLASHCARDS */}
      {activeCourseTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-semibold text-white">Syllabus Grounded Flashcard Engine</h2>
            <span className="text-xs text-[#d4af37]">Card {selectedCardIdx + 1} of {currentCourse.flashcards.length}</span>
          </div>

          {currentCard ? (
            <div className="max-w-xl mx-auto space-y-4">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[220px] p-6 rounded-xl bg-gradient-to-br from-[#141a26] to-[#0e121a] border border-[#232c40] flex flex-col items-center justify-center text-center shadow-md hover:border-[#d4af37]/60 transition-all select-none"
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-2">
                  {isFlipped ? 'Answer & Explanation' : `Question · ${currentCard.unit}`}
                </div>
                <div className="text-base sm:text-lg font-medium text-white max-w-md leading-relaxed">
                  {isFlipped ? currentCard.answer : currentCard.question}
                </div>
                <div className="text-[11px] text-[#64748b] mt-4">
                  (Click card to {isFlipped ? 'flip back' : 'reveal answer'})
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 bg-[#181d2a] hover:bg-[#222a3b] text-xs text-white rounded-md border border-[#2b354c] flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Next Concept Card</span>
                </button>

                <button
                  onClick={() => setIsAiOpen(true)}
                  className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c068] text-xs font-semibold text-black rounded-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate More Cards with AI</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#94a3b8]">No cards generated for this course yet.</div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: ACADEMIC INTEGRITY & POLICY */}
      {activeCourseTab === 'policy' && (
        <div className="p-5 rounded-lg bg-[#121620] border border-[#1f2637] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Course Generative AI Policy & Institutional Clearances</h3>
            <ProvenanceBadge provenance="official_sis" officialRecord={true} />
          </div>

          <div className="p-3.5 rounded bg-[#0c0f16] border border-[#1e2536] text-xs space-y-2">
            <div className="font-semibold text-[#d4af37]">Instructor Policy: {currentCourse.instructor}</div>
            <p className="text-[#94a3b8] leading-relaxed">
              {currentCourse.aiPolicy === 'strict_no_ai'
                ? 'Use of automated generative models (including ChatGPT, Claude, and LLM text generation) is prohibited on all submitted problem sets and essays in this course. Violations will be referred to the Honor Council.'
                : 'Generative AI may be used for conceptual exploration, brainstorm outline drafting, and LaTeX debugging. You must provide an explicit footnote citation disclosing prompt and purpose.'}
            </p>
          </div>

          <div className="text-xs text-[#64748b] leading-relaxed">
            Semester Intelligence automatically configures its tool clearances to respect each course instructor’s registered policy in the university gateway.
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {submissionModalAssignment && (
        <AssignmentSubmissionModal
          assignment={submissionModalAssignment}
          courseCode={currentCourse.code}
          courseColor={currentCourse.color}
          onClose={() => setSubmissionModalAssignment(null)}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}

    </div>
  );
};
