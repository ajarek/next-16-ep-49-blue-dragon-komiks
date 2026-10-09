import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioTheme, selectedHeroes, enemyTarget } = body;

    const heroesList = Array.isArray(selectedHeroes) && selectedHeroes.length > 0 
      ? selectedHeroes.join(', ') 
      : 'Shu, Kluke, Jiro, Marumaro, Zola';

    const enemy = enemyTarget || 'Lord Nene i Generał Szabo';
    const theme = scenarioTheme || 'Obrona zaginionego chramu Cienia przed machiną wojenną Nene';

    const systemPrompt = `Jesteś wybitnym scenarzystą mangi i dialogów dla gry na konsolę Xbox 360 „Blue Dragon” stworzonej przez Hironobu Sakaguchiego i Akirę Toriyamę.
Twoim zadaniem jest stworzyć nowy dynamiczny kadr/scenę komiksu w języku polskim.
Wszystkie dialogi, okrzyki bojowe, narracja i onomatopeje muszą być w języku polskim, z zachowaniem charakteru postaci:
- Shu: porywczy, nieustraszony, krzyczy "Nigdy się nie poddam!", wzywa Błękitnego Smoka.
- Kluke: inteligentna, przyjacielska, wzywa Feniksa do leczenia i ognia.
- Jiro: analityczny strateg, ostrożny, wspiera barierami Minotaura.
- Marumaro: karłowaty wojownik Devee, komiczny, krzyczy "Maru-maru!" i atakuje Tygrysem Szablozębnym.
- Zola: chłodna, pragmatyczna piratka z Zabójczym Nietoperzem.
- Lord Nene: pyszny tyran, drwi z bohaterów, używa mrocznej technologii.
- Generał Szabo: mechaniczny dowódca rzucający roboty bojowe.

Zwróć odpowiedź WYŁĄCZNIE jako poprawny obiekt JSON o strukturze:
{
  "title": "Tytuł nowej sceny (po polsku)",
  "subtitle": "Podtytuł",
  "location": "Miejsce akcji",
  "narrative": "Wstęp narracyjny komiksu opisujący sytuację na kadrze (2-3 zdania po polsku)",
  "dialogues": [
    {
      "speaker": "Imię postaci",
      "text": "Tekst wypowiedzi po polsku",
      "type": "speech" lub "shout" lub "thought"
    }
  ],
  "soundEffects": [
    {
      "text": "Polska onomatopeja (np. BUM!, TRZASK!, SZROOAH!, WZIUUUM!)",
      "meaning": "Znaczenie dźwięku po polsku"
    }
  ],
  "tacticalTip": "Wskazówka taktyczna jRPG dla gracza po polsku",
  "climaxAction": "Opis decydującego uderzenia w kadrze"
}`;

    const userPrompt = `Stwórz scenę komiksową dla drużyny: ${heroesList}.
Przeciwnik: ${enemy}.
Motyw przewodni sceny: ${theme}.
Upewnij się, że dialogi są żywe, emocjonalne, w stylu shonen anime i w 100% w języku polskim.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Error in comic generate route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Nie udało się wygenerować sceny komiksu'
      },
      { status: 500 }
    );
  }
}
