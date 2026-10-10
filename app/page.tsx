"use client"

import React, { useState } from "react"
import { ComicHeader } from "@/components/ComicHeader"
import { ComicHero } from "@/components/ComicHero"
import { ComicReader } from "@/components/ComicReader"
import { CharacterCodex } from "@/components/CharacterCodex"
import { GeminiStoryStudio } from "@/components/GeminiStoryStudio"
import { XboxLoreGuide } from "@/components/XboxLoreGuide"
import Link from "next/link"

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "comic" | "characters" | "ai-studio"
  >("comic")
  const [activeChapterId, setActiveChapterId] = useState<number>(1)
  const [showBubbles, setShowBubbles] = useState<boolean>(true)
  const [isContinuousView, setIsContinuousView] = useState<boolean>(false)

  const scrollToReader = () => {
    setActiveTab("comic")
    const el = document.getElementById("comic-content-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-black'>
      {/* Pasek nawigacji i narzędzi */}
      <ComicHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeChapterId={activeChapterId}
        onSelectChapter={(id) => {
          setActiveChapterId(id)
          setActiveTab("comic")
        }}
        showBubbles={showBubbles}
        onToggleBubbles={() => setShowBubbles(!showBubbles)}
        isContinuousView={isContinuousView}
        onToggleContinuousView={() => setIsContinuousView(!isContinuousView)}
      />

      {/* Hero sekcja */}
      <ComicHero
        onStartReading={scrollToReader}
        onOpenCharacters={() => {
          setActiveTab("characters")
          const el = document.getElementById("comic-content-section")
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }}
        onOpenStudio={() => {
          setActiveTab("ai-studio")
          const el = document.getElementById("comic-content-section")
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }}
      />

      {/* Główny kontener treści */}
      <main id='comic-content-section' className='flex-1 py-8'>
        {activeTab === "comic" && (
          <ComicReader
            activeChapterId={activeChapterId}
            onSelectChapter={setActiveChapterId}
            showBubbles={showBubbles}
            onToggleBubbles={() => setShowBubbles(!showBubbles)}
            isContinuousView={isContinuousView}
          />
        )}

        {activeTab === "characters" && <CharacterCodex />}

        {activeTab === "ai-studio" && <GeminiStoryStudio />}
      </main>

      {/* Przewodnik i ciekawostki o grze na Xbox 360 */}
      <XboxLoreGuide />

      {/* Stopka */}
      <footer className='border-t border-slate-900 bg-slate-950/90 text-slate-400 py-8 px-4 sm:px-6 text-center text-xs'>
        <div className='max-w-6xl mx-auto space-y-3'>
          <p className='font-medium text-slate-300'>
            BLUE DRAGON: KRONIKI CIENIA · Komiks i Dialogi w Języku Polskim
          </p>
          <p className='text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed'>
            Stworzone na podstawie gry RPG na konsolę Xbox 360 (2006).
            Wykreowane przez Hironobu Sakaguchiego (Mistwalker) oraz Akirę
            Toriyamę (Bird Studio). Muzyka: Nobuo Uematsu.
          </p>
          <div className='pt-2 text-[10px] text-slate-400 flex items-center justify-center gap-4'>
            <Link href="https://next-16-ep-43-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">AJAREK DEV</Link>
            <span>·</span>
            <span>Talta Village Chronicles</span>
            <span>·</span>
            <span>Xbox 360 Era</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
