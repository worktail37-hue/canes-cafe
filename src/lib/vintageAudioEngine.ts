/**
 * CANE'S SERVE - 1930s to 1970s Vintage Cafe Audio Engine
 * Pure Web Audio API acoustic & chill cafe soundscape generator.
 * Zero external audio CDN dependencies for 100% reliable offline & instant playback.
 */

export interface VintageTrack {
  id: string;
  era: '1930s' | '1940s' | '1950s' | '1960s' | '1970s';
  title: string;
  artist: string;
  year: number;
  genre: string;
  durationSeconds: number;
  description: string;
  tempo: number;
  scale: number[]; // Frequencies for melodic arpeggios
  progression: number[][]; // Chord frequency stacks
  acousticStyle: 'gypsy-swing' | 'bistro-nocturne' | 'bossa-crema' | 'folk-picking' | 'acoustic-soul';
}

export const VINTAGE_TRACKS: VintageTrack[] = [
  {
    id: 'track-1930s',
    era: '1930s',
    title: 'Gramophone Serenade in Montmartre',
    artist: "Cane's Hot Club Acoustic Trio",
    year: 1938,
    genre: 'Gypsy Acoustic Swing & 78 RPM Gramophone',
    durationSeconds: 164,
    description: 'Brisk acoustic gypsy guitar arpeggios, nostalgic 78 RPM needle crackle, and soft double bass reminiscent of Django in Paris.',
    tempo: 96,
    scale: [293.66, 329.63, 349.23, 440.0, 523.25, 587.33, 698.46], // Dm Dorian
    progression: [
      [146.83, 220.0, 261.63, 349.23], // Dm7
      [196.0, 246.94, 293.66, 392.0],  // G7
      [174.61, 220.0, 261.63, 329.63], // Bbmaj7
      [220.0, 277.18, 329.63, 440.0],  // A7
    ],
    acousticStyle: 'gypsy-swing',
  },
  {
    id: 'track-1940s',
    era: '1940s',
    title: 'Midnight Espresso Nocturne',
    artist: "The Cane's Velvet Quartet",
    year: 1945,
    genre: 'Calm Parisian Jazz Nocturne & Rain Acoustics',
    durationSeconds: 182,
    description: 'Slow, reflective acoustic fingerpicking with mellow upright bass and warm lamp-lit cafe intimacy during a quiet evening pour.',
    tempo: 68,
    scale: [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25], // Am Pentatonic / Aeolian
    progression: [
      [110.0, 164.81, 220.0, 261.63], // Am
      [146.83, 174.61, 220.0, 293.66], // Dm7
      [196.0, 246.94, 293.66, 349.23], // G7
      [130.81, 164.81, 196.0, 261.63], // Cmaj7
    ],
    acousticStyle: 'bistro-nocturne',
  },
  {
    id: 'track-1950s',
    era: '1950s',
    title: 'Ipanema Terrace Bossa Nova',
    artist: "Cane's Trio do Café",
    year: 1958,
    genre: 'Sunlit Acoustic Bossa & Velvet Crema',
    durationSeconds: 175,
    description: 'Gentle nylon-string syncopation inspired by João Gilberto. Breezy, soothing, and effortlessly sophisticated.',
    tempo: 104,
    scale: [174.61, 220.0, 261.63, 293.66, 349.23, 392.0, 440.0, 523.25], // Fmaj9
    progression: [
      [87.31, 174.61, 220.0, 261.63, 329.63], // Fmaj7
      [98.0, 196.0, 246.94, 293.66, 370.0],   // G13
      [98.0, 174.61, 220.0, 293.66, 349.23],  // Gm9
      [130.81, 164.81, 207.65, 293.66],       // C7b9
    ],
    acousticStyle: 'bossa-crema',
  },
  {
    id: 'track-1960s',
    era: '1960s',
    title: 'Greenwich Village Acoustic Morning',
    artist: "Cane's Village Coffeehouse Ensemble",
    year: 1965,
    genre: 'Coffeehouse Acoustic Folk & Fingerpicking',
    durationSeconds: 195,
    description: 'Intricate steel-string Travis picking and warm open guitar body resonance echoing through vintage Greenwich Village coffeehouses.',
    tempo: 82,
    scale: [196.0, 220.0, 246.94, 293.66, 329.63, 392.0, 440.0, 493.88], // G Major
    progression: [
      [98.0, 146.83, 196.0, 246.94, 293.66], // G
      [82.41, 123.47, 164.81, 196.0, 246.94], // Em
      [130.81, 164.81, 196.0, 261.63, 329.63], // C
      [146.83, 220.0, 293.66, 369.99],        // D
    ],
    acousticStyle: 'folk-picking',
  },
  {
    id: 'track-1970s',
    era: '1970s',
    title: 'Golden Hour Rhodes & Acoustic Cedar',
    artist: "The Cane's Roastery Sun Sessions",
    year: 1974,
    genre: 'Warm Acoustic Soul & Analog Tape Chill',
    durationSeconds: 188,
    description: 'Relaxed 12-string acoustic guitar strumming blended with velvet warm Fender Rhodes electric chords and golden late-afternoon cafe light.',
    tempo: 74,
    scale: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25], // Cmaj7 Pentatonic
    progression: [
      [65.41, 130.81, 196.0, 246.94, 329.63], // Cmaj7
      [55.0, 110.0, 164.81, 220.0, 261.63],   // Am7
      [73.42, 146.83, 174.61, 220.0, 293.66], // Dm7
      [98.0, 146.83, 196.0, 246.94, 293.66],  // G7
    ],
    acousticStyle: 'acoustic-soul',
  },
];

class VintageCafeAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: GainNode & { getByteFrequencyData?: (arr: Uint8Array) => void } | null = null;
  private realAnalyser: AnalyserNode | null = null;
  private vinylGain: GainNode | null = null;
  private vinylSource: AudioBufferSourceNode | null = null;
  private isPlaying = false;
  private currentTrack: VintageTrack = VINTAGE_TRACKS[0];
  private timer: number | null = null;
  private elapsedSeconds = 0;
  private volume = 0.75;
  private vinylCrackleEnabled = true;
  private listeners: Set<() => void> = new Set();
  private stepIndex = 0;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.realAnalyser = this.ctx.createAnalyser();
      this.realAnalyser.fftSize = 64;

      this.masterGain.connect(this.realAnalyser);
      this.realAnalyser.connect(this.ctx.destination);

      // Initialize continuous vinyl needle crackle generator
      this.initVinylCrackle();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private initVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;

    // Generate 5 seconds of authentic vintage vinyl needle crackle & dust pops
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      // Pink noise base
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut * 0.95) + (white * 0.05);

      // Micro pops / needle clicks typical of 33/78 RPM records
      let pop = 0;
      if (Math.random() < 0.00035) {
        pop = (Math.random() * 2 - 1) * 0.35;
      }
      data[i] = (lastOut * 0.015) + pop;
    }

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.setValueAtTime(this.vinylCrackleEnabled ? 0.35 : 0.0, this.ctx.currentTime);

    // Warm vintage bandpass filter for authentic radio/gramophone acoustic profile
    const vinylFilter = this.ctx.createBiquadFilter();
    vinylFilter.type = 'bandpass';
    vinylFilter.frequency.value = 1800;
    vinylFilter.Q.value = 1.2;

    this.vinylGain.connect(vinylFilter);
    vinylFilter.connect(this.masterGain);

    const playCrackleLoop = () => {
      if (!this.ctx || !this.vinylGain) return;
      this.vinylSource = this.ctx.createBufferSource();
      this.vinylSource.buffer = buffer;
      this.vinylSource.loop = true;
      this.vinylSource.connect(this.vinylGain);
      this.vinylSource.start();
    };

    playCrackleLoop();
  }

  /**
   * Synthesize a warm, resonant acoustic string pluck (nylon or steel body)
   */
  private playAcousticPluck(freq: number, time: number, duration: number, isBass = false) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental oscillator (triangle for acoustic warmth)
    const osc1 = this.ctx.createOscillator();
    osc1.type = isBass ? 'sine' : 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    // Subtle second harmonic for rich wood resonance
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    // Warm low-pass body filter simulating wooden cafe acoustic guitar
    const bodyFilter = this.ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(isBass ? 450 : 2200, time);
    bodyFilter.frequency.exponentialRampToValueAtTime(isBass ? 180 : 600, time + duration);

    // Pluck attack & decay envelope
    const gainNode = this.ctx.createGain();
    const peakVol = isBass ? 0.22 : 0.16;
    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.linearRampToValueAtTime(peakVol, time + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(bodyFilter);
    osc2.connect(bodyFilter);
    bodyFilter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  /**
   * Soft brushed percussion pulse for 30s-70s cafe rhythm
   */
  private playBrushRhythm(time: number, isAccent = false) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.025));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(isAccent ? 3500 : 5000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isAccent ? 0.05 : 0.025, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.08);
  }

  /**
   * Schedule next musical step in loop
   */
  private scheduleStep() {
    if (!this.isPlaying || !this.ctx) return;

    const track = this.currentTrack;
    const secondsPerBeat = 60 / track.tempo;
    const stepDuration = secondsPerBeat / 2; // 8th note subdivisions
    const now = this.ctx.currentTime;

    const chordIndex = Math.floor((this.stepIndex / 8) % track.progression.length);
    const currentChord = track.progression[chordIndex];
    const subBeat = this.stepIndex % 8;

    // 1. Bass note on downbeats (subBeat 0 and 4)
    if (subBeat === 0 || subBeat === 4) {
      const bassNote = currentChord[0];
      this.playAcousticPluck(bassNote, now, secondsPerBeat * 1.8, true);
    }

    // 2. Acoustic Chord Arpeggios & Fingerpicking
    if (track.acousticStyle === 'gypsy-swing') {
      // 1930s Gypsy acoustic swing rhythm
      if (subBeat % 2 === 0) {
        currentChord.slice(1).forEach((note, idx) => {
          this.playAcousticPluck(note, now + (idx * 0.012), secondsPerBeat * 0.45);
        });
      }
      if (subBeat % 4 === 1 || subBeat % 4 === 3) {
        // Melodic Gypsy acoustic lead run
        const melodicNote = track.scale[(this.stepIndex * 3) % track.scale.length];
        this.playAcousticPluck(melodicNote, now, secondsPerBeat * 0.6);
      }
    } else if (track.acousticStyle === 'bistro-nocturne') {
      // 1940s Slow reflective acoustic nocturne
      if (subBeat === 1 || subBeat === 3 || subBeat === 6) {
        const chordNote = currentChord[(subBeat % (currentChord.length - 1)) + 1];
        this.playAcousticPluck(chordNote, now, secondsPerBeat * 1.2);
      }
      if (subBeat === 2 || subBeat === 7) {
        const melody = track.scale[(this.stepIndex + 2) % track.scale.length];
        this.playAcousticPluck(melody, now, secondsPerBeat * 1.4);
      }
    } else if (track.acousticStyle === 'bossa-crema') {
      // 1950s Brazilian Bossa Nova syncopation
      if (subBeat === 1 || subBeat === 2 || subBeat === 5 || subBeat === 6) {
        currentChord.slice(1).forEach((note, idx) => {
          this.playAcousticPluck(note, now + (idx * 0.01), secondsPerBeat * 0.7);
        });
      }
      if (subBeat === 3 || subBeat === 7) {
        const bossaNote = track.scale[(this.stepIndex * 2) % track.scale.length];
        this.playAcousticPluck(bossaNote, now, secondsPerBeat * 0.8);
      }
    } else if (track.acousticStyle === 'folk-picking') {
      // 1960s Greenwich Village Travis Picking
      const pattern = [1, 2, 3, 2, 1, 3, 2, 3];
      const noteIdx = pattern[subBeat] % currentChord.length;
      this.playAcousticPluck(currentChord[noteIdx], now, secondsPerBeat * 0.9);
      if (subBeat === 2 || subBeat === 6) {
        const highLead = track.scale[(this.stepIndex + 4) % track.scale.length];
        this.playAcousticPluck(highLead, now, secondsPerBeat * 1.1);
      }
    } else {
      // 1970s Warm Rhodes & Acoustic Soul
      if (subBeat === 0 || subBeat === 3 || subBeat === 6) {
        currentChord.slice(1).forEach((note, idx) => {
          this.playAcousticPluck(note, now + (idx * 0.02), secondsPerBeat * 1.5);
        });
      }
      if (subBeat === 4 || subBeat === 7) {
        const soulMelody = track.scale[(this.stepIndex + 1) % track.scale.length];
        this.playAcousticPluck(soulMelody, now, secondsPerBeat * 1.3);
      }
    }

    // 3. Gentle Cafe Brushed Percussion
    this.playBrushRhythm(now, subBeat === 2 || subBeat === 6);

    this.stepIndex++;
    this.elapsedSeconds += stepDuration;

    if (this.elapsedSeconds >= track.durationSeconds) {
      this.elapsedSeconds = 0;
    }

    this.notifyListeners();

    // Schedule next beat
    this.timer = window.setTimeout(() => {
      this.scheduleStep();
    }, stepDuration * 1000);
  }

  public playTrack(trackId: string) {
    this.initContext();
    const target = VINTAGE_TRACKS.find((t) => t.id === trackId) || VINTAGE_TRACKS[0];
    this.currentTrack = target;
    this.stepIndex = 0;
    this.elapsedSeconds = 0;
    this.isPlaying = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.scheduleStep();
    this.notifyListeners();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playTrack(this.currentTrack.id);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.notifyListeners();
  }

  public nextTrack() {
    const currentIndex = VINTAGE_TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const nextIndex = (currentIndex + 1) % VINTAGE_TRACKS.length;
    this.playTrack(VINTAGE_TRACKS[nextIndex].id);
  }

  public prevTrack() {
    const currentIndex = VINTAGE_TRACKS.findIndex((t) => t.id === this.currentTrack.id);
    const prevIndex = (currentIndex - 1 + VINTAGE_TRACKS.length) % VINTAGE_TRACKS.length;
    this.playTrack(VINTAGE_TRACKS[prevIndex].id);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public toggleVinylCrackle() {
    this.vinylCrackleEnabled = !this.vinylCrackleEnabled;
    if (this.vinylGain && this.ctx) {
      this.vinylGain.gain.setValueAtTime(this.vinylCrackleEnabled ? 0.35 : 0.0, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public getAnalyserData(dataArray: Uint8Array) {
    if (this.realAnalyser && this.isPlaying) {
      (this.realAnalyser as any).getByteFrequencyData(dataArray);
    } else {
      dataArray.fill(0);
    }
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      elapsedSeconds: Math.floor(this.elapsedSeconds),
      volume: this.volume,
      vinylCrackleEnabled: this.vinylCrackleEnabled,
    };
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => fn());
  }
}

export const vintageAudioEngine = new VintageCafeAudioEngine();
