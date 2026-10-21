import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  ShieldCheck, 
  BookOpen, 
  AlertCircle, 
  ExternalLink 
} from 'lucide-react';

export const SemesterAiDrawer: React.FC = () => {
  const { isAiOpen, setIsAiOpen, aiMessages, sendAiPrompt } = useApp();
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAiOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    const query = input;
    setInput('');
    setIsSubmitting(true);
    await sendAiPrompt(query);
    setIsSubmitting(false);
  };

  const samplePrompts = [
    'How do I calculate reaction curves for ECON 201 PS4?',
    'What holds are currently blocking my Spring registration?',
    'Compare MMP in Germany and New Zealand for PSCI 102.'
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-[#0c0f16] border-l border-[#202738] shadow-2xl z-50 flex flex-col">
      
      {/* Header */}
      <div className="p-4 bg-[#121620] border-b border-[#1c2230] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2a2414] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Semester Intelligence</div>
            <div className="text-[10px] text-[#10b981] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Grounded in Fall 2026 Syllabi</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAiOpen(false)}
          className="p-1.5 text-[#64748b] hover:text-white rounded hover:bg-[#1a2030]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-[#0f121a] border-b border-[#1a2030] overflow-x-auto text-[11px] flex gap-1.5 no-scrollbar">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(prompt);
            }}
            className="px-2.5 py-1 rounded bg-[#161c28] hover:bg-[#20283a] text-[#cbd5e1] border border-[#222b3d] whitespace-nowrap text-left shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {aiMessages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className="text-[10px] text-[#64748b] px-1">
                {isUser ? 'You' : 'Semester Intelligence'} · {msg.timestamp}
              </div>

              <div
                className={`p-3.5 rounded-lg max-w-[92%] leading-relaxed ${
                  isUser
                    ? 'bg-[#1e2536] text-white border border-[#2d3852]'
                    : 'bg-[#121620] text-[#e2e8f0] border border-[#1f2637]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Grounded Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#1e2638] space-y-1.5">
                    <div className="text-[10px] font-semibold text-[#d4af37] flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Verified Course Citations:</span>
                    </div>
                    {msg.citations.map((c, cIdx) => (
                      <div key={cIdx} className="p-2 rounded bg-[#090b10] border border-[#1a2030] text-[10px] space-y-0.5">
                        <div className="font-semibold text-white">{c.source} {c.pageOrUnit && `(${c.pageOrUnit})`}</div>
                        <div className="text-[#94a3b8] italic">"{c.excerpt}"</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Field & Integrity Notice */}
      <div className="p-3 bg-[#121620] border-t border-[#1c2230] space-y-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your courses, degree, or deadlines..."
            className="flex-1 bg-[#0c0f16] border border-[#232b3d] text-xs text-white px-3 py-2.5 rounded-md focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSubmitting}
            className="p-2.5 bg-[#d4af37] hover:bg-[#e5c068] text-black font-semibold rounded-md disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[10px] text-[#64748b] text-center">
          Academic Integrity Guardrail Active. Prompts comply with course AI policies.
        </div>
      </div>

    </div>
  );
};
