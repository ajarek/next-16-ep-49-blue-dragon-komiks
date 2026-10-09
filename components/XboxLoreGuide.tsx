'use client';

import React from 'react';
import { Gamepad2, Disc, Shield, Sparkles, Flame, History, Award } from 'lucide-react';
import { soundManager } from '@/lib/audio';

export const XboxLoreGuide: React.FC = () => {
  return (
    <section className="bg-slate-950 border-t border-slate-800 text-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Kulisy Gry Xbox 360 · 2006</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Jak Powstał Świat Blue Dragon?
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Wydana na 3 płytach DVD na konsolę Xbox 360 gra była owocem współpracy legend japońskiego gamingu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">
              Hironobu Sakaguchi (Scenariusz)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ojciec serii Final Fantasy stworzył wzruszającą, epicką opowieść o nadziei, przyjaźni i walce ze zmechanizowanym terrorem pradawnego zła.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">
              Akira Toriyama (Projekty Postaci)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Legendarny twórca Dragon Ball i Dragon Quest zaprojektował Shu, Kluke, Jiro, niepowtarzalne stwory i monumentalne Błękitne Smoki o charakterystycznej kresce.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Disc className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">
              Nobuo Uematsu & Ian Gillan
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Genialna ścieżka dźwiękowa z kultowym utworem „Eternity” śpiewanym przez wokalistę Deep Purple nadała starciom z bossami niespotykaną energię rocka.
            </p>
          </div>
        </div>

        {/* Ciekawostka o Fioletowych Chmurach */}
        <div className="mt-8 bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-sky-950/40 border border-purple-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-purple-400" />
              Tajemnica Fioletowych Chmur Lorda Nene
            </h5>
            <p className="text-xs text-slate-300 max-w-2xl">
              Fioletowe Chmury pojawiały się co roku, przynosząc zniszczenie i tajemniczą chorobę. Dopiero zniszczenie latającej fortecy Nene i uwolnienie uwięzionych Kuli Światła pozwoliło przywrócić błękitne niebo nad całą planetą.
            </p>
          </div>
          <button
            onClick={() => soundManager.playDragonRoar()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700 whitespace-nowrap transition-colors"
          >
            Ryk Zwycięstwa Smoka
          </button>
        </div>
      </div>
    </section>
  );
};
