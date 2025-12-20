"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  onUnlock: () => void;
  onToggleMusic: () => void;
}

export default function Countdown({ onUnlock, onToggleMusic }: CountdownProps) {
  // SET TANGGAL ULANG TAHUN DI SINI
  const targetDate = new Date("2024-01-05T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleMusicClick = () => {
    setIsMusicPlaying(!isMusicPlaying);
    onToggleMusic();
  };

  useEffect(() => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white relative overflow-hidden px-4 selection:bg-pink-500/30">
      
      {/* BACKGROUND DECORATION */}
      {/* Gradient Glow di tengah biar nama Anis kelihatan jelas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* === TOMBOL MUSIK MINI (Glassmorphism) === */}
      <button 
        onClick={handleMusicClick}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all group"
      >
        <span className="text-xs font-light text-gray-300 group-hover:text-white transition-colors">
            {isMusicPlaying ? "Pause Music" : "Play Music"}
        </span>
        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
             {isMusicPlaying ? (
                <div className="flex gap-1 h-3 items-end">
                    <span className="w-0.5 bg-pink-400 h-full animate-[bounce_1s_infinite]"></span>
                    <span className="w-0.5 bg-pink-400 h-2/3 animate-[bounce_1.5s_infinite]"></span>
                    <span className="w-0.5 bg-pink-400 h-full animate-[bounce_0.5s_infinite]"></span>
                </div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-300 ml-0.5">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            )}
        </div>
      </button>

      {/* === CONTENT UTAMA === */}
      <div className="z-10 text-center relative w-full max-w-2xl">
        
        {/* Subtitle Kecil */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300/80 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light"
        >
            {isExpired ? "It's Finally Time" : "Counting Down To Her Special Day"}
        </motion.p>

        {/* NAMA SPESIAL (Gradient Text) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-handwriting mb-10 leading-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            Anis Wilandari
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Syakila Cahyani
          </span>
        </motion.h1>

        {/* GRID WAKTU (Glassmorphism) */}
        {!isExpired ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-4 gap-3 md:gap-6 px-4"
          >
            <TimeUnit value={timeLeft.days} label="Days" delay={0} />
            <TimeUnit value={timeLeft.hours} label="Hours" delay={0.1} />
            <TimeUnit value={timeLeft.minutes} label="Mins" delay={0.2} />
            <TimeUnit value={timeLeft.seconds} label="Secs" delay={0.3} />
          </motion.div>
        ) : (
          /* TOMBOL SURPRISE */
          <motion.button
            onClick={onUnlock}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg md:text-xl font-bold rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6)] border border-white/20 relative overflow-hidden group"
          >
            {/* Kilau Button */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative flex items-center gap-2">
                Open Your Gift 🎁
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

// === KOMPONEN PENDUKUNG ===

// 1. Kotak Waktu (Glass Effect)
function TimeUnit({ value, label, delay }: { value: number; label: string, delay: number }) {
  return (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 + delay }}
        className="flex flex-col items-center p-3 md:p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg group hover:bg-white/10 transition-colors"
    >
      <span className="text-2xl md:text-5xl font-bold font-mono text-white group-hover:text-pink-200 transition-colors">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-1 md:mt-2 group-hover:text-gray-200">
        {label}
      </span>
    </motion.div>
  );
}

// 2. Background Floating Hearts (Lucu Maksimal)
function FloatingHearts() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0, x: Math.random() * 100 + "vw" }}
                    animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    className="absolute text-pink-500/20 text-4xl"
                    style={{ fontSize: Math.random() * 20 + 20 + "px" }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
}