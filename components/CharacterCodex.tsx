'use client';

import React, { useState } from 'react';
import { CHARACTERS, CharacterProfile } from '@/lib/comic-data';
import { Volume2, Shield, Zap, Sparkles, Sword, Heart, Activity } from 'lucide-react';
import { speakDialogueInPolish, soundManager } from '@/lib/audio';
import Image from 'next/image';

export const CharacterCodex: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<CharacterProfile>(CHARACTERS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (char: CharacterProfile) => {
    if (char.name === 'Shu') soundManager.playDragonRoar();
    else if (char.name === 'Nene') soundManager.playBeamAttack();
    else soundManager.playShadowAwaken();

    setIsSpeaking(true);
    speakDialogueInPolish(
      char.quote,
      char.name,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Tytuł sekcji */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Xbox 360 Party & Shadow Codex</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Bohaterowie, Ich Cienie i Armia Nene
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Poznaj legendarnych posiadaczy Kuli Światła z wioski Talta oraz mechaniczne zagrożenie, któremu musieli stawić czoła. Kliknij postać, aby odsłuchać jej kwestię po polsku.
        </p>
      </div>

      {/* Lista postaci - kafelki wyboru */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
        {CHARACTERS.map((char) => {
          const isSelected = selectedChar.name === char.name;
          return (
            <button
              key={char.name}
              onClick={() => setSelectedChar(char)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-sky-400 shadow-lg shadow-sky-500/20 scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <Image
                  src={char.image}
                  alt={char.name}
                  width={200}
                  height={300}
                  className="rounded-full mb-2"
                />
                <h4 className="font-extrabold text-white text-sm leading-tight">
                  {char.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {char.shadowName}
                </p>
              </div>
              <span className="text-[10px] text-sky-400 font-mono mt-3">
                {char.role.split('/')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Szczegółowa karta wybranego bohatera */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolumna lewa: profil, cytat, przycisk odsłuchu */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: selectedChar.color }}
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {selectedChar.name}
                  </h3>
                  <p className="text-sky-400 text-sm font-semibold">
                    {selectedChar.title}
                  </p>
                </div>
              </div>

              {/* Ramka z cytatem bojowym po polsku */}
              <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-xl p-4 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Głos Postaci (PL):
                  </span>
                  <button
                    onClick={() => handleSpeak(selectedChar)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/30"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Odtwarzanie...' : 'Odsłuchaj po polsku'}</span>
                  </button>
                </div>
                <p className="text-sm italic text-amber-200/90 font-serif leading-relaxed">
                  {selectedChar.quote}
                </p>
              </div>

              {/* Opis biograficzny */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Biografia i Rola w Fabule:
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedChar.description}
                </p>
              </div>
            </div>

            {/* Sprzęt i rola */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">
                  Główna Broń
                </span>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <Sword className="w-3 h-3 text-amber-400" />
                  {selectedChar.weapon}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">
                  Rola Taktyczna
                </span>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  {selectedChar.role}
                </span>
              </div>
            </div>
          </div>

          {/* Kolumna prawa: Cień i Statystyki Xbox 360 */}
          <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800/80 rounded-xl p-6 space-y-6">
            {/* Panel Cienia */}
            <div className="border-b border-slate-800 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-sky-400 tracking-wider uppercase">
                    Manifestacja Cienia (Shadow Awakening)
                  </span>
                  <h4 className="text-xl font-black text-white mt-0.5">
                    {selectedChar.shadowName}
                  </h4>
                </div>
                <span className="text-xs bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-1 rounded-full font-mono">
                  {selectedChar.shadowType}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                W grze Blue Dragon na Xbox 360 każdy cień reprezentuje wewnętrzną siłę woli nosiciela, dając dostęp do unikalnych drzewek umiejętności (Sword Master, Black Magic, White Magic, Barrier, Monk, Assassin).
              </p>
            </div>

            {/* Paski statystyk jRPG */}
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                Statystyki Bojowe (Baza Poziomu 50)
              </h5>

              <div className="space-y-3.5">
                {/* HP */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-400" /> Punkty Życia (HP)
                    </span>
                    <span className="font-mono text-rose-400">{selectedChar.stats.hp}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedChar.stats.hp / 1200) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* MP */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-sky-400" /> Punkty Magii (MP)
                    </span>
                    <span className="font-mono text-sky-400">{selectedChar.stats.mp}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedChar.stats.mp / 1000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Siła Fizyczna */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Siła Ataku Cienia</span>
                    <span className="font-mono text-amber-400">{selectedChar.stats.strength} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedChar.stats.strength}%` }}
                    />
                  </div>
                </div>

                {/* Moc Magiczna */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Moc Magii / Żywiołów</span>
                    <span className="font-mono text-purple-400">{selectedChar.stats.magic} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedChar.stats.magic}%` }}
                    />
                  </div>
                </div>

                {/* Zwinność */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Zwinność / Szybkość Tury</span>
                    <span className="font-mono text-emerald-400">{selectedChar.stats.agility} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedChar.stats.agility}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
