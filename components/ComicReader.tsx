'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  COMIC_CHAPTERS,
  ComicChapter,
  SpeechBubble,
  SoundEffectOnomatopoeia
} from '@/lib/comic-data';
import { ComicPanelBubble } from './ComicPanelBubble';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Shield,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  speakDialogueInPolish,
  stopSpeaking,
  soundManager
} from '@/lib/audio';

interface ComicReaderProps {
  activeChapterId: number;
  onSelectChapter: (id: number) => void;
  showBubbles: boolean;
  onToggleBubbles: () => void;
  isContinuousView: boolean;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  activeChapterId,
  onSelectChapter,
  showBubbles,
  onToggleBubbles,
  isContinuousView,
}) => {
  const [selectedBubbleId, setSelectedBubbleId] = useState<string | null>(null);
  const [isAutoReading, setIsAutoReading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const activeChapter =
    COMIC_CHAPTERS.find((c) => c.id === activeChapterId) || COMIC_CHAPTERS[0];

  const handleNextChapter = () => {
    stopSpeaking();
    setIsAutoReading(false);
    if (activeChapterId < COMIC_CHAPTERS.length) {
      onSelectChapter(activeChapterId + 1);
      soundManager.playShadowAwaken();
    }
  };

  const handlePrevChapter = () => {
    stopSpeaking();
    setIsAutoReading(false);
    if (activeChapterId > 1) {
      onSelectChapter(activeChapterId - 1);
      soundManager.playShadowAwaken();
    }
  };

  const handleReadChapterAloud = async (chapter: ComicChapter) => {
    if (isAutoReading) {
      stopSpeaking();
      setIsAutoReading(false);
      setSelectedBubbleId(null);
      return;
    }

    setIsAutoReading(true);

    // Najpierw lektor czyta wstęp narracyjny
    await new Promise<void>((resolve) => {
      speakDialogueInPolish(
        chapter.narrativeSummary,
        'Narrator',
        () => {},
        () => resolve()
      );
    });

    // Następnie kolejno dymki
    for (let i = 0; i < chapter.bubbles.length; i++) {
      const bubble = chapter.bubbles[i];
      setSelectedBubbleId(bubble.id);
      await new Promise<void>((resolve) => {
        speakDialogueInPolish(
          bubble.text,
          bubble.speaker,
          () => {},
          () => resolve()
        );
      });
      await new Promise((r) => setTimeout(r, 450));
    }

    setSelectedBubbleId(null);
    setIsAutoReading(false);
  };

  const playSfx = (sfx: SoundEffectOnomatopoeia) => {
    if (sfx.text.includes('ROOAH') || sfx.text.includes('SMOK')) {
      soundManager.playDragonRoar();
    } else if (sfx.text.includes('BUM') || sfx.text.includes('DOKAAN')) {
      soundManager.playMechaExplosion();
    } else if (sfx.text.includes('DON') || sfx.text.includes('DOOO')) {
      soundManager.playBeamAttack();
    } else {
      soundManager.playShadowAwaken();
    }
  };

  const renderChapterView = (chapter: ComicChapter) => {
    return (
      <div
        key={chapter.id}
        className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md mb-12"
      >
        {/* Nagłówek kadru / rozdziału */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
                {chapter.location}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-medium">
                {chapter.subtitle}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
              {chapter.title}
            </h3>
          </div>

          {/* Akcje rozdziału */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleReadChapterAloud(chapter)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isAutoReading && activeChapterId === chapter.id
                  ? 'bg-amber-400 text-black animate-pulse shadow-amber-400/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {isAutoReading && activeChapterId === chapter.id ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Zatrzymaj Lektora</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Czytaj Rozdział na Głos (PL)</span>
                </>
              )}
            </button>

            <button
              onClick={() => setLightboxImage(chapter.image)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Powiększ grafikę komiksu"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wstęp narracyjny (komiksowy boks wstępny) */}
        <div className="bg-amber-950/30 border-b border-amber-500/20 px-6 py-3 text-xs sm:text-sm text-amber-200/90 italic flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-sans uppercase not-italic tracking-wider mr-1 text-[11px]">
              Wprowadzenie:
            </strong>
            {chapter.narrativeSummary}
          </p>
        </div>

        {/* Główny obszar komiksu - kadr z dymkami */}
        <div className="relative w-full aspect-[16/9] bg-black overflow-hidden select-none group">
          {/* Obraz mangi */}
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dymki z polskimi dialogami na kadrze */}
          {showBubbles &&
            chapter.bubbles.map((bubble) => (
              <ComicPanelBubble
                key={bubble.id}
                bubble={bubble}
                isActive={selectedBubbleId === bubble.id}
                onSelect={() => setSelectedBubbleId(bubble.id)}
              />
            ))}

          {/* Onomatopeje (Manga Sound Effects) */}
          {showBubbles &&
            chapter.soundEffects.map((sfx, idx) => (
              <button
                key={idx}
                onClick={() => playSfx(sfx)}
                style={{
                  position: 'absolute',
                  top: sfx.position.top,
                  bottom: sfx.position.bottom,
                  left: sfx.position.left,
                  right: sfx.position.right,
                  transform: sfx.rotation ? `rotate(${sfx.rotation})` : undefined,
                  color: sfx.color,
                }}
                title={`Efekt dźwiękowy: ${sfx.meaning} (Kliknij, aby usłyszeć!)`}
                className="z-10 font-black text-xl sm:text-3xl lg:text-4xl tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] hover:scale-125 transition-transform cursor-pointer font-sans select-none"
              >
                {sfx.text}
              </button>
            ))}

          {/* Informacja o możliwości powiększenia i odsłuchania */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Klikaj dymki i dźwięki, by odtworzyć kwestie po polsku</span>
          </div>
        </div>

        {/* Dolny panel: Notatki Taktyczne i Statystyki Xbox 360 */}
        <div className="p-6 bg-slate-950/90 border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Notatnik z Wyprawy (Lore Gry Xbox 360):
            </h4>
            <ul className="text-xs text-slate-300 space-y-1">
              {chapter.bonusStorySnippet.map((line, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
              Parametry Bitewne Kadrów:
            </span>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Poziom Drużyny:</span>
                <span className="font-mono text-white font-bold">
                  Lv. {chapter.tacticalNotes.partyLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ranga Cienia:</span>
                <span className="font-mono text-sky-300 font-semibold">
                  {chapter.tacticalNotes.shadowRank}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Zdolność Kluczowa:</span>
                <span className="text-amber-300 font-medium truncate max-w-[170px]">
                  {chapter.tacticalNotes.keyAbility}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
      {/* Pasek sterowania rozdziałami (dla widoku pojedynczego kadru) */}
      {!isContinuousView && (
        <div className="flex items-center justify-between mb-6 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
          <button
            onClick={handlePrevChapter}
            disabled={activeChapterId === 1}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Poprzedni Rozdział</span>
          </button>

          <div className="text-center">
            <span className="text-xs text-slate-400 font-medium block">
              Rozdział {activeChapterId} z {COMIC_CHAPTERS.length}
            </span>
            <span className="text-sm font-extrabold text-white">
              {activeChapter.title}
            </span>
          </div>

          <button
            onClick={handleNextChapter}
            disabled={activeChapterId === COMIC_CHAPTERS.length}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-sky-600/30"
          >
            <span>Następny Rozdział</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Renderowanie rozdziału / rozdziałów */}
      {isContinuousView ? (
        <div>
          {COMIC_CHAPTERS.map((ch) => renderChapterView(ch))}
        </div>
      ) : (
        renderChapterView(activeChapter)
      )}

      {/* Nawigacja dolna (w widoku pojedynczym) */}
      {!isContinuousView && (
        <div className="flex items-center justify-between mt-6 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
          <button
            onClick={handlePrevChapter}
            disabled={activeChapterId === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Poprzedni Kadr</span>
          </button>

          <button
            onClick={onToggleBubbles}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60"
          >
            {showBubbles ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>{showBubbles ? 'Ukryj Dymki PL' : 'Pokaż Dymki PL'}</span>
          </button>

          <button
            onClick={handleNextChapter}
            disabled={activeChapterId === COMIC_CHAPTERS.length}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-sky-600/30"
          >
            <span>Następny Kadr</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightbox / powiększenie kadru na pełny ekran */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-6xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src={lightboxImage}
              alt="Powiększenie kadru"
              fill
              referrerPolicy="no-referrer"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-6 text-xs text-white/70 bg-black/60 px-4 py-2 rounded-full">
            Kliknij w dowolne miejsce, aby zamknąć powiększenie
          </p>
        </div>
      )}
    </div>
  );
};
