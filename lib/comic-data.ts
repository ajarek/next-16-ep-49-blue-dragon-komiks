export interface SpeechBubble {
  id: string;
  speaker: 'Shu' | 'Kluke' | 'Jiro' | 'Marumaro' | 'Zola' | 'Nene' | 'Szabo' | 'Narrator';
  text: string;
  type: 'speech' | 'shout' | 'thought' | 'narration';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  pointerDirection?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right';
  shadowType?: string;
}

export interface SoundEffectOnomatopoeia {
  text: string;
  meaning: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  color: string;
  rotation?: string;
}

export interface ComicChapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  narrativeSummary: string;
  location: string;
  image: string;
  aspectRatio: string;
  soundEffects: SoundEffectOnomatopoeia[];
  bubbles: SpeechBubble[];
  tacticalNotes: {
    partyLevel: number;
    shadowRank: string;
    enemyThreat: string;
    keyAbility: string;
  };
  bonusStorySnippet: string[];
}

export interface CharacterProfile {
  image: string;
  name: string;
  title: string;
  role: string;
  shadowName: string;
  shadowType: string;
  weapon: string;
  description: string;
  quote: string;
  color: string;
  stats: {
    hp: number;
    mp: number;
    strength: number;
    magic: number;
    agility: number;
  };
}

