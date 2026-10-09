'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { SpeechBubble } from '@/lib/comic-data';
import { speakDialogueInPolish, stopSpeaking, soundManager } from '@/lib/audio';

interface ComicPanelBubbleProps {
  bubble: SpeechBubble;
  isActive?: boolean;
  onSelect?: () => void;
}

const SPEAKER_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Shu: { bg: 'bg-sky-950/90', text: 'text-sky-200', border: 'border-sky-400', glow: 'shadow-sky-500/40' },
  Kluke: { bg: 'bg-rose-950/90', text: 'text-rose-200', border: 'border-rose-400', glow: 'shadow-rose-500/40' },
  Jiro: { bg: 'bg-emerald-950/90', text: 'text-emerald-200', border: 'border-emerald-400', glow: 'shadow-emerald-500/40' },
  Marumaro: { bg: 'bg-amber-950/90', text: 'text-amber-200', border: 'border-amber-400', glow: 'shadow-amber-500/40' },
  Zola: { bg: 'bg-purple-950/90', text: 'text-purple-200', border: 'border-purple-400', glow: 'shadow-purple-500/40' },
  Nene: { bg: 'bg-red-950/95', text: 'text-red-200', border: 'border-red-500', glow: 'shadow-red-500/50' },
  Szabo: { bg: 'bg-slate-900/90', text: 'text-slate-200', border: 'border-slate-400', glow: 'shadow-slate-500/30' },
  Narrator: { bg: 'bg-amber-900/85', text: 'text-amber-100', border: 'border-amber-400', glow: 'shadow-amber-500/30' },
};

export const ComicPanelBubble: React.FC<ComicPanelBubbleProps> = ({ bubble, isActive, onSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const colors = SPEAKER_COLORS[bubble.speaker] || SPEAKER_COLORS.Shu;

  const handlePlayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    if (bubble.speaker === 'Shu') {
      soundManager.playDragonRoar();
    } else if (bubble.speaker === 'Nene') {
      soundManager.playBeamAttack();
    }

    setIsPlaying(true);
    speakDialogueInPolish(
      bubble.text,
      bubble.speaker,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  // Określenie stylu dymka wg typu (shout - poszarpany okrzyk, thought - obłoczek, narration - prostokątny pergamin, speech - gładki dymek)
  const getBubbleStyle = () => {
    switch (bubble.type) {
      case 'shout':
        return 'rounded-xl border-2 font-bold tracking-tight shadow-lg';
      case 'thought':
        return 'rounded-3xl border-2 border-dashed italic shadow-md';
      case 'narration':
        return 'rounded-md border-l-4 border-t border-b border-r bg-black/85 text-xs uppercase tracking-wider';
      default:
        return 'rounded-2xl border-2 shadow-lg';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative max-w-[280px] sm:max-w-[340px] md:max-w-[380px] cursor-pointer transition-all duration-200 select-none ${
        isActive ? 'scale-105 z-30' : 'hover:scale-[1.03] z-20'
      }`}
      style={{
        position: 'absolute',
        top: bubble.position.top,
        bottom: bubble.position.bottom,
        left: bubble.position.left,
        right: bubble.position.right,
      }}
    >
      <div
        className={`backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 ${getBubbleStyle()} ${colors.bg} ${colors.border} ${colors.glow} text-white shadow-xl transition-shadow`}
      >
        {/* Górny pasek z imieniem mówcy i przyciskiem lektora */}
        <div className="flex items-center justify-between gap-2 mb-1 border-b border-white/10 pb-1">
          <div className="flex items-center gap-1.5">
            {bubble.type === 'shout' && (
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            )}
            {bubble.type === 'thought' && (
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            )}
            <span className={`text-[11px] font-black tracking-wider uppercase ${colors.text}`}>
              {bubble.speaker}
            </span>
          </div>

          <button
            onClick={handlePlayVoice}
            title="Odsłuchaj kwestię po polsku (Lektor)"
            className={`p-1 rounded-md transition-colors ${
              isPlaying
                ? 'bg-amber-400 text-black animate-pulse'
                : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {isPlaying ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Tekst wypowiedzi w języku polskim */}
        <p
          className={`text-xs sm:text-sm leading-snug drop-shadow-sm font-sans ${
            bubble.type === 'shout' ? 'font-extrabold text-white text-[13px] sm:text-[15px]' : 'text-slate-100'
          }`}
        >
          {bubble.type === 'thought' ? `„${bubble.text}”` : bubble.text}
        </p>

        {/* Informacja o interakcji */}
        <div className="mt-1 flex items-center justify-between text-[10px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Kliknij, by odsłuchać PL</span>
          <span className="text-[9px] font-mono">XBOX 360 BD</span>
        </div>
      </div>
    </div>
  );
};
