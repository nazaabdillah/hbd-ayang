"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Volume2, Music } from "lucide-react";

interface CountdownProps {
  onUnlock: () => void;
}

// MOCK DATA PREVIEW (Ganti path foto sesuai folder public/images)
const PREVIEW_PHOTOS = [
  "/images/kita1.jpg", 
  "/images/kita2.jpg",
  "/images/kita3.jpg",
  "/images/kita4.jpg",
  "/images/kita5.jpg", 
];

export default function Countdown({ onUnlock }: CountdownProps) {
  // === SETTING TANGGAL (H-0) ===
  const targetDate = new Date("2024-01-05T00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === LOGIC AUDIO & TIMER ===
  useEffect(() => {
    // Coba Autoplay pas loading
    const attemptPlay = async () => {
        if (audioRef.current) {
            try {
                audioRef.current.volume = 0.5;
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay diblokir browser, butuh interaksi user.");
                setIsPlaying(false);
            }
        }
    };
    attemptPlay();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const togglePlay = () => {
      if (audioRef.current) {
          if (isPlaying) audioRef.current.pause();
          else audioRef.current.play();
          setIsPlaying(!isPlaying);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white relative overflow-hidden px-4 selection:bg-pink-500/30">
      
      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src="/music/lagu2.mp3" loop />  

      {/* FONTS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600&display=swap');
      `}</style>

      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0510] to-black opacity-90"></div>
      <FloatingHearts />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* CONTENT UTAMA */}
      <div className="z-10 flex flex-col items-center text-center relative w-full max-w-4xl py-10">
        
        {/* 1. HEADER & TIMER SECTION */}
        <div className="scale-90 md:scale-100">
            <motion.p 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                className="text-pink-300/80 text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif mb-6"
            >
                {isExpired ? "The Wait is Over" : "Locked Memories For"}
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.5 }}
              className="relative mb-8"
            >
              <div style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)] leading-relaxed p-2">
                Anis Wilandari
              </div>
            </motion.h1>

            {!isExpired ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-start justify-center gap-4 md:gap-10">
                <TimeDigit value={timeLeft.days} label="Days" />
                <Separator />
                <TimeDigit value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeDigit value={timeLeft.minutes} label="Mins" />
                <Separator />
                <TimeDigit value={timeLeft.seconds} label="Secs" />
              </motion.div>
            ) : (
               <motion.button onClick={onUnlock} className="mt-4 px-12 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full tracking-widest uppercase text-xs font-bold shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-105 transition-transform relative overflow-hidden group">
                  <span className="relative z-10">Open Gift 🎁</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               </motion.button>
            )}
        </div>

        {/* 2. MUSIC PLAYER (POSISI BARU: ANTARA TIMER & CAROUSEL) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="my-10" // Memberi jarak atas bawah
        >
            <button
                onClick={togglePlay}
                className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-500 shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:scale-105
                    ${isPlaying 
                        ? "bg-pink-500/10 border-pink-500/40 text-pink-100" 
                        : "bg-white/5 border-white/10 text-gray-400"}`}
            >
                {isPlaying ? (
                    <>
                        {/* Visualizer Bar */}
                        <div className="flex gap-1 h-4 items-end">
                            <span className="w-1 bg-pink-400 h-full animate-[bounce_1s_infinite]"></span>
                            <span className="w-1 bg-pink-400 h-2/3 animate-[bounce_1.5s_infinite]"></span>
                            <span className="w-1 bg-pink-400 h-full animate-[bounce_0.5s_infinite]"></span>
                            <span className="w-1 bg-pink-400 h-1/2 animate-[bounce_0.8s_infinite]"></span>
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase">Now Playing</span>
                    </>
                ) : (
                    <>
                        <Volume2 size={18} className="animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase">Tap to Play Music</span>
                    </>
                )}
            </button>
        </motion.div>

        {/* 3. MYSTERY CAROUSEL (SNEAK PEEK) */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="w-full"
        >
            <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
                <Lock size={14} className="text-pink-300" />
                <p className="text-[10px] md:text-xs text-pink-200 tracking-[0.3em] uppercase">Sneak Peek • Locked Content</p>
            </div>
            
            <MysteryCarousel cards={PREVIEW_PHOTOS} />
        </motion.div>

      </div>
    </div>
  );
}

// === COMPONENT: MYSTERY CAROUSEL (LOCKED) ===
function MysteryCarousel({ cards }: { cards: string[] }) {
    const [activeIndex, setActiveIndex] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % cards.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center perspective-1000 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

            {cards.map((src, index) => {
                let offset = index - activeIndex;
                if (offset < -2) offset += cards.length;
                if (offset > 2) offset -= cards.length;

                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;
                const spacing = 140; 

                return (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{
                            x: offset * spacing,
                            scale: isActive ? 1 : 0.8,
                            zIndex: 10 - Math.abs(offset),
                            opacity: isActive ? 1 : 0.3,
                            filter: "blur(4px) grayscale(100%) brightness(50%)"
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-xl border border-white/5 bg-gray-900 shadow-2xl overflow-hidden"
                        style={{ 
                            left: "50%", 
                            marginLeft: -90,
                            transformOrigin: "center"
                        }}
                    >
                        <img src={src} alt="Locked Memory" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <Lock size={16} className="text-white/50" />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// === KOMPONEN VISUAL ===
function TimeDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ fontFamily: "'Cinzel', serif" }} className="text-3xl md:text-5xl font-light text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mt-2">{label}</span>
    </div>
  );
}

function Separator() {
    return <div className="text-2xl md:text-3xl text-pink-500/40 font-light pt-1 animate-pulse">:</div>
}

function FloatingHearts() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 0.3, 0] }}
                    transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-pink-500/10 text-4xl"
                    style={{ fontSize: Math.random() * 20 + 20 + "px", left: Math.random() * 100 + "%" }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
}