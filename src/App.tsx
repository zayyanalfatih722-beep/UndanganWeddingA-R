/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CinematicBackground from './components/CinematicBackground';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Music, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Send, 
  Clock, 
  Gift, 
  MessageSquare,
  Instagram,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Play,
  Pause
} from 'lucide-react';
import { musicConfig } from './musicConfig';

// Interfaces for RSVP and Greetings
interface RSVP {
  name: string;
  status: 'hadir' | 'tidak_hadir';
  guests: number;
  message: string;
  timestamp: string;
}

// Elegant Victorian-inspired Corner Ornament
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5 C 30 5, 60 15, 75 35 C 65 35, 45 25, 35 35 C 25 45, 35 65, 35 75 C 15 60, 5 30, 5 5 Z" />
      <path d="M5 5 C 5 25, 15 55, 35 70" />
      <path d="M5 5 C 25 5, 55 15, 70 35" />
      <path d="M15 15 Q 40 20, 50 45" />
      <path d="M15 15 Q 20 40, 45 50" />
      <path d="M30 10 C 35 12, 38 8, 42 12 C 38 14, 35 12, 30 10 Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M10 30 C 12 35, 8 38, 12 42 C 14 38, 12 35, 10 30 Z" fill="currentColor" fillOpacity="0.4" />
      <circle cx="5" cy="5" r="2.5" fill="currentColor" />
      <circle cx="22" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
}

function PremiumDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 relative z-10 select-none opacity-80">
      <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold-accent/50 to-gold-accent" />
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 text-gold-accent animate-pulse-glow"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M50 20 C 45 35, 30 45, 50 80 C 70 45, 55 35, 50 20 Z" />
        <path d="M50 30 C 48 38, 40 42, 50 65 C 60 42, 52 38, 50 30 Z" fill="currentColor" fillOpacity="0.2" />
        <circle cx="50" cy="50" r="1.5" fill="currentColor" />
      </svg>
      <div className="w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-gold-accent/50 to-gold-accent" />
    </div>
  );
}

const stories = [
  {
    number: "01",
    title: "AWAL YANG TAK DISENGAJA",
    text: "Tidak ada yang benar-benar kebetulan. Di antara jutaan langkah yang ada di dunia, Tuhan mempertemukan dua hati pada waktu yang telah Dia tetapkan. Dari sebuah pertemuan sederhana, perlahan tumbuh sebuah cinta yang mengubah segalanya.",
    icon: "sparkles"
  },
  {
    number: "02",
    title: "BELAJAR MENCINTAI",
    text: "Cinta bukan tentang menemukan seseorang yang sempurna, melainkan tentang memilih untuk tetap bertahan, saling memahami, dan saling menerima dalam setiap kekurangan. Bersama, kami belajar bahwa cinta selalu menemukan jalannya.",
    icon: "heart"
  },
  {
    number: "03",
    title: "MENUJU SATU JANJI",
    text: "Setiap langkah yang kami lalui membawa keyakinan bahwa perjalanan ini layak diperjuangkan. Dengan doa, kepercayaan, dan restu keluarga, kami memilih mengikat kisah ini dalam satu janji suci untuk selamanya.",
    icon: "heart-handshake"
  },
  {
    number: "04",
    title: "AWAL DARI SELAMANYA",
    text: "Hari ini bukanlah akhir dari perjalanan kami, melainkan awal dari kehidupan baru yang akan kami jalani bersama. Merupakan sebuah kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir, memberikan doa, restu, dan menjadi bagian dari momen paling berharga dalam hidup kami.",
    icon: "calendar"
  }
];

