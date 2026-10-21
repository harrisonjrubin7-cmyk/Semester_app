import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { AdvisorInfo } from '../../types';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  FileText,
  Send
} from 'lucide-react';

interface Props {
  advisor: AdvisorInfo;
  onClose: () => void;
  onBookSuccess: () => void;
}

export const AdvisorBookingModal: React.FC<Props> = ({ advisor, onClose, onBookSuccess }) => {
  const { resolveHold } = useApp();
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow 2:30 PM (In-Person Calhoun 314)');
  const [topicFocus, setTopicFocus] = useState('degree_audit');
  const [studentQuestions, setStudentQuestions] = useState('Review Spring 2027 cart courses (ECON 202 & 205) and sign off on registration hold.');
  const [isBooked, setIsBooked] = useState(false);

  const availableSlots = [
    'Tomorrow 2:30 PM (In-Person Calhoun 314)',
    'Tomorrow 3:15 PM (Zoom Link)',
    'Thursday 10:00 AM (In-Person Calhoun 314)',
    'Friday 1:30 PM (In-Person Calhoun 314)'
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    // Resolve advising hold
    resolveHold('hld_adv_01');
    setTimeout(() => {
      onBookSuccess();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#141824] border-b border-[#1c2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#d4af37]" />
            <span className="font-serif font-bold text-base text-white">
              Schedule Faculty Advising & Hold Clearance
            </span>
          </div>
          <button onClick={onClose} className="text-[#64748b] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#cbd5e1]">
          {isBooked ? (
            <div className="p-6 rounded-xl bg-[#14231b] border border-[#10b981]/50 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] mx-auto flex items-center justify-center text-[#10b981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Appointment Confirmed</h3>
              <p className="text-xs text-[#a7f3d0]">
                Your advising session with <strong className="text-white">{advisor.name}</strong> is booked for {selectedSlot}.
              </p>
              <div className="p-3 rounded bg-[#09130e] border border-[#10b981]/30 text-[11px] text-[#6ee7b7]">
                ✓ Advising Hold (hld_adv_01) has been cleared in PeopleSoft SIS. Your Spring 2027 time-ticket is now active.
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-bold rounded text-xs transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Advisor Card */}
              <div className="p-3.5 rounded bg-[#161c28] border border-[#222b3d] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{advisor.name}</div>
                  <div className="text-[#d4af37] text-[11px]">{advisor.title}</div>
                  <div className="text-[#64748b] text-[11px] mt-0.5">{advisor.department} · {advisor.office}</div>
                </div>
                <div className="px-2 py-1 rounded bg-[#0c0f16] border border-[#1f2637] text-[10px] text-[#6ee7b7] font-medium">
                  Official Faculty Advisor
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="space-y-2">
                <label className="block font-semibold text-white">Select Available Advising Window:</label>
                <div className="space-y-1.5">
                  {availableSlots.map((slot, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2.5 p-2.5 rounded border cursor-pointer transition-colors ${
                        selectedSlot === slot
                          ? 'bg-[#1c2436] border-[#d4af37] text-white'
                          : 'bg-[#161c28] border-[#222b3d] text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        checked={selectedSlot === slot}
                        onChange={() => setSelectedSlot(slot)}
                        className="accent-[#d4af37]"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Agenda / Topic Focus */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-white">Primary Meeting Purpose:</label>
                <select
                  value={topicFocus}
                  onChange={(e) => setTopicFocus(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-[#232b3d] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="degree_audit">Mandatory Degree Audit & Hold Release (Spring 2027)</option>
                  <option value="major_change">Course Substitution / Elective Approval</option>
                  <option value="internship">Immersion Capstone & Internship Advising</option>
                  <option value="academic_standing">General Academic Planning & Study Pacing</option>
                </select>
              </div>

              {/* Student Agenda Notes */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-white">Shared Pre-Meeting Agenda Notes for Advisor:</label>
                <textarea
                  rows={3}
                  value={studentQuestions}
                  onChange={(e) => setStudentQuestions(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-[#232b3d] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1c2230]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#181d2a] text-[#94a3b8] hover:text-white rounded text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#e5c068] text-black font-bold rounded text-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking & Transmit Agenda</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