export const CHARACTERS: CharacterProfile[] = [
  {
    image: '/images/Shu.png',
    name: 'Shu',
    title: 'Niezłomny Chłopiec z Talta',
    role: 'Główny Bohater & Mistrz Walki Wręcz',
    shadowName: 'Błękitny Smok (Blue Dragon)',
    shadowType: 'Smoczy Cień Ofensywny / Sword Master',
    weapon: 'Kula Cienia i Miecz Energii',
    description: 'Szesnastoletni mieszkaniec wioski Talta o niezłomnej woli. Gdy jego domostwo zostało zaatakowane przez podziemnego mecha-rekina pod osłoną Fioletowych Chmur, obudził w sobie legendarnego Błękitnego Smoka.',
    quote: '„Nigdy się nie poddam! Nene, zapłacisz za każdą łzę mieszkańców wioski!”',
    color: '#0284c7',
    stats: { hp: 840, mp: 420, strength: 95, magic: 75, agility: 88 }
  },
  {
    image: '/images/Kluke.png',
    name: 'Kluke',
    title: 'Uzdrowicielka i Opiekunka Płomieni',
    role: 'Magia Biała i Czarna / Wsparcie',
    shadowName: 'Feniks (Phoenix)',
    shadowType: 'Ptasi Cień Magiczny / White & Black Magic',
    weapon: 'Magiczna Laska i Pierścień Duszy',
    description: 'Przyjaciółka Shu od dzieciństwa. Mimo straty rodziców w poprzednich atakach armii Nene, nie uległa rozpaczy. Jej Cień Feniksa leczy rany sojuszników i spopiela pancerze robotów potężnymi falami ognia.',
    quote: '„Shu, zawsze będę cię osłaniać! Błękitne niebo powróci nad nasz świat!”',
    color: '#ec4899',
    stats: { hp: 620, mp: 980, strength: 52, magic: 99, agility: 72 }
  },
  {
    image: '/images/Jiro.png',
    name: 'Jiro',
    title: 'Młody Strateg z Talta',
    role: 'Taktyk i Mag Bariery',
    shadowName: 'Minotaur (Minotaur)',
    shadowType: 'Cień Obrońcy / Barrier Mage & Support',
    weapon: 'Krótki Miecz i Księga Taktyk',
    description: 'Najbystrzejszy umysł w grupie. Zawsze planuje dwa kroki w przód. Jego Cień Minotaura dysponuje nieprzeniknioną siłą obronną, zdolną zablokować nawet zmasowany ostrzał z dział Nene.',
    quote: '„Analiza zakończona! Robot Generała Szabo przegrzewa rdzeń co dwanaście sekund!”',
    color: '#10b981',
    stats: { hp: 710, mp: 850, strength: 68, magic: 90, agility: 65 }
  },
  {
    image: '/images/Marumaro.png',
    name: 'Marumaro',
    title: 'Waleczny Wojownik Devee',
    role: 'Szybki Szturmowiec / Monk',
    shadowName: 'Tygrys Szablozębny (Saber Tiger)',
    shadowType: 'Bestialski Cień Zwinności / Monk & Thief',
    weapon: 'Toporek Kościany i Pazury',
    description: 'Karłowaty, głośny wojownik ze szczepu Devee. Choć ma skłonność do melodramatycznych okrzyków i tańców bojowych, jego Tygrys Szablozębny rozszarpuje kadłuby mecha-żołnierzy z prędkością błyskawicy.',
    quote: '„Maru-maru! Poczujcie furiozalny taniec pazurów mojego Tygrysa!”',
    color: '#f59e0b',
    stats: { hp: 790, mp: 380, strength: 89, magic: 55, agility: 96 }
  },
  {
    image: '/images/Zola.png',
    name: 'Zola',
    title: 'Tajemnicza Kapitan i Wojowniczka',
    role: 'Zabójczyni Cienia & Przywódczyni',
    shadowName: 'Zabójczy Nietoperz (Killer Bat)',
    shadowType: 'Cień Ciemności / Assassin & Dark Magic',
    weapon: 'Piratkańska Szabla i Kordelas',
    description: 'Doświadczona, chłodna szermierka, która wcześniej podróżowała po świecie jako najemniczka. Zna sekrety starożytnej cywilizacji i bezwzględnie poluje na robotycznych namiestników Nene.',
    quote: '„Słowa nie powstrzymają Nene. Tylko stal i czysta potęga Cienia.”',
    color: '#8b5cf6',
    stats: { hp: 880, mp: 610, strength: 92, magic: 82, agility: 91 }
  },
  {
    image: '/images/Nene.png',
    name: 'Lord Nene',
    title: 'Tyran Starożytnej Technologii',
    role: 'Władca Mecha-Imperium & Arcymag Maszyn',
    shadowName: 'Chimera Cienia (Dark Chimera)',
    shadowType: 'Sztuczny Cień Absolutny',
    weapon: 'Latający Tron i Działo Ciemnej Materii',
    description: 'Główny antagonista ze świata Blue Dragon. Starożytny despota, który od tysiącleci przedłuża swoje życie, porywając energię życiową planetarnych krain za pomocą Fioletowych Chmur i robotycznych armii.',
    quote: '„Nędzne robaki! Myślicie, że wasze małe cienie powstrzymają bieg przeznaczenia? Zgińcie!”',
    color: '#dc2626',
    stats: { hp: 9999, mp: 9999, strength: 99, magic: 99, agility: 80 }
  },
  {
    image: '/images/Szabo.png',
    name: 'Generał Szabo',
    title: 'Mechaniczny Naczelnik Sił Nene',
    role: 'Dowódca Robotycznych Batalionów',
    shadowName: 'Brak (Czysta Cybernetyka)',
    shadowType: 'Mecha-Procesor Bojowy',
    weapon: 'Podwójne Działa Plazmowe i Rakiety',
    description: 'Lojalny cyber-generał Nene. Dowodzi setkami mecha-żołnierzy i patroluje kaniony w latającym myśliwcu dowodzenia. Bezwzględnie wykonuje rozkazy eksterminacji buntowników.',
    quote: '„Rozkaz Nene jest święty. Wszyscy posiadacze Cieni zostaną zneutralizowani!”',
    color: '#64748b',
    stats: { hp: 3500, mp: 1200, strength: 84, magic: 70, agility: 60 }
  }
];

