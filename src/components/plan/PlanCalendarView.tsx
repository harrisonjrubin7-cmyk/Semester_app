import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { CalendarEvent } from '../../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Layers,
  Filter
} from 'lucide-react';

export const PlanCalendarView: React.FC = () => {
  const { events, courses } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const daysOfWeek = [
    { name: 'Mon', date: 'Oct 19' },
    { name: 'Tue', date: 'Oct 20' },
    { name: 'Wed', date: 'Oct 21' }, // Today
    { name: 'Thu', date: 'Oct 22' },
    { name: 'Fri', date: 'Oct 23' },
    { name: 'Sat', date: 'Oct 24' },
    { name: 'Sun', date: 'Oct 25' }
  ];

  const filteredEvents = events.filter(e => {
    if (filterCategory === 'all') return true;
    return e.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Calendar Header */}
      <div className="bg-[#121620] border border-[#1f2637] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide uppercase">
              <span>Integrated Academic Calendar & Workload</span>
              <span>·</span>
              <span>Fall 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Week of October 19 – 25, 2026
            </h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Synchronized view of lectures, assignment dropboxes, office hours, and university deadlines.
            </p>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0c0f16] border border-[#202738] rounded-md text-xs">
            {['all', 'class', 'deadline', 'advising', 'office_hours'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-[#1e2536] text-[#f1f3f7] border border-[#2d374e] font-medium'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {cat === 'office_hours' ? 'Office Hours' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Week Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {daysOfWeek.map((day, dIdx) => {
          const isToday = day.date === 'Oct 21';
          const dayDateStr = `2026-10-${19 + dIdx}`;
          const dayEvents = filteredEvents.filter(e => e.date === dayDateStr);

          return (
            <div 
              key={day.name}
              className={`rounded-lg border p-3 min-h-[300px] flex flex-col space-y-2.5 transition-colors ${
                isToday 
                  ? 'bg-[#141a27] border-[#d4af37]/50 shadow-sm ring-1 ring-[#d4af37]/30' 
                  : 'bg-[#121620] border-[#1e2536]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#1c2230]">
                <div>
                  <span className={`text-xs font-bold ${isToday ? 'text-[#d4af37]' : 'text-white'}`}>
                    {day.name}
                  </span>
                  <div className="text-[11px] text-[#64748b]">{day.date}</div>
                </div>
                {isToday && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-[#d4af37] text-black font-extrabold">
                    Today
                  </span>
                )}
              </div>

              {/* Event Pills */}
              <div className="space-y-2 flex-1">
                {dayEvents.map(ev => {
                  const isDeadline = ev.category === 'deadline' || ev.category === 'exam';

                  return (
                    <div
                      key={ev.id}
                      className={`p-2 rounded text-xs border space-y-1 ${
                        isDeadline
                          ? 'bg-[#2b1919] border-[#ef4444]/40 text-[#fca5a5]'
                          : 'bg-[#161c28] border-[#222b3d] text-[#cbd5e1]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-white text-[11px]">
                        <span className="truncate">{ev.title}</span>
                        {ev.courseCode && (
                          <span 
                            className="text-[9px] px-1 py-0.2 rounded ml-1"
                            style={{ backgroundColor: `${ev.courseColor || '#3b82f6'}22`, color: ev.courseColor || '#3b82f6' }}
                          >
                            {ev.courseCode}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-[#94a3b8] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{ev.startTime} - {ev.endTime}</span>
                      </div>

                      <div className="text-[10px] text-[#64748b] flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{ev.location}</span>
                      </div>
                    </div>
                  );
                })}

                {dayEvents.length === 0 && (
                  <div className="h-full flex items-center justify-center text-[11px] text-[#475569] italic">
                    No scheduled items
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Exam Horizon Notice */}
      <div className="p-4 rounded-lg bg-[#121620] border border-[#1f2637] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#2b1d12] border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] font-bold">
            !
          </div>
          <div>
            <div className="font-semibold text-white">Upcoming Examination Horizon</div>
            <div className="text-[#94a3b8]">ECON 201 Midterm Exam II scheduled for Wednesday, November 4 in Wilson Hall 103 (14 days remaining).</div>
          </div>
        </div>

        <button 
          onClick={() => {}}
          className="px-3 py-1.5 bg-[#181e2b] hover:bg-[#222a3b] text-[#d4af37] border border-[#2b354c] rounded font-medium text-xs whitespace-nowrap"
        >
          Review Factor Markets Study Guide
        </button>
      </div>

    </div>
  );
};
