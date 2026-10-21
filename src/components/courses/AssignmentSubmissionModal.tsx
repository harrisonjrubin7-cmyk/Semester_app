import React, { useState } from 'react';
import { CourseAssignment } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  FileCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  X, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

interface Props {
  assignment: CourseAssignment;
  courseCode: string;
  courseColor: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const AssignmentSubmissionModal: React.FC<Props> = ({
  assignment,
  courseCode,
  courseColor,
  onClose,
  onSubmitSuccess
}) => {
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [checkedRubric, setCheckedRubric] = useState<Record<number, boolean>>({});
  const [aiUsageDeclared, setAiUsageDeclared] = useState<'none' | 'cited'>('none');
  const [citationNote, setCitationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; timestamp: string } | null>(null);

  const handleToggleRubric = (index: number) => {
    setCheckedRubric(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedReceipt = {
        id: `SUB-VU-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setReceipt(generatedReceipt);
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#1c2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${courseColor}25`, color: courseColor }}
            >
              {courseCode}
            </span>
            <span className="font-serif font-bold text-sm sm:text-base text-white truncate">
              Submit: {assignment.title}
            </span>
          </div>
          <button onClick={onClose} className="text-[#64748b] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#cbd5e1]">
          
          {receipt ? (
            <div className="p-6 rounded-xl bg-[#14231b] border border-[#10b981]/50 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] mx-auto flex items-center justify-center text-[#10b981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Submission Confirmed</h3>
              <p className="text-xs text-[#a7f3d0]">
                Your deliverable was cryptographically recorded and posted to Canvas LMS.
              </p>
              <div className="p-3 rounded bg-[#09130e] border border-[#10b981]/30 font-mono text-[11px] text-white space-y-1">
                <div>RECEIPT ID: {receipt.id}</div>
                <div>CONFIRMED AT: {receipt.timestamp}</div>
                <div>DESTINATION: Dr. Gregory Thorne Grading Queue</div>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-bold rounded text-xs transition-colors"
              >
                Return to Workspace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Assignment Details */}
              <div className="p-3.5 rounded-lg bg-[#0c0f16] border border-[#1f2637] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{assignment.title}</span>
                  <span className="text-[#d4af37] font-bold">{assignment.points} Points</span>
                </div>
                <p className="text-[#94a3b8] leading-relaxed">{assignment.description}</p>
                <div className="text-[11px] text-[#64748b] flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Deadline: {assignment.dueDate} at {assignment.dueTime}</span>
                </div>
              </div>

              {/* Rubric Self-Checklist */}
              <div className="space-y-2">
                <div className="font-semibold text-white text-xs flex items-center justify-between">
                  <span>Official Assessment Rubric — Student Pre-Check</span>
                  <span className="text-[10px] text-[#d4af37]">Check items as you verify work</span>
                </div>

                <div className="space-y-1.5">
                  {assignment.rubric.map((item, idx) => (
                    <label 
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded bg-[#161c28] border border-[#222b3d] hover:border-[#33415e] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedRubric[idx]}
                        onChange={() => handleToggleRubric(idx)}
                        className="mt-0.5 accent-[#d4af37]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{item.criterion}</span>
                          <span className="font-mono text-[#d4af37] text-[11px] font-bold">{item.points} pts</span>
                        </div>
                        <div className="text-[11px] text-[#94a3b8]">{item.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Attachment / Text Notebook */}
              <div className="space-y-2">
                <label className="block font-semibold text-white text-xs">
                  Upload Assignment File (PDF, LaTeX, or Document)
                </label>
                
                <div className="border-2 border-dashed border-[#28334b] hover:border-[#d4af37]/60 rounded-lg p-4 text-center cursor-pointer transition-colors bg-[#0f131c]">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleMockUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer space-y-1">
                    <Upload className="w-5 h-5 text-[#d4af37] mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedFileName ? selectedFileName : 'Click to select PDF or drag file here'}
                    </div>
                    <div className="text-[10px] text-[#64748b]">Max 50MB · Verified against Course Honor Code</div>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] text-[#94a3b8] mb-1">
                    Or paste commentary, mathematical derivations, or GitHub repository URL:
                  </label>
                  <textarea
                    rows={3}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="e.g. Problem Set 4 solutions with Cournot reaction functions and equilibrium graph derivation..."
                    className="w-full bg-[#0c0f16] border border-[#232b3d] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Academic Integrity & AI Policy Declaration */}
              <div className="p-3.5 rounded-lg bg-[#181d2a] border border-[#252f44] space-y-2">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Vanderbilt Honor Code & Generative AI Policy Declaration</span>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ai_declaration"
                      checked={aiUsageDeclared === 'none'}
                      onChange={() => setAiUsageDeclared('none')}
                      className="accent-[#d4af37]"
                    />
                    <span>No AI was used in preparing this deliverable.</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ai_declaration"
                      checked={aiUsageDeclared === 'cited'}
                      onChange={() => setAiUsageDeclared('cited')}
                      className="accent-[#d4af37]"
                    />
                    <span>AI was consulted for concept clarification and is formally cited in the footnotes.</span>
                  </label>
                </div>

                {aiUsageDeclared === 'cited' && (
                  <input
                    type="text"
                    value={citationNote}
                    onChange={(e) => setCitationNote(e.target.value)}
                    placeholder="Citation footnote (e.g. Consulted Semester Intelligence for reaction curve definition)"
                    className="w-full bg-[#0c0f16] border border-[#232b3d] text-[11px] text-white p-2 rounded focus:outline-none focus:border-[#d4af37]"
                  />
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1c2230]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#181d2a] text-[#94a3b8] hover:text-white rounded text-xs"
                >
                  Cancel Draft
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || (!selectedFileName && !submissionText)}
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#e5c068] text-black font-bold rounded text-xs transition-colors disabled:opacity-40 flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Recording Submission...' : 'Sign & Submit to Canvas'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