export const COMIC_CHAPTERS: ComicChapter[] = [
  {
    id: 1,
    slug: 'przebudzenie-blekitnego-smoka',
    title: 'Rozdział 1: Przebudzenie Błękitnego Smoka',
    subtitle: 'Wioska Talta pod ostrzałem Fioletowych Chmur',
    location: 'Ruiny Pustynne w pobliżu Wioski Talta',
    image: '/comic/ch1.jpg',
    aspectRatio: '16/9',
    narrativeSummary: 'Gdy Fioletowe Chmury ponownie spowiły niebo nad Talta, potężny podziemny Rekin Lądowy zniszczył domostwa. Shu, uwięziony w mechanicznych wnętrznościach maszyny wroga, połknął tajemniczą Kulę Światła. Z jego cienia z rykiem wyłonił się pradawny Błękitny Smok!',
    soundEffects: [
      { text: 'KRA-KOOM!', meaning: 'Uderzenie gromu z fioletowej chmury', position: { top: '8%', right: '12%' }, color: '#f59e0b', rotation: '6deg' },
      { text: 'SZROOOAH!!', meaning: 'Pierwszy potężny ryk Błękitnego Smoka', position: { top: '22%', right: '8%' }, color: '#38bdf8', rotation: '-4deg' },
      { text: 'SZUUU!', meaning: 'Pulsowanie niebieskiej aury energii', position: { bottom: '26%', left: '38%' }, color: '#67e8f9', rotation: '12deg' },
      { text: 'ZAP!', meaning: 'Wyładowanie antymaterii', position: { top: '35%', left: '16%' }, color: '#c084fc', rotation: '-10deg' }
    ],
    bubbles: [
      {
        id: 'b1-1',
        speaker: 'Shu',
        type: 'shout',
        text: 'Nigdy więcej nie uciekniemy! Nie pozwolę wam skrzywdzić Talta ani moich przyjaciół!',
        position: { bottom: '18%', left: '8%' },
        pointerDirection: 'bottom-right'
      },
      {
        id: 'b1-2',
        speaker: 'Shu',
        type: 'thought',
        text: 'Co to za niesamowite ciepło w moich żyłach...? Mój cień... on naprawdę żyje?!',
        position: { top: '16%', left: '14%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b1-3',
        speaker: 'Narrator',
        type: 'narration',
        text: 'W najciemniejszej godzinie, gdy maszyny Nene niosły zagładę, starożytna moc Cienia obudziła się w sercu chłopca.',
        position: { top: '6%', left: '6%' }
      },
      {
        id: 'b1-4',
        speaker: 'Shu',
        type: 'shout',
        text: 'Błękitny Smoku, rozerwij te mechaniczne bestie na kawałki!!',
        position: { bottom: '38%', right: '28%' },
        pointerDirection: 'left'
      }
    ],
    tacticalNotes: {
      partyLevel: 12,
      shadowRank: 'Ranga 1 (Początek Przebudzenia)',
      enemyThreat: 'Mecha-Rekin Zwiadowczy i Roboty Piechoty',
      keyAbility: 'Smoczy Cios (Dragon Fist) / Płomień Astralny'
    },
    bonusStorySnippet: [
      'Głos ze sfery światła odbił się echem w duszy Shu: „Chcesz zyskać siłę, by zmienić bieg losu?”.',
      'Bez chwili wahania chłopiec odpowiedział: „Tak!”. W tym ułamku sekundy narodziła się więź z legendarnym Cieniem.',
      'Kluke i Jiro obserwowali z osłupieniem, jak błękitna sylwetka smoka rozprasza toksyczne chmury Nene nad pustynią.'
    ]
  },
  {
    id: 2,
    slug: 'starcie-w-kanionie-szabo',
    title: 'Rozdział 2: Starcie w Kanionie Maszyn',
    subtitle: 'Generał Szabo rzuca do boju stalowy legion',
    location: 'Skalisty Wąwóz Żelaznego Wichru',
    image: '/comic/ch2.jpg',
    aspectRatio: '16/9',
    narrativeSummary: 'Dowódca sił naziemnych Nene, cybernetyczny Generał Szabo, zablokował wąwóz tysiącami pancernych mechów. Jednak Shu nie walczy już sam – obok niego stają Kluke z Cieniem Feniksa, Jiro z Minotaurem oraz nowo przybyli sojusznicy!',
    soundEffects: [
      { text: 'BUM!!', meaning: 'Eksplozja mecha-czołgu', position: { top: '8%', left: '10%' }, color: '#ef4444', rotation: '-8deg' },
      { text: 'DOKAAAN!', meaning: 'Potężny wystrzał działa plazmowego', position: { top: '12%', left: '34%' }, color: '#f59e0b', rotation: '4deg' },
      { text: 'TRZASK!', meaning: 'Pazury Cienia tnące pancerz', position: { bottom: '15%', right: '12%' }, color: '#38bdf8', rotation: '-12deg' },
      { text: 'BI-KAAN!', meaning: 'Magiczny blask Feniksa', position: { top: '10%', right: '16%' }, color: '#38bdf8', rotation: '8deg' }
    ],
    bubbles: [
      {
        id: 'b2-1',
        speaker: 'Szabo',
        type: 'speech',
        text: 'Naczelny protokół eksterminacji! Zmiażdżyć posiadaczy Cienia pod gąsienicami żelaza!',
        position: { top: '24%', right: '10%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b2-2',
        speaker: 'Shu',
        type: 'shout',
        text: 'Do przodu, przyjaciele! Nie zatrzymają nas żadne roboty!',
        position: { top: '38%', left: '32%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b2-3',
        speaker: 'Kluke',
        type: 'shout',
        text: 'Feniksie, płomień oczyszczenia! Spal ich obwody sterujące!',
        position: { top: '48%', left: '50%' },
        pointerDirection: 'top-left'
      },
      {
        id: 'b2-4',
        speaker: 'Marumaro',
        type: 'shout',
        text: 'Maru-maru! Mój szablozębny tygrys zrobi z was konserwy rybne!',
        position: { bottom: '18%', left: '46%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b2-5',
        speaker: 'Jiro',
        type: 'speech',
        text: 'Bariera ochronna ustawiona! Ich działo przegrzewa się!',
        position: { bottom: '26%', right: '28%' },
        pointerDirection: 'bottom-left'
      }
    ],
    tacticalNotes: {
      partyLevel: 28,
      shadowRank: 'Ranga 18 (Odblokowane Umiejętności Klasowe)',
      enemyThreat: 'Generał Szabo Mk-II & Dywizja Szturmowa Robo-Kula',
      keyAbility: 'Ognisty Podmuch Feniksa & Wir Szablozębny'
    },
    bonusStorySnippet: [
      'Szabo nie wierzył własnym czujnikom: organiczne istoty manipulowały czystą materią cienia, niszcząc najnowsze technologie Nene.',
      'Zola cicho przemknęła z flanki: „Twoje obliczenia pominęły jedno, Szabo – wolę walki”.',
      'Po zniszczeniu mecha-korpusu generała, droga do podniebnej bazy wroga stanęła otworem.'
    ]
  },
  {
    id: 3,
    slug: 'ostateczne-starcie-z-lordem-nene',
    title: 'Rozdział 3: Konfrontacja w Podniebnej Twierdzy',
    subtitle: 'Ostateczne starcie: Błękitny Smok kontra Mroczna Chimera Nene',
    location: 'Sala Tronowa Latającej Twierdzy Nene',
    image: '/comic/ch3.jpg',
    aspectRatio: '16/9',
    narrativeSummary: 'Drużyna dociera do serca podniebnego bastionu Nene. Szalony imperator ujawnia swoją cyber-zbroję i sztuczny cień chciwości. Nene drwi ze śmiertelników, ale Shu jednoczy wolę wszystkich towarzyszy w jednym potężnym uderzeniu Promienia Smoka!',
    soundEffects: [
      { text: 'GOOOM!!', meaning: 'Huk mrocznej energii antymaterii', position: { top: '10%', left: '4%' }, color: '#a855f7', rotation: '-6deg' },
      { text: 'DON!!', meaning: 'Potężne zderzenie dwóch fal energii', position: { top: '14%', left: '48%' }, color: '#f97316', rotation: '6deg' },
      { text: 'DOOO-RN!!', meaning: 'Wystrzał Smoczego Promienia Światła', position: { bottom: '12%', right: '26%' }, color: '#38bdf8', rotation: '-2deg' }
    ],
    bubbles: [
      {
        id: 'b3-1',
        speaker: 'Nene',
        type: 'shout',
        text: 'Przeklęte bachory!! Jak śmiecie przeciwstawiać się bogu nowej ery?! Poczujcie mrok tysiąca lat!',
        position: { bottom: '28%', left: '4%' },
        pointerDirection: 'top-right'
      },
      {
        id: 'b3-2',
        speaker: 'Shu',
        type: 'shout',
        text: 'Przyjmij to, Nene!! Całą naszą siłę, wiarę i nadzieję wszystkich ludzi tego świata!!',
        position: { top: '8%', right: '6%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b3-3',
        speaker: 'Shu',
        type: 'shout',
        text: 'BŁĘKITNY SMOKU! PROMIEŃ NIESKOŃCZONOŚCI!!',
        position: { bottom: '24%', right: '36%' },
        pointerDirection: 'top-left'
      },
      {
        id: 'b3-4',
        speaker: 'Narrator',
        type: 'narration',
        text: 'Czysta, nieskażona wola walki chłopca z Talta zderzyła się z tysiącletnią tyranią zepsucia i pychy.',
        position: { top: '6%', left: '22%' }
      }
    ],
    tacticalNotes: {
      partyLevel: 48,
      shadowRank: 'Ranga 40+ (Maksymalna Forma Smoka)',
      enemyThreat: 'Ostateczna Forma Nene & Rdzeń Ciemnej Materii',
      keyAbility: 'Smoczy Promień Światła (Infinity Dragon Fang) & Całkowita Odporność'
    },
    bonusStorySnippet: [
      'Gdy dłonie Shu rozbłysły lazurowym światłem, w sali tronowej zgasły wszystkie mechaniczne monitory Nene.',
      'Szalony tyran po raz pierwszy w swoim długim życiu poczuł lodowaty uścisk strachu.',
      'Potężna wiązka energii rozerwała pancerz Nene, a jego latająca forteca zadrżała w posadach.'
    ]
  },
  {
    id: 4,
    slug: 'nowy-swit-zwyciestwo',
    title: 'Rozdział 4: Nowy Świt i Wolność Świata',
    subtitle: 'Koniec Fioletowych Chmur – Przysięga Strażników',
    location: 'Wzgórza Nadziei z widokiem na Odrodzone Królestwo Gibral',
    image: '/comic/ch4.jpg',
    aspectRatio: '16/9',
    narrativeSummary: 'Z pokonaniem Lorda Nene mroczne chmury rozstąpiły się po raz pierwszy od pokoleń. Na wzgórzu ponad ruinami machin wojennych, Shu, Kluke, Jiro, Marumaro i Zola patrzą w stronę wschodzącego słońca. Ich cienie stały się symbolem wiecznej obrony dobra.',
    soundEffects: [
      { text: 'TRIUMPH!', meaning: 'Okrzyk zwycięstwa i wolności', position: { top: '24%', left: '10%' }, color: '#10b981', rotation: '-8deg' },
      { text: 'WE DID IT!', meaning: 'Radosne uniesienie drużyny', position: { top: '28%', left: '36%' }, color: '#38bdf8', rotation: '4deg' },
      { text: 'VICTORY!', meaning: 'Zwycięstwo nad tyranią Nene', position: { top: '24%', right: '34%' }, color: '#fbbf24', rotation: '-4deg' }
    ],
    bubbles: [
      {
        id: 'b4-1',
        speaker: 'Shu',
        type: 'shout',
        text: 'Udało się! Zrobiliśmy to! Spójrzcie na niebo... jest naprawdę błękitne!!',
        position: { top: '38%', left: '44%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b4-2',
        speaker: 'Kluke',
        type: 'speech',
        text: 'Nigdy więcej strachu przed Fioletowymi Chmurami... Wioska Talta i cała kraina są bezpieczne!',
        position: { top: '36%', left: '30%' },
        pointerDirection: 'bottom-right'
      },
      {
        id: 'b4-3',
        speaker: 'Jiro',
        type: 'speech',
        text: 'To niewiarygodne. Nasze obliczenia dawały nam zaledwie cień szansy, a jednak wygraliśmy!',
        position: { top: '36%', left: '10%' },
        pointerDirection: 'bottom-right'
      },
      {
        id: 'b4-4',
        speaker: 'Zola',
        type: 'speech',
        text: 'Dobra robota, dzieciaki. Pokazaliście temu światu, czym jest prawdziwa odwaga.',
        position: { top: '38%', right: '22%' },
        pointerDirection: 'bottom-left'
      },
      {
        id: 'b4-5',
        speaker: 'Marumaro',
        type: 'shout',
        text: 'Maru-maru-maaaruuu! Czas na wielką ucztę i taniec zwycięstwa Devee!!',
        position: { bottom: '38%', left: '16%' },
        pointerDirection: 'bottom-left'
      }
    ],
    tacticalNotes: {
      partyLevel: 55,
      shadowRank: 'Legenda Świata (Maksymalny Zmierzch Wojny)',
      enemyThreat: 'Brak – Świat Wyzwolony z Okowów Nene',
      keyAbility: 'Pieśń Wiecznego Błękitu / Pokój i Nadzieja'
    },
    bonusStorySnippet: [
      'Na bezkresnym błękicie nieba zarysował się spokojny, uśmiechnięty profil Błękitnego Smoka.',
      'Cienie nie zniknęły – stały się cichymi strażnikami pokoju w sercach tych, którzy odważyli się marzyć.',
      'Przygoda dobiegła końca, lecz legenda o Shu i Błękitnym Smoku będzie opowiadana przez pokolenia.'
    ]
  }
];
