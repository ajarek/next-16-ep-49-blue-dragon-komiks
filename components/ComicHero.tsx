'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, Sparkles, Volume2, Shield, Users, Play, Swords } from 'lucide-react';
import { soundManager } from '@/lib/audio';

interface ComicHeroProps {
  onStartReading: () => void;
  onOpenCharacters: () => void;
  onOpenStudio: () => void;
}

export const ComicHero: React.FC<ComicHeroProps> = ({
  onStartReading,
  onOpenCharacters,
  onOpenStudio,
}) => {
  const handlePlayHeroTheme = () => {
    soundManager.playDragonRoar();
    soundManager.toggleBattleTheme(true);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800 text-white py-12 md:py-16">
      {/* Tło z poświatą aury smoka */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Tekst Hero po lewej */}
          <div className="lg:col-span-7 space-y-6">
            {/* Metadane bez statycznych pigułek */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-mono">
              <span className="font-bold uppercase tracking-wider text-emerald-400">Xbox 360 Exclusive Classic</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>MistWorks & Artoon</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Art: Akira Toriyama</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400 font-bold">100% Dialogi PL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Błękitny Smok: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Wojna z Armią Nene
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Złowrogi Lord Nene sprowadził na świat plagę Fioletowych Chmur i armię mechanicznych niszczycieli. Gdy wioska Talta stanęła w płomieniach, młody Shu wraz z Kluke, Jiro, Marumaro i Zolą odkrył w sobie pradawną siłę Cienia. Zobacz ich epicką walkę w interaktywnym komiksie z polskimi dialogami!
            </p>

            {/* Przyciski CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartReading}
                className="px-6 py-3.5 rounded-xl font-black text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg shadow-sky-500/30 flex items-center gap-2.5 active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Zacznij Czytać Komiks (Rozdział I)</span>
              </button>

              <button
                onClick={handlePlayHeroTheme}
                className="px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white transition-all flex items-center gap-2"
                title="Włącz motyw muzyczny bitwy Uematsu i ryk smoka"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Odtwórz Ryk & Muzykę Bitwy</span>
              </button>

              <button
                onClick={onOpenCharacters}
                className="px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white hover:bg-slate-900/80 transition-colors flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Drużyna i Cienie</span>
              </button>
            </div>

            {/* Notka o dialogach i funkcjach */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-850 max-w-xl text-xs text-slate-400">
              <div>
                <span className="font-extrabold text-white block text-sm">4 Epickie Kadr-Rozdziały</span>
                <span>Wioska Talta, Kanion, Twierdza Nene</span>
              </div>
              <div>
                <span className="font-extrabold text-white block text-sm">Lektor PL na Życzenie</span>
                <span>Odsłuchaj kwestie każdej postaci</span>
              </div>
              <div>
                <span className="font-extrabold text-white block text-sm">Studio Gemini AI</span>
                <span>Generuj własne bitwy i dialogi</span>
              </div>
            </div>
          </div>

          {/* Okładka komiksu po prawej */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Ozdobna ramka jak obwoluta mangi */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 via-emerald-500 to-purple-600 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/comic/cover.jpg"
                    alt="Blue Dragon Okładka Komiksu"
                    fill
                    priority
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Pasek na okładce */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 block font-mono">
                        TOM 1 · SAGA CIENIA
                      </span>
                      <h4 className="text-white font-black text-sm">
                        Przebudzenie Błękitnego Smoka
                      </h4>
                    </div>
                    <button
                      onClick={onStartReading}
                      className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1 shadow-md"
                    >
                      <span>Otwórz</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