export default function App() {
  // Query Parameter for Guest Name
  const [guestName, setGuestName] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Carousel State for Perjalanan Kami
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextStory();
    } else if (isRightSwipe) {
      prevStory();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  
  // Animation state for luxury CGI sequence (0 to 8)
  const [animStep, setAnimStep] = useState<number>(0);
  
  // Audio state & reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<any>(null);


  // Since we use the video opening, we don't need any CGI timeouts.
  // The video element itself will call setAnimStep(1) on onEnded.

  // Countdown States
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // RSVP Form States
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [formGuests, setFormGuests] = useState(1);
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Local Storage for Wishes/Greetings
  const [greetings, setGreetings] = useState<RSVP[]>([]);

  // Clipboard copies
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Active map view tab ('akad' | 'resepsi')
  const [activeMap, setActiveMap] = useState<'akad' | 'resepsi'>('akad');

  // Initialize guest name and wishes
  useEffect(() => {
    // Guest name parsing from URL params: 'to' specifically
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || '';
    if (to) {
      const trimmed = to.trim();
      setGuestName(trimmed);
    }

    // Load existing greetings
    const saved = localStorage.getItem('wedding_rsvps_final');
    if (saved) {
      try {
        setGreetings(JSON.parse(saved));
      } catch (e) {
        setGreetings([]);
      }
    } else {
      setGreetings([]);
      localStorage.setItem('wedding_rsvps_final', JSON.stringify([]));
    }
  }, []);

  // Countdown timer logic to October 19, 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-19T08:30:00').getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Initialize and handle background music
  useEffect(() => {
    if (!musicConfig.src) return;
    const audio = new Audio(musicConfig.src);
    audio.loop = true;
    audio.volume = 0; // starts at 0 for smooth fade-in
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Auto-play immediately when website is opened (together with opening video)
    const startAudio = () => {
      audio.play().then(() => {
        // Fade-in to 0.35 volume smoothly over 1.5 seconds
        let vol = 0;
        const interval = setInterval(() => {
          vol += 0.01;
          if (vol >= 0.35) {
            audio.volume = 0.35;
            clearInterval(interval);
          } else {
            audio.volume = vol;
          }
        }, 43); // 35 steps * 43ms = ~1.5s
      }).catch(err => {
        console.log("Autoplay blocked by browser policy. It will play on first user interaction.", err);
      });
    };

    startAudio();

    // Interaction fallback to bypass browser autoplay policy
    const handleFirstInteraction = () => {
      if (audio.paused) {
        startAudio();
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
    };
  }, []);

  const fadeVolume = (targetVolume: number, durationMs: number = 1500, callback?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const intervalMs = 30;
    const totalSteps = durationMs / intervalMs;
    const stepValue = (targetVolume - startVolume) / totalSteps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextVolume = startVolume + (stepValue * currentStep);
      
      if (currentStep >= totalSteps) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
        if (callback) callback();
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVolume));
      }
    }, intervalMs);
  };

  const togglePlay = () => {
    if (!musicConfig.src) {
      // Temporarily toggle play state visually for testing when source is disabled
      setIsPlaying(!isPlaying);
      return;
    }
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) {
      // Fade out volume to 0 over 1 second, then pause the audio
      fadeVolume(0, 1000, () => {
        audio.pause();
      });
    } else {
      // Set volume to current or 0, start playing, then fade in to 0.35
      if (audio.paused) {
        audio.volume = 0;
        audio.play().then(() => {
          fadeVolume(0.35, 1500);
        }).catch(err => {
          console.log("Audio play blocked or failed: ", err);
        });
      } else {
        fadeVolume(0.35, 1500);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));
    audioRef.current.currentTime = ratio * duration;
  };

  // Handle Buka Undangan (Open Invitation)
  const handleOpenInvitation = () => {
    setIsOpen(true);

    // Play music when opening invitation only if it's currently paused
    if (musicConfig.src && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          fadeVolume(0.35, 1500);
        }).catch(err => {
          console.log("Audio play blocked or failed: ", err);
        });
      }
    }

    // Smooth scroll to main content (hero section)
    setTimeout(() => {
      const element = document.getElementById('hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150); // slight delay to allow the cover screen exit transition to begin
  };



  // Handle RSVP Submit
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newGreeting: RSVP = {
        name: formName.trim(),
        status: formStatus,
        guests: formGuests,
        message: formMessage.trim(),
        timestamp: new Date().toISOString()
      };

      const updated = [newGreeting, ...greetings];
      setGreetings(updated);
      localStorage.setItem('wedding_rsvps_final', JSON.stringify(updated));

      // Reset Form
      setFormName('');
      setFormMessage('');
      setFormGuests(1);
      setFormStatus('hadir');
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 3000);
    });
  };

  // Format timestamp helper
  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#F8F5EF] overflow-x-hidden selection:bg-gold-accent/20 selection:text-burgundy-deep">
      
      <CinematicBackground />

      {/* 1. COVER SCREEN (CURTAIN OVERLAY) WITH PREMIUM CGI ANIMATION SEQUENCE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            id="cover-screen"
            className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-transparent"
            exit={{ 
              y: '-100%',
              transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
            }}
          >
            <AnimatePresence mode="wait">
              {animStep === 0 ? (
                <motion.div
                  key="opening-video-container"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-50 bg-black w-full h-full overflow-hidden flex items-center justify-center"
                >
                  <video
                    src="/opening.mp4"
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => setAnimStep(1)}
                    onError={() => setAnimStep(1)}
                    className="w-full h-full object-cover pointer-events-none"
                    preload="auto"
                  />
                  
                  {/* Skip Intro Button (Glassmorphism design) */}
                  <motion.button
                    onClick={() => {
                      setAnimStep(1);
                      if (musicConfig.src && audioRef.current && audioRef.current.paused) {
                        audioRef.current.volume = 0;
                        audioRef.current.play().then(() => {
                          fadeVolume(0.35, 1500);
                        }).catch(err => {
                          console.log("Audio play blocked on skip intro: ", err);
                        });
                      }
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 bg-white/10 text-white font-sans text-xs tracking-wider uppercase font-bold shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    <span>Lewati Intro</span>
                    <span className="text-sm">⏭</span>
                  </motion.button>

                  {/* Indicator info text centered bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-white/70 font-sans text-xs tracking-wider text-center pointer-events-none bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5 shadow-md">
                    Anda dapat melewati video pembuka.
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hero-website-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-between p-6 overflow-hidden bg-transparent text-espresso w-full h-full"
                >
                  {/* Background elements */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4B06A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 pointer-events-none" />
                  
                  {/* Soft Ambient Golden Glow backdrop */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <motion.div
                      className="w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(212,176,106,0.22)_0%,_transparent_70%)] blur-3xl"
                      animate={{
                        scale: [0.9, 1.15, 0.95, 1.1, 0.9],
                        opacity: [0.4, 0.8, 0.5, 0.9, 0.4]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Spacer to keep flex layout vertical balance */}
                  <div className="w-full max-w-lg z-10 pt-4" />

                  {/* Hero Content Container */}
                  <div className="w-full max-w-lg text-center flex flex-col items-center justify-center z-10 my-auto">
                    {/* Decorative Header */}
                    <div className="w-24 h-6 border-b border-gold-accent/30 flex items-center justify-center mb-6 relative">
                      <div className="w-2 h-2 rounded-full bg-gold-accent rotate-45 animate-pulse" />
                    </div>

                    <span className="font-display text-xs md:text-sm text-gold-accent uppercase font-bold tracking-[0.25em]">
                      THE WEDDING OF
                    </span>
                    
                    <div className="space-y-2 py-4">
                      <motion.h1 
                        initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="font-serif text-5xl md:text-6xl text-burgundy-deep italic font-normal tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(107,35,52,0.1)]"
                      >
                        Asri Mauliyana
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-serif text-3xl text-gold-dark italic my-2"
                      >
                        &amp;
                      </motion.p>
                      <motion.h1 
                        initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="font-serif text-5xl md:text-6xl text-burgundy-deep italic font-normal tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(107,35,52,0.1)]"
                      >
                        Rizki Balia
                      </motion.h1>
                    </div>

                    {/* Guest name container strictly matching requirements */}
                    <div className="flex flex-col items-center w-full mt-6">
                      <div className="w-full max-w-sm px-8 py-6 rounded-3xl relative overflow-hidden glass-card-premium">
                        {/* Subtle inner gold border */}
                        <div className="absolute inset-2 border border-gold-accent/15 rounded-[20px] pointer-events-none" />
                        
                        <p className="font-sans text-[12px] tracking-[0.25em] text-gold-dark uppercase font-extrabold">
                          Kepada Yth.
                        </p>
                        
                        <h2 className="font-serif text-3xl italic font-bold text-burgundy-deep mt-3.5 tracking-wide drop-shadow-sm">
                          {guestName || "Bapak/Ibu/Saudara(i)"}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Button container */}
                  <div className="w-full max-w-md flex flex-col items-center space-y-6 mb-8 z-10">
                    <motion.button 
                      id="btn-buka-undangan"
                      onClick={handleOpenInvitation}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-9 py-4 bg-burgundy-deep text-ivory-light font-sans text-sm tracking-[0.2em] uppercase font-extrabold rounded-full shadow-lg hover:bg-burgundy-light hover:shadow-xl hover:shadow-burgundy-deep/20 transition-all duration-300 group overflow-hidden cursor-pointer border border-gold-accent/40 animate-breathe"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Heart className="w-3.5 h-3.5 fill-ivory-light stroke-ivory-light animate-pulse" />
                        BUKA UNDANGAN
                      </span>
                      {/* Luxury gold shimmer passing across the button */}
                      <div className="animate-shimmer-pass" />
                    </motion.button>

                    <div className="flex items-center gap-2 text-espresso/40 text-[10px] tracking-widest font-mono">
                      <span>19 • 10 • 2026</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Controller (Always visible so guests have full control from the start) */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        >
          {/* Small Vinyl Disc Play/Pause Button */}
          <button
            id="floating-vinyl-music-btn"
            onClick={togglePlay}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950 border-2 border-gold-accent/40 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
            style={{
              boxShadow: '0 8px 24px rgba(107, 35, 52, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            }}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {/* Spinning Vinyl Cover */}
            <div
              className={`absolute inset-0 rounded-full flex items-center justify-center bg-neutral-900 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            >
              {/* Concentric LP Grooves */}
              <div className="absolute inset-1.5 border border-white/5 rounded-full" />
              <div className="absolute inset-3.5 border border-white/5 rounded-full" />
              <div className="absolute inset-5 border border-white/10 rounded-full" />
              {/* Center label */}
              <div className="w-5 h-5 rounded-full bg-burgundy-deep border border-gold-accent/30 flex items-center justify-center relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              </div>
            </div>

            {/* Overlaid minimal Icon (Shows Play when paused, Pause when playing) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-20">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white fill-white stroke-none transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white stroke-none ml-[2px] transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>

            {/* Small floating heart ornament attached to vinyl when playing */}
            {isPlaying && (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center z-30">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent/40 opacity-75"></span>
                <Heart className="relative inline-flex rounded-full w-2 h-2 fill-gold-accent stroke-none" />
              </span>
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      {isOpen && <CinematicBackground />}

      {/* 2. MAIN WEBSITE CONTENT (REVEALED AND SCROLLABLE) */}
      {isOpen && (
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center py-6 px-3 sm:py-12 sm:px-4 md:py-20 md:px-6 custom-scrollbar scroll-smooth">
          
          {/* INVITATION PANEL (Floating Glassmorphic Container) */}
          <div
            id="invitation-panel"
            className="w-full max-w-4xl overflow-hidden flex flex-col relative"
            style={{
              background: 'rgba(255, 255, 255, 0.73)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(212, 176, 106, 0.3)',
              boxShadow: '0 30px 60px -15px rgba(107, 35, 52, 0.14), inset 0 1px 3px rgba(255, 255, 255, 0.5)',
              borderRadius: '32px',
            }}
          >
            {/* Elegant Inner Gold Border */}
            <div className="absolute inset-2 md:inset-3 border border-[#D4B06A]/30 rounded-[24px] md:rounded-[28px] pointer-events-none z-0" />

            {/* Top Light Glare Sheen */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/12 to-transparent pointer-events-none z-0" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-0" />

            {/* Corner Ornaments */}
            <CornerOrnament className="absolute top-3 left-3 w-10 h-10 md:w-14 md:h-14 text-gold-accent/50 pointer-events-none z-10" />
            <CornerOrnament className="absolute top-3 right-3 w-10 h-10 md:w-14 md:h-14 text-gold-accent/50 pointer-events-none z-10 rotate-90" />
            <CornerOrnament className="absolute bottom-3 left-3 w-10 h-10 md:w-14 md:h-14 text-gold-accent/50 pointer-events-none z-10 -rotate-90" />
            <CornerOrnament className="absolute bottom-3 right-3 w-10 h-10 md:w-14 md:h-14 text-gold-accent/50 pointer-events-none z-10 rotate-180" />

            {/* HERO SECTION / HEADER WELCOME */}
            <motion.header 
              id="hero" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative min-h-[80vh] flex flex-col justify-center items-center p-6 md:p-12 text-center overflow-hidden bg-transparent"
            >
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory-medium/30 to-transparent pointer-events-none" />
              
              {/* Soft moving golden ambient glow behind name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-96 h-96 rounded-full bg-[radial-gradient(circle,_rgba(212,176,106,0.18)_0%,_transparent_70%)] blur-3xl animate-pulse-glow" />
              </div>

              <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-8 z-10">
                {/* Luxury Editorial Emblem with Staggered Fade + Blur */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-20 h-20 border border-gold-accent/40 rounded-full flex items-center justify-center relative p-1"
                >
                  <div className="absolute inset-1 border border-gold-accent/20 rounded-full" />
                  <span className="font-display text-lg font-light text-burgundy-deep tracking-wider">A &amp; R</span>
                </motion.div>

                <div className="space-y-4">
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-display text-[11px] tracking-[0.45em] text-burgundy-deep font-bold block"
                  >
                    THE WEDDING OF
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.4, duration: 1.2 }}
                    className="font-serif text-5xl md:text-7xl font-light text-burgundy-deep italic tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(107,35,52,0.1)]"
                  >
                    Asri Mauliyana
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="font-serif text-2xl text-gold-dark italic my-2"
                  >
                    &amp;
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="font-serif text-5xl md:text-7xl font-light text-burgundy-deep italic tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(107,35,52,0.1)]"
                  >
                    Rizki Balia
                  </motion.h2>
                </div>

                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 128 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto" 
                />
                
                {/* Elegant details */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="font-sans text-xs md:text-sm tracking-[0.25em] text-burgundy-deep font-semibold space-y-1"
                >
                  <p>Senin, 19 Oktober 2026</p>
                  <p className="text-[10px] text-gold-dark font-mono mt-2 tracking-widest">SAVE THE DATE</p>
                </motion.div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 animate-bounce">
                <span className="text-[9px] tracking-widest uppercase font-sans text-burgundy-deep font-semibold">GULIR KE BAWAH</span>
                <div className="w-[1px] h-8 bg-gold-accent" />
              </div>
            </motion.header>

            {/* SECTION 2: AL-QUR'AN AYAT */}
            <motion.section 
              id="alquran" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 text-espresso relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4B06A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                <div className="w-12 h-[1px] bg-gold-accent mx-auto" />
                
                {/* Elegant Calligraphy Heading Placeholder */}
                <p className="font-serif text-2xl italic text-gold-dark tracking-widest font-semibold">
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>

                {/* Arabic Statement */}
                <p className="font-serif text-2xl md:text-3xl leading-loose text-burgundy-deep font-bold text-center max-w-2xl mx-auto px-4 tracking-wide" dir="rtl">
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
                </p>

                {/* Translation Text */}
                <blockquote className="font-serif text-lg md:text-xl leading-[1.8] text-espresso font-bold italic max-w-2xl mx-auto px-6 relative">
                  <span className="text-4xl text-gold-accent font-serif absolute -top-5 left-0 opacity-60">“</span>
                  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu cenderung dan merasa tenteram kepadanya. Dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
                  <span className="text-4xl text-gold-accent font-serif absolute -bottom-10 right-0 opacity-60">”</span>
                </blockquote>

                <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-gold-dark uppercase font-extrabold">
                  QS. Ar-Rum Ayat 21
                </p>

                <div className="w-12 h-[1px] bg-gold-accent mx-auto" />
              </div>
            </motion.section>

            {/* SECTION 3: PEMBUKA & PROFIL MEMPELAI */}
            <motion.section 
              id="mempelai" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 253, 245, 0.18)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative text-center"
            >
              <div className="max-w-4xl mx-auto space-y-16">
                
                {/* Pembuka Statement */}
                <div className="space-y-4 max-w-2xl mx-auto">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-burgundy-deep leading-relaxed">
                    Assalamu'alaikum Warahmatullahi Wabarakatuh
                  </h3>
                  <p className="font-sans text-sm md:text-base tracking-wider text-gold-dark uppercase font-extrabold">
                    Dengan memohon rahmat dan ridha Allah SWT.
                  </p>
                  <p className="font-serif text-lg md:text-xl leading-[1.8] text-burgundy-deep font-bold px-4">
                    Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara(i) untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami.
                  </p>
                </div>

                {/* Profiles Container Grid with elegant spacing & central separator */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-20 pt-10 pb-6 items-center max-w-5xl mx-auto">
                  
                  {/* Mempelai Wanita Column */}
                  <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl relative group overflow-hidden glass-card-premium">
                    <div className="absolute inset-2 border border-gold-accent/10 rounded-[20px] pointer-events-none" />
                    
                    <div className="space-y-4 flex flex-col items-center">
                      <div className="space-y-3">
                        <motion.h4 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-deep tracking-wider italic leading-normal"
                        >
                          Asri Mauliyana
                        </motion.h4>
                        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-gold-dark uppercase font-extrabold">PUTRI DARI</p>
                        <p className="font-serif text-base md:text-lg text-burgundy-deep font-bold leading-[1.8] mt-1">
                          Bapak Muhammad Rizal <br />
                          <span className="text-[12px] text-burgundy-deep/80 italic font-sans font-semibold">dan</span> <br />
                          Ibu Asnidar
                        </p>
                      </div>

                      <motion.a
                        href="https://instagram.com/asrimlyna_"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/30 bg-white/20 text-burgundy-deep hover:bg-burgundy-deep hover:text-gold-light hover:border-burgundy-deep transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group/ig"
                      >
                        <Instagram className="w-4 h-4 text-gold-dark group-hover/ig:text-gold-light transition-colors duration-300" />
                        <span className="font-sans text-sm font-bold tracking-wider">@asrimlyna_</span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Elegant Separator "&" */}
                  <div className="flex items-center justify-center py-4 md:py-0">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 0.8, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="font-serif text-5xl md:text-6xl lg:text-7xl font-light italic text-gold-dark select-none"
                    >
                      &
                    </motion.span>
                  </div>

                  {/* Mempelai Pria Column */}
                  <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl relative group overflow-hidden glass-card-premium">
                    <div className="absolute inset-2 border border-gold-accent/10 rounded-[20px] pointer-events-none" />
                    
                    <div className="space-y-4 flex flex-col items-center">
                      <div className="space-y-3">
                        <motion.h4 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-deep tracking-wider italic leading-normal"
                        >
                          Rizki Balia
                        </motion.h4>
                        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-gold-dark uppercase font-extrabold">PUTRA DARI</p>
                        <p className="font-serif text-base md:text-lg text-burgundy-deep font-bold leading-[1.8] mt-1">
                          Bapak M. Husaini <br />
                          <span className="text-[12px] text-burgundy-deep/80 italic font-sans font-semibold">dan</span> <br />
                          Ibu Umi Salamah
                        </p>
                      </div>

                      <motion.a
                        href="https://instagram.com/rizkybaliaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/30 bg-white/20 text-burgundy-deep hover:bg-burgundy-deep hover:text-gold-light hover:border-burgundy-deep transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group/ig"
                      >
                        <Instagram className="w-4 h-4 text-gold-dark group-hover/ig:text-gold-light transition-colors duration-300" />
                        <span className="font-sans text-sm font-bold tracking-wider">@rizkybaliaa</span>
                      </motion.a>
                    </div>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* SECTION 4: COUNTDOWN */}
            <PremiumDivider />
            <motion.section 
              id="countdown" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 text-espresso relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4B06A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                <span className="font-sans text-[11px] tracking-[0.35em] text-gold-dark uppercase font-extrabold block">COUNTDOWN</span>
                
                <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">
                  Hitung Mundur Menuju
                </h3>
                
                <p className="font-serif text-2xl md:text-3xl text-espresso font-extrabold uppercase tracking-[0.2em] border-b border-gold-accent/20 pb-4 max-w-xs mx-auto">
                  19 Oktober 2026
                </p>

                {/* Countdown grid with luxury editorial golden circles */}
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto pt-4">
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card-premium">
                    <span className="font-serif text-3xl md:text-5xl text-burgundy-deep font-extrabold">{timeLeft.days}</span>
                    <span className="font-sans text-[12px] tracking-widest uppercase text-espresso font-bold mt-1">Hari</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card-premium">
                    <span className="font-serif text-3xl md:text-5xl text-burgundy-deep font-extrabold">{timeLeft.hours}</span>
                    <span className="font-sans text-[12px] tracking-widest uppercase text-espresso font-bold mt-1">Jam</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card-premium">
                    <span className="font-serif text-3xl md:text-5xl text-burgundy-deep font-extrabold">{timeLeft.minutes}</span>
                    <span className="font-sans text-[12px] tracking-widest uppercase text-espresso font-bold mt-1">Menit</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card-premium">
                    <span className="font-serif text-3xl md:text-5xl text-burgundy-deep font-extrabold">{timeLeft.seconds}</span>
                    <span className="font-sans text-[12px] tracking-widest uppercase text-espresso font-bold mt-1">Detik</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* SECTION: PERJALANAN KAMI */}
            <PremiumDivider />
            <motion.section 
              id="perjalanan-kami" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(253, 240, 242, 0.22)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative text-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8A374A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="space-y-3">
                  <span className="font-sans text-[11px] tracking-[0.35em] text-gold-dark uppercase font-extrabold block">LOVE STORY</span>
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">Perjalanan Kami</h3>
                  <div className="w-16 h-[1px] bg-gold-accent mx-auto mt-4" />
                </div>

                {/* Carousel container */}
                <div 
                  className="relative w-full max-w-2xl mx-auto px-4 py-8"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Left desktop arrow */}
                  <button 
                    onClick={prevStory}
                    className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full border border-white/35 bg-white/20 text-burgundy-deep hover:bg-burgundy-deep hover:text-white transition-all duration-300 shadow-lg backdrop-blur-md active:scale-90 cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 text-gold-dark hover:text-white" />
                  </button>

                  {/* Right desktop arrow */}
                  <button 
                    onClick={nextStory}
                    className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full border border-white/35 bg-white/20 text-burgundy-deep hover:bg-burgundy-deep hover:text-white transition-all duration-300 shadow-lg backdrop-blur-md active:scale-90 cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6 text-gold-dark hover:text-white" />
                  </button>

                  {/* Carousel glass card */}
                  <div 
                    className="w-full min-h-[460px] sm:min-h-[380px] md:min-h-[340px] flex flex-col justify-center items-center p-8 md:p-12 rounded-3xl relative overflow-hidden text-center glass-card-premium"
                  >
                    {/* Subtle inner gold border */}
                    <div className="absolute inset-2 border border-gold-accent/15 rounded-[20px] pointer-events-none" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStoryIndex}
                        initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-6 flex flex-col items-center justify-center h-full w-full relative z-10"
                      >
                        {/* Transparent giant number in background */}
                        <div className="absolute -top-12 -left-6 md:-top-16 md:-left-10 text-[110px] md:text-[140px] font-serif font-bold text-gold-accent/10 select-none pointer-events-none">
                          {stories[currentStoryIndex].number}
                        </div>

                        {/* Floral icon with gold ring */}
                        <div className="w-16 h-16 rounded-full border border-gold-accent/30 bg-white/30 flex items-center justify-center relative shadow-md">
                          <div className="absolute inset-1 border border-dashed border-gold-accent/20 rounded-full" />
                          {stories[currentStoryIndex].icon === 'sparkles' && <Sparkles className="w-6 h-6 text-gold-dark" />}
                          {stories[currentStoryIndex].icon === 'heart' && <Heart className="w-6 h-6 text-gold-dark" />}
                          {stories[currentStoryIndex].icon === 'heart-handshake' && <HeartHandshake className="w-6 h-6 text-gold-dark" />}
                          {stories[currentStoryIndex].icon === 'calendar' && <Calendar className="w-6 h-6 text-gold-dark" />}
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-serif text-2xl md:text-3xl font-bold text-burgundy-deep tracking-wide italic">
                            {stories[currentStoryIndex].title}
                          </h4>
                          <p className="font-serif text-lg md:text-xl leading-[1.8] text-espresso font-bold max-w-lg mx-auto">
                            {stories[currentStoryIndex].text}
                          </p>
                        </div>

                        {/* Thin vector ornament at the bottom of the card content */}
                        <div className="w-16 h-3 opacity-30 text-gold-dark flex justify-center items-center">
                          <svg viewBox="0 0 100 20" className="w-full h-full fill-none stroke-current" strokeWidth="1">
                            <path d="M10,10 C40,20 60,0 90,10" />
                            <circle cx="50" cy="10" r="2" fill="currentColor" />
                          </svg>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Dot Indicators */}
                  <div className="flex justify-center items-center gap-3 mt-8">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStoryIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentStoryIndex === index 
                            ? 'w-8 bg-burgundy-deep shadow-md shadow-burgundy-deep/20' 
                            : 'w-2.5 bg-gold-accent/40 hover:bg-gold-accent/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* SECTION 5: JADWAL ACARA (AKAD NIKAH & RESEPSI) */}
            <PremiumDivider />
            <motion.section 
              id="acara" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 246, 230, 0.22)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative text-center"
            >
              <div className="max-w-5xl mx-auto space-y-12">
                
                <div className="space-y-3">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-gold-dark uppercase font-extrabold block">WAKTU &amp; TEMPAT</span>
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">Rangkaian Acara</h3>
                  <div className="w-16 h-[1px] bg-gold-accent mx-auto mt-4" />
                </div>

                {/* Event cards container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  
                  {/* Card 1: Akad Nikah */}
                  <div className="rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between glass-card-premium">
                    <div>
                      <div className="absolute inset-2 border border-gold-accent/15 rounded-[20px] pointer-events-none" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-accent/10 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
                      
                      <div className="w-14 h-14 bg-burgundy-deep/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gold-accent/20">
                        <Calendar className="w-6 h-6 text-burgundy-deep" />
                      </div>

                      <h4 className="font-serif text-3xl font-bold text-burgundy-deep tracking-wider mb-6">
                        Akad Nikah
                      </h4>

                      <div className="space-y-5 text-center relative z-10 mb-8">
                        <div className="border-b border-gold-accent/15 pb-3">
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Hari &amp; Tanggal</p>
                          <p className="font-serif text-xl text-burgundy-deep font-extrabold">Senin, 19 Oktober 2026</p>
                        </div>

                        <div className="border-b border-gold-accent/15 pb-3">
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Waktu / Jam</p>
                          <p className="font-serif text-xl text-burgundy-deep italic font-extrabold">08.30 WIB</p>
                        </div>

                        <div>
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Lokasi</p>
                          <p className="font-serif text-xl text-burgundy-deep font-extrabold not-italic">
                            Masjid Agung Babussalam
                          </p>
                          <p className="font-serif text-base text-burgundy-deep font-bold mt-1.5 leading-[1.7]">
                            Jl. Tengku Chik Ditiro, Kuta Ateueh, Kecamatan Sukakarya, Kota Sabang, Aceh 23511
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 z-10">
                      <a 
                        href="https://share.google/t4HRYkfa1BZ47m7ZG" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-deep text-gold-light rounded-full border border-gold-accent/30 hover:bg-burgundy-light font-sans text-xs tracking-wider font-extrabold uppercase transition-all duration-300 shadow-md"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Buka Google Maps
                      </a>
                    </div>
                  </div>

                  {/* Card 2: Resepsi */}
                  <div className="rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between glass-card-premium">
                    <div>
                      <div className="absolute inset-2 border border-gold-accent/15 rounded-[20px] pointer-events-none" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-accent/10 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />

                      <div className="w-14 h-14 bg-burgundy-deep/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gold-accent/20">
                        <Calendar className="w-6 h-6 text-burgundy-deep" />
                      </div>

                      <h4 className="font-serif text-3xl font-bold text-burgundy-deep tracking-wider mb-6">
                        Resepsi Pernikahan
                      </h4>

                      <div className="space-y-5 text-center relative z-10 mb-8">
                        <div className="border-b border-gold-accent/15 pb-3">
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Hari &amp; Tanggal</p>
                          <p className="font-serif text-xl text-burgundy-deep font-extrabold">Selasa, 20 Oktober 2026</p>
                        </div>

                        <div className="border-b border-gold-accent/15 pb-3">
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Waktu / Jam</p>
                          <p className="font-serif text-xl text-burgundy-deep italic font-extrabold">11.00 WIB – Selesai</p>
                        </div>

                        <div>
                          <p className="font-sans text-[11px] tracking-widest text-gold-dark uppercase font-extrabold mb-1">Lokasi</p>
                          <p className="font-serif text-xl text-burgundy-deep font-extrabold not-italic">
                            Kediaman Mempelai Wanita
                          </p>
                          <p className="font-serif text-base text-burgundy-deep font-bold mt-1.5 leading-[1.7]">
                            Jl. Kelapa Puan No. 121, Perumnas By Pass, Kota Sabang, Aceh
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 z-10">
                      <a 
                        href="https://goo.gl/maps/vU4nGCFLLXsG4eWN9" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-deep text-gold-light rounded-full border border-gold-accent/30 hover:bg-burgundy-light font-sans text-xs tracking-wider font-extrabold uppercase transition-all duration-300 shadow-md"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Buka Google Maps
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* SECTION 8: LOKASI (GOOGLE MAPS) */}
            <PremiumDivider />
            <motion.section 
              id="lokasi" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 252, 240, 0.22)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative text-center"
            >
              <div className="max-w-4xl mx-auto space-y-8">
                <span className="font-sans text-[11px] tracking-[0.3em] text-gold-dark uppercase font-extrabold block">MAPS</span>
                <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">Lokasi Acara</h3>
                <div className="w-16 h-[1px] bg-gold-accent mx-auto mt-4" />

                <p className="font-serif text-lg md:text-xl leading-[1.8] text-burgundy-deep font-bold max-w-2xl mx-auto">
                  Silakan pilih bagian acara untuk melihat peta interaktif dan navigasi rute lengkap menuju lokasi.
                </p>

                {/* Premium Tab Selector for Maps */}
                <div className="flex justify-center gap-4 max-w-md mx-auto pt-4">
                  <button
                    onClick={() => setActiveMap('akad')}
                    className={`flex-1 py-3.5 px-6 rounded-2xl border text-sm font-extrabold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer ${
                      activeMap === 'akad'
                        ? 'bg-burgundy-deep text-gold-light border-gold-accent/40 shadow-burgundy-deep/20 hover:scale-[1.03]'
                        : 'bg-white/20 text-burgundy-deep border-gold-accent/15 hover:bg-white/30 backdrop-blur-md hover:scale-[1.03]'
                    }`}
                  >
                    Akad Nikah
                  </button>
                  <button
                    onClick={() => setActiveMap('resepsi')}
                    className={`flex-1 py-3.5 px-6 rounded-2xl border text-sm font-extrabold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer ${
                      activeMap === 'resepsi'
                        ? 'bg-burgundy-deep text-gold-light border-gold-accent/40 shadow-burgundy-deep/20 hover:scale-[1.03]'
                        : 'bg-white/20 text-burgundy-deep border-gold-accent/15 hover:bg-white/30 backdrop-blur-md hover:scale-[1.03]'
                    }`}
                  >
                    Resepsi
                  </button>
                </div>

                {/* Google Maps Container */}
                <div className="relative w-full h-96 rounded-3xl overflow-hidden mt-8 bg-transparent glass-card-premium">
                  <iframe 
                    src={
                      activeMap === 'akad'
                        ? "https://maps.google.com/maps?q=Masjid%20Agung%20Babussalam%20Sabang%20Aceh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        : "https://maps.google.com/maps?q=Jl.%20Kelapa%20Puan%20No.%20121%20Perumnas%20By%20Pass%20Sabang%20Aceh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    }
                    className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-700" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={activeMap === 'akad' ? "Peta Masjid Agung Babussalam" : "Peta Kediaman Mempelai Wanita"}
                  ></iframe>
                  <div className="absolute top-4 left-4 bg-burgundy-deep text-gold-light px-5 py-2.5 rounded-full text-xs tracking-wider border border-gold-accent/40 font-serif font-bold shadow-lg">
                    {activeMap === 'akad' ? 'Masjid Agung Babussalam' : 'Kediaman Mempelai Wanita'}
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href={activeMap === 'akad' ? 'https://share.google/t4HRYkfa1BZ47m7ZG' : 'https://goo.gl/maps/vU4nGCFLLXsG4eWN9'} 
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-burgundy-deep text-gold-light rounded-full border border-gold-accent/40 hover:bg-burgundy-light font-sans text-xs tracking-widest transition-all duration-300 shadow-xl uppercase font-extrabold"
                  >
                    <MapPin className="w-4 h-4" />
                    BUKA GOOGLE MAPS
                  </a>
                </div>
              </div>
            </motion.section>

            {/* SECTION 9: RSVP FORM & CONGRATULATIONS */}
            <PremiumDivider />
            <motion.section 
              id="rsvp" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 254, 248, 0.22)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative"
            >
              <div className="max-w-4xl mx-auto space-y-12">
                
                <div className="text-center space-y-3">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-gold-dark uppercase font-extrabold block">CONFIRMATION</span>
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">Konfirmasi Kehadiran</h3>
                  <div className="w-16 h-[1px] bg-gold-accent mx-auto mt-4" />
                </div>

                <p className="font-serif text-lg md:text-xl leading-[1.8] text-burgundy-deep font-extrabold max-w-2xl mx-auto text-center">
                  Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara(i) berkenan memberikan konfirmasi kehadiran melalui formulir digital di bawah ini.
                </p>

                {/* Split layout: RSVP Form on Left, Messages Board on Right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 items-start">
                  
                  {/* RSVP Form */}
                  <div className="rounded-3xl p-6 md:p-8 relative glass-card-premium">
                    <div className="absolute inset-1 border border-gold-accent/15 rounded-2xl pointer-events-none" />
                    
                    <h4 className="font-serif text-2xl font-bold text-burgundy-deep mb-6 pb-2 border-b border-gold-accent/15">
                      Formulir RSVP
                    </h4>

                    <form onSubmit={handleRSVPSubmit} className="space-y-5">
                      {/* Name field */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold tracking-wider uppercase text-burgundy-deep">
                          Nama Lengkap
                        </label>
                        <input 
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Masukkan nama Anda..."
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-burgundy-deep font-bold placeholder-burgundy-deep/60 transition-colors"
                        />
                      </div>

                      {/* Status Kehadiran */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold tracking-wider uppercase text-burgundy-deep">
                          Konfirmasi Kehadiran
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormStatus('hadir')}
                            className={`py-3.5 rounded-xl border text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-md ${
                              formStatus === 'hadir' 
                                ? 'bg-burgundy-deep text-gold-light border-burgundy-deep' 
                                : 'bg-white/20 text-burgundy-deep border-white/30 hover:bg-white/30 backdrop-blur-md'
                            }`}
                          >
                            Hadir
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormStatus('tidak_hadir')}
                            className={`py-3.5 rounded-xl border text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-md ${
                              formStatus === 'tidak_hadir' 
                                ? 'bg-burgundy-deep text-gold-light border-burgundy-deep' 
                                : 'bg-white/20 text-burgundy-deep border-white/30 hover:bg-white/30 backdrop-blur-md'
                            }`}
                          >
                            Tidak Hadir
                          </button>
                        </div>
                      </div>

                      {/* Number of Guests (Only show if attending) */}
                      {formStatus === 'hadir' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold tracking-wider uppercase text-burgundy-deep">
                            Jumlah Tamu / Pax
                          </label>
                          <select 
                            value={formGuests}
                            onChange={(e) => setFormGuests(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-burgundy-deep font-bold transition-colors"
                          >
                            <option value={1}>1 Orang</option>
                            <option value={2}>2 Orang</option>
                            <option value={3}>3 Orang</option>
                            <option value={4}>4 Orang</option>
                          </select>
                        </div>
                      )}

                      {/* Wishes message */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold tracking-wider uppercase text-burgundy-deep">
                          Ucapan Hangat &amp; Doa Restu
                        </label>
                        <textarea 
                          required
                          rows={4}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Tulis ucapan selamat dan doa restu Anda..."
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-burgundy-deep font-bold placeholder-burgundy-deep/60 transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-burgundy-deep hover:bg-burgundy-light text-gold-light font-sans text-xs tracking-wider uppercase font-extrabold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-gold-accent border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            KIRIM KONFIRMASI
                          </>
                        )}
                      </button>

                      {submitSuccess && (
                        <p className="text-center text-xs text-green-700 font-bold font-sans mt-2 animate-bounce">
                          Terima kasih! Konfirmasi &amp; ucapan Anda berhasil terkirim.
                        </p>
                      )}
                    </form>
                  </div>

                  {/* Message Board Wall */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-gold-accent/20">
                      <h4 className="font-serif text-2xl font-bold text-burgundy-deep flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-gold-dark" />
                        Ucapan &amp; Doa Restu
                      </h4>
                      <span className="font-sans text-xs bg-gold-accent/20 text-burgundy-deep px-3 py-1 rounded-full font-extrabold">
                        {greetings.length} Pesan
                      </span>
                    </div>

                    {/* Scrollable list */}
                    <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                      {greetings.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-white/30 rounded-2xl bg-white/20 backdrop-blur-md">
                          <p className="font-serif text-base italic text-burgundy-deep/75 font-bold">
                            Belum ada ucapan & doa restu.
                          </p>
                          <p className="font-sans text-[10px] uppercase tracking-wider text-gold-dark mt-1 font-extrabold">
                            Jadilah yang pertama mengirimkan ucapan!
                          </p>
                        </div>
                      ) : (
                        greetings.map((wish, idx) => (
                          <div 
                            key={idx}
                            className="p-5 rounded-2xl space-y-3 relative shadow-md glass-card-premium"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-base font-bold text-burgundy-deep">{wish.name}</span>
                              <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-extrabold ${
                                wish.status === 'hadir' 
                                  ? 'bg-green-500/15 text-green-800 border border-green-500/10' 
                                  : 'bg-red-500/15 text-red-800 border border-red-500/10'
                              }`}>
                                {wish.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                              </span>
                            </div>
                            
                            <p className="font-serif text-base text-burgundy-deep font-bold leading-relaxed italic">
                              "{wish.message}"
                            </p>

                            <div className="text-[10px] text-burgundy-deep/60 font-mono flex items-center justify-between font-bold">
                              <span>{formatTime(wish.timestamp)}</span>
                              {wish.status === 'hadir' && (
                                <span className="font-sans font-extrabold">Membawa {wish.guests} pax</span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.section>

            {/* SECTION 10: HADIAH DIGITAL */}
            <PremiumDivider />
            <motion.section 
              id="hadiah" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(107, 35, 52, 0.08)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 text-espresso relative text-center"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4B06A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="space-y-3">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-gold-dark uppercase font-extrabold block">WEDDING GIFT</span>
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-burgundy-deep tracking-wider italic">Hadiah Digital</h3>
                  <div className="w-16 h-[1px] bg-gold-accent mx-auto mt-4" />
                </div>

                <p className="font-serif text-lg md:text-xl leading-[1.8] text-espresso font-bold max-w-2xl mx-auto">
                  Bagi keluarga dan kerabat yang ingin mengirimkan hadiah atau tanda kasih kepada kami, dapat menyalurkannya secara digital melalui rekening di bawah ini.
                </p>

                {/* Rekening Card Design - Centered Premium BSI Card */}
                <div className="max-w-md mx-auto mt-8 relative">
                  <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden text-left flex flex-col justify-between h-56 group border-double border-4 glass-card-premium">
                    {/* Background marble lines overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M0 20 Q 30 10, 55 45 T 100 30%22 fill=%22none%22 stroke=%22%23D4B06A%22 stroke-width=%220.5%22/%3E%3Cpath d=%22M10 0 Q 30 40, 70 20 T 90 100%22 fill=%22none%22 stroke=%22%233A2B28%22 stroke-width=%220.2%22/%3E%3C/svg%3E')] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 rounded-bl-full pointer-events-none" />
                    <div className="absolute inset-2 border border-gold-accent/15 rounded-[20px] pointer-events-none" />
                    
                    {/* Copied Micro-Toast Notification */}
                    <AnimatePresence>
                      {copiedAccount === 'bsi' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-4 inset-x-4 mx-auto max-w-[280px] bg-burgundy-deep text-gold-light border border-gold-accent/40 py-2 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs font-sans font-bold z-20 backdrop-blur-sm"
                        >
                          <Check className="w-3.5 h-3.5 text-gold-accent stroke-[3]" />
                          <span>✓ Nomor rekening berhasil disalin.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between items-start z-10">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-burgundy-deep/75 tracking-[0.2em] uppercase font-bold">BANK SYARIAH INDONESIA</span>
                        <span className="font-serif text-lg font-bold text-burgundy-deep tracking-wide mt-0.5">BSI</span>
                      </div>
                      <Gift className="w-6 h-6 text-gold-dark" />
                    </div>

                    <div className="space-y-1.5 z-10">
                      <p className="font-sans text-[10px] tracking-widest text-gold-dark uppercase font-extrabold">No. Rekening</p>
                      <p className="font-serif text-3xl font-extrabold tracking-wider text-burgundy-deep italic">
                        1148778791
                      </p>
                    </div>

                    <div className="flex justify-between items-end z-10">
                      <div>
                        <p className="font-sans text-[9px] text-espresso/60 uppercase tracking-widest font-extrabold">Atas Nama</p>
                        <p className="font-serif text-sm text-espresso font-extrabold">Asri Mauliyana</p>
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard('1148778791', 'bsi')}
                        className="flex items-center gap-1.5 bg-burgundy-deep text-gold-light border border-gold-accent/40 px-4 py-2.5 rounded-xl text-xs tracking-wider font-sans font-extrabold hover:bg-burgundy-light hover:shadow-lg transition-all cursor-pointer shadow-md active:scale-95"
                      >
                        {copiedAccount === 'bsi' ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Rekening</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* SECTION 11: PENUTUP */}
            <PremiumDivider />
            <motion.section 
              id="penutup" 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className="py-24 px-6 border-t border-gold-accent/10 relative text-center"
            >
              <div className="max-w-3xl mx-auto space-y-8">
                <Heart className="w-8 h-8 mx-auto text-gold-accent/50 animate-pulse" />
                
                <p className="font-serif text-lg md:text-xl leading-[1.8] text-burgundy-deep font-extrabold max-w-xl mx-auto px-4">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara(i) berkenan hadir serta memberikan doa restu kepada kami.
                </p>
                
                <p className="font-serif text-lg md:text-xl leading-[1.8] text-burgundy-deep font-extrabold max-w-xl mx-auto px-4 italic">
                  Atas kehadiran dan doa restunya kami ucapkan terima kasih.
                </p>

                <div className="space-y-2 pt-4">
                  <h4 className="font-serif text-2xl md:text-3xl font-extrabold tracking-wide text-burgundy-deep">
                    Wassalamu'alaikum Warahmatullahi Wabarakatuh.
                  </h4>
                  <p className="font-sans text-xs tracking-[0.25em] text-gold-dark uppercase font-extrabold mt-2">KAMI YANG BERBAHAGIA</p>
                  <p className="font-serif text-4xl font-light italic text-burgundy-deep tracking-widest mt-4">
                    Asri &amp; Rizki
                  </p>
                </div>
              </div>
            </motion.section>

            {/* FOOTER SECTION */}
            <footer className="py-12 px-6 border-t border-gold-accent/10 text-espresso text-center bg-transparent">
              <div className="max-w-4xl mx-auto space-y-4">
                <h5 className="font-serif text-2xl font-light text-burgundy-deep tracking-widest italic font-medium">
                  Asri Mauliyana &amp; Rizki Balia
                </h5>
                <p className="font-sans text-[9px] tracking-widest text-gold-dark/60 uppercase font-semibold">
                  Senin, 19 Oktober 2026 • ALL RIGHTS RESERVED
                </p>
              </div>
            </footer>

            {/* BRANDING SIGNATURE FOOTER */}
            <div className="mt-24 border-t border-gold-accent/20 pt-12 pb-8 text-center bg-transparent relative z-10">
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Heart className="w-3.5 h-3.5 fill-gold-accent stroke-gold-accent animate-pulse" />
                  <p className="font-serif text-[10px] tracking-[0.25em] text-gold-dark/80 italic font-semibold uppercase">
                    Love Begins With Bismillah
                  </p>
                </div>
                <div>
                  <a
                    href="https://lynk.id/zeacorner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[12px] tracking-[0.45em] text-gold-accent transition-all duration-500 ease-in-out font-medium uppercase select-none cursor-pointer inline-block"
                    style={{
                      transition: "all 0.5s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FAF7F2";
                      e.currentTarget.style.textShadow = "0 0 12px rgba(212, 176, 106, 0.95), 0 0 4px rgba(212, 176, 106, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#D4B06A";
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    ZCC
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
