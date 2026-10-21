import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { ActionItem } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  BookOpen, 
  HelpCircle,
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const { 
    actionItems, 
    completeActionItem, 
    snoozeActionItem, 
    addActionItem, 
    setActiveDestination, 
    setSelectedCourseId,
    courses,
    user 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'urgent' | 'assignment' | 'registration'>('all');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState<ActionItem['category']>('personal');
  const [quickDate, setQuickDate] = useState('2026-10-24');

  const filteredItems = actionItems.filter(item => {
    if (activeCategory === 'urgent') return item.priority === 'urgent' || item.isDueToday;
    if (activeCategory === 'assignment') return item.category === 'assignment';
    if (activeCategory === 'registration') return item.category === 'registration';
    return true;
  });

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addActionItem({
      title: quickTitle,
      category: quickCategory,
      dueDate: quickDate,
      priority: 'medium',
      notes: 'Added from Today workspace.'
    });
    setQuickTitle('');
    setIsQuickAddOpen(false);
  };

  const handleActionClick = (item: ActionItem) => {
    if (item.destinationLink) {
      setActiveDestination(item.destinationLink);
      if (item.courseCode) {
        const found = courses.find(c => c.code === item.courseCode);
        if (found) setSelectedCourseId(found.id);
      }
    } else {
      completeActionItem(item.id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Today Greeting & Next Safe Action Hero */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Wednesday, October 21, 2026</span>
              <span>·</span>
              <span>Fall Week 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Welcome, {user.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              You have <strong className="text-white">1 urgent advising hold</strong> to resolve before Spring registration opens, and <strong className="text-white">2 assignments</strong> due this weekend.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              className="px-3 py-2 rounded bg-[#181e2b] border border-[#2b354c] hover:border-[#d4af37]/50 text-xs text-[#f1f3f7] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Add Personal Task</span>
            </button>
            <button
              onClick={() => setActiveDestination('courses')}
              className="px-3.5 py-2 rounded bg-[#d4af37] hover:bg-[#e5c068] text-black text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Jump to Study Space</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Add Form Inset */}
        {isQuickAddOpen && (
          <form onSubmit={handleQuickAdd} className="mt-4 pt-4 border-t border-[#1f2637] flex flex-wrap items-center gap-2.5">
            <input
              type="text"
              placeholder="e.g. Meet with study group for PSCI memo..."
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              className="flex-1 min-w-[200px] bg-[#0c0f16] border border-[#232b3d] text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
            />
            <select
              value={quickCategory}
              onChange={(e) => setQuickCategory(e.target.value as any)}
              className="bg-[#0c0f16] border border-[#232b3d] text-xs text-[#94a3b8] px-2.5 py-2 rounded"
            >
              <option value="personal">Personal Plan</option>
              <option value="assignment">Assignment Study</option>
              <option value="career">Career Goal</option>
            </select>
            <input
              type="date"
              value={quickDate}
              onChange={(e) => setQuickDate(e.target.value)}
              className="bg-[#0c0f16] border border-[#232b3d] text-xs text-[#94a3b8] px-2.5 py-2 rounded"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded hover:bg-[#e5c068]"
            >
              Save Private Task
            </button>
            <button
              type="button"
              onClick={() => setIsQuickAddOpen(false)}
              className="px-3 py-2 bg-[#181d2a] text-[#94a3b8] text-xs rounded hover:text-white"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Main Grid: Action Center (Left) & Daily Rhythm + Intelligence (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Action Center (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-serif font-semibold text-white flex items-center gap-2">
                <span>Action Center</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e2434] text-[#d4af37] font-sans font-normal border border-[#2d364d]">
                  {actionItems.filter(i => i.status !== 'completed').length} active
                </span>
              </h2>
              <p className="text-xs text-[#64748b]">Connected queue of assignments, registration holds, approvals, and student tasks</p>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {(['all', 'urgent', 'assignment', 'registration'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#222a3d] text-[#f1f3f7] font-medium border border-[#374463]'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#131722]'
                  }`}
                >
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Action Items List */}
          <div className="space-y-2.5">
            {filteredItems.map(item => {
              const isCompleted = item.status === 'completed';
              const isUrgent = item.priority === 'urgent' || item.isDueToday;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-[#0f131a]/60 border-[#1c2230] opacity-60'
                      : isUrgent
                      ? 'bg-[#151a26] border-[#d4af37]/40 shadow-sm'
                      : 'bg-[#121620] border-[#1e2536] hover:border-[#2b354d]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => completeActionItem(item.id)}
                        title={isCompleted ? "Completed" : "Mark Done"}
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          isCompleted
                            ? 'bg-[#10b981] border-[#10b981] text-black'
                            : 'border-[#38435d] hover:border-[#d4af37] text-transparent hover:text-[#d4af37]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.courseCode && (
                            <span 
                              className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${item.courseColor || '#3b82f6'}22`, color: item.courseColor || '#3b82f6' }}
                            >
                              {item.courseCode}
                            </span>
                          )}
                          <span className={`text-sm font-medium ${isCompleted ? 'line-through text-[#64748b]' : 'text-white'}`}>
                            {item.title}
                          </span>
                        </div>

                        <p className="text-xs text-[#94a3b8] leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <ProvenanceBadge provenance={item.provenance} officialRecord={item.officialRecord} />
                          
                          <span className="text-[11px] text-[#64748b] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due: {item.dueDate}
                          </span>

                          {item.notes && (
                            <span className="text-[11px] text-[#d4af37] font-mono">
                              {item.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    {!isCompleted && (
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => snoozeActionItem(item.id)}
                          className="px-2 py-1 rounded text-[11px] text-[#64748b] hover:text-[#cbd5e1] hover:bg-[#181f2d] transition-colors"
                        >
                          Snooze
                        </button>
                        <button
                          onClick={() => handleActionClick(item)}
                          className="px-3 py-1.5 rounded bg-[#1e2536] hover:bg-[#28324a] text-xs font-medium text-[#f1f3f7] flex items-center gap-1 transition-colors border border-[#2d374f]"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3 h-3 text-[#d4af37]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Rail: Daily Rhythm & Workload Forecast */}
        <div className="space-y-5">
          
          {/* Daily Rhythm / Schedule Today */}
          <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Today's Academic Rhythm</span>
              </h3>
              <button 
                onClick={() => setActiveDestination('plan')}
                className="text-[11px] text-[#d4af37] hover:underline"
              >
                Full Calendar
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#161c28] border-l-2 border-l-[#10b981] border border-[#1f2637]">
                <div className="flex items-center justify-between font-medium text-white">
                  <span>ECON 201: Micro Theory</span>
                  <span className="text-[#10b981] text-[11px]">10:10 - 11:00 AM</span>
                </div>
                <div className="text-[11px] text-[#64748b]">Wilson Hall 103 · Factor Markets & Monopsony</div>
              </div>

              <div className="p-2.5 rounded bg-[#161c28] border-l-2 border-l-[#8b5cf6] border border-[#1f2637]">
                <div className="flex items-center justify-between font-medium text-white">
                  <span>BUS 310: Valuation Workshop</span>
                  <span className="text-[#8b5cf6] text-[11px]">1:15 - 2:30 PM</span>
                </div>
                <div className="text-[11px] text-[#64748b]">Owen Hall 204 · LBO Debt Schedules</div>
              </div>

              <div className="p-2.5 rounded bg-[#161c28] border-l-2 border-l-[#d4af37] border border-[#1f2637]">
                <div className="flex items-center justify-between font-medium text-white">
                  <span>Peer Tutoring Session</span>
                  <span className="text-[#d4af37] text-[11px]">4:00 - 5:00 PM</span>
                </div>
                <div className="text-[11px] text-[#64748b]">Central Library Rm 402 · Maya Lin (ECON 201)</div>
              </div>
            </div>
          </div>

          {/* Crunch Week Forecast */}
          <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Crunch Week Forecast</span>
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3b2a1a] text-[#fbbf24] font-medium">
                Peak Load
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white">Week 11 (Nov 2 – Nov 8)</span>
                <span className="text-[#ef4444] font-medium">Critical</span>
              </div>
              <div className="w-full bg-[#1b2230] h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] h-full w-[88%]"></div>
              </div>
              <p className="text-[11px] text-[#94a3b8]">
                3 heavy deliverables converge: ECON Midterm II (Nov 4), PSCI Policy Presentation (Nov 6), and Spring Registration opens (Nov 2).
              </p>
            </div>
          </div>

          {/* Life Balance & Workload Meter */}
          <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Weekly Academic Workload</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded bg-[#161b26] border border-[#202738]">
                <div className="text-base font-bold text-white">15.5 hrs</div>
                <div className="text-[10px] text-[#64748b]">Study & Prep Scheduled</div>
              </div>
              <div className="p-2.5 rounded bg-[#161b26] border border-[#202738]">
                <div className="text-base font-bold text-[#10b981]">Sustainable</div>
                <div className="text-[10px] text-[#64748b]">Pacing Index</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
