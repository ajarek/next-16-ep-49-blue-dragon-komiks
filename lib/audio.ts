// Web Audio API synthesizer for retro Xbox 360 jRPG Blue Dragon sound effects & music

class SoundManager {
  private ctx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: NodeJS.Timeout | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Ryk Błękitnego Smoka (Dragon Roar)
  playDragonRoar() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub bass sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(150, now + 1.2);
    filter.Q.setValueAtTime(8, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);

    // Ethereal roar overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(280, now);
    osc2.frequency.linearRampToValueAtTime(70, now + 1.3);
    gain2.gain.setValueAtTime(0.15, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.4);
  }

  // Wystrzał Promienia Światła (Smoczy Promień / Laser)
  playBeamAttack() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.6);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  // Eksplozja Mecha / Robota Armii Nene
  playMechaExplosion() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(80, now + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.85);
  }

  // Dźwięk Przebudzenia Cienia (Shadow Aura Chime)
  playShadowAwaken() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C, E, G, C, E, G
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.85);
    });
  }

  // Podkład bitewny w stylu Nobuo Uematsu (Battle Rock & Mystery Loop)
  toggleBattleTheme(onState?: boolean): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isBgmPlaying && onState !== true) {
      if (this.bgmInterval) clearInterval(this.bgmInterval);
      this.bgmInterval = null;
      this.isBgmPlaying = false;
      return false;
    }

    if (onState === false) {
      if (this.bgmInterval) clearInterval(this.bgmInterval);
      this.bgmInterval = null;
      this.isBgmPlaying = false;
      return false;
    }

    this.isBgmPlaying = true;
    const bassline = [110, 110, 130.81, 146.83, 110, 98, 110, 164.81]; // A minor driving rock motif
    const leadNotes = [440, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440];
    let step = 0;

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Bass punch
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(bassline[step % bassline.length], now);
      bassGain.gain.setValueAtTime(0.08, now);
      bassGain.gain.exponentialRampToValueAtTime(0.005, now + 0.22);
      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.25);

      // Synth melody
      if (step % 2 === 0) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'square';
        leadOsc.frequency.setValueAtTime(leadNotes[(step / 2) % leadNotes.length], now);
        leadGain.gain.setValueAtTime(0.04, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        leadOsc.connect(leadGain);
        leadGain.connect(this.ctx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + 0.5);
      }

      step++;
    };

    playStep();
    this.bgmInterval = setInterval(playStep, 240);
    return true;
  }

  isBgmActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const soundManager = new SoundManager();

// Lektor czytający polskie dialogi za pomocą Web Speech API
export function speakDialogueInPolish(
  text: string,
  speaker: string,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel(); // Zatrzymaj poprzednie wypowiedzi

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL';

  // Personalizacja głosu dla poszczególnych bohaterów
  switch (speaker) {
    case 'Shu':
      utterance.pitch = 1.25; // Energiczny młody chłopak
      utterance.rate = 1.05;
      break;
    case 'Kluke':
      utterance.pitch = 1.35; // Dziewczęcy, czysty głos
      utterance.rate = 1.0;
      break;
    case 'Jiro':
      utterance.pitch = 1.1; // Opanowany, taktyczny
      utterance.rate = 0.98;
      break;
    case 'Marumaro':
      utterance.pitch = 1.6; // Piskliwy, zabawny, szybki Devee
      utterance.rate = 1.25;
      break;
    case 'Zola':
      utterance.pitch = 0.85; // Niższy, spokojny, dojrzały ton wojowniczki
      utterance.rate = 0.95;
      break;
    case 'Nene':
      utterance.pitch = 0.65; // Mroczny, niski tyran
      utterance.rate = 0.88;
      break;
    case 'Szabo':
      utterance.pitch = 0.75; // Mechaniczny, szorstki
      utterance.rate = 1.1;
      break;
    default:
      utterance.pitch = 1.0; // Narrator
      utterance.rate = 0.95;
      break;
  }

  // Szukanie polskiego głosu w systemie
  const voices = window.speechSynthesis.getVoices();
  const polishVoice = voices.find((v) => v.lang.startsWith('pl'));
  if (polishVoice) {
    utterance.voice = polishVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
