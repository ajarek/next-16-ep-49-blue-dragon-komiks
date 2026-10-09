'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Wand2,
  Volume2,
  VolumeX,
  Music,
  Radio,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { soundManager } from '@/lib/audio';
import Image from 'next/image';

interface ComicHeaderProps {
  activeTab: 'comic' | 'characters' | 'ai-studio';
  onTabChange: (tab: 'comic' | 'characters' | 'ai-studio') => void;
  activeChapterId: number;
  onSelectChapter: (id: number) => void;
  showBubbles: boolean;
  onToggleBubbles: () => void;
  isContinuousView: boolean;
  onToggleContinuousView: () => void;
}

export const ComicHeader: React.FC<ComicHeaderProps> = ({
  activeTab,
  onTabChange,
  activeChapterId,
  onSelectChapter,
  showBubbles,
  onToggleBubbles,
  isContinuousView,
  onToggleContinuousView,
}) => {
  const [bgmActive, setBgmActive] = useState(false);

  const toggleBgm = () => {
    const newState = soundManager.toggleBattleTheme(!bgmActive);
    setBgmActive(newState);
  };

  const playRoar = () => {
    soundManager.playDragonRoar();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-emerald-500/30 text-white shadow-2xl">
      {/* Górny pasek z brandingiem konsoli Xbox 360 i mangi */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Logo i Tytuł */}
        <div className="flex items-center gap-3">
          {/* Xbox 360 glowing ring icon */}
          <div
            onClick={playRoar}
            className="border border-sky-600/50 rounded-lg px-1.5 cursor-pointer hover:bg-sky-950/80 transition-colors"
            title="Kliknij, by wywołać Ryk Błękitnego Smoka!"
          >
            <Image
              src="/images/blue-dragon.png"
              alt="Xbox 360 Logo"
              width={120}
              height={72}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
               
              </h1>
              <span className="hidden md:inline-block text-xs text-slate-400 font-medium">
                Kroniki Cienia · Wojna z Armią Nene
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Oficjalna adaptacja komiksowa · Akira Toriyama & Hironobu Sakaguchi
            </p>
          </div>
        </div>

        {/* Główne zakładki nawigacyjne */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onTabChange('comic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'comic'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Czytaj Komiks</span>
          </button>

          <button
            onClick={() => onTabChange('characters')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'characters'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Postacie & Cienie</span>
          </button>

          <button
            onClick={() => onTabChange('ai-studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ai-studio'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="flex items-center gap-1">
              Generator Scen
              <span className="text-[10px] bg-purple-400/20 text-purple-300 px-1 rounded font-mono">
                AI
              </span>
            </span>
          </button>
        </div>

        {/* Pasek narzędzi dźwiękowych i widoku */}
        <div className="flex items-center gap-2">
          {/* Przełącznik muzyki bitewnej (Nobuo Uematsu Rock Theme) */}
          <button
            onClick={toggleBgm}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              bgmActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-500/20 animate-pulse'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={bgmActive ? 'Wyłącz motyw muzyczny' : 'Włącz motyw muzyczny bitwy (Xbox 360 Synth)'}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {bgmActive ? 'BGM: Włączone' : 'Muzyka BGM'}
            </span>
          </button>

          {/* Dźwięk Ryku Smoka */}
          <button
            onClick={playRoar}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-sky-950/80 text-sky-300 border border-sky-800 hover:bg-sky-900 transition-colors"
            title="Odtwórz ryk Błękitnego Smoka"
          >
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Ryk Smoka</span>
          </button>

          {/* Przełącznik dymków */}
          {activeTab === 'comic' && (
            <>
              <button
                onClick={onToggleBubbles}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  showBubbles
                    ? 'bg-amber-950/60 text-amber-300 border-amber-600/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
                title="Włącz lub wyłącz dymki dialogów na kadrach"
              >
                <span>Dymki PL: {showBubbles ? 'WŁ' : 'WYŁ'}</span>
              </button>

              <button
                onClick={onToggleContinuousView}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isContinuousView
                    ? 'bg-slate-800 text-sky-400 border-sky-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
                title={isContinuousView ? 'Przełącz na widok kadr po kadrze' : 'Przełącz na widok ciągły (Webtoon)'}
              >
                <Layers className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dolny pasek wyboru rozdziału (gdy aktywny komiks) */}
      {activeTab === 'comic' && (
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-1.5 overflow-x-auto flex items-center justify-center gap-2 sm:gap-4 scrollbar-none text-xs">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold shrink-0">
            Rozdziały:
          </span>
          {[
            { id: 1, title: 'I: Przebudzenie Smoka' },
            { id: 2, title: 'II: Armia Szabo' },
            { id: 3, title: 'III: Starcie z Nene' },
            { id: 4, title: 'IV: Nowy Świt' },
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap transition-all ${
                activeChapterId === ch.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
