import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { Search, X, BookOpen, User, Calendar, Compass, ArrowRight } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    courses, 
    actionItems, 
    setActiveDestination, 
    setSelectedCourseId 
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const filteredCourses = courses.filter(c => 
    c.code.toLowerCase().includes(query.toLowerCase()) || 
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = actionItems.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-[#121620] border border-[#232b3d] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#1c2230] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#d4af37]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a course code, assignment, room, or topic..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#64748b] focus:outline-none"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-[#64748b] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-3 text-xs">
          
          {/* Quick Nav Destinations */}
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#64748b] px-3 py-1">Destinations</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                { label: 'Today Action Center', dest: 'today' as const },
                { label: 'Degree Audit & Cart', dest: 'path' as const },
                { label: 'Course Spaces', dest: 'courses' as const },
                { label: 'Advising & Support', dest: 'campus' as const },
                { label: 'Calendar & Schedule', dest: 'plan' as const }
              ].map(d => (
                <button
                  key={d.dest}
                  onClick={() => {
                    setActiveDestination(d.dest);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full text-left p-2 rounded hover:bg-[#181d2a] text-[#cbd5e1] hover:text-white flex items-center justify-between"
                >
                  <span>{d.label}</span>
                  <ArrowRight className="w-3 h-3 text-[#64748b]" />
                </button>
              ))}
            </div>
          </div>

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-semibold text-[#64748b] px-3 py-1">Enrolled Courses</div>
              {filteredCourses.map(course => (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setActiveDestination('courses');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded hover:bg-[#181d2a] flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-1.5 py-0.2 rounded text-[10px] font-bold"
                      style={{ backgroundColor: `${course.color}25`, color: course.color }}
                    >
                      {course.code}
                    </span>
                    <span>{course.name}</span>
                  </div>
                  <span className="text-[11px] text-[#64748b]">{course.instructor}</span>
                </button>
              ))}
            </div>
          )}

          {/* Action Items */}
          {filteredActions.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-semibold text-[#64748b] px-3 py-1">Action Items</div>
              {filteredActions.slice(0, 4).map(action => (
                <div key={action.id} className="p-2.5 rounded bg-[#0c0f16] border border-[#1a2030] flex items-center justify-between">
                  <span className="text-[#cbd5e1] truncate">{action.title}</span>
                  <span className="text-[10px] text-[#d4af37] font-mono shrink-0 ml-2">{action.dueDate}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="p-2 bg-[#0c0f16] border-t border-[#1c2230] text-[10px] text-[#64748b] text-center">
          Press <kbd className="px-1 rounded bg-[#181f2e] text-[#94a3b8] font-mono">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
