'use client';

import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
  Swords,
  ShieldAlert,
  Loader2,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { speakDialogueInPolish, stopSpeaking, soundManager } from '@/lib/audio';

interface GeneratedScenario {
  title: string;
  subtitle: string;
  location: string;
  narrative: string;
  dialogues: Array<{
    speaker: string;
    text: string;
    type: 'speech' | 'shout' | 'thought';
  }>;
  soundEffects: Array<{
    text: string;
    meaning: string;
  }>;
  tacticalTip: string;
  climaxAction: string;
}

const PRESET_IDEAS = [
  'Zasadzka Mecha-Pająków Szabo w Kopalniach Żółtej Pustyni',
  'Tajemniczy Ołtarz Pradawnych – Przebudzenie Złotej Zbroi Smoka',
  'Pojedynek wulkaniczny: Shu i Marumaro przeciwko Kolosowi Nene',
  'Desperacka obrona uchodźców z Gibral przed bombardowaniem Fioletowych Chmur'
];

export const GeminiStoryStudio: React.FC = () => {
  const [theme, setTheme] = useState(PRESET_IDEAS[0]);
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>(['Shu', 'Kluke', 'Jiro', 'Marumaro', 'Zola']);
  const [enemy, setEnemy] = useState('Lord Nene i Generał Szabo');
  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState<GeneratedScenario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number | null>(null);

  const toggleHero = (hero: string) => {
    if (selectedHeroes.includes(hero)) {
      if (selectedHeroes.length > 1) {
        setSelectedHeroes(selectedHeroes.filter((h) => h !== hero));
      }
    } else {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    soundManager.playShadowAwaken();

    try {
      const res = await fetch('/api/comic/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTheme: theme,
          selectedHeroes,
          enemyTarget: enemy,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setScenario(data.data);
        soundManager.playDragonRoar();
      } else {
        setError(data.error || 'Wystąpił błąd podczas generowania scenariusza.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd połączenia z serwerem');
    } finally {
      setIsLoading(false);
    }
  };

  const playSpeech = (text: string, speaker: string, index: number) => {
    if (currentSpeakingIndex === index) {
      stopSpeaking();
      setCurrentSpeakingIndex(null);
      return;
    }
    setCurrentSpeakingIndex(index);
    speakDialogueInPolish(
      text,
      speaker,
      () => setCurrentSpeakingIndex(index),
      () => setCurrentSpeakingIndex(null)
    );
  };

  const playAllDialogues = async () => {
    if (!scenario || scenario.dialogues.length === 0) return;
    stopSpeaking();

    for (let i = 0; i < scenario.dialogues.length; i++) {
      const d = scenario.dialogues[i];
      setCurrentSpeakingIndex(i);
      await new Promise<void>((resolve) => {
        speakDialogueInPolish(
          d.text,
          d.speaker,
          () => {},
          () => resolve()
        );
      });
      await new Promise((r) => setTimeout(r, 400));
    }
    setCurrentSpeakingIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Nagłówek Studia */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generator Nowych Scenariuszy i Kadrów</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Stwórz Własny Rozdział Walki z Armią Nene
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Wybierz drużynę bohaterów, przeciwnika i wątek fabularny. Model wygeneruje unikalną scenę komiksową z pełnymi polskimi dialogami, onomatopejami i taktyką jRPG gotową do odsłuchania!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formularz konfiguracji */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6 shadow-xl">
          {/* Wybór bohaterów */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
              1. Wybierz Drużynę (Posiadacze Cieni):
            </label>
            <div className="flex flex-wrap gap-2">
              {['Shu', 'Kluke', 'Jiro', 'Marumaro', 'Zola'].map((hero) => {
                const active = selectedHeroes.includes(hero);
                return (
                  <button
                    key={hero}
                    type="button"
                    onClick={() => toggleHero(hero)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      active
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {hero}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wybór przeciwnika */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              2. Przeciwnik / Frakcja Zła:
            </label>
            <select
              value={enemy}
              onChange={(e) => setEnemy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
            >
              <option value="Lord Nene i Generał Szabo">Lord Nene & Generał Szabo (Pełna Armia)</option>
              <option value="Generał Szabo i Batalion Mecha-Czołgów">Generał Szabo i Batalion Mecha-Czołgów</option>
              <option value="Starożytny Rekin Lądowy Nene">Starożytny Rekin Lądowy Nene</option>
              <option value="Zmechanizowany Mroczny Smok">Zmechanizowany Mroczny Smok (Dark Mecha Dragon)</option>
              <option value="Cyber-Inkwizytorzy z Latającej Twierdzy">Cyber-Inkwizytorzy z Latającej Twierdzy</option>
            </select>
          </div>

          {/* Motyw sceny */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              3. Zarys Sytuacji / Wątek Bojowy:
            </label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              placeholder="Wpisz własny pomysł na scenę..."
            />

            {/* Szybkie szablony */}
            <div className="mt-2.5 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Gotowe pomysły scenariuszy:
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESET_IDEAS.map((idea, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTheme(idea)}
                    className="text-left text-xs text-sky-400 hover:text-sky-300 hover:underline line-clamp-1 py-0.5"
                  >
                    • {idea}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Przycisk generowania */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Tworzenie sceny i polskich dialogów...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Wygeneruj Scenariusz z Polskimi Dialogami</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Podgląd wygenerowanej sceny */}
        <div className="lg:col-span-7">
          {scenario ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              {/* Pasek tytułowy scenariusza */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                    {scenario.location}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium">
                    {scenario.subtitle}
                  </p>
                </div>

                <button
                  onClick={playAllDialogues}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Odtwórz Dialogi (Lektor PL)</span>
                </button>
              </div>

              {/* Opis narracyjny kadru */}
              <div className="bg-slate-950/80 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  Wstęp Komiksowy (Narracja):
                </span>
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  {scenario.narrative}
                </p>
              </div>

              {/* Onomatopeje na kadrze */}
              {scenario.soundEffects && scenario.soundEffects.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Efekty Dźwiękowe (Onomatopeje Mangowe):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scenario.soundEffects.map((sfx, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-black text-xs tracking-wider"
                      >
                        {sfx.text} <span className="text-[10px] font-normal text-amber-400/80">({sfx.meaning})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dialogi w języku polskim */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Wypowiedzi Bohaterów i Wrogów (Dialogi PL):
                </span>
                <div className="space-y-3">
                  {scenario.dialogues.map((dlg, idx) => {
                    const isSpeakingNow = currentSpeakingIndex === idx;
                    const isShout = dlg.type === 'shout';

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isSpeakingNow
                            ? 'bg-sky-950/80 border-sky-400 ring-2 ring-sky-400/30'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                            {dlg.speaker}
                          </span>
                          <button
                            onClick={() => playSpeech(dlg.text, dlg.speaker, idx)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            title="Odsłuchaj kwestię"
                          >
                            {isSpeakingNow ? (
                              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p
                          className={`text-sm ${
                            isShout ? 'font-black text-white' : 'text-slate-200'
                          }`}
                        >
                          {dlg.type === 'thought' ? `„${dlg.text}”` : dlg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kulminacyjny cios i wskazówka jRPG */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Swords className="w-3 h-3" /> Finałowy Cios Kadrów
                  </span>
                  <p className="text-xs text-slate-300">
                    {scenario.climaxAction}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3 h-3" /> Taktyka Xbox 360
                  </span>
                  <p className="text-xs text-slate-300">
                    {scenario.tacticalTip}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Wand2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Gotowy do stworzenia nowej opowieści?
              </h4>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                Skonfiguruj parametry bitwy po lewej stronie i kliknij przycisk, aby wygenerować świeży fragment komiksu z wiernymi postaciami Blue Dragon.
              </p>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30"
              >
                Wygeneruj pierwszą scenę
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
