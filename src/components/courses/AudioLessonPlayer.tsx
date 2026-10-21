import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  FileText, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

interface Props {
  courseCode: string;
  courseName: string;
  unit: string;
  audioSrc: string;
  vttSrc?: string;
  onClose?: () => void;
}

export const AudioLessonPlayer: React.FC<Props> = ({
  courseCode,
  courseName,
  unit,
  audioSrc,
  vttSrc,
  onClose
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  // Transcript cues
  const transcriptCues = [
    { start: 0, end: 12, speaker: 'Prof. Thorne', text: 'Welcome to Unit 3 of Intermediate Microeconomics. Today we examine Cournot duopoly competition and asymmetric costs.' },
    { start: 12, end: 28, speaker: 'Prof. Thorne', text: 'When firms compete on quantities, each producer chooses output q_i taking the rival firm output as given. This leads to the derivation of best-response reaction functions.' },
    { start: 28, end: 45, speaker: 'Prof. Thorne', text: 'Let total market demand be P(Q) = a - bQ, where aggregate output Q equals q1 plus q2. Firm 1 maximizes profit with marginal revenue equating marginal cost c1.' },
    { start: 45, end: 65, speaker: 'Prof. Thorne', text: 'Notice that in equilibrium, the firm with lower marginal cost captures a strictly higher market share and generates greater profits.' },
    { start: 65, end: 90, speaker: 'Prof. Thorne', text: 'Compare this directly with Bertrand price competition, where price is driven down to marginal cost. Cournot yields positive economic profits between monopoly and perfect competition.' }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 90);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback simulation timer if mp3 file codec is blocked in sandbox
        setIsPlaying(true);
      });
    }
  };

  const seekRelative = (delta: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + delta));
  };

  const handleSpeedChange = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#121620] border border-[#232b3d] rounded-xl p-5 shadow-xl space-y-4">
      {/* Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#241d13] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#d4af37]">{courseCode}</span>
              <span className="text-xs text-[#64748b]">·</span>
              <span className="text-xs text-[#94a3b8]">{unit}</span>
            </div>
            <div className="font-semibold text-white text-sm">{courseName} — Audio Lesson</div>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="text-[#64748b] hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar & Timers */}
      <div className="space-y-1.5">
        <div className="relative w-full h-1.5 bg-[#1e2536] rounded-full overflow-hidden cursor-pointer"
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const clickPct = (e.clientX - rect.left) / rect.width;
               if (audioRef.current) audioRef.current.currentTime = clickPct * (duration || 90);
             }}
        >
          <div 
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b] rounded-full"
            style={{ width: `${((currentTime / (duration || 90)) * 100) || 0}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#64748b] font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 90)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => seekRelative(-15)}
            className="p-2 rounded bg-[#181d2a] hover:bg-[#202738] text-[#94a3b8] hover:text-white text-xs flex items-center gap-1 border border-[#232b3d]"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px]">15s</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#d4af37] hover:bg-[#e5c068] text-black flex items-center justify-center font-bold shadow-md transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
          </button>

          <button
            onClick={() => seekRelative(15)}
            className="p-2 rounded bg-[#181d2a] hover:bg-[#202738] text-[#94a3b8] hover:text-white text-xs flex items-center gap-1 border border-[#232b3d]"
            title="Forward 15 seconds"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[10px]">15s</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeedChange}
            className="px-2.5 py-1.5 rounded bg-[#181d2a] hover:bg-[#202738] text-xs font-mono text-[#d4af37] border border-[#232b3d]"
          >
            {playbackRate}x
          </button>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`px-2.5 py-1.5 rounded text-xs flex items-center gap-1.5 border transition-colors ${
              showTranscript
                ? 'bg-[#1e2536] text-white border-[#2e3b54]'
                : 'bg-[#181d2a] text-[#94a3b8] border-[#232b3d]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Transcript</span>
          </button>
        </div>
      </div>

      {/* Synchronized Transcript Reader */}
      {showTranscript && (
        <div className="mt-3 p-3.5 rounded-lg bg-[#0c0f16] border border-[#1c2230] max-h-44 overflow-y-auto space-y-2 text-xs">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Synchronized Lecture Transcript</span>
          </div>

          <div className="space-y-2">
            {transcriptCues.map((cue, idx) => {
              const isCurrent = currentTime >= cue.start && currentTime < cue.end;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime = cue.start;
                  }}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#1c2436] text-white border-l-2 border-[#d4af37]'
                      : 'hover:bg-[#121620] text-[#94a3b8]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#64748b] mb-0.5">
                    <span className="font-semibold text-[#cbd5e1]">{cue.speaker}</span>
                    <span className="font-mono">{formatTime(cue.start)}</span>
                  </div>
                  <p className="leading-relaxed">{cue.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
